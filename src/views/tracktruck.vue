<template>
  <v-app class="page">
    <div id="map">
      <!--In the following div the HERE Map will render-->
      <div
        id="mapContainer"
        style="height: 650px; width: 100%"
        ref="hereMap"
      ></div>
    </div>
  </v-app>
</template>
<script>
export default {
  name: "Tracktruck",
  data() {
    return {
      platform: null,
      apikey: "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E",
      // You can get the API KEY from developer.here.com
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
  methods: {
    initializeHereMap() {
      // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 5,
        center: { lat: 20.5937, lng: 78.9629 },
        pixelRatio: window.devicePixelRatio || 1
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, maptypes);
      // End rendering the initial map
      // Get an instance of the search service:
      var service = this.platform.getSearchService();

      // Call the reverse geocode method with the geocoding parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      service.geocode(
        {
          q: this.$session.get("cp"),
        },
        (result) => {
          result.items.forEach((item) => {
            // Assumption: ui is instantiated
            console.log(item.position);
            // Create an InfoBubble at the returned location with
            // the address as its contents:
            map.addObject(new H.map.Marker(item.position));
          });
        },
        alert
      );
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
.page {
  background-color: grey;
}
</style>