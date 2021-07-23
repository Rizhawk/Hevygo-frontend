<template>
  <div color="blue" class="hidden-sm-and-up">
    <v-system-bar>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.prevent="mobDraw = !mobDraw"
        color="blue darken-4"
      ></v-app-bar-nav-icon>
      <v-navigation-drawer dark v-model="mobDraw" clipped fixed top color="green">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-black subtile-1 white--text">
              SHUTTLE
            </v-list-item-title>
            <v-list-item-subtitle
              >{{ this.$session.get("user_name") }}
              <v-icon
                dense
                small
                class="mx-1"
                :color="vcolor"
                v-text="vicon"
              ></v-icon
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider color="white"></v-divider>
        <v-list dense nav>
          <v-list-item link href="/admindash">
            <v-list-item-icon>
              <v-icon color="white">mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="/verifyoperator">
            <v-list-item-icon>
              <v-icon color="white">mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Operator Verification</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="/verifytruck">
            <v-list-item-icon>
              <v-icon color="white">mdi-truck</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Truck Verifcation</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link href="/addnewadmin">
            <v-list-item-icon>
              <v-icon color="white">mdi-account-multiple-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Add New Admin</v-list-item-title>
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
  name: "MobNav",
  data: () => {
    return {
      mobDraw: false,
      vcolor: "",
      vicon: "",
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
<style scoped>
</style>