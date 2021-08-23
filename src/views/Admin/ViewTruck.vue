<template>
  <v-app>
    <div class="wrapper">
      <Admin />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <AdminNav title="Details of Truck" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-7">
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
                    {{ regno }}
                  </h5>
                  <v-flex row justify-end>
                    <v-btn
                      v-if="status == 2"
                      color=" green darken-1"
                      small
                      text
                      dark
                      >Approved
                      <v-icon small>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="status == 3"
                      color="red lighten-1"
                      small
                      text
                      dark
                      >Rejected
                      <v-icon small>mdi-close-circle-outline</v-icon>
                    </v-btn>
                  </v-flex>
                </div>
                <div class="card-body my-4">
                  <form>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Registration Number</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="regno"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Homelocation</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="homeloc"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Phonenumber</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="phone"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            placeholder="Name of Truck"
                            class="form-control"
                            disabled=""
                            :value="name"
                          />
                        </div>
                      </div>
                    </div>
                    <label>Uploads</label>
                    <div class="form-control">
                      <div class="row">
                        <div class="col-md-4">
                          <v-chip v-model="rclink" @click="select(rc)">
                            <span>Rc Book</span>&nbsp;
                          </v-chip>
                        </div>
                        <div class="col-md-4">
                          <v-chip v-model="fitlink" @click="select(rc)">
                            <span>Fitness</span>&nbsp;
                          </v-chip>
                        </div>
                        <div class="col-md-4">
                          <v-chip v-model="inslink" @click="select(rc)">
                            <span>Insurance</span>&nbsp;
                          </v-chip>
                        </div>
                      </div>
                    </div>
                    <label>Dates of Validity</label>
                    <div class="form-control">
                      <div class="row">
                        <div class="col-md-4">
                          <label>RC Book</label>
                          <input
                            v-model="rcdate"
                            type="date"
                            class="form-control"
                          />
                        </div>
                        <div class="col-md-4">
                          <label>Fintness</label>
                          <input
                            v-model="fitdate"
                            type="date"
                            class="form-control"
                          />
                        </div>
                        <div class="col-md-4">
                          <label>Insurance</label>
                          <input
                            v-model="insdate"
                            type="date"
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row my-2">
                      <div class="col-md-6">
                        <div class="form-group">
                          <v-expansion-panels>
                            <v-expansion-panel>
                              <v-expansion-panel-header
                                color="grey lighten-2"
                                expand-icon="mdi-menu-down"
                                class="font-weight-bold caption text-secondary"
                              >
                                Details of Owner
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <div class="row">
                                  <div class="col-md-12">
                                    <label>Owner's Name</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled=""
                                      :value="optrname"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <label>Owner's Phonenumber</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled=""
                                      :value="optrphone"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <label>Owner's Email Id</label>
                                    <input
                                      type="text"
                                      placeholder="Email Id"
                                      class="form-control"
                                      disabled=""
                                      :value="optremail"
                                    />
                                  </div>
                                </div>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <v-expansion-panels>
                            <v-expansion-panel>
                              <v-expansion-panel-header
                                color="grey lighten-2"
                                expand-icon="mdi-menu-down"
                                class="font-weight-bold caption text-secondary"
                              >
                                Specifications of Truck
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <div class="row">
                                  <div class="col-md-12">
                                    <label>Manufacturer</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled=""
                                      :value="manf"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <label>Vechicle Type</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled=""
                                      :value="type"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <label>Vechicle Model</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled=""
                                      :value="model"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <label>Capcity of Vechicle</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled=""
                                      :value="capacity"
                                    />
                                  </div>
                                </div>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </div>
                      </div>
                      <v-flex row class="my-2" justify-center>
                        <v-btn
                          v-if="status == 1 || status == 3"
                          color=" green darken-1"
                          @click.prevent="show2 = !show2"
                          x-small
                          outlined
                          dark
                          >Approve
                        </v-btn>
                        <v-btn
                          v-if="status == 2"
                          color="red lighten-1"
                          x-small
                          outlined
                          dark
                          >Suspend
                        </v-btn>
                        <v-btn
                          class="mx-2"
                          color="black"
                          x-small
                          @click.prevent="back"
                          outlined
                          dark
                          >Back
                        </v-btn>
                        <v-btn
                          v-if="status == 1"
                          color="red lighten-1"
                          x-small
                          outlined
                          dark
                          @click.prevent="show1 = !show1"
                          >Reject
                        </v-btn>
                      </v-flex>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="show1" persistent max-width="300px" max-height="auto">
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
    <v-dialog persistent v-model="show2" max-width="320">
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
          <v-btn x-small @click="show2 = !show2" color="red" outlined
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
  name: "ViewTruck",
  components: {
    Admin,
    AdminNav,
    MobNav,
  },
  data: () => {
    return {
      show1: false,
      show2: false,
      //Truck details
      name: null,
      phone: "",
      regno: "",
      homeloc: "",
      status: null,
      rclink: "",
      fitlink: "",
      inslink: "",
      rcdate: "",
      fitdate: "",
      insdate: "",
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
      .get(
        "/api/operators/view_truck_details/?id=" + localStorage.getItem("trid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        console.log(this.APIData);
        this.name = this.APIData.data["truck"]["truck"]["name"];
        this.phone = this.APIData.data["truck"]["truck"]["phone"];
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
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
          console.log(this.APIData);
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
    select(link) {
      window.open(link);
    },
    back() {
      localStorage.removeItem("optrid");
      this.$router.push({ name: "VerifyTruck" });
    },
  },
};
</script>