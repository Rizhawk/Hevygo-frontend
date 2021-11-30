<template>
  <v-app>
    <div class="wrapper">
      <Admin />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <AdminNav :title="title" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-12">
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
                  @click.prevent="getIncidentsListByOptr"
                >
                  Active Incidents
                </v-tab>

                <v-tab
                  class="tab"
                  href="#tab-2"
                  @click.prevent="getIncidentsListByOptr"
                >
                  All Incidents
                </v-tab>
              </v-tabs>
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
                      </tbody>
                    </table>
                    <div class="text-center">
                      <v-pagination
                        v-model="page"
                        circle
                        light
                        color="grey darken-3"
                        :length="NoPages"
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
  name: "IncidentsByOptr",
  components: {
    Admin,
    AdminNav,
    MobNav,
  },
  data: () => {
    return {
      incidents: [],
      tab: "tab-1",
      title: "",
      page: 1,
      NoPages: null,
      dataCount: 0,
    };
  },
  beforeMount: function() {
    this.getIncidentsListByOptr();
  },
  created: function() {
    getAPI
      .get("/api/admin/view_operator_info/?id=" + localStorage.getItem("oid"), {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.title = this.APIData.data.operator.name;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getIncidentsListByOptr() {
      getAPI
        .get(
          "/api/admin/incident_by_vendor/?operator_id=" +
            localStorage.getItem("oid") +
            "&page=" +
            this.page,
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.NoPages = this.APIData.page_count;
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

    moreDetails(id) {
      localStorage.setItem("inc_id", id);
      this.$router.push({ name: "MoreDetails" });
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
</style>
