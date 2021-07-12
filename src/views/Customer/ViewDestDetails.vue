<template>
  <v-app>
    <div class="wrapper">
      <Csidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Cnavbar title="Destination Details" />
        <Cmobnav />
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-8">
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
                    Destination
                  </h5>
                </div>
                <div class="card-body">
                  <form @submit.prevent="back">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Start Location</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="sl"
                          />
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <label>End Location</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="el"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Weight of Goods</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="wt"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label> Type of Goods</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="gt"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Type of Vehicle</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="vt"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Date of Transport</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="dt"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Status of Transport</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="st"
                          />
                        </div>
                      </div>
                      <v-flex row class="my-2" justify-center
                        ><v-btn
                          type="submit"
                          x-small
                          color="black"
                          depressed
                          outlined
                          >Back</v-btn
                        ></v-flex
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-user">
                <div class="image"></div>
                <div class="card-body">
                  <div class="author">
                    <a href="#">
                      <h5 class="title">Transaction Details</h5>
                    </a>
                    <p class="description">Destination</p>
                  </div>
                </div>
                <hr />
                <div class="button-container">
                  <button
                    href="#"
                    class="btn btn-neutral btn-icon btn-round btn-lg"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </button>
                  <button
                    href="#"
                    class="btn btn-neutral btn-icon btn-round btn-lg"
                  >
                    <i class="fab fa-twitter"></i>
                  </button>
                  <button
                    href="#"
                    class="btn btn-neutral btn-icon btn-round btn-lg"
                  >
                    <i class="fab fa-google-plus-g"></i>
                  </button>
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
  name: "Vdestdetail",
  components: {
    Csidebar,
    Cnavbar,
    Cmobnav,
  },
  data: () => {
    return {
      sl: "",
      el: "",
      wt: "",
      vt: "",
      gt: "",
      dt: "",
      st: "",
    };
  },
  beforeCreate: function () {
    getAPI
      .get(
        "/api/customers/cust-dest-detail/?id=" + localStorage.getItem("destid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        this.sl = this.APIData.data.start_location;
        this.el = this.APIData.data.end_location;
        this.wt = this.APIData.data.weight;
        this.vt = this.APIData.data.vehicle_type;
        this.gt = this.APIData.data.goods_type;
        this.dt = this.APIData.data.date;
        this.st = this.APIData.data.status;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    back() {
      localStorage.removeItem("destid");
      this.$router.push({ name: "Cbookings" });
    },
  },
};
</script>
