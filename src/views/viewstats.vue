<template>
  <v-app>
    <Opage />
    <v-layout row wrap class="my-15">
      <v-flex sm2 md2 lg3></v-flex>
      <v-flex xs12 sm8 md6 lg6>
        <!--Table showing status details-->
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="white--text text-left">Truck</th>
                <th class="white--text text-left">Driver</th>
                <th class="white--text text-left">Status</th>
                <th class="white--text text-left">Location</th>
                <th class="white--text text-left">Find vechicle</th>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item router to="/truckstatus">
                      Add new Truck Status
                    </v-list-item>
                  </v-list>
                </v-menu>
              </tr>
            </thead>
            <tbody>
              <tr v-for="truck in truckdriver" :key="truck.truck">
                <td class="font-weight-bold">{{ truck.truck }}</td>
                <td class="font-weight-bold">{{ truck.driver }}</td>
                <td class="font-weight-bold">{{ truck.status }}</td>
                <td class="font-weight-bold">{{ truck.location }}</td>
                <td
                  class="font-weight-bold"
                  @click="showdetail(truck.location)"
                >
                  <v-icon color="green darken-4"> mdi-map-marker </v-icon>
                </td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!--Table ends-->
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
import Opage from "../components/optrpage";
export default {
  name: "Tstats",
  components: {
    Opage,
  },
  data: () => {
    return {
      truckdriver: [],
    };
  },
  created: function () {
    //Api call to fetch status of all trucks
    getAPI
      .get("api/truck/truck-status-list/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        console.log(this.APIData);
        this.truckdriver = this.APIData;
        // this.APIData.Truckdetails.forEach((arr1, arr2) => {
        //   this.truckdriver.push({
        //     truck: arr1["truck"],
        //     driver: this.APIData.Driverdetails[arr2]["driver_name"],
        //     status: arr1["status"],
        //     location: arr1["location"],
        //   });
        // });
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  methods: {
    showdetail(location) {
      console.log(location);
      this.$session.set("cp", location);
      this.$router.push({ name: "Tracktruck" });
    },
  },
};
</script>
<style scoped>
#table2 {
  border: solid white;
  padding: 5px;
  margin: 1px;
  border-radius: 22px;
}
#form7 {
  border: solid white 1px;
  padding: 25px;
  border-radius: 15px;
  background-color: grey;
}
thead {
  background-color: #1a237e;
}
tbody {
  background-color: #9e9e9e;
}
</style>