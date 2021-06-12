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
              :key="truck.id"
              @click.prevent="getTruckdetails(truck.id)"
            >
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
                <v-btn
                  :disabled="truck.truck['is_verified'] == false"
                  class="mx-1"
                  color="red lighten-1"
                  x-small
                  outlined
                  dark
                  >Suspend</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
      <v-dialog
        max-width="350px"
        max-height="auto"
        persistent
        v-model="show"
        overlay-opacity=".3"
      >
        <v-card color="#263238" dark max-width="350px">
          <v-card-title class="font-weight-black body-1"
            >Registration Number
            <v-spacer></v-spacer>
            <v-icon @click="show = false" color="red" class="ml-5" small
              >mdi-close-circle-outline</v-icon
            >
          </v-card-title>
          <v-card-subtitle>{{ regno }}</v-card-subtitle>
          <v-card-title class="font-weight-black body-1"
            >Homelocation</v-card-title
          >
          <v-card-subtitle>{{ homeloc }}</v-card-subtitle>
          <v-card-title class="font-weight-black body-1"
            >Phonenumber</v-card-title
          >
          <v-card-subtitle>{{ phone }}</v-card-subtitle>
          <v-card-title v-if="name != null" class="font-weight-black body-1"
            >Name</v-card-title
          >
          <v-card-subtitle v-if="name != null">{{ name }} </v-card-subtitle>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header
                color="#d84315"
                small
                class="font-weight-black caption"
                >Details of Owner</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-card-title class="font-weight-black body-2"
                  >Owner's Name</v-card-title
                >
                <v-card-subtitle>{{ optrname }}</v-card-subtitle>
                <v-card-title class="font-weight-black body-2"
                  >Owner's Phonenumber</v-card-title
                >
                <v-card-subtitle>{{ optrphone }}</v-card-subtitle>
                <v-card-title
                  v-if="optremail != null"
                  class="font-weight-black body-2"
                  >Owner's Email Id
                </v-card-title>
                <v-card-subtitle v-if="optremail != null">{{
                  optremail
                }}</v-card-subtitle>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels accordion>
            <v-expansion-panel>
              <v-expansion-panel-header
                color="#d84315"
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
              v-if="status == 2"
              color=" green darken-1"
              x-small
              outlined
              dark
              >Approved
              <v-icon small>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="status == 1 || status == 3"
              color=" green darken-1"
              @click.prevent="show3 = !show3"
              x-small
              outlined
              dark
              >Approve
            </v-btn>
            <v-btn
              v-if="status == 1"
              class="mx-3"
              color="red lighten-1"
              x-small
              outlined
              dark
              @click.prevent="show1 = !show1"
              >Reject
            </v-btn>
            <v-btn
              v-if="status == 3"
              color="red lighten-1"
              x-small
              outlined
              dark
              >Rejected
              <v-icon small>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="show1"
        hide-overlay
        persistent
        max-width="300px"
        max-height="auto"
      >
        <v-card max-width="300px" max-height="auto">
          <v-card-title class="font-weight-black body-2"
            >Remarks :<span class="font-weight-medium caption ml-3"
              >(What is the reason?)</span
            ></v-card-title
          >
          <v-textarea v-model="remarks" autofocus maxlength="120"></v-textarea>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn x-small color="red" dark outlined>Confirm Rejection </v-btn>
            <v-btn
              x-small
              color="black"
              dark
              outlined
              @click.prevent="show1 = !show1"
              >Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog persistent v-model="show3" max-width="320">
        <v-card>
          <v-card-title class="caption font-weight-bold black--text"
            >Verified all the details and confirm approval.</v-card-title
          >

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="ml-5"
              x-small
              @click.prevent="giveApproval"
              outlined
              color="green"
              >Approve</v-btn
            >
            <v-btn x-small @click="show3 = !show3" color="red" outlined
              >No</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-dialog>
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
      show: false,
      show2: false,
      show3: false,
      //Truck details
      name: null,
      phone: "",
      regno: "",
      homeloc: "",
      status: null,
      //Operator details
      optrname: "",
      optrphone: "",
      optremail: null,
      //Truck specs
      manf: "",
      type: "",
      model: "",
      capacity: "",
      //
      show1: false,
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
        .get("/api/operators/view_truck_details/?id=" + id, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.name = this.APIData.data["truck"]["truck"]["name"];
          this.phone = this.APIData.data["truck"]["truck"]["name"];
          this.status = this.APIData.data["truck"]["verification"];
          this.regno = this.APIData.data["truck"]["registration"];
          this.homeloc = this.APIData.data["truck"]["homelocation"];
          this.optrname = this.APIData.data["truck"]["owner"]["name"];
          this.optrphone = this.APIData.data["truck"]["owner"]["phone"];
          this.optremail = this.APIData.data["truck"]["owner"]["email"];
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