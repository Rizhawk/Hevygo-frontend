<template>
  <nav>
    <v-app-bar dense :color="color" flat dark app>
      <v-app-bar-nav-icon
        @click.prevent="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="font-weight-medium">SHUTTLE</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      width="400px"
      fixed
      clipped
      hide-overlay
      dark
      :color="color"
    >
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="#263238" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="text-h6"
                    v-text="username"
                  ></v-card-title>
                  <v-card-subtitle v-text="email"></v-card-subtitle>
                  <v-card-subtitle v-text="phone"></v-card-subtitle>
                </div>
                <v-avatar class="ma-3" size="125" tile>
                  <v-icon size="80" dark> mdi-account-circle </v-icon>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-list class="my-5" nav dark>
        <v-list-item-group active-class="deep-grey--text text--accent-1">
          <v-list-item class="font-weight-black body-2" to="/changephone">
            Change Phonenumber
          </v-list-item>
          <v-list-item class="font-weight-black body-2" to="/changepassword">
            Change Password
          </v-list-item>
          <v-list-item class="font-weight-black body-2" to="/changename">
            Change Name
          </v-list-item>
          <v-list-item class="font-weight-black body-2" to="/changeemail">
            Change Email
          </v-list-item>
          <v-list-item
            v-if="isOptr"
            class="font-weight-black body-2"
            to="/changedetails"
          >
            Change Details
          </v-list-item>
          <v-chip
            class="ma-2"
            dark
            outlined
            text-color="white"
            @click.prevent="backTopage"
          >
            <v-avatar left>
              <v-icon small>mdi-arrow-left-thick</v-icon>
            </v-avatar>
            Back
          </v-chip>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { getAPI } from "../axios-api";
export default {
  name: "Propage",
  data: () => {
    return {
      drawer: true,
      color: "",
      username: "",
      user_type: "",
      email: "",
      phone: "",
      isOptr: false,
    };
  },
  created: function () {
    getAPI
      .get("/api/accounts/is_login/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.data["user_type"] == 1) {
          this.isOptr = true;
          this.color = "indigo darken-4";
          this.back = "/optrpage";
        } else if (this.APIData.data["user_type"] == 2) {
          this.color = "teal darken-4";
          this.back = "/custpage";
        }
        this.username = this.APIData.data["username"];
        this.email = this.APIData.data["email"];
        this.phone = this.APIData.data["phone"];
        this.user_type = this.APIData.data["user_type"];
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    backTopage() {
      if (this.user_type == 1) {
        this.$router.push({ name: "Opage" });
      } else if (this.user_type == 2) {
        this.$router.push({ name: "Cpage" });
      }
    },
  },
};
</script>
<style scoped>
#showname {
  background-color: #263238;
  height: 150px;
}
</style>