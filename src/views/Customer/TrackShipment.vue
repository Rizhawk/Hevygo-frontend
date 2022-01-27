<template>
  <v-app>
    <div class="wrapper">
      <Csidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Cnavbar title="Track your Shipments" />
        <Cmobnav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div
                  class="card-header font-weight-bold text-secondary caption"
                >
                  Current Location :
                  <span
                    class="card-header font-weight-medium text-secondary body-2"
                    ><v-icon color="green darken 4" small>mdi-map-marker</v-icon
                    >{{ this.crtAddress }}</span
                  >
                  <div class="text-end">
                    <v-btn
                      x-small
                      outlined
                      :disabled="stop"
                      depressed
                      color="green"
                      @click.prevent="getLiveLocation"
                    >
                      <v-icon x-small dense class="mx-1">mdi-navigation</v-icon
                      >Live Tracking
                    </v-btn>
                    <v-btn
                      class="mx-2"
                      v-if="stop"
                      x-small
                      outlined
                      depressed
                      color="red"
                      @click.prevent="stopTracking"
                      >Stop</v-btn
                    >
                  </div>
                </div>
                <div class="card-body">
                  <!-- <div id="map" class="map"></div> -->
                  <div id="map">
                    <!--In the following div the HERE Map will render-->
                    <div
                      id="mapContainer"
                      style="height: 600px; width: 100%"
                      ref="hereMap"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dfooter />
      </div>
    </div>
  </v-app>
</template>
<script>
import { loadOptions } from "@babel/core";
import { getAPI } from "../../axios-api";
import Cnavbar from "../../components/Customer/navbar.vue";
import Cmobnav from "../../components/Customer/navmob.vue";
import Csidebar from "../../components/Customer/sidebar.vue";
import Dfooter from "../../components/dashfooter.vue";
export default {
  name: "Ctrack",
  components: {
    Csidebar,
    Dfooter,
    Cnavbar,
    Cmobnav,
  },
  data: () => {
    return {
      crtLocation: "",
      crtAddress: "",
      //
      origin: [],
      dest: [],
      router: {},
      geocoder: {},
      directions: [],
      routes: "",
      start: "",
      end: "",
      //
      platform: null,
      apikey: "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E",
      maptypes: "",
      map: "",
      marker: "",
      //
      ws: "",
      stop: false,
      tid: "",
    };
  },
  beforeCreate: function () {
    getAPI
      .get(
        "/api/customers/cust-dest-detail/?id=" + localStorage.getItem("destid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.Http_response == 200) {
          this.start = this.APIData.data.start_location;
          this.end = this.APIData.data.end_location;
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    getAPI
      .get(
        "api/customers/cust-trans-detail/?id=" + localStorage.getItem("destid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.Http_response == 200) {
          this.crtLocation = this.APIData.data.truck.location;
          this.tid = this.APIData.data.truck.truck.truck.id;
          this.initializeHereMap();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getLiveLocation() {
      this.stop = true;
      try {
        this.ws = new WebSocket("wss://shuttleapi.rizhawk.com/ws/" + this.tid);
        console.log(this.ws);
        (this.ws.onopen = function () {
          console.log("Websocket Connection Successfull!");
        }),
          (this.ws.onmessage = ({ data }) => {
            let req = JSON.parse(data);
            this.crtLocation = req["location"];
            this.map.removeObject(this.marker);
            this.locateTruck();
          });
      } catch (err) {
        console.log(err);
      }
    },
    stopTracking() {
      this.ws.close();
      this.stop = false;
    },
    initializeHereMap() {
      // rendering map
      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      this.maptypes = this.platform.createDefaultLayers();
      // Instantiate (and display) a map object:
      this.map = new H.Map(mapContainer, this.maptypes.vector.normal.map, {
        zoom: 4,
        center: { lat: 20.5937, lng: 78.9629 },
        pixelRatio: window.devicePixelRatio || 1,
        // center object { lat: 40.730610, lng: -73.935242 }
      });
      addEventListener("resize", () => this.map.getViewPort().resize());
      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      const ui = H.ui.UI.createDefault(this.map, this.maptypes);
      // add UI
      // End rendering the initial map
      // Get an instance of the search service:
      this.setRoute(H, this.map, this.platform, ui);
    },
    setRoute(H, map, platform, ui) {
      // Create the parameters for the routing request:
      var routingParameters = {
        routingMode: "fast",
        transportMode: "truck",
        // The start point of the route:
        origin: this.start,
        // The end point of the route:
        destination: this.end,
        // Include the route shape in the response
        return: "polyline",
      };
      // Define a callback function to process the routing response:
      var onResult = function (result) {
        // ensure that at least one route was found
        if (result.routes.length) {
          result.routes[0].sections.forEach((section) => {
            // Create a linestring to use as a point source for the route line
            let linestring = H.geo.LineString.fromFlexiblePolyline(
              section.polyline
            );
            //Within the onResult callback:
            // Create an outline for the route polyline:
            var routeOutline = new H.map.Polyline(linestring, {
              style: {
                lineWidth: 10,
                strokeColor: "rgba(0, 128, 255, 0.7)",
                lineTailCap: "arrow-tail",
                lineHeadCap: "arrow-head",
              },
            });
            // Create a patterned polyline:
            var routeArrows = new H.map.Polyline(linestring, {
              style: {
                lineWidth: 10,
                fillColor: "white",
                strokeColor: "rgba(255, 255, 255, 1)",
                lineDash: [0, 2],
                lineTailCap: "arrow-tail",
                lineHeadCap: "arrow-head",
              },
            });
            // create a group that represents the route line and contains
            // outline and the pattern
            var routeLine = new H.map.Group();
            routeLine.addObjects([routeOutline, routeArrows]);
            // Add the route polyline and the two markers to the map:
            map.addObjects([routeLine]);
          });
        }
      };
      // Get an instance of the routing service version 8:
      var router = platform.getRoutingService(null, 8);
      // Call calculateRoute() with the routing parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      router.calculateRoute(routingParameters, onResult, function (error) {
        console.log(error.message);
      });
      this.locateTruck();
    },
    locateTruck() {
      var service = this.platform.getSearchService();
      service.reverseGeocode(
        {
          at: this.crtLocation,
        },
        (result) => {
          result.items.forEach((item) => {
            // Assumption: ui is instantiated
            // Create an InfoBubble at the returned location with
            // the address as its contents:
            this.crtAddress = item.address.label;
            this.marker = new H.map.Marker(item.position);
            this.marker.addEventListener(
              "tap",
              (event) => {
                ui.addBubble(
                  new H.ui.InfoBubble(item.position, {
                    content: item.address.label,
                  })
                );
              },
              false
            );
            let coords = { lat: item.position.lat, lng: item.position.lng };
            this.map.setCenter(coords);
            this.map.setZoom(18);
            this.map.addObject(this.marker);
          });
        }
      );
    },
  },
};
</script>