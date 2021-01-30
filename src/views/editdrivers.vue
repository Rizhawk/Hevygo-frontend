<template>
  <v-app>
    <Opage />
    <v-layout class="my-10" justify-center>
      <v-flex xs12 sm8 md6 lg6>
        <!--Drivers table-->
        <v-simple-table id="table" fixed-header dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Driver name</th>
                <th>Phone number</th>
                <th></th>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item router to="/driveradd">
                      Add a new Driver
                    </v-list-item>
                  </v-list>
                </v-menu>
              </tr>
            </thead>
            <tbody>
              <tr v-for="driver in driverdetails" :key="driver.id">
                <td>{{ driver.driver_name }}</td>
                <td>{{ driver.phone }}</td>
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
                      @click="
                        getaDriver(
                          driver.id,
                          driver.driver_name,
                          driver.phone,
                          driver.operator_name
                        )
                      "
                    >
                      Edit/Delete
                    </td>
                  </template>
                  <form id="form6">
                    <v-text-field
                      class="mx-8"
                      placeholder="Driver Name"
                      clearable
                      solo
                      dense
                      rounded
                      v-model="dname"
                    >
                    </v-text-field>
                    <v-text-field
                      class="mx-8"
                      placeholder="Phone number"
                      clearable
                      rounded
                      dense
                      solo
                      v-model="drphn"
                    >
                    </v-text-field>
                     <v-layout class="my-1" row wrap>
                    <v-flex class="mx-15">
                      <v-btn
                        rounded
                        color="success"
                        small
                        @click.prevent="updatedr(drid)"
                        >Update</v-btn
                      >
                      <v-btn
                        class="mx-1"
                        rounded
                        color="red"
                        small
                        @click="dialog2 = true"
                        >Delete</v-btn
                      >
                      <v-dialog v-model="dialog2" max-width="300">
                        <v-card>
                          <v-card-title>
                            Are you sure want to delete this driver?
                          </v-card-title>
                          <v-card-actions>
                            <v-btn
                              color="green darken-1"
                              text
                              @click="dialog2 = false"
                            >
                              Close
                            </v-btn>

                            <v-btn color="red darken-1" text @click="deletenow">
                              Delete
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <v-btn small rounded @click="dialog = !dialog"
                        >close</v-btn
                      ></v-flex
                    >
                     </v-layout>
                  </form>
                </v-dialog>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!--Drivers table ends-->
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
      dialog: false,//dialog box form for editing the driver details
      dialog2: false,//dialog box for confirmation for deletion of a driver
      dname: "",
      drphn: "",
      ownerid: "",
      drid: "",
    };
  },
  name: "Editdrivers",
  components: {
    Opage,
  },
  beforeMount: function () {
    //Api call for fetching the data into table
    getAPI
      .get("/api/operators/driver-list/", {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData) {
          this.driverdetails.push(this.APIData[key]);
        }
      })
      .catch((err) => {
        alert(err);
      });
      //
  },
  methods: {
    //Api call to get specific driver details
    getaDriver(id, name, phone, ownerid) {
      getAPI
        .get("api/operators/driver-detail/" + id + "/", {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.drid = id;
          this.dname = name;
          this.drphn = phone;
          this.ownerid = ownerid;
          console.log(this.adriver);
        })
        .catch((err) => {
          alert(err);
        });
        //
    },
     //Api call for updating driver details
    updatedr(drid) {
      getAPI
        .post(
          "api/operators/driver-update/" + drid + "/",
          {
            driver_name: this.dname,
            phone: this.drphn,
            operator_name: this.ownerid,
          },
          {
            headers: {
              Authorization: `Token ${this.token}`,
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
    //Api call for delete the selected driver
    deletedr(drid) {
      getAPI
        .delete("api/operators/driver-delete/" + drid + "/", {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
        //
    },
    //delete confirmation function call
    deletenow() {
      this.deletedr(this.drid);
      this.dialog2 = false;
    },
    //
  },
};
</script>
<style scoped>
#form6 {
  border: solid white 1px;
  padding: 25px;
  border-radius: 30px;
  background-color: grey;
}
#table {
  border: solid white;
  padding: 5px;
  margin: 1px;
  border-radius: 22px;
}
</style>