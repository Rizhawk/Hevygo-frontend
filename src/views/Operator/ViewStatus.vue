<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Trucks on Duty" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h4
                    class="
                      card-title card-title
                      font-weight-black
                      text-secondary
                      subtitle-1
                    "
                  >
                    Current Status of Trucks
                    <v-flex row justify-end>
                      <v-btn
                        color="primary"
                        href="/newstatus"
                        x-small
                        depressed
                        dark
                        outlined
                      >
                        Add New Status
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
                        <th>Truck</th>
                        <th>Driver</th>
                        <th>Driver's Phone</th>
                        <th>Status</th>
                        <th>Location</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          v-for="truck in truckdriver"
                          :key="truck.truck.id"
                          @click.prevent="
                            getDetails(truck.truck['truck']['id'])
                          "
                        >
                          <td>
                            {{ truck.truck.registration }}
                          </td>
                          <td>
                            {{ truck.driver["driver_name"] }}
                          </td>
                          <td>
                            {{ truck.driver["phone"] }}
                          </td>
                          <td>
                            {{ truck.status }}
                          </td>
                          <td>
                            {{ truck.location }}
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
    <v-dialog
      max-width="350px"
      max-height="auto"
      v-model="show"
      persistent
      overlay-opacity=".3"
    >
      <v-card color="rgb(34, 48, 61)" dark max-width="350px">
        <v-card-title class="font-weight-black body-1">Truck</v-card-title>
        <v-card-subtitle>{{ truck }}</v-card-subtitle>
        <v-card-title class="font-weight-black body-1">Driver</v-card-title>
        <v-card-subtitle>{{ driver }}</v-card-subtitle>
        <v-card-title class="font-weight-black body-1">Status </v-card-title>
        <v-select
          class="status"
          v-model="status"
          :items="stats"
          autofocus
          dark
          outlined
          dense
        >
        </v-select>
        <v-card-title class="font-weight-black body-1">Location </v-card-title>
        <v-card-subtitle>{{ location }}</v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            x-small
            dark
            color="green darken-4"
            outlined
            @click.prevent="updateStatus"
            >Update</v-btn
          >
          <v-btn
            x-small
            dark
            color="red darken-4"
            @click.prevent="show = !show"
            outlined
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Dsidebar from "../../components/dashsidebar.vue";
import Dfooter from "../../components/dashfooter.vue";
import Onavbar from "../../components/OptrNav.vue";
import MobNav from "../../components/MobNav.vue";
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
      truckdriver: [],
      show: false,
      truck: "",
      driver: "",
      status: "",
      location: "",
      tid: "",
      stats: ["Unavailable", "Available"],
    };
  },
  created: function () {
    //Api call to fetch status of all trucks
    getAPI
      .get("/api/truck/list_truck_status/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        console.log(this.APIData);
        this.truckdriver = this.APIData.data;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  methods: {
    showdetail(location) {
      this.$session.set("cp", location);
      this.$router.push({ name: "Tracktruck" });
    },
    getDetails(id) {
      console.log(id);
      getAPI
        .get("/api/truck/view_truck_status/?truck_id=" + id, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 200) {
            this.truck = this.APIData.data.truck["registration"];
            this.driver = this.APIData.data.driver["driver_name"];
            this.status = this.APIData.data["status"];
            this.location = this.APIData.data["location"];
            this.tid = this.APIData.data["truck"]["id"];
            this.show = true;
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    updateStatus() {
      getAPI
        .post(
          "/api/truck/update_truck_status/",
          {
            truck_id: this.tid,
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
  },
};
</script>