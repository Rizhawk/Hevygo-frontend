<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title=" Truck Incidents" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-12">
              <v-toolbar dense flat prominent>
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  class="mx-4 my-10 search"
                  label="Search your truck.."
                  @input="searchIncident"
                  dense
                  rounded
                  filled
                  single-line
                ></v-text-field>
                <template v-slot:extension>
                  <v-tabs v-model="tab" centered icons-and-text>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab
                      class="tab"
                      href="#tab-1"
                      @click.prevent="getDetails"
                    >
                      Active Incidents
                    </v-tab>
                    <v-tab
                      class="tab"
                      href="#tab-2"
                      @click.prevent="getDetails"
                    >
                      All Incidents
                    </v-tab>
                  </v-tabs>
                </template>
              </v-toolbar>
              <v-tabs-items v-model="tab">
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
                      <th>Truck</th>
                      <th>Incident</th>
                      <th>Reported Time</th>
                      <th>Active</th>
                    </thead>
                    <tbody class="font-weight-medium caption text-center">
                      <tr
                        class="rowHover"
                        v-for="incident in incidents"
                        :key="incident.id"
                        @click.prevent="moreDetails(incident.id)"
                      >
                        <td>
                          {{ incident.truck.truck.registration }}
                        </td>
                        <td>
                          {{ incident.incident }}
                        </td>
                        <td>{{ incident.report_time }}</td>
                        <td>
                          <v-icon
                            v-if="incident.is_active == false"
                            x-small
                            color="red"
                            >mdi-circle</v-icon
                          >
                          <v-icon
                            v-if="incident.is_active == true"
                            x-small
                            color="green"
                            >mdi-circle</v-icon
                          >
                        </td>
                      </tr>
                      <tr v-if="this.dataCount == 0">
                        <td>
                          <p class="caption font-weight-medium">
                            No records found !!
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-center">
                    <v-pagination
                      v-model="page"
                      circle
                      light
                      color="grey darken-3"
                      :length="2"
                      total-visible="3"
                      prev-icon="mdi-menu-left"
                      next-icon="mdi-menu-right"
                    ></v-pagination>
                  </div>
                </div>
              </v-tabs-items>
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
  name: "ViewIncidents",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      incidents: [],
      tab: "tab-1",
      search: "",
      dataCount: 0,
      page: 1,
    };
  },
  beforeMount: function() {
    getAPI
      .get("/api/operators/list_incident/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData.data) {
          if (this.APIData.data[key].is_active == true) {
            this.incidents.push(this.APIData.data[key]);
            this.dataCount = this.incidents.length;
          }
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    getDetails() {
      getAPI
        .get("/api/operators/list_incident/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.tab == "tab-1") {
            this.incidents = [];
            for (let key in this.APIData.data) {
              if (this.APIData.data[key].is_active == true) {
                this.incidents.push(this.APIData.data[key]);
                this.dataCount = this.incidents.length;
              }
            }
          } else if (this.tab == "tab-2") {
            this.incidents = [];
            this.incidents = this.APIData.data;
            this.dataCount = this.incidents.length;
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    searchIncident() {
      getAPI
        .get("/api/operators/incident_search/?search=" + this.search, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.tab == "tab-1") {
            this.incidents = [];
            if (this.APIData.data.length != 0) {
              for (let key in this.APIData.data) {
                if (this.APIData.data[key].is_active == true) {
                  this.incidents.push(this.APIData.data[key]);
                  this.dataCount = this.incidents.length;
                } else {
                  this.dataCount = this.incidents.length;
                }
              }
            } else {
              this.dataCount = 0;
            }
          } else if (this.tab == "tab-2") {
            this.incidents = [];
            this.incidents = this.APIData.data;
            this.dataCount = this.incidents.length;
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    moreDetails(id) {
      localStorage.setItem("inc_id", id);
      this.$router.push({ name: "DrillIncident" });
    },
  },
};
</script>
<style scoped>
.tab {
  text-decoration: none;
}
.rowHover:hover {
  background-color: lightgrey;
}
.search {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
