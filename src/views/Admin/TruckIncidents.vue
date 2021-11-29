<template>
  <v-app>
    <div class="wrapper">
      <Admin />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <AdminNav title="TRUCK INCIDENTS" />
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
                  <v-tabs
                    v-model="tab"
                    background-color="white"
                    centered
                    icons-and-text
                  >
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
                <v-tabs-item>
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
                        <th>Operator</th>
                        <th>Truck</th>
                        <th>Incident</th>
                        <th>Reported Time</th>
                        <th>Active</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          class="rowHover"
                          v-for="incident in incidents"
                          :key="incident.truck.truck.id"
                          @click.prevent="moreDetails(incident.id)"
                        >
                          <td>{{ incident.truck.truck.owner.name }}</td>
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
                </v-tabs-item>
              </v-tabs-items>
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
  name: "IncidentsAdmin",
  components: {
    Admin,
    AdminNav,
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
  beforeCreate: function() {
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
      this.$router.push({ name: "IncidentDetailsAdmin" });
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
