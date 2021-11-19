<template>
  <v-app>
    <div class="wrapper">
      <Admin />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <AdminNav :title="truck" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
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
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          x-small
                          :color="active"
                          left
                          >mdi-circle</v-icon
                        > </template
                      ><span>{{ message }}</span></v-tooltip
                    >
                    {{ this.truck }}
                    <v-flex row justify-end>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="green darken-4"
                            x-small
                            depressed
                            @click.prevent="viewImage(image)"
                            dark
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            >View Image
                            <v-icon small to="#" right color="green darken-4"
                              >mdi-file-image</v-icon
                            >
                          </v-btn>
                        </template>
                        <span>View the Image of the Incident</span>
                      </v-tooltip>
                    </v-flex>
                  </h5>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Operator</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="optr"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Phonenumber</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="optrphn"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Incident</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="incident"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Last Location</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="lastloc"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Reporting time</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="reptime"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Update time</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="uptime"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
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
                          <label>Phonenumber</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="dphone"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
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
                              <div class="form-group my-1">
                                <div class="row">
                                  <div class="col-md-12">
                                    <label>Start Location</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled=""
                                      :value="start"
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
                                      :value="end"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-12">
                                    <label>Date of Pick Up</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled=""
                                      :value="dop"
                                    />
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-md-6">
                                    <label>Customer</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled=""
                                      :value="cus"
                                    />
                                  </div>
                                  <div class="col-md-6">
                                    <label>Phonenumber</label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      disabled=""
                                      :value="phn"
                                    />
                                  </div>
                                </div>
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="text-center">
                          <v-btn
                            x-small
                            color="black"
                            @click.prevent="back"
                            depressed
                            outlined
                            >Back</v-btn
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Admin from "./AdminsSidebar.vue";
import AdminNav from "../Admin/AdminNavbar.vue";
import MobNav from "../Admin/MobNav.vue";
export default {
  name: "MoreDetails",
  components: {
    Admin,
    AdminNav,
    MobNav,
  },
  data: () => {
    return {
      oid: "",
      optr: "",
      optrphn: "",
      truck: "",
      incident: "",
      image: "",
      lastloc: "",
      reptime: "",
      uptime: "",
      driver: "",
      dphone: "",
      //
      start: "",
      end: "",
      dop: "",
      cus: "",
      phn: "",
      active: "",
      message: "",
    };
  },
  beforeCreate: function() {
    getAPI
      .get(
        "/api/operators/detail_incident/?incident_id=" +
          localStorage.getItem("inc_id"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        this.optr = this.APIData.data.truck.truck.owner.name;
        this.optrphn = this.APIData.data.truck.truck.owner.phone;
        this.oid = this.APIData.data.truck.truck.owner.id;
        this.truck = this.APIData.data.truck.truck.registration;
        this.incident = this.APIData.data.incident;
        this.image = this.APIData.data.incident_image;
        if (this.APIData.data.is_active == true) {
          this.active = "green";
          this.message = "Active Incident";
        } else {
          this.active = "red";
          this.message = "In-active Incident";
        }
        this.getAddress(this.APIData.data.truck.location);
        this.reptime = this.APIData.data.report_time;
        this.uptime = this.APIData.data.update_time;
        this.driver = this.APIData.data.truck.driver.driver_name;
        this.dphone = this.APIData.data.truck.driver.phone;
        //
        this.start = this.APIData.data.destination.start_address;
        this.end = this.APIData.data.destination.end_address;
        this.dop = this.APIData.data.destination.date;
        this.cus = this.APIData.data.destination.customer.name;
        this.phn = this.APIData.data.destination.customer.phone;
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    getAddress(loc) {
      const H = window.H;
      var platform = new H.service.Platform({
        apikey: "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E",
      });
      var service = platform.getSearchService();
      service.reverseGeocode(
        {
          at: loc,
        },
        (result) => {
          // Add a marker for each location found
          result.items.forEach((item) => {
            this.lastloc = item.address.label;
          });
        }
      );
    },
    viewImage(link) {
      if (link != null) {
        window.open(link);
      } else {
        alert("Image is not available for this incident.");
      }
    },
    back() {
      this.$router.push({ name: "IncidentsByOptr" });
    },
  },
};
</script>
