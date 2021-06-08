<template>
  <v-app>
    <Admin />
    <v-layout row wrap class="my-10">
      <v-flex xs1 sm2 md2 lg3></v-flex>
      <v-flex xs10 sm8 md6 lg8>
        <v-simple-table>
          <thead>
            <tr>
              <th>Registration Number</th>
              <th>Homelocation</th>
              <th>Phonenumber</th>
              <th>Verified</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="truck in truckdetails"
              :key="truck.truck.id"
              @click.prevent="getTruckdetails(truck.truck.id)"
            >
              <v-dialog
                max-width="350px"
                max-height="auto"
                v-model="show"
                overlay-opacity=".3"
              >
                <v-card color="#263238" dark max-width="350px">
                  <v-card-title class="font-weight-black body-1"
                    >Registration Number</v-card-title
                  >
                  <v-card-subtitle>{{ regno }}</v-card-subtitle>
                  <v-card-title class="font-weight-black body-1"
                    >Homelocation</v-card-title
                  >
                  <v-card-subtitle>{{ homeloc }}</v-card-subtitle>
                  <v-card-title class="font-weight-black body-1"
                    >Phonenumber</v-card-title
                  >
                  <v-card-subtitle>{{ phone }}</v-card-subtitle>
                  <v-card-title
                    v-if="name != null"
                    class="font-weight-black body-1"
                    >Name</v-card-title
                  >
                  <v-card-subtitle v-if="name != null"
                    >{{ name }}
                  </v-card-subtitle>
                  <v-card-title class="font-weight-black body-1"
                    >Owner's Name</v-card-title
                  >
                  <v-card-subtitle>{{ optrname }}</v-card-subtitle>
                  <v-card-title class="font-weight-black body-1"
                    >Owner's Phonenumber</v-card-title
                  >
                  <v-card-subtitle>{{ optrphone }}</v-card-subtitle>
                  <v-card-title
                    v-if="optremail != null"
                    class="font-weight-black body-1"
                    >Owner's Email Id
                  </v-card-title>
                  <v-card-subtitle v-if="optremail != null">{{
                    optremail
                  }}</v-card-subtitle>
                  <v-expansion-panels accordion>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        color="#263238"
                        class="font-weight-black caption"
                        >Specifiction of Vechicle</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <v-card-title class="font-weight-black body-2"
                          >Manufacturer</v-card-title
                        >
                        <v-card-subtitle>{{ manf }}</v-card-subtitle>
                        <v-card-title class="font-weight-black body-2"
                          >Vechicle Type</v-card-title
                        >
                        <v-card-subtitle>{{ type }}</v-card-subtitle>
                        <v-card-title class="font-weight-black body-2"
                          >Vechicle Model</v-card-title
                        >
                        <v-card-subtitle>{{ model }}</v-card-subtitle>
                        <v-card-title class="font-weight-black body-2"
                          >Capcity of Vechicle</v-card-title
                        >
                        <v-card-subtitle>{{ capacity }}</v-card-subtitle>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-if="truck.truck['is_verified'] == true"
                      color=" green darken-1"
                      x-small
                      outlined
                      disabled
                      dark
                      >Approved
                      <v-icon small>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="truck.truck['is_verified'] == false"
                      color=" green darken-1"
                      @click.prevent="giveApproval(truck.truck.id)"
                      x-small
                      outlined
                      dark
                      >Approve
                    </v-btn>
                    <v-btn
                      class="mx-3"
                      color="red lighten-1"
                      :disabled="truck.truck['is_verified'] == true"
                      x-small
                      outlined
                      dark
                      >Reject
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <td>{{ truck.registration }}</td>
              <td>{{ truck.homelocation }}</td>
              <td>{{ truck.truck["phone"] }}</td>
              <td>
                <v-icon
                  color="green darken-1"
                  small
                  v-if="truck.truck['is_verified'] == true"
                  >mdi-checkbox-marked-circle-outline</v-icon
                >
                <v-icon
                  color="red"
                  small
                  v-if="truck.truck['is_verified'] == false"
                  >mdi-close-circle-outline</v-icon
                >
              </td>
              <td>
                <v-btn color="red" outlined x-small>Suspend</v-btn>
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
  name: "ATreg",
  components: {
    Admin,
  },
  data: () => {
    return {
      truckdetails: [],
      moredetails: [],
      show: false,
      show2: false,
      //Truck details
      name: null,
      phone: "",
      regno: "",
      homeloc: "",
      //Operator details
      optrname: "",
      optrphone: "",
      optremail: null,
      //Truck specs
      manf: "",
      type: "",
      model: "",
      capacity: "",
    };
  },
  beforeCreate: function () {
    getAPI
      .get("/api/admin/list_vehicle/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.truckdetails = this.APIData.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getTruckdetails(id) {
      getAPI
        .get("/api/operators/view_truck/?id=" + id, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.moredetails = this.APIData.data["truck"];
          this.name = this.moredetails.truck["name"];
          this.phone = this.moredetails.truck["phone"];
          this.regno = this.APIData.data["truck"]["registration"];
          this.homeloc = this.APIData.data["truck"]["homelocation"];
          this.optrname = this.APIData.data["truck"]["user"]["name"];
          this.optrphone = this.APIData.data["truck"]["user"]["phone"];
          this.optremail = this.APIData.data["truck"]["user"]["email"];
          this.manf = this.APIData.data["manufacturer"];
          this.type = this.APIData.data["type"];
          this.model = this.APIData.data["model"];
          this.capacity = this.APIData.data["capacity"];
          this.show = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    giveApproval(id) {
      getAPI
        .put(
          "/api/admin/update_truck_info/",
          {
            id: id,
            remarks: "Verified",
            status: 2,
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
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
thead {
  background-color: #e64a19;
  text-align: right;
}
tbody {
  background-color: #263238;

  color: whitesmoke;
}
tr:hover {
  background-color: #37474f !important;
}
</style>