<template>
  <v-app>
    <div class="wrapper">
      <Admin />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <AdminNav title="Operators" />
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
                    label="Search operators.."
                    @input="getOperatorsList"
                    dense
                    rounded
                    filled
                    single-line
                  ></v-text-field>
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
                          @click.prevent="getDetails(details.operator.id)"
                        >
                          <td class="text-center">
                            {{ details.operator.name }}
                          </td>
                          <td class="text-center">
                            {{ details.operator.phone }}
                          </td>
                          <td class="text-center">
                            <v-icon
                              color="green darken-1"
                              small
                              v-if="details.operator.is_verified == true"
                              >mdi-checkbox-marked-circle-outline</v-icon
                            >
                            <v-icon
                              color="red darken-1"
                              small
                              v-if="details.operator.is_verified == false"
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
                        @input="getOperatorsList"
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
  name: "VerifyOptr",
  components: {
    Admin,
    AdminNav,
    MobNav,
  },
  data: () => {
    return {
      optrdetails: [],
      page: 1,
      search: "",
      dataCount: 0,
      NoPages: null,
    };
  },
  beforeMount: function() {
    this.getOperatorsList();
  },
  methods: {
    getOperatorsList() {
      getAPI
        .get(
          "/api/admin/operator_search/?page=" +
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
          this.NoPages = this.APIData.page_count;
          this.optrdetails = this.APIData.data;
          this.dataCount = this.optrdetails.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getDetails(id) {
      localStorage.setItem("optrid", id);
      this.$router.push({ name: "ViewOperator" });
    },
  },
};
</script>
