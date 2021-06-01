<template>
  <v-app>
    <Admin />
    <v-layout row wrap class="my-15 mx-10">
      <v-flex><h1>Truck reg approval</h1></v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import Admin from "../Admin/adminhome.vue";
export default {
  name: "ATreg",
  components: {
    Admin,
  },
  data: () => {
    return {
      truckdetails: [],
    };
  },
};
</script>