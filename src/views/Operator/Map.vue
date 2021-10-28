<template>
  <div class="wrapper">
    <Dsidebar />
    <div class="main-panel" id="main-panel">
      <!-- Navbar -->
      <Onavbar title="Locate Truck" />
      <mob-nav />
      <!-- End Navbar -->
      <div class="panel-header panel-header-sm"></div>
      <div class="content">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header font-weight-bold text-secondary body-2">
                {{ this.truck }}
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
</template>
<script>
import { getAPI } from "../../axios-api";
import Dsidebar from "../../components/Operator/dashsidebar.vue";
import Dfooter from "../../components/dashfooter.vue";
import Onavbar from "../../components/Operator/OptrNav.vue";
import MobNav from "../../components/Operator/MobNav.vue";
export default {
  name: "Hmap",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data() {
    return {
      platform: null,
      apikey: "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E",
      truck: "",
      tid: "",
      crtLocation: "",
      crtAddress: "",
      maptypes: "",
      map: "",
      marker: "",
      stop: false,
      ws: "",
    };
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    getAPI
      .get(
        "/api/truck/view_truck_status/?truck_id=" + localStorage.getItem("tid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.Http_response == 200) {
          this.crtLocation = this.APIData.data.location;
          this.truck = this.APIData.data.truck.registration;
          this.tid = this.APIData.data.truck.id;
          this.initializeHereMap();
        } else {
          console.log(this.APIData.message);
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
        this.ws = new WebSocket(
          "ws://3.108.118.96:8001/ws/" + localStorage.getItem("tid")
        );
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
      this.locateTruck();
    },
    locateTruck() {
      let service = this.platform.getSearchService();
      // Call the reverse geocode method with the geocoding parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
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