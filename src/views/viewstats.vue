<template>
  <v-app>
    <Opage />
    <v-layout row wrap class="my-15">
      <v-flex lg3></v-flex>
      <v-flex xs12 sm8 md6 lg6>
        <!--Table showing status details-->
        <v-simple-table id="table2" fixed-header dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Location</th>
                <th>Status</th>
                <th></th>
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
              <tr v-for="truck in truckstats" :key="truck.truck">
                <td>{{ truck.location }}</td>
                <td>{{ truck.status }}</td>
                <v-dialog
                  :retain-focus="false"
                  v-model="dialog"
                  persistent
                  max-width="400px"
                  light
                >
                  <template v-slot:activator="{ on, attrs }">
                    <td
                      v-bind="attrs"
                      v-on="on"
                      @click="showdetail(truck.truck, truck.driver)"
                    >
                      View more/Edit
                    </td>
                  </template>
                  <form id="form7">
                    <v-select
                      placeholder="Truck"
                      :items="trucks"
                      clearable
                      filled
                      solo
                      dense
                      rounded
                      v-model="treg"
                    >
                    </v-select>
                    <v-select
                      placeholder="Driver"
                      :items="drivers"
                      clearable
                      filled
                      solo
                      dense
                      rounded
                      v-model="drname"
                    >
                    </v-select>
                    <v-select
                      placeholder="Status"
                      :items="stats"
                      filled
                      solo
                      dense
                      rounded
                      v-model="stat"
                    >
                    </v-select>
                    <v-text-field
                      placeholder="Location"
                      clearable
                      filled
                      solo
                      dense
                      rounded
                      v-model="loc"
                    >
                    </v-text-field>
                    <v-layout row wrap>
                      <v-flex class="mx-15">
                        <v-btn
                          color="success"
                          rounded
                          small
                          @click.prevent="updateStats(trid)"
                          >Update</v-btn
                        >
                        <v-btn
                          color="red"
                          class="mx-1"
                          rounded
                          small
                          @click="dialog2=true"
                          >Delete</v-btn
                        >
                        <v-dialog  v-model="dialog2" max-width="300">
                          <v-card>
                            <v-card-title>
                              Are you sure want to delete this status?
                            </v-card-title>
                            <v-card-actions>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="dialog2 = false"
                              >
                                Close
                              </v-btn>

                              <v-btn
                                color="red darken-1"
                                text
                                @click="deletenow"
                              >
                                Delete
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-btn rounded small @click="dialog = false"
                          >Close</v-btn
                        ></v-flex
                      ></v-layout
                    >
                  </form>
                </v-dialog>
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
import Opage from "../views/optrpage";
export default {
  name: "Tstats",
  components: {
    Opage,
  },
  data: () => {
    return {
      truckstats: [],
      drivers: [],
      trucks: [],
      dialog: false,
      dialog2:false,//dialog box for delete confirmation
      trid: "",
      drid: "",
      treg: "",
      drname: "",
      stat: "",
      loc: "",
      stats: [
        "Available",
        "on the way",
        "Loading",
        "In transist",
        "Unavailable",
      ],
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
        for (let key in this.APIData) {
          this.truckstats.push(this.APIData[key]);
        }
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  beforeMount: function () {
    //Api call for fetch the reg number of all trucks
    getAPI
      .get("api/truck/truck-list/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData) {
          this.trucks.push(this.APIData[key]["registration"]);
        }
        this.truckdata = this.APIData;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  mounted: function () {
    //Api call for fetch the names of all drivers
    getAPI
      .get("api/operators/driver-list/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData) {
          this.drivers.push(this.APIData[key]["driver_name"]);
        }
        this.driverdata = this.APIData;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  methods: {
    showdetail(trid, drid) {
      (this.trid = trid), (this.drid = drid);
      this.getTruck(trid);
      this.getDriver(drid);
      this.getaStat();
    },
    getTruck(trid) {
      getAPI
        //Api call to get the truck reg number with truck id
        .get("api/truck/truck-detail/" + trid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.treg = this.APIData["registration"];
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    getDriver(drid) {
      //Api call to get the driver name with driver id
      getAPI
        .get("api/operators/driver-detail/" + drid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.drname = this.APIData["driver_name"];
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    getaStat() {
      //Api call to fetch status of a particular truck based on their id
      getAPI
        .get("api/truck/truck-status-detail/" + this.trid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.stat = this.APIData["status"];
          this.loc = this.APIData["location"];
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    updateStats(trid) {
      //Api call to update a truck status
      getAPI
        .post(
          "api/truck/truck-status-update/" + trid + "/",
          {
            truck: trid,
            driver: this.drid,
            status: this.stat,
            location: this.loc,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
        //
    },
    deletenow(){//Call when user wants to delete the currently selected status
        this.dialog2=false,
        this.deleteStat(this.trid);
    },
    deleteStat(trid) {
        //Api call to delete a truck status
      getAPI
        .delete("api/truck/truck-status-delete/" + trid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          console.log(this.APIData);
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
        //
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
  border-radius: 30px;
  background-color: grey;
}
</style>