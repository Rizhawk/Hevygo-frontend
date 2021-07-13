<template>
  <v-app>
    <div class="wrapper">
      <Csidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Cnavbar title="Current Bookings" />
        <Cmobnav />
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
                    Current Bookings
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
                        <th>Date of Transport</th>
                        <th>Start Location</th>
                        <th>End Location</th>
                        <th>Status of Transport</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          v-for="dest in destdetails"
                          :key="dest.id"
                          @click.prevent="viewDest(dest.id)"
                        >
                          <td>{{ dest.date }}</td>
                          <td>{{ dest.start_location }}</td>
                          <td>{{ dest.end_location }}</td>
                          <td>
                            <p
                              v-if="dest.status == 1"
                              class="
                                font-weight-medium
                                caption
                                text-center
                                orange--text
                              "
                            >
                              Payment Pending
                            </p>
                            <p
                              v-if="dest.status == 2"
                              class="
                                font-weight-medium
                                caption
                                text-center
                                blue--text
                              "
                            >
                              In Progress
                            </p>
                            <p
                              v-if="dest.status == 3"
                              class="
                                font-weight-medium
                                caption
                                text-center
                                green--text
                              "
                            >
                              Completed
                            </p>
                            <p
                              v-if="dest.status == 4"
                              class="
                                font-weight-medium
                                caption
                                text-center
                                red--text
                              "
                            >
                              Not Found
                            </p>
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
import Csidebar from "../../components/Customer/sidebar.vue";
import Cnavbar from "../../components/Customer/navbar.vue";
import Cmobnav from "../../components/Customer/navmob.vue";
export default {
  name: "Cbookings",
  components: {
    Csidebar,
    Cnavbar,
    Cmobnav,
  },
  data: () => {
    return {
      destdetails: [],
    };
  },
  beforeMount: function () {
    //Api call to fetch all destination details of current customer
    getAPI
      .get("api/customers/cust-dest-list/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.destdetails = this.APIData.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    viewDest(id) {
      localStorage.setItem("destid", id);
      this.$router.push({ name: "Vdestdetail" });
    },
  },
};
</script>
<style scoped>
#id {
  text-decoration: none;
}
</style>