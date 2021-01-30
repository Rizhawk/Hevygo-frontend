<template>
  <nav>
    <!--Navbar-->
    <v-app-bar color="black" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>HEVYGO</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!--Navbar ends-->

    <!--Sidebar-->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      clipped
      hide-overlay
      dark
      color="black"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-icon size="80" dark> mdi-account-circle </v-icon>
          </v-avatar>
          <p class="white--text subheading mt-1">Operator Name <v-btn x-small fab rounded> <v-icon>mdi-pencil</v-icon></v-btn></p>
        </v-flex>
      </v-layout>
      <v-list nav dark>
        <v-list-item-group
          v-model="group"
          active-class="deep-grey--text text--accent-1"
        >
          <v-list-item router to="/registertruck">
            Register New Truck
          </v-list-item>
          <v-list-item router to="/managetrucks">Manage Trucks </v-list-item>
          <v-list-item router to="/editdrivers"> Manage Drivers </v-list-item>
          <v-list-item router to="/viewstats">
            Update Trucks Status
          </v-list-item>
          <v-list-item router to="/panadd"> Add Your Pancard </v-list-item>
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
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_id");
      this.$router.push({ name: "Login" });
    },
  },
  beforeMount: function () {
    this.drawer = !this.drawer;
    this.dialog = !this.dialog;
  },
};
</script>