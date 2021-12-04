<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Registerd Drivers" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-lg-2"></div>
            <div class="col-md-12 col-lg-8">
              <div class="card">
                <div class="card-header">
                  <div class="row">
                    <div class="col-md-8">
                      <v-text-field
                        v-model="search"
                        prepend-inner-icon="mdi-magnify"
                        class="search"
                        label="Search driver.."
                        @input="getDriversList"
                        dense
                        rounded
                        filled
                        single-line
                      ></v-text-field>
                    </div>
                    <div class="col-md-4 text-center">
                      <v-btn
                        color="primary"
                        href="/driveradd"
                        x-small
                        class="my-2"
                        depressed
                        dark
                        outlined
                      >
                        Register New
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
                        <th class="text-center">Driver Name</th>
                        <th class="text-center">Phonenumber</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          class="rowHover"
                          v-for="driver in driverdetails"
                          :key="driver.id"
                          @click="viewDriver(driver.id)"
                        >
                          <td class="text-center">
                            {{ driver.driver_name }}
                          </td>
                          <td class="text-center">
                            {{ driver.phone }}
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
                        @input="getDriversList"
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
  name: "DriverTable",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      driverdetails: [],
      page: 1,
      dataCount: 0,
      search: "",
      NoPages: null,
    };
  },
  beforeMount: function() {
    this.getDriversList();
  },
  methods: {
    getDriversList() {
      //Api call for fetching the data into table
      getAPI
        .get(
          "/api/operators/driver_search/?page=" +
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
          this.driverdetails = this.APIData.data;
          this.dataCount = this.driverdetails.length;
          this.NoPages = this.APIData.page_count;
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    viewDriver(id) {
      localStorage.setItem("drid", id);
      this.$router.push({ name: "Vdriver" });
      //
    },
  },
};
</script>
<style scoped>
#form3 {
  border: solid white 1px;
  padding: 25px;
  border-radius: 15px;
  background-color: rgb(34, 48, 61);
}
.rowHover:hover {
  background-color: lightgrey;
}
</style>
