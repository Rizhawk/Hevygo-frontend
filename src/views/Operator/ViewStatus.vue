<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Current Status of Truck" />
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
                    {{ this.truck }}
                    <v-flex row justify-end>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="green darken-4"
                            x-small
                            fab
                            depressed
                            href="/map"
                            dark
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon small to="/map" color="green darken-4"
                              >mdi-map-marker</v-icon
                            >
                          </v-btn>
                        </template>
                        <span>Locate on Map</span>
                      </v-tooltip>
                    </v-flex>
                  </h5>
                  <div class="card-body">
                    <form @submit.prevent="updateStatus">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Truck</label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                              :value="truck"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Driver</label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                              :value="driver"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Driver's Phone </label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                              :value="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Current Location</label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                              :value="cloc"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Availablity</label>
                            <v-combobox
                              class="status"
                              v-model="status"
                              :items="stats"
                              rounded
                              :disabled="show"
                              outlined
                              dense
                            >
                            </v-combobox>
                          </div>
                        </div>
                        <v-flex row class="my-2 mx-4" justify-center
                          ><v-btn
                            type="submit"
                            x-small
                            color="green darken-4"
                            :disabled="show"
                            depressed
                            outlined
                            >Update</v-btn
                          >
                          <v-btn
                            class="mx-2"
                            x-small
                            color="black"
                            depressed
                            outlined
                            @click.prevent="back"
                            >Back</v-btn
                          >
                          <v-btn
                            v-if="status == 'Incident'"
                            x-small
                            @click.prevent="incident"
                            color="red"
                            depressed
                            outlined
                          >
                            Incident Details</v-btn
                          >
                        </v-flex>
                      </div>
                    </form>
                  </div>
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
import Dfooter from "../../components/dashfooter.vue";
import Dsidebar from "../../components/Operator/dashsidebar.vue";
import Onavbar from "../../components/Operator/OptrNav.vue";
import MobNav from "../../components/Operator/MobNav.vue";
export default {
  name: "Vstatus",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      truck: "",
      driver: "",
      phone: "",
      cloc: "",
      status: "",
      stats: ["Unavailable", "Available"],
      stat: "",
      show: false,
    };
  },
  beforeCreate: function() {
    getAPI
      .get(
        "/api/truck/view_truck_status/?truck_id=" + localStorage.getItem("tid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.Http_response == 200) {
          this.truck = this.APIData.data.truck["registration"];
          this.driver = this.APIData.data.driver["driver_name"];
          this.phone = this.APIData.data.driver["phone"];
          this.getAddress(this.APIData.data["location"]);
          if (this.APIData.data["status"] === "Offline") {
            this.status = "Available";
          } else if (
            this.APIData.data["status"] != "Offline" &&
            this.APIData.data["status"] != "Unavailable"
          ) {
            this.show = true;
            this.status = this.APIData.data["status"];
          } else {
            this.status = this.APIData.data["status"];
          }
        } else {
          alert(this.APIData.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    updateStatus() {
      if (this.status === "Available") {
        this.stat = "Offline";
      } else {
        this.stat = this.status;
      }
      getAPI
        .post(
          "/api/truck/update_truck_status/",
          {
            truck_id: localStorage.getItem("tid"),
            status: this.stat,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 200) {
            window.location.reload();
          } else {
            alert(this.APIData.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    back() {
      localStorage.removeItem("tid");
      this.$router.push({ name: "StatusTable" });
    },
    incident() {
      this.$router.push({ name: "IncidentDetails" });
    },
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
            this.cloc = item.address.label;
          });
        }
      );
    },
  },
};
</script>
