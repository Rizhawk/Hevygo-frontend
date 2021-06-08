<template>
  <nav>
    <v-system-bar color=" deep-orange darken-2" dark app>
      <v-app-bar-nav-icon
        @click.prevent="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-app-bar-title class="white--text font-weight-black caption mr-3"
        ><v-icon x-small color="white" class="mr-2">mdi-account</v-icon
        >{{ this.$session.get("user_name") }}</v-app-bar-title
      >
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
    </v-system-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      fixed
      width="300px"
      clipped
      hide-overlay
      dark
      color="blue-grey darken-4"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-icon size="90"> mdi-account-circle </v-icon>
          </v-avatar>
        </v-flex>
      </v-layout>
      <v-list nav dark>
        <v-list-item-group>
          <v-list-item link class="font-weight-black subtitle-2">
            <v-list-item-icon
              ><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon
            >
            Dasboard
          </v-list-item>
          <v-list-item
            link
            href="/optrreg"
            class="font-weight-black subtitle-2"
          >
            <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
            Operator Registration
          </v-list-item>
          <v-list-item
            link
            href="/truckreg"
            class="font-weight-black subtitle-2"
          >
            <v-list-item-icon><v-icon>mdi-truck</v-icon></v-list-item-icon>
            Truck Registration
          </v-list-item>
          <v-list-item link href="/newadmin" class="font-weight-black subtitle-2">
            <v-list-item-icon
              ><v-icon>mdi-account-plus</v-icon></v-list-item-icon
            >
            Add new admin
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
export default {
  name: "Admin",
  data: () => {
    return {
      drawer: true,
    };
  },
  methods: {
    logout() {
      this.$session.destroy();
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style scoped>
.link {
  text-decoration: none;
  color: white;
}
</style>