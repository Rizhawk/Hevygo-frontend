<template>
  <v-app>
    <div class="wrapper">
      <Csidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Cnavbar title="Incident Details" />
        <Cmobnav />
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
                    <div class="form-control my-2">
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
                      <div class="row">
                        <div class="col-md-6">
                          <label>Operator</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="optr"
                          />
                        </div>
                        <div class="col-md-6">
                          <label>Phonenumber</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="optphn"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row my-2">
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
import Csidebar from "../../components/Customer/sidebar.vue";
import Cnavbar from "../../components/Customer/navbar.vue";
import Cmobnav from "../../components/Customer/navmob.vue";
export default {
  name: "ViewIncident",
  components: {
    Csidebar,
    Cnavbar,
    Cmobnav,
  },
  data: () => {
    return {
      truck: "",
      incident: "",
      image: "",
      lastloc: "",
      reptime: "",
      uptime: "",
      driver: "",
      dphone: "",
      optr: "",
      optphn: "",
    };
  },
  beforeCreate: function() {
    getAPI
      .get(
        "/api/operators/detail_incident/?truck_id=" +
          localStorage.getItem("trid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        this.truck = this.APIData.data.truck.truck.registration;
        this.incident = this.APIData.data.incident;
        this.image = this.APIData.data.incident_image;
        this.getAddress(this.APIData.data.truck.location);
        this.reptime = this.APIData.data.report_time;
        this.uptime = this.APIData.data.update_time;
        this.driver = this.APIData.data.truck.driver.driver_name;
        this.dphone = this.APIData.data.truck.driver.phone;
        this.optr = this.APIData.data.truck.truck.owner.name;
        this.optphn = this.APIData.data.truck.truck.owner.phone;
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
    back() {
      this.$router.push({ name: "Vdestdetail" });
    },
  },
};
</script>
