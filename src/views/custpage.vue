<template>
  <nav>
    <!--Navbar-->
    <v-app-bar dense color="black" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-medium">SHUTTLE</v-toolbar-title>
      <v-spacer></v-spacer>
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
      color="black"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-icon size="80" dark> mdi-account-circle </v-icon>
          </v-avatar>
          <p class="white--text subheading mt-1">
            Customer Name<v-btn
              x-small
              fab
              rounded
              router
              to="/editcustprofile"
            >
              <v-icon>mdi-pencil</v-icon></v-btn
            >
          </p>
        </v-flex>
      </v-layout>
      <v-list nav dark>
        <v-list-item-group
          v-model="group"
          active-class="deep-grey--text text--accent-1"
        >
          <v-list-item router to="/booknewtruck">
            Booking a new Truck
          </v-list-item>
          <v-list-item router to="/bookings"> Bookings</v-list-item>
          <v-list-item router to="/custrack"> Track your Shipment </v-list-item>
        </v-list-item-group>
        <v-list-item>
          <v-btn
            class="mx-5 my-10 black--text"
            width="80%"
            @click.prevent="logout"
            rounded
            color="white"
            shaped
            >Logout</v-btn
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--Sidebar ends-->
  </nav>
</template>
<script>
export default {
  name: "Cpage",
  data: () => ({
    drawer: true,
    group: null,
  }),
  methods: {
    logout() {
      this.$session.destroy();
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>