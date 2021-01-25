<template>
  <v-app>
    <Opage />
    <v-layout class="my-10" justify-center>
      <v-flex lg6>
        <v-simple-table fixed-header dark>
          <template v-slot:default>
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              <tr v-for="driver in driverdetails" :key="driver.id"></tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
import Opage from "../views/optrpage";
export default {
  data: () => {
    return {
      driverdetails: [],
      token: localStorage.getItem("user_token") || null,
    };
  },
  name: "Editdrivers",
  components: {
    Opage,
  },
  beforeMount: function () {
    getAPI
      .get("/api/operator/driver-list/", {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData) {
          this.driverdetails.push(this.APIData[key]);
        }
        console.log(this.APIData);
      })
      .catch((err) => {
        alert(err);
      });
  },
};
</script>