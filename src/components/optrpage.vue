<template>
  <nav>
    <!--Navbar-->
    <v-app-bar dense color="indigo darken-4" flat dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-medium">SHUTTLE</v-app-bar-title>
      <v-spacer></v-spacer>
      <p class="font-italic body-2">Welcome ,</p>
      <span><p class="mx-3 font-weight-black body-2">Operator Name</p></span>
    </v-app-bar>
    <!--Navbar ends-->

    <!--Sidebar-->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      fixed
      clipped
      hide-overlay
      dark
      color="indigo darken-4"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-icon size="80" dark> mdi-account-circle </v-icon>
          </v-avatar>
          <v-flex
            ><router-link id="link" to="/editoptrprofile"
              ><p class="ml-3 white--text font-weight-medium body-2">
                Edit Profile &#9998;
              </p></router-link
            ></v-flex
          >
        </v-flex>
      </v-layout>
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
            Add Your Pancard
          </v-list-item>
        </v-list-item-group>
        <v-list-item>
          <v-btn
            color="white"
            class="mx-5 my-10 black--text"
            width="80%"
            rounded
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
// import { getAPI } from "../axios-api";
export default {
  components: {},
  name: "Opage",
  data: () => {
    return {
      dialog: false,
      drawer: false,
      group: null,
    };
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