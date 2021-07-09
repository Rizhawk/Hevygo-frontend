<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Specifications of Truck" />
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
                    {{ this.reg }}
                    <v-flex row justify-end>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="red darken-4"
                            x-small
                            fab
                            depressed
                            dark
                            outlined
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon
                              x-small
                              @click.prevent="dialog1 = !dialog1"
                              color="red darken-4"
                              >mdi-delete</v-icon
                            >
                          </v-btn>
                        </template>
                        <span>Remove this Truck</span>
                      </v-tooltip>
                    </v-flex>
                  </h5>
                  <div class="card-body">
                    <form @submit.prevent="infoedit">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Resigtration</label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                              :value="reg"
                            />
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Homelocation </label>
                            <input
                              type="text"
                              class="form-control"
                              disabled=""
                              :value="home"
                            />
                          </div>
                        </div>
                      </div>
                      <label>Capcity</label>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <v-text-field
                              v-model="cap"
                              rounded
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                        </div>
                      </div>
                      <label>Manufacturer</label>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <v-text-field
                              v-model="manf"
                              rounded
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                        </div>
                      </div>
                      <label>Model</label>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <v-text-field
                              v-model="model"
                              rounded
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                        </div>
                      </div>
                      <label>Type</label>
                      <div class="row">
                        <div class="col-md-12">
                          <div class="form-group">
                            <v-select
                              v-model="type"
                              rounded
                              :items="types"
                              outlined
                              dense
                            ></v-select>
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
    <v-dialog persistent v-model="dialog2" max-width="420">
      <v-card>
        <v-card-title class="caption font-weight-bold black--text"
          >No specifications added. Truck specifications are mandatory to get
          verified by the admin.
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ml-10" x-small @click="dialog2 = !dialog2" text
            >Later</v-btn
          >
          <v-btn x-small @click.prevent="addSpec" text color="red"
            >Add now</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Dfooter from "../../components/dashfooter.vue";
import Dsidebar from "../../components/Operator/dashsidebar.vue";
import Onavbar from "../../components/Operator/OptrNav.vue";
import MobNav from "../../components/Operator/MobNav.vue";
export default {
  name: "Vspecs",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      reg: "",
      home: "",
      cap: "",
      manf: "",
      model: "",
      type: "",
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
      dialog1: false,
      dialog2: false,
      specmsg: "",
    };
  },
  beforeCreate: function () {
    getAPI
      .get(
        "/api/operators/view_truck_details/?id=" + localStorage.getItem("tid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.response == 200) {
          this.reg = this.APIData.data["truck"]["registration"];
          this.home = this.APIData.data["truck"]["homelocation"];
          this.cap = this.APIData.data["capacity"];
          this.manf = this.APIData.data["manufacturer"];
          this.model = this.APIData.data["model"];
          this.type = this.APIData.data["type"];
        } else {
          this.dialog2 = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    infoedit() {
      //api call to update truck info
      getAPI
        .put(
          "/api/operators/update_truck_details/",
          {
            truck_id: localStorage.getItem("tid"),
            manufacturer: this.manf,
            type: this.type,
            model: this.model,
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
    deleteTruck() {
      getAPI
        .put(
          "/api/operators/delete_truck",
          {
            truck_id: localStorage.getItem("tid"),
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
            localStorage.removeItem("tid");
            this.$router.push({ name: "TrucksTable" });
          } else {
            alert(this.APIData.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    addSpec() {
      this.dialog2 = false;
      this.$router.push({ name: "DetailTruck" });
    },
    back() {
      localStorage.removeItem("tid");
      this.$router.push({ name: "TrucksTable" });
    },
  },
};
</script>
<style scoped>
</style>