<template>
  <div color="blue" class="hidden-sm-and-up">
    <v-system-bar>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.prevent="mobDraw = !mobDraw"
        color="blue darken-4"
      ></v-app-bar-nav-icon>
      <v-navigation-drawer dark v-model="mobDraw" clipped fixed top color="red">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black subtile-1 white--text">
              SHUTTLE
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider color="white"></v-divider>
        <v-list dense nav>
          <v-list-item link href="/dashboard">
            <v-list-item-icon>
              <v-icon color="white">mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="/managetrucks">
            <v-list-item-icon>
              <v-icon color="white">mdi-truck</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Trucks</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link href="/Map">
            <v-list-item-icon>
              <v-icon color="white">mdi-map-marker</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Map</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link href="/managedrivers">
            <v-list-item-icon>
              <v-icon color="white">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Drivers</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link href="/viewstatus">
            <v-list-item-icon>
              <v-icon color="white">mdi-radar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Trucks Status</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-system-bar>
  </div>
</template>
<script>
export default {
  name: "MobNav",
  data: () => {
    return {
      mobDraw: false,
    };
  },
};
</script>
<style scoped>
</style>