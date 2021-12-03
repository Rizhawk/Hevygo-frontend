<template>
  <v-app>
    <div class="wrapper">
      <Admin />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <AdminNav title="Trucks" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
              <div class="card">
                <div class="card-header">
                  <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    class="search my-2"
                    label="Search truck.."
                    @input="getTrucksList"
                    dense
                    rounded
                    filled
                    single-line
                  ></v-text-field>
                </div>
                <div class="card-body">
                  <div class="table-scroll">
                    <table class="table">
                      <thead
                        class="
                          text-primary
                          font-weight-medium
                          caption
                          text-center
                        "
                      >
                        <th class="text-center">Registration Number</th>
                        <th class="text-center">Homelocation</th>
                        <th class="text-center">Phonenumber</th>
                        <th class="text-center">Verification</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          v-for="truck in truckdetails"
                          :key="truck.id"
                          @click.prevent="getTruckdetails(truck.truck.id)"
                        >
                          <td class="text-center">{{ truck.registration }}</td>
                          <td class="text-center">{{ truck.address }}</td>
                          <td class="text-center">
                            {{ truck.truck["phone"] }}
                          </td>
                          <td class="text-center">
                            <v-icon
                              class="mx-5"
                              color="black"
                              small
                              v-if="truck.verification == 1"
                              >mdi-clock</v-icon
                            >
                            <v-icon
                              color="green darken-1"
                              small
                              class="mx-5"
                              v-if="truck.verification == 2"
                              >mdi-checkbox-marked-circle-outline</v-icon
                            >
                            <v-icon
                              color="red darken-1"
                              small
                              class="mx-5"
                              v-if="truck.verification == 3"
                              >mdi-close-circle-outline</v-icon
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
                        @input="getTrucksList"
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
  name: "VerifyTruck",
  components: {
    Admin,
    AdminNav,
    MobNav,
  },
  data: () => {
    return {
      truckdetails: [],
      page: 1,
      NoPages: null,
      dataCount: 0,
      search: "",
    };
  },
  beforeMount: function() {
    this.getTrucksList();
  },
  methods: {
    getTrucksList() {
      getAPI
        .get(
          "/api/admin/truck_search/?page=" +
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
          this.truckdetails = this.APIData.data;
          this.dataCount = this.truckdetails.length;
          this.NoPages = this.APIData.page_count;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getTruckdetails(id) {
      localStorage.setItem("trid", id);
      this.$router.push({ name: "ViewTruck" });
    },
  },
};
</script>
<style scoped></style>
