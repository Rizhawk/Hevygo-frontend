<template>
  <nav>
    <!--Navbar-->
    <v-app-bar dense color="teal darken-4" dark flat app>
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
      color="teal darken-4"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-icon size="80"> mdi-account-circle </v-icon>
          </v-avatar>
          <p class="white--text subheading mt-1">Customer Name</p>
          <v-flex
            ><router-link id="link" to="/editcustprofile"
              ><p class="ml-4 black--text font-weight-medium body-2">
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
            to="/booknewtruck"
          >
            Booking a new Truck
          </v-list-item>
          <v-list-item class="font-weight-bold body-2" router to="/bookings"
            >Current Bookings</v-list-item
          >
          <v-list-item class="font-weight-bold body-2" router to="/custrack">
            Track your Shipment
          </v-list-item>
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