<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <nav
          class="
            navbar navbar-expand-lg navbar-transparent
            bg-primary
            navbar-absolute
          "
        >
          <div class="container-fluid">
            <div class="navbar-wrapper">
              <div class="navbar-toggle">
                <button type="button" class="navbar-toggler">
                  <span class="navbar-toggler-bar bar1"></span>
                  <span class="navbar-toggler-bar bar2"></span>
                  <span class="navbar-toggler-bar bar3"></span>
                </button>
              </div>
              <a class="navbar-brand" href="#pablo">Truck Details</a>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navigation"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-bar navbar-kebab"></span>
              <span class="navbar-toggler-bar navbar-kebab"></span>
              <span class="navbar-toggler-bar navbar-kebab"></span>
            </button>
            <div
              class="collapse navbar-collapse justify-content-end"
              id="navigation"
            >
              <form>
                <div class="input-group no-border">
                  <input
                    type="text"
                    value=""
                    class="form-control"
                    placeholder="Search..."
                  />
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <i class="now-ui-icons ui-1_zoom-bold"></i>
                    </div>
                  </div>
                </div>
              </form>
              <ul class="navbar-nav">
                <!-- <li class="nav-item">
                <a class="nav-link" href="#pablo">
                  <i class="now-ui-icons media-2_sound-wave"></i>
                  <p>
                    <span class="d-lg-none d-md-block">Stats</span>
                  </p>
                </a>
              </li> -->
                <li class="nav-item">
                  <a class="nav-link" href="#pablo">
                    <p>
                      <span class="font-weight-medium caption">{{
                        this.$session.get("user_name")
                      }}</span>
                    </p>
                    <v-icon x-small color="white" class="mx-1"
                      >mdi-account</v-icon
                    >
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="now-ui-icons loader_gear"></i>
                    <p>
                      <span class="d-lg-none d-md-block">Some Actions</span>
                    </p>
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    <router-link class="dropdown-item" to="/login"
                      >Sign Out</router-link
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">Registerd Trucks</h4>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class="text-primary">
                        <th>Phonenumber</th>
                        <th>Registration</th>
                        <th>Homelocation</th>
                        <th>Verification</th>
                        <th>Specifications</th>
                        <th>Action</th>
                      </thead>
                      <tbody>
                        <tr v-for="truck in trucks" :key="truck.id">
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
                          <td @click="showinfo(truck.id)">View/Edit</td>
                          <td>
                            <v-btn
                              outlined
                              dark
                              x-small
                              color="red darken-4"
                              @click.prevent="setDelete(truck.id)"
                              >Delete</v-btn
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
    <v-dialog persistent v-model="dialog1" max-width="420">
      <v-card>
        <v-card-title class="body-2 font-weight-black black--text"
          >Are you sure want to remove this truck?</v-card-title
        >

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ml-10" x-small @click="dialog1 = !dialog1" text
            >Close</v-btn
          >
          <v-btn x-small @click.prevent="deleteTruck" text color="red"
            >Remove</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="350px" light>
      <form id="form2">
        <v-text-field
          class="mx-8"
          label="Capacity in ton"
          clearable
          dark
          outlined
          rounded
          dense
          v-model="cap"
        >
        </v-text-field>
        <v-text-field
          class="mx-8"
          label="Manufacturer"
          clearable
          dark
          outlined
          rounded
          dense
          v-model="manf"
        >
        </v-text-field>

        <v-text-field
          class="mx-8"
          label="Model"
          clearable
          dark
          outlined
          rounded
          dense
          v-model="mod"
        >
        </v-text-field>
        <v-select
          v-model="typ"
          class="mx-8"
          :items="types"
          label="Type"
          clearable
          dark
          outlined
          rounded
          dense
        >
        </v-select>
        <v-layout row wrap>
          <v-flex lg2></v-flex>
          <v-flex class="mx-10">
            <v-btn
              block
              depressed
              dark
              color="deep-orange darken-3"
              @click.prevent="infoedit"
              x-small
              >Update</v-btn
            >
          </v-flex>
          <v-flex lg2></v-flex>
        </v-layout>
      </form>
    </v-dialog>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Dsidebar from "../../components/dashsidebar.vue";
import Dfooter from "../../components/dashfooter.vue";
import "../../assets/js/plugins/perfect-scrollbar.jquery.min.js";
import "../../assets/js/core/jquery.min.js";
import "../../assets/js/plugins/bootstrap-notify.js";
import "../../assets/js/plugins/chartjs.min.js";
import "../../assets/demo/demo.js";
export default {
  name: "DataTable",
  components: {
    Dsidebar,
    Dfooter,
  },
  data: () => {
    return {
      //trucklist
      trucks: [],
      dialog1: false,
      tspec: false,
      //
      //editreg
      dialog: false,
      trid: "",
      regnum: "",
      homeloc: "",
      owner: "",
      truck_num: "",
      message: "",
      snackbar: false,
      //
      //edit specs
      dialog2: false,
      idt: "",
      cap: "",
      manf: "",
      mod: "",
      typ: "",
      types: [
        "Tipper",
        "Lorry",
        "Pickup",
        "Tanker",
        "Tow truck",
        "Van",
        "Container Truck",
        "Car transporter",
      ],

      //
      dialog3: false,
      specmsg: "",
      //
    };
  },
  created: function () {
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
    //Registation edit
    editreg(tid) {
      console.log(tid);
      getAPI
        .get("/api/truck/truck-detail/" + tid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          console.log(this.APIData);
          // this.trid = tid;
          // this.owner = owner;
          // this.truck_num = truckphn;
          // this.regnum = reg;
          // this.homeloc = homeloc;
          // this.dialog = true;
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    uptruck(trid) {
      //Update api call
      getAPI
        .post(
          "/api/truck/truck-update/" + trid + "/",
          {
            owner: this.owner,
            truck_num: this.truck_num,
            registration: this.regnum,
            homelocation: this.homeloc,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    showinfo(trkid) {
      //Api call to fetch truck info
      getAPI
        .get("/api/operators/view_truck_details/?id=" + trkid, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.response == 200) {
            this.cap = this.APIData.data["capacity"];
            this.manf = this.APIData.data["manufacturer"];
            this.mod = this.APIData.data["model"];
            this.typ = this.APIData.data["type"];
            this.dialog2 = true;
          } else {
            localStorage.setItem("tid", trkid);
            this.specmsg =
              "Truck specifications are mandatory to get verified by the admin";
            this.dialog3 = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //
    },
    //Delete Api call
    deleteTruck() {
      getAPI
        .put(
          "/api/operators/delete_truck",
          {
            truck_id: this.idt,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.response == 200) {
            window.location.reload();
          } else {
            alert(this.APIData.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    //
    //Call when the operator wants to delete his truck.
    setDelete(id) {
      console.log(id);
      this.dialog1 = true;
      this.idt = id;
    },
    specnow() {
      this.$router.push({ name: "Tdetails" });
    }, //Call when the operator wants to add details now
    speclater() {
      localStorage.removeItem("tid");
      this.dialog3 = false;
    }, //Call when the operator does't wants to add details now
    infoedit() {
      //api call to update truck info
      getAPI
        .put(
          "/api/operators/update_truck_details/",
          {
            truck_id: this.idt,
            manufacturer: this.manf,
            type: this.typ,
            model: this.mod,
            capacity: this.cap,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.response == 200) {
            window.location.reload();
          } else {
            alert(this.APIData.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
      //
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
@import url("https://fonts.googleapis.com/css2?family=Montserrat:400,700,200");
</style>

