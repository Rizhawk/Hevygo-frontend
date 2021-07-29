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
                  <div class="text-right"></div>
                  <h4
                    class="
                      card-title
                      font-weight-black
                      text-secondary
                      subtitle-1
                    "
                  >
                    Registerd Trucks
                    <v-flex row justify-end>
                      <v-btn
                        color="primary"
                        href="/infoadd"
                        x-small
                        depressed
                        dark
                        outlined
                      >
                        Add New
                        <v-icon x-small color="whte">mdi-plus</v-icon>
                      </v-btn></v-flex
                    >
                  </h4>
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
                          v-for="truck in trucks"
                          :key="truck.id"
                          @click.prevent="viewSpec(truck.id)"
                        >
                          <td>
                            {{ truck.truck["phone"] }}
                          </td>
                          <td>{{ truck.registration }}</td>
                          <td>{{ truck.homelocation }}</td>
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
                      </tbody>
                    </table>
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
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    viewSpec(id) {
      localStorage.setItem("tid", id);
      this.$router.push({ name: "Vspecs" });
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
</style>