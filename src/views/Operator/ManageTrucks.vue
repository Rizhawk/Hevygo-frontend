<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Details of Trucks" />
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
                        href="/regtruck"
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
                        <th>Specifications</th>
                        <th>Remove</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
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
                            <v-icon
                              small
                              color="red darken-4"
                              @click.prevent="setDelete(truck.id)"
                              >mdi-delete</v-icon
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
import Onavbar from "../../components/OptrNav.vue";
import MobNav from "../../components/MobNav.vue";
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
</style>
