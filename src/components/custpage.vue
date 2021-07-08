<template>
  <nav>
    <!--Navbar-->
    <v-app-bar dense color="teal darken-4" dark flat app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-medium">SHUTTLE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-title class="white--text font-weight-black caption mr-3">
        <v-icon x-small color="white" class="mr-2">mdi-account</v-icon
        >{{ this.$session.get("user_name") }}
      </v-app-bar-title>
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
    </v-app-bar>
    <!--Navbar ends-->
    <!--Sidebar-->
    <v-navigation-drawer
      v-model="drawer"
      width="300"
      absolute
      bottom
      fixed
      clipped
      dark
      hide-overlay
      color="teal darken-4"
    >
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="grey lighten-5">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="font-weight-black body-1 black--text"
                    >{{ this.username }}
                  </v-card-title>

                  <v-card-subtitle
                    v-text="email"
                    class="caption black--text"
                  ></v-card-subtitle>
                  <v-card-subtitle
                    v-text="phone"
                    class="caption black--text"
                  ></v-card-subtitle>
                </div>
                <v-avatar size="100" tile>
                  <v-icon size="80" color="black"> mdi-account-circle </v-icon>
                </v-avatar>
              </div>
              <v-card-actions>
                <v-btn
                  link
                  href="/UpdatePage"
                  color="black"
                  x-small
                  rounded
                  outlined
                  dark
                  >Edit Profile
                  <v-icon class="mx-1" x-small>mdi-pencil</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-list nav dark>
        <v-list-item-group
          v-model="group"
          active-class="deep-grey--text text--accent-1"
        >
          <v-list-item
            class="font-weight-black body-2"
            router
            to="/booknewtruck"
          >
            Booking a new Truck
          </v-list-item>
          <v-list-item class="font-weight-black  body-2" router to="/bookings"
            >Current Bookings</v-list-item
          >
          <v-list-item class="font-weight-black  body-2" router to="/custrack">
            Track your Shipment
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!--Sidebar ends-->
  </nav>
</template>
<script>
import { getAPI } from "../axios-api";
export default {
  name: "Cpage",
  data: () => ({
    drawer: true,
    group: null,
    username: "",
    email: "",
    phone: "",
  }),
  beforeCreate: function () {
    getAPI
      .get("/api/accounts/is_login/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.username = this.APIData.data["username"];
        this.email = this.APIData.data["email"];
        this.phone = this.APIData.data["phone"];
      })
      .catch((err) => {
        console.log(err);
      });
  },
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