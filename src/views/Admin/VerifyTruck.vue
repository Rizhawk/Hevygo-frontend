<template>
  <v-app>
    <div class="wrapper">
      <Admin />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <AdminNav title="Trucks Verifcation" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
              <div class="card">
                <div class="card-header">
                  <h5
                    class="
                      card-title
                      font-weight-black
                      text-secondary
                      subtitle-1
                    "
                  >
                    Trucks
                  </h5>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead
                        class="
                          text-primary
                          font-weight-medium
                          caption
                          text-center
                        "
                      >
                        <th class="text-center">Registration Number</th>
                        <th class="text-center">Homelocation</th>
                        <th class="text-center">Phonenumber</th>
                        <th class="text-center">Verification</th>
                        <th class="text-center">Action</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          v-for="truck in truckdetails"
                          :key="truck.id"
                          @click.prevent="getTruckdetails(truck.id)"
                        >
                          <td class="text-center">{{ truck.registration }}</td>
                          <td class="text-center">{{ truck.homelocation }}</td>
                          <td class="text-center">
                            {{ truck.truck["phone"] }}
                          </td>
                          <td class="text-center">
                            <v-icon
                              class="mx-5"
                              color="black"
                              small
                              v-if="truck.verification == 1"
                              >mdi-clock</v-icon
                            >
                            <v-icon
                              color="green darken-1"
                              small
                              class="mx-5"
                              v-if="truck.verification == 2"
                              >mdi-checkbox-marked-circle-outline</v-icon
                            >
                            <v-icon
                              color="red"
                              class="mx-5"
                              small
                              v-if="truck.verification == 3"
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
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
            >mdi-close</v-icon
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
          <v-btn v-if="status == 3" color="red lighten-1" x-small outlined dark
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
          <v-btn x-small color="red" dark @click.prevent="reject" outlined
            >Confirm Rejection
          </v-btn>
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
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Admin from "./AdminsSidebar.vue";
import AdminNav from "../Admin/AdminNavbar.vue";
import MobNav from "../Admin/MobNav.vue";
export default {
  name: "VerifyTruck",
  components: {
    Admin,
    AdminNav,
    MobNav,
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
      remarks: "",
      trid: "",
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
          this.trid = this.APIData.data["truck"]["id"];
          console.log(this.trid);
          this.show = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    giveApproval() {
      getAPI
        .put(
          "/api/admin/vehicle_approval",
          {
            truck_id: this.trid,
            remarks: "Verified",
            verification: 2,
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
    reject() {
      getAPI
        .put(
          "/api/admin/vehicle_approval",
          {
            truck_id: this.trid,
            remarks: this.remarks,
            verification: 3,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.response == 400) {
            this.message = this.APIData.message;
            this.snackbar = true;
          } else if (this.APIData.response == 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>