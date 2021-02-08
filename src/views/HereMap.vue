
<template>
  <v-app id="bg">
    <v-system-bar color="white"
      ><v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="mx-2" icon dark color="teal">
            <v-icon dark> mdi-format-list-bulleted-square </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Route Details</v-list-item-title>
          </v-list-item>
            <v-list-item router to="/custpage">
            <v-list-item-title>Back</v-list-item-title>
          </v-list-item>
        </v-list> </v-menu
    ></v-system-bar>
    <div id="map">
      <!--In the following div the HERE Map will render-->
      <div
        id="mapContainer"
        style="height: 600px; width: 100%"
        ref="hereMap"
      ></div>
    </div>
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
export default {
  name: "HereMap",
  computed: {},
  // props: {
  //   center: Object
  //   // center object { lat: 40.730610, lng: -73.935242 }
  // },
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
      finish: "",
      waypoints: [],
      cost: [],
      totalcost: "",
      origin: [],
      dest: [],
      st: "",
      fin: "",
      // You can get the API KEY from developer.here.com
    };
  },
  async mounted() {
    getAPI
      .get("/api/maps/maps/", {
        headers: {
          Authorization: `Token ${this.$session.get('user_token')}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData) {
          this.routes = this.APIData[key]["route"];
        }
        for (let key in this.routes) {
          this.waypoints = this.routes[key]["waypoint"];
        }
        for (let key in this.routes) {
          this.cost = this.routes[key]["cost"];
        }
        this.totalcost = this.cost["totalCost"];
        this.start = this.waypoints[0]["mappedPosition"];
        this.finish = this.waypoints[1]["mappedPosition"];
        for (let key in this.start) {
          this.origin.push(this.start[key]);
        }
        for (let key in this.finish) {
          this.dest.push(this.finish[key]);
        }
        this.st = this.origin.toString();
        this.fin = this.dest.toString();
        this.initializeHereMap();
      })
      .catch((err) => {
        alert(err);
      });

    // Initialize the platform object:
  },

  methods: {
    initializeHereMap() {
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
          zoom: 10,
          center: { lat: 20.5937, lng: 78.9629 },
        }
      );

      addEventListener("resize", () => map.getViewPort().resize());
      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      // add UI
      H.ui.UI.createDefault(map, defaultLayers);
      // End rendering the initial map

      // Create the parameters for the routing request:
      var routingParameters = {
        routingMode: "fast",
        transportMode: "truck",
        // The start point of the route:
        origin: this.st, //'28.61554,77.23272'
        // The end point of the route:
        destination: this.fin, //'18.92232,72.83375'
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
      };

      // Get an instance of the routing service version 8:
      var router = platform.getRoutingService(null, 8);

      // Call calculateRoute() with the routing parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      router.calculateRoute(routingParameters, onResult, function (error) {
        console.log(error.message);
      });
    },
  },
};
</script>

<style scoped>
#map {
  width: 90vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
#bg {
  background-color: black;
}
</style>