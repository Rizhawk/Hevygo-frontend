<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Details of Driver" />
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
                    {{ this.driver }}
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
                              @click.prevent="dialog = !dialog"
                              color="red darken-4"
                              >mdi-delete</v-icon
                            >
                          </v-btn>
                        </template>
                        <span>Delete this Driver</span>
                      </v-tooltip>
                    </v-flex>
                  </h5>
                  <div class="card-body">
                    <form @submit.prevent="updatedr">
                      <label>Driver</label>
                      <div class="row">
                        <div class="col-md-10">
                          <div class="form-group">
                            <v-text-field
                              v-model="driver"
                              rounded
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                        </div>
                      </div>
                      <label>Driver's Phone</label>
                      <div class="row">
                        <div class="col-md-10">
                          <div class="form-group">
                            <v-text-field
                              v-model="phone"
                              rounded
                              outlined
                              dense
                            ></v-text-field>
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
      </div>
    </div>
    <v-dialog persistent v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="caption font-weight-bold black--text"
          >Are you sure want to delete this driver?</v-card-title
        >

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ml-10" x-small @click="dialog = !dialog" text
            >Close</v-btn
          >
          <v-btn x-small @click.prevent="deletedr" text color="red"
            >Delete</v-btn
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
  name: "Vdriver",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      driver: "",
      dialog: false,
      phone: "",
    };
  },
  beforeCreate: function() {
    getAPI
      .get("/api/operators/view_driver/?id=" + localStorage.getItem("drid"), {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.driver = this.APIData.data["driver_name"];
        this.phone = this.APIData.data["phone"];
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    updatedr() {
      getAPI
        .put(
          "/api/operators/update_driver/",
          {
            id: localStorage.getItem("drid"),
            driver_name: this.driver,
            phone: this.phone,
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
            alert("Details updated successfully.");
            this.$router.push({ name: "DriverTable" });
          } else {
            this.message2 = this.APIData.message;
            this.snackbar2 = true;
          }
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    deletedr() {
      getAPI
        .put(
          "/api/operators/delete_driver/",
          { id: localStorage.getItem("drid") },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.dialog = false;
          localStorage.removeItem("drid");
          this.$router.push({ name: "DriverTable" });
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    back() {
      localStorage.removeItem("drid");
      this.$router.push({ name: "DriverTable" });
    },
  },
};
</script>
