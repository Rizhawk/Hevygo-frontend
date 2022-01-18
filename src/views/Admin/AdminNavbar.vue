<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-transparent
      bg-primary
      navbar-absolute
    "
    v-if="navBar"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle">
          <button type="button" class="navbar-toggler">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="#pablo">{{ title }}</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation-index"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navigation">
        <ul class="navbar-nav">
          <li class="nav-item">
            <v-badge class="my-3 mx-5" :color="badgeColor" :content="count">
              <v-menu
                transition="slide-y-transition"
                offset-x
                close-on-content-click
                bottom
              >
                <template v-slot:activator="{ on, attrs }"
                  ><v-icon
                    @click.prevent="markasRead"
                    v-bind="attrs"
                    v-on="on"
                    color="white"
                    small
                    >mdi-bell</v-icon
                  ></template
                >
                <v-sheet width="300">
                  <v-card
                    elevation="5"
                    v-for="notif in notifies"
                    :key="notif.id"
                  >
                    <v-card-text class="caption"
                      ><v-icon color=" green darken-4" small class="mx-5"
                        >mdi-new-box</v-icon
                      >
                      {{ notif.message }}</v-card-text
                    >
                  </v-card>
                  <v-card elevation="5" v-if="count == 0">
                    <v-card-text class="caption"
                      ><v-icon color="black" small class="mx-5"
                        >mdi-alert-circle-outline</v-icon
                      >
                      No new notifications found.</v-card-text
                    >
                  </v-card>
                </v-sheet>
              </v-menu></v-badge
            >
          </li>
          <li class="nav-item">
            <a class="nav-link mx-5">
              <v-icon color="white" x-small> mdi-account</v-icon>
              <p>
                <span class="font-weight-medium mx-1"
                  >{{ this.$session.get("user_name") }}
                </span>
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="signOut">
              <p>
                <span class="font-weight-medium">Sign Out </span>
              </p>
              <v-icon color="white" class="mx-1" x-small> mdi-logout</v-icon>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { getAPI } from "../../axios-api";
export default {
  name: "AdminNav",
  props: {
    title: "",
  },
  data: () => {
    return {
      vcolor: "",
      vicon: "",
      vmsg: "",
      navBar: true,
      notifies: [],
      count: null,
      badgeColor: "black",
    };
  },
  created: function() {
    this.isMobile();
  },
  beforeMount: function() {
    getAPI
      .get("api/accounts/is_login/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.notifies = this.APIData.data.notifications;
        this.count = this.notifies.length;
        if (this.count > 0) {
          this.badgeColor = "green darken-1";
        } else {
          this.count = "0";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    isMobile() {
      if (screen.width <= 760) {
        this.navBar = false;
      } else {
        this.navBar = true;
      }
    },
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
