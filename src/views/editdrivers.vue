<template>
  <v-app>
    <Opage />
    <v-layout class="my-10" justify-center>
      <v-snackbar
        rounded="xl"
        top
        color="red darken-4"
        v-model="snackbar"
        timeout="5000"
        ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
      >
      <v-flex xs12 sm8 md6 lg3></v-flex>
      <v-flex xs12 sm8 md6 lg6>
        <!--Drivers table-->
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="white--text text-left">Driver name</th>
                <th class="white--text text-left">Phone number</th>
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
                <td class="font-weight-bold">{{ driver.driver_name }}</td>
                <td class="font-weight-bold">{{ driver.phone }}</td>

                <td
                  class="font-weight-bold"
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
                <td></td>
                <v-dialog
                  :retain-focus="false"
                  v-model="dialog"
                  max-width="400px"
                  light
                >
                  <form id="form6">
                    <v-text-field
                      class="mx-8"
                      label="Driver Name"
                      clearable
                      dark
                      outlined
                      dense
                      rounded
                      v-model="dname"
                    >
                    </v-text-field>
                    <v-text-field
                      class="mx-8"
                      label="Phone number"
                      clearable
                      dark
                      rounded
                      dense
                      outlined
                      v-model="drphn"
                    >
                    </v-text-field>
                    <v-layout row wrap>
                      <v-flex lg2></v-flex>
                      <v-flex class="mx-10">
                        <v-btn
                          depressed
                          color="success"
                          small
                          @click.prevent="updatedr(drid)"
                          >Update</v-btn
                        >
                        <v-btn
                          class="mx-2"
                          depressed
                          color="red"
                          small
                          @click="dialog2 = true"
                          >Delete</v-btn
                        >
                        <v-dialog v-model="dialog2" max-width="350">
                          <v-card>
                            <v-card-text class="subtitle-1 black--text">
                              Are you sure want to delete this driver?
                            </v-card-text>
                            <v-spacer></v-spacer>
                            <v-btn
                              small
                              color="green darken-1"
                              text
                              @click="dialog2 = false"
                            >
                              Close
                            </v-btn>

                            <v-btn
                              small
                              color="red darken-1"
                              text
                              @click="deletenow"
                            >
                              Delete
                            </v-btn>
                          </v-card>
                        </v-dialog>
                      </v-flex>
                      <v-flex lg2></v-flex>
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
import Opage from "../components/optrpage";
export default {
  data: () => {
    return {
      driverdetails: [],
      dialog: false, //dialog box form for editing the driver details
      dialog2: false, //dialog box for confirmation for deletion of a driver
      dname: "",
      drphn: "",
      ownerid: "",
      drid: "",
      snackbar: false,
      message: "",
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
          Authorization: `Token ${this.$session.get("user_token")}`,
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
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.drid = id;
          this.dname = name;
          this.drphn = phone;
          this.ownerid = ownerid;
          this.dialog = true;
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
    //Api call for delete the selected driver
    deletedr(drid, dname) {
      getAPI
        .delete("api/operators/driver-delete/" + drid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.message = `Driver ${dname} is successfully deleted`;
          window.location.reload();
          this.snackbar = true;
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    //delete confirmation function call
    deletenow() {
      this.deletedr(this.drid, this.dname);
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
  border-radius: 15px;
  background-color: grey;
}
#table {
  border: solid white;
  padding: 5px;
  margin: 1px;
  border-radius: 22px;
}
thead {
  background-color: #1a237e;
}
tbody {
  background-color: #9e9e9e;
}
</style>