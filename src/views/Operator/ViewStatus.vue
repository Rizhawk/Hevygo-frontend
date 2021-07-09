<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Current Status of Truck" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
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
                    {{ this.truck }}
                  </h5>
                  <div class="card-body">
                    <form @submit.prevent="updateStatus">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Truck</label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                              :value="truck"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Driver</label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                              :value="driver"
                            />
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Driver's Phone </label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                              :value="phone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Current Location</label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                              :value="cloc"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Current Status</label>
                            <v-select
                              class="status"
                              v-model="status"
                              :items="stats"
                              autofocus
                              rounded
                              outlined
                              dense
                            >
                            </v-select>
                          </div>
                        </div>
                        <v-flex row class="my-2" justify-center
                          ><v-btn
                            type="submit"
                            x-small
                            color="green darken-4"
                            depressed
                            outlined
                            >Update</v-btn
                          >
                          <v-btn
                            class="mx-2"
                            x-small
                            color="black"
                            depressed
                            outlined
                            @click.prevent="back"
                            >Back</v-btn
                          >
                        </v-flex>
                      </div>
                    </form>
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
import Dfooter from "../../components/dashfooter.vue";
import Dsidebar from "../../components/Operator/dashsidebar.vue";
import Onavbar from "../../components/Operator/OptrNav.vue";
import MobNav from "../../components/Operator/MobNav.vue";
export default {
  name: "Vstatus",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      truck: "",
      driver: "",
      phone: "",
      cloc: "",
      status: "",
      stats: ["Unavailable", "Available"],
    };
  },
  beforeCreate: function () {
    getAPI
      .get(
        "/api/truck/view_truck_status/?truck_id=" + localStorage.getItem("tid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.Http_response == 200) {
          this.truck = this.APIData.data.truck["registration"];
          this.driver = this.APIData.data.driver["driver_name"];
          this.phone = this.APIData.data.driver["phone"];
          this.cloc = this.APIData.data["location"];
          this.status = this.APIData.data["status"];
        } else {
          alert(this.APIData.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    updateStatus() {
      getAPI
        .post(
          "/api/truck/update_truck_status/",
          {
            truck_id: localStorage.getItem("tid"),
            status: this.status,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 200) {
            window.location.reload();
          } else {
            alert(this.APIData.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    back() {
      localStorage.removeItem("tid");
      this.$router.push({ name: "StatusTable" });
    },
  },
};
</script>