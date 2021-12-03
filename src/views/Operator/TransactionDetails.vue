<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar :title="date" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <v-flex row justify-start class="my-5">
                    <v-btn
                      v-if="isSettled == true"
                      color=" green darken-1"
                      small
                      text
                      dark
                      >Settled
                      <v-icon small>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="isSettled == false"
                      color="red lighten-1"
                      small
                      text
                      dark
                      >Not Settled
                      <v-icon small>mdi-close-circle-outline</v-icon>
                    </v-btn>
                  </v-flex>
                </div>
                <div class="card-body my-4">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Date</label>
                        <input
                          type="text"
                          class="form-control"
                          disabled=""
                          :value="date"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Cost</label>
                        <input
                          type="text"
                          class="form-control"
                          disabled=""
                          :value="cost"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              color="grey lighten-2"
                              expand-icon="mdi-menu-down"
                              class="font-weight-bold caption text-secondary"
                            >
                              Shipment Details
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <div class="row my-3">
                                <div class="col-md-12">
                                  <label>Start Location</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled=""
                                    :value="sloc"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12">
                                  <label>End Location</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled=""
                                    :value="eloc"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6">
                                  <label>Date of Shipment</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled=""
                                    :value="dos"
                                  />
                                </div>
                                <div class="col-md-6">
                                  <label>Contact Customer</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled=""
                                    :value="custphn"
                                  />
                                </div>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              color="grey lighten-2"
                              expand-icon="mdi-menu-down"
                              class="font-weight-bold caption text-secondary"
                            >
                              Truck Details
                            </v-expansion-panel-header>

                            <v-expansion-panel-content>
                              <div class="row my-3">
                                <div class="col-md-12">
                                  <label>Register Number</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled=""
                                    :value="regNo"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-12">
                                  <label>Home Location</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled=""
                                    :value="hloc"
                                  />
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-md-6">
                                  <label>Driver</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled=""
                                    :value="driver"
                                  />
                                </div>
                                <div class="col-md-6">
                                  <label>Contact Driver</label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    disabled=""
                                    :value="drphn"
                                  />
                                </div>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </div>
                  </div>
                  <v-flex row class="my-2" justify-center>
                    <v-btn x-small outlined @click.prevent="back">Back</v-btn>
                  </v-flex>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dfooter />
      </div>
    </div>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Dsidebar from "../../components/Operator/dashsidebar.vue";
import Dfooter from "../../components/dashfooter.vue";
import Onavbar from "../../components/Operator/OptrNav.vue";
import MobNav from "../../components/Operator/MobNav.vue";
export default {
  name: "TranDetailOptr",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      isSettled: null,
      //
      date: "",
      cost: "",
      //
      sloc: "",
      eloc: "",
      dos: "",
      custphn: "",
      //
      regNo: "",
      hloc: "",
      driver: "",
      drphn: "",
    };
  },
  beforeCreate: function() {
    getAPI
      .get("/api/operators/trans-detail/?id=" + localStorage.getItem("Trid"), {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.isSettled = this.APIData.data.is_settled;
        //
        this.optr = this.APIData.data.operator.name;
        this.cust = this.APIData.data.destination.customer.name;
        this.date = this.APIData.data.time;
        this.cost = this.APIData.data.cost;
        //
        this.sloc = this.APIData.data.destination.start_address;
        this.eloc = this.APIData.data.destination.end_address;
        this.dos = this.APIData.data.destination.date;
        this.custphn = this.APIData.data.destination.customer.phone;
        //
        this.regNo = this.APIData.data.truck.truck.registration;
        this.hloc = this.APIData.data.truck.truck.address;
        this.driver = this.APIData.data.truck.driver.driver_name;
        this.drphn = this.APIData.data.truck.driver.phone;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    back() {
      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>
