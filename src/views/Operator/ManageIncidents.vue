<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Incidents" />
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

                <v-tab class="tab" href="#tab-1" @click.prevent="getDetails(0)">
                  Active Incidents
                </v-tab>

                <v-tab class="tab" href="#tab-2" @click.prevent="getDetails(1)">
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
                  </div>
                </v-tabs-item>
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
      tab: null,
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
          }
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    getDetails(tab) {
      getAPI
        .get("/api/operators/list_incident/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (tab == 0) {
            this.incidents = [];
            for (let key in this.APIData.data) {
              if (this.APIData.data[key].is_active == true) {
                this.incidents.push(this.APIData.data[key]);
              }
            }
          } else if (tab == 1) {
            this.incidents = [];
            this.incidents = this.APIData.data;
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
</style>
