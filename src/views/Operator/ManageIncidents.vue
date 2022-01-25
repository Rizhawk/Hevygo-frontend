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
                <div class="col-md-10">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    class="mx-4 my-10 search"
                    label="Search your truck.."
                    @input="getIncidentsList"
                    dense
                    rounded
                    filled
                    single-line
                  ></v-text-field>
                </div>
                <div class="col-md-2">
                  <v-spacer></v-spacer>
                  <v-btn block color="red" class="my-12" x-small outlined dark
                    >Cross Dock</v-btn
                  >
                </div>
                <template v-slot:extension>
                  <v-tabs v-model="tab" centered icons-and-text>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab
                      class="tab"
                      href="#tab-1"
                      @click.prevent="getIncidentsList"
                    >
                      Active Incidents
                    </v-tab>
                    <v-tab
                      class="tab"
                      href="#tab-2"
                      @click.prevent="getIncidentsList"
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
                      :length="NoPages"
                      @input="getIncidentsList"
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
      dataCount: null,
      NoPages: null,
      page: 1,
    };
  },
  beforeMount: function() {
    this.getIncidentsList();
  },
  methods: {
    getIncidentsList() {
      getAPI
        .get(
          "/api/operators/incident_search/?page=" +
            this.page +
            "&search=" +
            this.search,
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.NoPages = this.APIData.page_count; // For the dynamic pagination.
          if (this.tab == "tab-1") {
            // Check for the tab change. tab-1 by default.
            this.incidents = []; // Re-Initilize every time when api calls, to perform search and active-inactive filtering perfectly.
            if (this.APIData.data.length != 0) {
              // Make sure the data array has atleast one data/object.
              for (let key in this.APIData.data) {
                // Loop through data array, when there is any data.
                if (this.APIData.data[key].is_active == true) {
                  // Filtering active incident for tab-1.
                  this.incidents.push(this.APIData.data[key]);
                  this.dataCount = this.incidents.length;
                } else {
                  this.dataCount = this.incidents.length; // "dataCount" variable is for the message to user, when there is no data(No value in "incidents" array.).
                }
              }
            } else {
              this.dataCount = 0;
            }
          } else if (this.tab == "tab-2") {
            // For tab-2 we need all the incidents, so no filtering checks needed.
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
