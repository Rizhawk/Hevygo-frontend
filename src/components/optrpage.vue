<template>
  <nav>
    <!--Navbar-->
    <v-app-bar dense color="indigo darken-4" flat dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-medium">SHUTTLE</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-app-bar-title class="white--text font-weight-black caption mr-3">
        <v-icon x-small color="white" class="mr-2">mdi-account</v-icon
        >{{ this.$session.get("user_name") }}
      </v-app-bar-title>
      <v-btn
        text
        @click.prevent="logout"
        class="white--text font-weight-black"
        dark
        x-small
      >
        <v-icon x-small color="white" class="mr-2">mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>
    <!--Navbar ends-->

    <!--Sidebar-->
    <v-navigation-drawer
      v-model="drawer"
      width="350"
      absolute
      bottom
      fixed
      clipped
      hide-overlay
      dark
      color="indigo darken-4"
    >
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="grey lighten-5">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="font-weight-black body-1 black--text">
                    {{ this.username }}
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          dense
                          v-bind="attrs"
                          v-on="on"
                          class="mx-1"
                          :color="vcolor"
                          v-text="vicon"
                        ></v-icon>
                      </template>
                      <span>{{ this.vmsg }}</span>
                    </v-tooltip>
                  </v-card-title>

                  <v-card-subtitle
                    v-text="email"
                    class="caption black--text"
                  ></v-card-subtitle>
                  <v-card-subtitle
                    v-text="phone"
                    class="caption black--text"
                  ></v-card-subtitle>
                </div>
                <v-avatar size="100" tile>
                  <v-icon size="80" color="black"> mdi-account-circle </v-icon>
                </v-avatar>
              </div>
              <v-card-actions>
                <v-btn
                  link
                  href="/profilepage"
                  color="black"
                  x-small
                  rounded
                  outlined
                  dark
                  >Edit Profile
                  <v-icon class="mx-1" x-small>mdi-pencil</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-list nav dark>
        <v-list-item-group
          v-model="group"
          active-class="deep-grey--text text--accent-1"
        >
          <v-list-item
            class="font-weight-black body-2"
            router
            to="/registertruck"
          >
            Register New Truck
          </v-list-item>
          <v-list-item class="font-weight-black body-2" router to="/managetrucks"
            >Manage Trucks
          </v-list-item>
          <v-list-item class="font-weight-black body-2" router to="/editdrivers">
            Manage Drivers
          </v-list-item>
          <v-list-item class="font-weight-black body-2" router to="/driveradd">
            Add New Driver
          </v-list-item>
          <v-list-item class="font-weight-black body-2" router to="/viewstats">
            Update Trucks Status
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { getAPI } from "../axios-api";
export default {
  components: {},
  name: "Opage",
  data: () => {
    return {
      dialog: false,
      drawer: false,
      group: null,
      username: "",
      email: "",
      phone: "",
      vcolor: "",
      vicon: "",
      vmsg: "",
    };
  },
  created: function () {
    getAPI
      .get("/api/operators/view_operator_info/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.response == 204) {
          this.$router.push({ name: "Padd" });
        } else {
          this.username = this.APIData.data["user"]["name"];
          this.email = this.APIData.data["user"]["email"];
          this.phone = this.APIData.data["user"]["phone"];
          if (this.APIData.data["status"] == 1) {
            this.vicon = "mdi-clock";
            this.vcolor = "black";
            this.vmsg = this.APIData.data["remarks"];
          } else if (this.APIData.data["status"] == 2) {
            this.vicon = "mdi-checkbox-marked-circle-outline";
            this.vcolor = "green";
            this.vmsg = this.APIData.data["remarks"];
          } else if (this.APIData.data["status"] == 3) {
            this.vicon = "mdi-close-circle-outline";
            this.vcolor = "red";
            this.vmsg = this.APIData.data["remarks"];
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    logout() {
      this.$session.destroy();
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
  beforeMount: function () {
    this.drawer = !this.drawer;
    this.dialog = !this.dialog;
  },
};
</script>
<style scoped>
.link {
  text-decoration: none;
  color: white;
}
</style>