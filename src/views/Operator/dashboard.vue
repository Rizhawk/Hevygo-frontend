<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Dashboard" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content my-5">
          <div
            class="chart-container"
            style="position: relative; height: 30vh; width: 70vw"
          >
            <DataChart />
          </div>
        </div>
        <div class="content my-10">
          <!-- <div class="row">
            <div class="col-lg-4">
              <div class="card card-chart">
                <div class="card-header">
                  <h5 class="card-category">Global Sales</h5>
                  <h4 class="card-title">Shipped Products</h4>
                  <div class="dropdown">
                    <button
                      type="button"
                      class="
                        btn btn-round btn-outline-default
                        dropdown-toggle
                        btn-simple btn-icon
                        no-caret
                      "
                      data-toggle="dropdown"
                    >
                      <i class="now-ui-icons loader_gear"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                      <a class="dropdown-item text-danger" href="#"
                        >Remove Data</a
                      >
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="chart-area"></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="now-ui-icons arrows-1_refresh-69"></i> Just
                    Updated
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="card card-chart">
                <div class="card-header">
                  <h5 class="card-category">2018 Sales</h5>
                  <h4 class="card-title">All products</h4>
                  <div class="dropdown">
                    <button
                      type="button"
                      class="
                        btn btn-round btn-outline-default
                        dropdown-toggle
                        btn-simple btn-icon
                        no-caret
                      "
                      data-toggle="dropdown"
                    >
                      <i class="now-ui-icons loader_gear"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                      <a class="dropdown-item text-danger" href="#"
                        >Remove Data</a
                      >
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="chart-area"></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="now-ui-icons arrows-1_refresh-69"></i> Just
                    Updated
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="card card-chart">
                <div class="card-header">
                  <h5 class="card-category">Email Statistics</h5>
                  <h4 class="card-title">24 Hours Performance</h4>
                </div>
                <div class="card-body">
                  <div class="chart-area"></div>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="now-ui-icons ui-2_time-alarm"></i> Last 7 days
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="row my-5">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h5 class="card-category">Transactions Management</h5>
                  <h4
                    class="
                      card-title
                      font-weight-black
                      text-secondary
                      subtitle-1
                    "
                  >
                    List of Transactions
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
                        <th class="text-center">Date</th>
                        <th class="text-center">Customer</th>
                        <th class="text-center">Start Location</th>
                        <th class="text-center">End Location</th>
                        <th class="text-center">Cost</th>
                        <th class="text-center">Settlement</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          class="rowHover"
                          v-for="trans in transdetails"
                          :key="trans.destination.id"
                          @click.prevent="getMoreDetails(trans.destination.id)"
                        >
                          <td class="text-center">
                            {{ trans.time }}
                          </td>
                          <td class="text-center">
                            {{ trans.destination.customer.name }}
                          </td>
                          <td class="text-center">
                            {{ trans.destination.start_address }}
                          </td>
                          <td class="text-center">
                            {{ trans.destination.end_address }}
                          </td>
                          <td class="text-center">{{ trans.cost }}</td>
                          <td class="text-center">
                            <v-icon
                              color="green darken-1"
                              small
                              class="mx-5"
                              v-if="trans.is_settled == true"
                              >mdi-checkbox-marked-circle-outline</v-icon
                            >
                            <v-icon
                              color="red darken-1"
                              small
                              class="mx-5"
                              v-if="trans.is_settled == false"
                              >mdi-close-circle-outline</v-icon
                            >
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
                        @input="_getTranslist"
                        :length="this.page_count"
                        total-visible="3"
                        prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right"
                      ></v-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="col-md-3">
              <div class="card card-tasks">
                <div class="card-header">
                  <h5 class="card-category">Notifications</h5>
                  <h4
                    class="
                      card-title
                      font-weight-black
                      text-secondary
                      subtitle-1
                    "
                  >
                    What's New
                  </h4>
                </div>
                <div class="card-body">
                  <div class="table-full-width table-responsive">
                    <table class="table">
                      <tbody>
                        <tr>
                          <td>
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  checked
                                />
                                <span class="form-check-sign"></span>
                              </label>
                            </div>
                          </td>
                          <td class="text-left">
                            Sign contract for "What are conference organizers
                            afraid of?"
                          </td>
                          <td class="td-actions text-right">
                            <button
                              type="button"
                              rel="tooltip"
                              title=""
                              class="
                                btn
                                btn-info
                                btn-round
                                btn-icon
                                btn-icon-mini
                                btn-neutral
                              "
                              data-original-title="Edit Task"
                            >
                              <i class="now-ui-icons ui-2_settings-90"></i>
                            </button>
                            <button
                              type="button"
                              rel="tooltip"
                              title=""
                              class="
                                btn
                                btn-danger
                                btn-round
                                btn-icon
                                btn-icon-mini
                                btn-neutral
                              "
                              data-original-title="Remove"
                            >
                              <i class="now-ui-icons ui-1_simple-remove"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                />
                                <span class="form-check-sign"></span>
                              </label>
                            </div>
                          </td>
                          <td class="text-left">
                            Lines From Great Russian Literature? Or E-mails From
                            My Boss?
                          </td>
                          <td class="td-actions text-right">
                            <button
                              type="button"
                              rel="tooltip"
                              title=""
                              class="
                                btn
                                btn-info
                                btn-round
                                btn-icon
                                btn-icon-mini
                                btn-neutral
                              "
                              data-original-title="Edit Task"
                            >
                              <i class="now-ui-icons ui-2_settings-90"></i>
                            </button>
                            <button
                              type="button"
                              rel="tooltip"
                              title=""
                              class="
                                btn
                                btn-danger
                                btn-round
                                btn-icon
                                btn-icon-mini
                                btn-neutral
                              "
                              data-original-title="Remove"
                            >
                              <i class="now-ui-icons ui-1_simple-remove"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div class="form-check">
                              <label class="form-check-label">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  checked
                                />
                                <span class="form-check-sign"></span>
                              </label>
                            </div>
                          </td>
                          <td class="text-left">
                            Flooded: One year later, assessing what was lost and
                            what was found when a ravaging rain swept through
                            metro Detroit
                          </td>
                          <td class="td-actions text-right">
                            <button
                              type="button"
                              rel="tooltip"
                              title=""
                              class="
                                btn
                                btn-info
                                btn-round
                                btn-icon
                                btn-icon-mini
                                btn-neutral
                              "
                              data-original-title="Edit Task"
                            >
                              <i class="now-ui-icons ui-2_settings-90"></i>
                            </button>
                            <button
                              type="button"
                              rel="tooltip"
                              title=""
                              class="
                                btn
                                btn-danger
                                btn-round
                                btn-icon
                                btn-icon-mini
                                btn-neutral
                              "
                              data-original-title="Remove"
                            >
                              <i class="now-ui-icons ui-1_simple-remove"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="card-footer">
                  <hr />
                  <div class="stats">
                    <i class="now-ui-icons loader_refresh spin"></i> Updated 3
                    minutes ago
                  </div>
                </div>
              </div>
            </div> -->
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
import DataChart from "../Operator/DashCharts/DataChart.vue";
export default {
  name: "Dashboard",
  components: {
    DataChart,
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      transdetails: [],
      count: null,
      page: 1,
      page_count: null,
    };
  },
  mounted: function() {
    this._getTranslist();
  },
  methods: {
    _getTranslist() {
      getAPI
        .get("/api/operators/trans-list/?page=" + this.page, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.transdetails = this.APIData.data;
          this.page_count = this.APIData.page_count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMoreDetails(id) {
      localStorage.setItem("Trid", id);
      this.$router.push({ name: "TranDetailOptr" });
    },
  },
};
</script>
<style scoped>
.rowHover:hover {
  background-color: lightgrey;
}
</style>
