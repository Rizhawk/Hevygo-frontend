<template>
  <nav>
    <!--Navbar-->
    <v-app-bar color="blue lighten-1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>HEVYGO</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
      <!--Navbar ends-->

    <!--Sidebar-->

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      light
      clipped
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
          <v-list-item>
            <v-list-item-title class="white--text"
              >Add Trucks
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="white--text"
              >Add Drivers
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="white--text"
              >Manage Truck Status</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
        <v-list-item>
          <v-btn
            color="white"
            class="mx-5 my-10 black--text"
            width="80%"
            rounded
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
  name: "Opage",
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