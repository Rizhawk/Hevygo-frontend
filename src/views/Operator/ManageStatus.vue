<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Trucks on Duty" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <div class="row">
                    <div class="col-md-10">
                      <v-text-field
                        v-model="search"
                        prepend-inner-icon="mdi-magnify"
                        class="search"
                        label="Search your truck.."
                        @input="getStatusList"
                        dense
                        rounded
                        filled
                        single-line
                      ></v-text-field>
                    </div>
                    <div class="col-md-2 text-center">
                      <v-btn
                        color="primary"
                        href="/newstatus"
                        class="my-2"
                        x-small
                        depressed
                        dark
                        outlined
                      >
                        Add New
                        <v-icon x-small color="whte">mdi-plus</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>
                <div class="card-body">
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
                        <th>Driver</th>
                        <th>Driver's Phone</th>
                        <th>Current Status</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          class="rowHover"
                          v-for="truck in truckdriver"
                          :key="truck.truck.id"
                          @click.prevent="
                            viewStatus(truck.truck['truck']['id'])
                          "
                        >
                          <td>
                            {{ truck.truck.registration }}
                          </td>
                          <td>
                            {{ truck.driver["driver_name"] }}
                          </td>
                          <td>
                            {{ truck.driver["phone"] }}
                          </td>
                          <td>
                            <p
                              v-if="truck.status == 'Incident'"
                              class="red--text"
                            >
                              {{ truck.status }}
                            </p>
                            <p v-if="truck.status != 'Incident'">
                              {{ truck.status }}
                            </p>
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
                        @input="getStatusList"
                        total-visible="3"
                        prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right"
                      ></v-pagination>
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
import Dsidebar from "../../components/Operator/dashsidebar.vue";
import Dfooter from "../../components/dashfooter.vue";
import Onavbar from "../../components/Operator/OptrNav.vue";
import MobNav from "../../components/Operator/MobNav.vue";
export default {
  name: "StatusTable",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      truckdriver: [],
      page: 1,
      NoPages: null,
      dataCount: null,
      search: "",
    };
  },
  beforeMount: function() {
    this.getStatusList();
  },
  methods: {
    getStatusList() {
      //Api call to fetch status of all trucks
      getAPI
        .get(
          "/api/operators/search_truck_status/?page=" +
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
          this.truckdriver = this.APIData.data;
          this.dataCount = this.truckdriver.length;
          this.NoPages = this.APIData.page_count;
        })
        .catch((err) => {
          alert(err);
        });
      //
    },

    viewStatus(id) {
      localStorage.setItem("tid", id);
      this.$router.push({ name: "Vstatus" });
    },
  },
};
</script>
<style scoped>
.rowHover:hover {
  background-color: lightgrey;
}
</style>
