<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Incident Details of Truck" />
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
                            
                            depressed
                            href="#"
                            dark
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          >View Image
                            <v-icon small to="#" color="green darken-4"
                              >mdi-file-image</v-icon
                            >
                          </v-btn>
                        </template>
                        <span>View Image of the Incident</span>
                      </v-tooltip>
                    </v-flex>
                  </h5>
                  <div class="card-body">
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
                      <div class="col-md-12">
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
                    </div>
                    <div class="row">
                      <div class="col-md-12">
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
  name: "IncidentDetails",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      truck: "",
      incident: "",
      lastloc: "",
      reptime: "",
      uptime: "",
      driver: "",
      dphone: "",
    };
  },
  beforeCreate: function() {
    getAPI
      .get(
        "/api/operators/detail_incident/?truck_id=" +
          localStorage.getItem("tid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        this.truck = this.APIData.data[0].truck.truck.registration;
        this.incident = this.APIData.data[0].incident;
        this.getAddress(this.APIData.data[0]["truck"].location);
        this.reptime = this.APIData.data[0].report_time;
        this.uptime = this.APIData.data[0].update_time;
        this.driver = this.APIData.data[0].truck.driver.driver_name;
        this.dphone = this.APIData.data[0].truck.driver.phone;
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
  },
};
</script>
