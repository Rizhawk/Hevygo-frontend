<template>
  <nav>
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
    <v-app-bar color="blue lighten-1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>HEVYGO</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      light
      clipped
      color="cyan"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-icon size="80" dark> mdi-account-circle </v-icon>
          </v-avatar>
          <p class="white--text subheading mt-1">Customer Name</p>
        </v-flex>
      </v-layout>
      <v-list nav dark>
        <v-list-item-group
          v-model="group"
          active-class="deep-grey--text text--accent-1"
        >
          <v-list-item>
            <v-list-item-title class="black--text"
              >Booking Status</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="black--text"
              >Track your Truck</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="black--text"
              >Edit Booking</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
        <v-list-item>
          <v-btn class="mx-5 my-10" width="80%" rounded shaped>Logout</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  name: "Cpage",
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>