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

          <v-list-item link href="/managestatus">
            <v-list-item-icon>
              <v-icon color="white">mdi-radar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Trucks Status</v-list-item-title>
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
import { getAPI } from "../../axios-api";
export default {
  name: "MobNav",
  data: () => {
    return {
      mobDraw: false,
      vcolor: "",
      vicon: "",
    };
  },
  created: function () {
    getAPI
      .get("/api/operators/view_operator_info/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.response == 204) {
          this.$router.push({ name: "Padd" });
        } else {
          if (this.APIData.data["status"] == 1) {
            this.vicon = "mdi-clock";
            this.vcolor = "black";
          } else if (this.APIData.data["status"] == 2) {
            this.vicon = "mdi-check-circle";
            this.vcolor = "blue lighten-1";
          } else if (this.APIData.data["status"] == 3) {
            this.vicon = "mdi-close-circle-outline";
            this.vcolor = "red";
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
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