
<template>
  <v-app id="bg">
    <v-system-bar color="white"
      ><v-spacer></v-spacer
      ><v-btn class="mr-4" to="/bookings" x-small color="green darken-4" dark depressed
        >Proceed to Pay</v-btn
      >
    </v-system-bar>
    <p class="my-2 white--text font-weight-medium">
      Route TollCost :<span class="mx-2">{{ this.tollCost }} INR</span>
    </p>
    <div id="map">
      <!--In the following div the HERE Map will render-->
      <div
        id="mapContainer"
        style="height: 800px; width: 100%"
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
      getAPI
        .post(
          "/api/maps/set-route/",
          {
            start_point: this.start,
            end_point: this.end,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          for (let key in this.APIData) {
            this.routes = this.APIData[key]["route"];
          }
          for (let key in this.routes) {
            this.cost = this.routes[key]["cost"];
          }

          this.tollCost = this.cost["totalCost"];
          localStorage.setItem("cost", this.tollCost);
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

<style scoped>
#map {
  width: 95vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
#bg {
  background-color: grey;
}
</style>