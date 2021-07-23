<template>
  <v-app>
    <div class="wrapper">
      <Admin />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <AdminNav title="Operators Verifcation" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
              <div class="card">
                <div class="card-header">
                  <h5
                    class="
                      card-title
                      font-weight-black
                      text-secondary
                      subtitle-1
                    "
                  >
                    Operators
                  </h5>
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
                        <th class="text-center">Name</th>
                        <th class="text-center">Phonenumber</th>
                        <th class="text-center">Verified</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          v-for="details in optrdetails"
                          :key="details.id"
                          @click.prevent="getDetails(details.id)"
                        >
                          <td class="text-center">{{ details.name }}</td>
                          <td class="text-center">{{ details.phone }}</td>
                          <td class="text-center">
                            <v-icon
                              color="green darken-1"
                              small
                              v-if="details.is_verified == true"
                              >mdi-checkbox-marked-circle-outline</v-icon
                            >
                            <v-icon
                              color="red"
                              small
                              v-if="details.is_verified == false"
                              >mdi-close-circle-outline</v-icon
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
  name: "VerifyOptr",
  components: {
    Admin,
    AdminNav,
    MobNav,
  },
  data: () => {
    return {
      optrdetails: [],
    };
  },
  beforeCreate: function () {
    getAPI
      .get("/api/admin/list_operator/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.optrdetails = this.APIData.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getDetails(id) {
      localStorage.setItem("optrid", id);
      this.$router.push({ name: "ViewOperator" });
    },
  },
};
</script>
