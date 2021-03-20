<template>
  <v-app>
    <Cpage />
    <v-layout class="my-5 mx-10">
      <v-flex xs2 sm2 md2 lg4></v-flex>
      <v-flex xs10 sm4 md6 lg4>
        <h1>Track Customer Shipments</h1>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import Cpage from "../components/custpage";
export default {
  name: "Ctrack",
  components: {
    Cpage,
  },
};
</script>