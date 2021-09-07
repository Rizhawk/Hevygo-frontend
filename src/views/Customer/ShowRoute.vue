<template>
  <div class="wrapper">
    <!-- Navbar -->
    <nav
      class="
        navbar navbar-expand-lg navbar-transparent
        bg-primary
        navbar-absolute
      "
    >
      <div class="container-fluid">
        <div class="navbar-wrapper">
          <div class="navbar-toggle">
            <button type="button" class="navbar-toggler">
              <span class="navbar-toggler-bar bar1"></span>
              <span class="navbar-toggler-bar bar2"></span>
              <span class="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          <a class="navbar-brand" href="#pablo">Route of your Shipment</a>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
          <span class="navbar-toggler-bar navbar-kebab"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navigation"
        >
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <!---->
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <div class="panel-header panel-header-sm">
      <v-flex row justify-end>
        <v-btn
          x-small
          color=" green lighten-1"
          to="/bookings"
          depressed
          dark
          outlined
          >Proceed to Pay</v-btn
        ></v-flex
      >
    </div>
    <div class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header font-weight-bold body-2 black--text">
              Cost of Route : {{ this.tollCost }}
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
  </div>
</template>
<script>
import { getAPI } from "../../axios-api";
import Csidebar from "../../components/Customer/sidebar.vue";
import store from "../../../store";
export default {
  name: "RouteMap",
  store: store,
  components: {
    Csidebar,
  },
  data() {
    return {
      center: {},
      platform: null,
      apikey: "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E",
      router: {},
      geocoder: {},
      directions: [],
      routes: "",
      start: "",
      end: "",
      cost: [],
      tollCost: "",
      origin: [],
      dest: [],
    };
  },
  mounted() {
    const H = window.H;
    // Instantiate a map and platform object:
    var platform = new H.service.Platform({
      apikey: this.apikey,
    });
    // Retrieve the target element for the map:
    // var targetElement = document.getElementById("mapContainer");

    // Get the default map types from the platform object:
    var defaultLayers = platform.createDefaultLayers();

    // Instantiate the map:
    var map = new H.Map(
      document.getElementById("mapContainer"),
      defaultLayers.vector.normal.map,
      {
        zoom: 5,
        center: { lat: 20.5937, lng: 78.9629 },
      }
    );
    addEventListener("resize", () => map.getViewPort().resize());
    // add behavior control
    new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    // add UI
    H.ui.UI.createDefault(map, defaultLayers);
    // Instantiate a map and platform object:
    // Get an instance of the geocoding service:
    var service = platform.getSearchService();
    this.getGeocord(H, map, service, platform);
  },
  methods: {
    getGeocord(H, map, service, platform) {
      // Call the geocode method with the geocoding parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      service.geocode(
        {
          q: this.$session.get("sl"),
        },
        (result) => {
          // Add a marker for each location found
          result.items.forEach((item) => {
            // map.addObject(new H.map.Marker(item.position));
            this.origin.push(item.position["lat"]);
            this.origin.push(item.position["lng"]);
          });
          let Norigin = this.origin.slice(0, 2);
          this.start = Norigin.toString();
        }
      );
      service.geocode(
        {
          q: this.$session.get("el"),
        },
        (result) => {
          // Add a marker for each location found
          result.items.forEach((item) => {
            // map.addObject(new H.map.Marker(item.position));
            this.dest.push(item.position["lat"]);
            this.dest.push(item.position["lng"]);
            console.log(this.dest);
          });
          let Ndest = this.dest.slice(0, 2);
          this.end = Ndest.toString();
          this.setRoute(H, map, platform);
        }
      );
    },
    setRoute(H, map, platform) {
      // Create the parameters for the routing request:
      var routingParameters = {
        routingMode: "fast",
        transportMode: "truck",
        // The start point of the route:
        origin: this.start, //'28.61554,77.23272'
        // The end point of the route:
        destination: this.end, //'18.92232,72.83375'
        // Include the route shape in the response
        return: "polyline",
      };
      this.showRoute(H, map, platform, routingParameters);
    },
    showRoute(H, map, platform, routingParameters) {
      // Define a callback function to process the routing response:
      var onResult = function (result) {
        // ensure that at least one route was found
        if (result.routes.length) {
          result.routes[0].sections.forEach((section) => {
            // Create a linestring to use as a point source for the route line
            let linestring = H.geo.LineString.fromFlexiblePolyline(
              section.polyline
            );
            // Create a polyline to display the route:
            let routeLine = new H.map.Polyline(linestring, {
              style: { strokeColor: "blue", lineWidth: 3 },
            });

            // Create a marker for the start point:
            let startMarker = new H.map.Marker(
              section.departure.place.location
            );

            // Create a marker for the end point:
            let endMarker = new H.map.Marker(section.arrival.place.location);

            // Add the route polyline and the two markers to the map:
            map.addObjects([routeLine, startMarker, endMarker]);

            // Set the map's viewport to make the whole route visible:
            map
              .getViewModel()
              .setLookAtData({ bounds: routeLine.getBoundingBox() });
          });
        }
        console.log(result);
      };
      // Get an instance of the routing service version 8:
      var router = platform.getRoutingService(null, 8);
      // Call calculateRoute() with the routing parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      router.calculateRoute(routingParameters, onResult, function (error) {
        console.log(error.message);
      });
      this.getCost();
    },
    getCost() {
      console.log(this.start);
      console.log(this.end);
      let wayPoints = new FormData();
      wayPoints.append("waypoint0", this.start);
      wayPoints.append("waypoint1", this.end);
      console.log(this.$session.get("user_token"));
      getAPI
        .post("/api/map/get_cost/", wayPoints, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          // localStorage.setItem("cost", this.APIData.data.details.tollCost);
          this.tollCost = this.APIData.data.details.tollCost;
          this.$store.commit("updateCost", this.tollCost);
          console.log(this.$store.getters.totalCost);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    refresh() {
      window.location.reload();
    },
  },
};
</script>