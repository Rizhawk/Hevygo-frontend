<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Details of Drivers" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-lg-2"></div>
            <div class="col-md-12 col-lg-8">
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
                    Registerd Drivers
                    <v-flex row justify-end>
                      <v-btn
                        color="primary"
                        href="/driveradd"
                        x-small
                        depressed
                        dark
                        outlined
                      >
                        Reigster New
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
                        <th class="text-center">Driver Name</th>
                        <th class="text-center">Phonenumber</th>
                      </thead>
                      <tbody class="font-weight-medium caption text-center">
                        <tr
                          v-for="driver in driverdetails"
                          :key="driver.id"
                          @click="getaDriver(driver.id)"
                        >
                          <td class="text-center">
                            {{ driver.driver_name }}
                          </td>
                          <td class="text-center">
                            {{ driver.phone }}
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
    <v-dialog :retain-focus="false" v-model="dialog" max-width="400px" light>
      <form id="form3">
        <v-text-field
          class="mx-8"
          label="Driver Name"
          clearable
          dark
          outlined
          dense
          rounded
          v-model="dname"
        >
        </v-text-field>
        <v-text-field
          class="mx-8"
          label="Phone number"
          clearable
          dark
          rounded
          dense
          outlined
          v-model="drphn"
        >
        </v-text-field>
        <v-layout row wrap>
          <v-flex lg2></v-flex>
          <v-flex class="mx-13">
            <v-btn
              outlined
              dark
              color="green"
              x-small
              @click.prevent="updatedr(drid)"
              >Update</v-btn
            >
            <v-btn
              class="mx-2"
              outlined
              dark
              color="red"
              x-small
              @click="dialog2 = true"
              >Delete</v-btn
            >
          </v-flex>
          <v-flex lg2></v-flex>
        </v-layout>
      </form>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="370">
      <v-card>
        <v-card-title class="body-2 font-weight-black black--text">
          Are you sure want to delete this driver?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="green darken-1" text @click="dialog2 = false">
            Close
          </v-btn>

          <v-btn small color="red darken-1" text @click="deletenow">
            Delete
          </v-btn>
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
  name: "DriverTable",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
  },
  data: () => {
    return {
      driverdetails: [],
      dialog: false, //dialog box form for editing the driver details
      dialog2: false, //dialog box for confirmation for deletion of a driver
      dname: "",
      drphn: "",
      ownerid: "",
      drid: "",
      snackbar: false,
      snackbar2: false,
      message: "",
      message2: "",
    };
  },
  beforeMount: function () {
    //Api call for fetching the data into table
    getAPI
      .get("/api/operators/list_driver/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.driverdetails = this.APIData.data;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  methods: {
    //Api call to get specific driver details
    getaDriver(id) {
      getAPI
        .get("/api/operators/view_driver/?id=" + id, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.drid = id;
          this.dname = this.APIData.data["driver_name"];
          this.drphn = this.APIData.data["phone"];
          this.ownerid = this.APIData.data["operator"];
          this.dialog = true;
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    //Api call for updating driver details
    updatedr() {
      console.log(this.drid);
      getAPI
        .put(
          "/api/operators/update_driver/",
          {
            id: this.drid,
            driver_name: this.dname,
            phone: this.drphn,
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
            this.message = this.APIData.message;
            this.snackbar = true;
            window.location.reload();
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
    //Api call for delete the selected driver
    deletedr() {
      getAPI
        .put(
          "/api/operators/delete_driver/",
          { id: this.drid },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.message = `Driver ${this.dname} is successfully deleted`;
          this.snackbar = true;
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    //delete confirmation function call
    deletenow() {
      this.deletedr();
      this.dialog2 = false;
    },
    //
  },
};
</script>
<style scoped>
#form3 {
  border: solid white 1px;
  padding: 25px;
  border-radius: 15px;
  background-color: rgb(34, 48, 61);
}
</style>