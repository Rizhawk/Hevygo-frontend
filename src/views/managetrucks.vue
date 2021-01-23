<template>
  <v-app>
    <Opage />
    <v-container class="my-5">
      <v-layout row wrap justify-center class="mx-10">
        <v-flex xs12 md6>
          <v-card color="grey" width="800" raised>
            <v-card-title class="grey black--text">
              <span class="headline">Your Trucks</span>
              <v-spacer></v-spacer>

              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item router to="/editreg">
                    view/edit registration details
                  </v-list-item>
                  <v-list-item router to="/editdetails">
                    view/edit truck specifications details
                  </v-list-item>
                  <v-list-item @click.prevent="tdelete=!tdelete">
                    Delete a Truck
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>

            <v-simple-table fixed-header height="300px" dark>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Truck phonenumber</th>
                    <th class="text-left">Registration Number</th>
                    <th class="text-left">Verification</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="truck in trucks" :key="truck.truck_num">
                    <td>{{ truck.truck_num }}</td>
                    <td>{{ truck.registration }}</td>
                    <td>{{ truck.is_verified }}</td>
                    <td v-if="tdelete" @click="deleteTruck(truck.id)">&#10060;</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-flex>
      </v-layout>
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4"></div>
        <div class="col-4 my-8">
          <v-btn router to="/truckdetails" color="success"
            >Add trucks specifications</v-btn
          >
        </div>
      </div>
    </v-container>
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
import Opage from "../views/optrpage";
export default {
  name: "Tmanage",
  components: { Opage },
  data: () => {
    return {
      trucks: [],
      token: localStorage.getItem("user_token") || null,
      tdelete:false
    };
  },
  beforeMount: function () {
    getAPI
      .get("/api/truck/truck-list/", {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        console.log(this.APIData);
        for (let key in this.APIData) {
          this.trucks.push(this.APIData[key]);
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    //Delete Api call
    deleteTruck(id) {
      getAPI
        .delete("/api/truck/truck-delete/"+id+"/", {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          alert(this.APIData);
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
     },
  },

  // mounted:function(){
  //   getAPI
  //     .get("/api/truck/truck-detail/3/", {
  //       headers: {
  //         Authorization: `Token ${this.token}`,
  //       },
  //     })
  //     .then((response) => {
  //       this.APIData = response.data;
  //       console.log(this.APIData);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // }
};
</script>
