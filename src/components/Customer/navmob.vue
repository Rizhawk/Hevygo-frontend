<template>
  <div color="blue" class="hidden-sm-and-up">
    <v-system-bar>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.prevent="mobDraw = !mobDraw"
        color="blue darken-4"
      ></v-app-bar-nav-icon>
      <v-navigation-drawer
        dark
        v-model="mobDraw"
        clipped
        fixed
        top
        color="blue"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black subtile-1 white--text">
              SHUTTLE
            </v-list-item-title>
            <v-list-item-subtitle
              >{{ this.$session.get("user_name") }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider color="white"></v-divider>
        <v-list dense nav>
          <v-list-item link href="/booknewtruck">
            <v-list-item-icon>
              <v-icon color="white">mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Book a New Truck</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="/bookings">
            <v-list-item-icon>
              <v-icon color="white">mdi-truck</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Current Bookings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="/custpro">
            <v-list-item-icon>
              <v-icon color="white">mdi-account-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Edit Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="/login">
            <v-list-item-icon>
              <v-icon color="white">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click.prevent="signOut">
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-system-bar>
  </div>
</template>
<script>
export default {
  name: "Cmobnav",
  data: () => {
    return {
      mobDraw: false,
    };
  },
  methods: {
    signOut() {
      this.$session.destroy();
      localStorage.clear();
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>