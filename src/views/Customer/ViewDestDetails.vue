<template>
  <v-app>
    <div class="wrapper">
      <Csidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Cnavbar title="Destination Details" />
        <Cmobnav />
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-8">
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
                    Destination
                  </h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent="back">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Start Location</label>
                          <input
                            v-model="sl"
                            type="text"
                            class="form-control"
                            disabled=""
                          />
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <label>End Location</label>
                          <input
                            v-model="el"
                            type="text"
                            class="form-control"
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Weight of Goods</label>
                          <input
                            v-model="wt"
                            type="text"
                            class="form-control"
                            :disabled="change"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label> Type of Goods</label>
                          <input
                            v-model="gt"
                            type="text"
                            class="form-control"
                            :disabled="change"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="types">Type of Vehicle</label>
                          <select
                            v-model="vt"
                            id="types"
                            class="form-control"
                            :disabled="change"
                          >
                            <option v-for="vt in types" :key="vt" :value="vt">
                              {{ vt }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Date of Transport</label>
                          <input
                            v-model="dt"
                            type="date"
                            class="form-control"
                            :disabled="change"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Booking Status</label>
                          <input
                            v-model="st"
                            type="text"
                            class="form-control"
                            disabled=""
                          />
                        </div>
                      </div>
                      <v-flex row class="my-2" justify-center>
                        <v-btn
                          v-if="stn == 1"
                          x-small
                          color="green"
                          depressed
                          to="/payment"
                          outlined
                          >Payment</v-btn
                        >
                        <v-btn
                          v-if="stn == 3"
                          x-small
                          color="green"
                          depressed
                          outlined
                          @click.prevent="show = true"
                          >Book Again</v-btn
                        >
                        <v-btn
                          v-if="stn == 4"
                          x-small
                          color="orange"
                          depressed
                          outlined
                          to="/payment"
                          >Try Again</v-btn
                        >
                        <v-btn
                          type="submit"
                          x-small
                          class="mx-2"
                          color="black"
                          depressed
                          outlined
                          >Back</v-btn
                        >
                        <v-btn
                          v-if="stn == 3"
                          x-small
                          @click.prevent="change = !change"
                          color="orange"
                          depressed
                          outlined
                          >Edit Details</v-btn
                        >
                      </v-flex>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-user">
                <div class="image"></div>
                <div class="card-body">
                  <div class="author">
                    <a href="#">
                      <h5
                        class="
                          card-title
                          font-weight-black
                          text-secondary
                          blue--text
                          subtitle-1
                        "
                      >
                        Transaction Details
                      </h5>
                    </a>
                    <p class="description caption font-weight-bold">
                      {{ this.st }}
                    </p>
                  </div>
                  <v-card>
                    <v-card-title
                      class="
                        font-weight-black
                        black-text
                        caption
                        text-secondary
                      "
                      >Truck</v-card-title
                    >
                    <v-card-subtitle>{{ truck }}</v-card-subtitle>

                    <v-card-title
                      class="
                        font-weight-black
                        black-text
                        caption
                        text-secondary
                      "
                      >Driver</v-card-title
                    >
                    <v-card-subtitle>{{ driver }}</v-card-subtitle>
                    <v-card-title
                      class="
                        font-weight-black
                        black-text
                        caption
                        text-secondary
                      "
                      >Contact Driver</v-card-title
                    >
                    <v-card-subtitle>{{ drphn }}</v-card-subtitle>
                    <v-card-title
                      class="
                        font-weight-black
                        black-text
                        caption
                        text-secondary
                      "
                      >Operator</v-card-title
                    >
                    <v-card-subtitle>{{ optr }}</v-card-subtitle>
                    <v-card-title
                      class="
                        font-weight-black
                        black-text
                        caption
                        text-secondary
                      "
                      >Contact Operator</v-card-title
                    >
                    <v-card-subtitle>{{ optrphn }}</v-card-subtitle>
                    <v-card-title
                      class="
                        font-weight-black
                        black-text
                        caption
                        text-secondary
                      "
                      >Cost</v-card-title
                    >
                    <v-card-subtitle>{{ cost }}</v-card-subtitle>
                  </v-card>
                </div>
                <hr />
                <div class="button-container">
                  <v-btn
                    v-if="track"
                    x-small
                    outlined
                    depressed
                    dark
                    @click.prevent="trackTruck"
                    color="green"
                    >Track this Shipment
                    <v-icon right x-small>mdi-map-marker</v-icon></v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog persistent v-model="show" max-width="365">
      <v-card>
        <v-card-title class="caption font-weight-bold black--text"
          >Are you sure want to book a new shipment with the current
          details?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ml-5"
            x-small
            @click.prevent="bookTruck"
            outlined
            color="green"
            >Book</v-btn
          >
          <v-btn color="red" x-small @click="show = !show" outlined
            >No</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Csidebar from "../../components/Customer/sidebar.vue";
import Cnavbar from "../../components/Customer/navbar.vue";
import Cmobnav from "../../components/Customer/navmob.vue";
export default {
  name: "Vdestdetail",
  components: {
    Csidebar,
    Cnavbar,
    Cmobnav,
  },
  data: () => {
    return {
      sl: "",
      el: "",
      wt: "",
      vt: "",
      gt: "",
      dt: "",
      st: "",
      stn: "",
      change: true,
      show: false,
      types: [
        "Tipper",
        "Lorry",
        "Pickup",
        "Tanker",
        "Tow truck",
        "Van",
        "Container Truck",
        "Car transporter",
      ],
      trid: "",
      track: false,
      //
      truck: "",
      driver: "",
      drphn: "",
      optr: "",
      optrphn: "",
      cost: "",
      //
    };
  },
  beforeMount: function () {
    getAPI
      .get(
        "/api/customers/cust-dest-detail/?id=" + localStorage.getItem("destid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        this.sl = this.APIData.data.start_location;
        this.el = this.APIData.data.end_location;
        this.wt = this.APIData.data.weight;
        this.vt = this.APIData.data.vehicle_type;
        this.gt = this.APIData.data.goods_type;
        this.dt = this.APIData.data.date;
        if (this.APIData.data.status == 1) {
          this.st = "Payment Pending";
          this.stn = 1;
        } else if (this.APIData.data.status == 2) {
          this.st = "In Progress";
          this.stn = 2;
        } else if (this.APIData.data.status == 3) {
          this.st = "Completed";
          this.stn = 3;
        } else if (this.APIData.data.status == 4) {
          this.st = "Not Found  (Unable to find a Driver)";
          this.stn = 4;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted: function () {
    getAPI
      .get(
        "api/customers/cust-trans-detail/?id=" + localStorage.getItem("destid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.Http_response == 200) {
          this.getStatus(this.APIData.data.truck);
          this.trid = this.APIData.data.truck;
          this.track = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    back() {
      localStorage.removeItem("destid");
      this.$router.push({ name: "Cbookings" });
    },
    bookTruck() {
      getAPI
        .post(
          "api/customers/cust-dest-create/",
          {
            start_location: this.sl,
            end_location: this.el,
            weight: this.wt,
            goods_type: this.gt,
            date: this.dt,
            vehicle_type: this.vt,
          },
          {
            headers: {
              Authorization: ` Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.$session.set("sl", this.sl);
          this.$session.set("el", this.el);
          this.$router.push({ name: "RouteMap" });
        })
        .catch((err) => {
          alert(err);
        });
    },
    getStatus(id) {
      getAPI
        .get("/api/truck/view_truck_status/?truck_id=" + id, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 200) {
            this.truck = this.APIData.data["truck"]["registration"];
            this.driver = this.APIData.data["driver"]["driver_name"];
            this.drphn = this.APIData.data["driver"]["phone"];
            this.optr = this.APIData.data["truck"]["owner"]["name"];
            this.optrphn = this.APIData.data["truck"]["owner"]["phone"];
            this.cost = 5000;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    trackTruck() {
      localStorage.setItem("trid", this.trid);
      this.$router.push({ name: "Ctrack" });
    },
  },
};
</script>
