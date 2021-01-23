<template>
  <nav>
    <!--Navbar-->
    <v-app-bar color="blue lighten-1" dark app>
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
      color="blue-grey darken-4"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-icon size="80" dark> mdi-account-circle </v-icon>
          </v-avatar>
          <p class="white--text subheading mt-1">Operator Name</p>
        </v-flex>
      </v-layout>
      <v-list nav dark>
        <v-list-item-group
          v-model="group"
          active-class="deep-grey--text text--accent-1"
        >
          <v-list-item router to="/registertruck">
            Register Your Trucks
          </v-list-item>
          <v-list-item router to="/managetrucks">Manage Trucks </v-list-item>
          <v-list-item router to="/driveradd"> Manage Drivers </v-list-item>
          <v-list-item router to="/truckstatus">
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
    <!-- <v-row justify="center"> -->
      <!-- <v-dialog v-model="dialog" persistent max-width="290"> -->
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Open Dialog
          </v-btn>
        </template> -->
        <!-- <v-card>
          <v-card-title class="headline">
            Add your Pan card and Gst number
          </v-card-title>
          <v-card-text
            >Inorderd to add the truck's drivers ,the pan and gst number is
            neccessery.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Do later
            </v-btn>
            <v-btn color="green darken-1" text @click="showpan">
              Do Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row> -->
    <!--Sidebar ends-->
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
    // showpan(){
    //   this.$router.push({ name: "Padd" });
    //   this.dialog = false;
    // }
  },
  beforeMount: function () {
    this.drawer = !this.drawer;
    this.dialog = !this.dialog;
  },
};
</script>