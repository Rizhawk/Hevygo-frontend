<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Registerd Trucks" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <div class="row">
                    <div class="col-md-6 text-start">
                      <v-text-field
                        v-model="search"
                        prepend-inner-icon="mdi-magnify"
                        class="search"
                        label="Search your truck.."
                        @input="searchTruck"
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
                        href="/infoadd"
                        class="my-3"
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
                        <th>Phonenumber</th>
                        <th>Registration</th>
                        <th>Homelocation</th>
                        <th>Verification</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          class="rowHover"
                          v-for="truck in trucks"
                          :key="truck.id"
                          @click.prevent="viewSpec(truck.truck.id)"
                        >
                          <td>
                            {{ truck.truck["phone"] }}
                          </td>
                          <td>{{ truck.registration }}</td>
                          <td>{{ truck.address }}</td>
                          <td>
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-icon
                                  v-if="truck.verification == 1"
                                  v-bind="attrs"
                                  v-on="on"
                                  color="black"
                                  class="mx-5"
                                  small
                                >
                                  mdi-clock
                                </v-icon>
                                <v-icon
                                  v-if="truck.verification == 2"
                                  v-bind="attrs"
                                  v-on="on"
                                  color="green darken-4"
                                  class="mx-5"
                                  small
                                >
                                  mdi-checkbox-marked-circle-outline
                                </v-icon>
                                <v-icon
                                  v-if="truck.verification == 3"
                                  v-bind="attrs"
                                  v-on="on"
                                  color="red darken-4"
                                  class="mx-5"
                                  small
                                >
                                  mdi-close-circle-outline
                                </v-icon>
                              </template>
                              <span>{{ truck.remarks }}</span></v-tooltip
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
  name: "TrucksTable",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      trucks: [],
      search: "",
      page: 1,
      dataCount: 0,
    };
  },
  beforeCreate: function () {
    getAPI
      .get("/api/operators/list_truck/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.trucks = this.APIData.data;
        this.dataCount = this.trucks.length;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    viewSpec(id) {
      localStorage.setItem("tid", id);
      this.$router.push({ name: "Vspecs" });
    },
    searchTruck() {
      getAPI
        .get("/api/operators/truck_search?search=" + this.search, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.trucks = this.APIData.data;
          this.dataCount = this.trucks.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
#form2 {
  border: solid white 1px;
  padding: 25px;
  border-radius: 15px;
  background-color: rgb(34, 48, 61);
}
.rowHover:hover {
  background-color: lightgrey;
}
.search {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>