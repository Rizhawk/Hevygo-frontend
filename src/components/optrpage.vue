<template>
  <nav>
    <!--Navbar-->
    <v-app-bar dense color="indigo darken-4" flat dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-medium">SHUTTLE</v-app-bar-title>
      <v-spacer></v-spacer>
      <p class="font-italic body-2">Welcome ,</p>
      <span
        ><p class="mx-3 font-weight-black body-2">
          {{ this.$session.get("user_name") }}
        </p></span
      >
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
            <v-card color="#263238" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    v-text="username"
                    class="font-weight-black body-1"
                  ></v-card-title>

                  <v-card-subtitle
                    v-text="email"
                    class="caption"
                  ></v-card-subtitle>
                  <v-card-subtitle
                    v-text="phone"
                    class="caption"
                  ></v-card-subtitle>
                </div>
                <v-avatar size="100" tile>
                  <v-icon size="80" dark> mdi-account-circle </v-icon>
                </v-avatar>
              </div>
              <v-card-actions>
                <v-btn
                  link
                  href="/profilepage"
                  color="white"
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
            class="font-weight-bold body-2"
            router
            to="/registertruck"
          >
            Register New Truck
          </v-list-item>
          <v-list-item class="font-weight-bold body-2" router to="/managetrucks"
            >Manage Trucks
          </v-list-item>
          <v-list-item class="font-weight-bold body-2" router to="/editdrivers">
            Manage Drivers
          </v-list-item>
          <v-list-item class="font-weight-bold body-2" router to="/viewstats">
            Update Trucks Status
          </v-list-item>
          <v-list-item class="font-weight-bold body-2" router to="/panadd">
            Add Details
          </v-list-item>
        </v-list-item-group>
        <v-list-item>
          <v-btn
            color="white"
            class="mx-5 my-10 black--text"
            width="80%"
            rounded
            depressed
            small
            shaped
            @click.prevent="logout"
            >Logout</v-btn
          >
        </v-list-item>
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
    };
  },
  created: function () {
    getAPI
      .get("/api/accounts/is_login/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.username = this.APIData.data["username"];
        this.email = this.APIData.data["email"];
        this.phone = this.APIData.data["phone"];
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