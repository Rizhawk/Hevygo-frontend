<template>
  <div class="wrapper">
    <Dsidebar />
    <div class="main-panel" id="main-panel">
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
            <a class="navbar-brand" href="#pablo">Locate Your Truck</a>
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
                <v-menu transition="slide-y-transition" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon class="my-3" color="white" v-bind="attrs" v-on="on">
                      mdi-truck</v-icon
                    >
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="truck in truckstats"
                      :key="truck.truck"
                      @click.prevent="locateTruck(truck.truck.homelocation)"
                    >
                      <v-list-item-title class="font-weight-medium caption">{{
                        truck.truck.registration
                      }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- End Navbar -->
      <div class="panel-header panel-header-sm"></div>
      <div class="content">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div
                class="card-header font-weight-medium text-secondary caption"
              >
                Here Map
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
import "../../assets/js/plugins/perfect-scrollbar.jquery.min.js";
import "../../assets/js/core/jquery.min.js";
import "../../assets/js/plugins/bootstrap-notify.js";
import "../../assets/js/plugins/chartjs.min.js";
import "../../assets/demo/demo.js";
export default {
  name: "Hmap",
  components: {
    Dsidebar,
    Dfooter,
  },
  data() {
    return {
      platform: null,
      apikey: "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E",
      // You can get the API KEY from developer.here.com
      //
      truckstats: [],
      map: {},
    };
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    this.initializeHereMap();
  },
  created: function () {
    getAPI
      .get("/api/truck/list_truck_status/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.truckstats = this.APIData.data;
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    initializeHereMap() {
      // rendering map
      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      let maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 4,
        center: { lat: 20.5937, lng: 78.9629 },
        pixelRatio: window.devicePixelRatio || 1,
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

      // add UI
      H.ui.UI.createDefault(this.map, maptypes);
      // End rendering the initial map
      // Get an instance of the search service:
    },
    locateTruck(location) {
      let service = this.platform.getSearchService();
      // Call the reverse geocode method with the geocoding parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      service.geocode(
        {
          q: location,
        },
        (result) => {
          result.items.forEach((item) => {
            // Assumption: ui is instantiated
            // Create an InfoBubble at the returned location with
            // the address as its contents:
            this.map.addObject(new H.map.Marker(item.position));
          });
        }
      );
    },
  },
};
</script>