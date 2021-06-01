<template>
  <v-app>
    <Admin />
    <v-layout row wrap class="my-10">
      <v-flex xs1 sm2 md2 lg3></v-flex>
      <v-flex xs10 sm8 md6 lg8>
        <v-simple-table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>PAN</th>
              <th>GST</th>
              <th>Verified</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Joshy</td>
              <td>9946646312</td>
              <td>AAAR123456</td>
              <td>2124541541214</td>
              <td>false</td>
              <td>
                <v-btn color=" green darken-1" x-small outlined dark
                  >Approve</v-btn
                >
                <v-btn class="mx-1" color="red lighten-1" x-small outlined dark
                  >Reject
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Admin from "../Admin/adminhome.vue";
export default {
  name: "AOreg",
  components: {
    Admin,
  },
  data: () => {
    return {
      optrdetails: [],
    };
  },
  created: function () {
    getAPI
      .get("api/operators/view_operator_info/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        console.log(this.APIData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
thead {
  background-color: #e64a19;
}
tbody {
  background-color: #263238;

  color: whitesmoke;
}
tr:hover {
  background-color: transparent !important;
}
</style>