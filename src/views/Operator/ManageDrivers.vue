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
                    <div class="col-md-6 text-start">
                      <v-text-field
                        v-model="search"
                        prepend-inner-icon="mdi-magnify"
                        class="search"
                        label="Search driver.."
                        @input="searchDriver"
                        dense
                        rounded
                        filled
                        single-line
                      ></v-text-field>
                    </div>
                    <div class="col-md-2 text-start"></div>
                    <div class="col-md-4 text-end">
                      <v-btn
                        color="primary"
                        href="/driveradd"
                        x-small
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
      search: "",
    };
  },
  beforeMount: function() {
    //Api call for fetching the data into table
    getAPI
      .get("/api/operators/list_driver/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.driverdetails = this.APIData.data;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  methods: {
    searchDriver() {
      getAPI
        .get("/api/operators/driver_search/?search=" + this.search, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.driverdetails = this.APIData.data;
        })
        .catch((err) => {
          alert(err);
        });
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
