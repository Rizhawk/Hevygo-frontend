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
        <a class="navbar-brand">{{ title }}</a>
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
            <a class="nav-link" href="#pablo">
              <p>
                <span class="font-weight-medium caption"
                  >{{ this.$session.get("user_name") }}
                </span>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      dense
                      v-bind="attrs"
                      v-on="on"
                      small
                      class="mx-1"
                      :color="vcolor"
                      v-text="vicon"
                    ></v-icon>
                  </template>
                  <span>{{ this.vmsg }}</span>
                </v-tooltip>
              </p>
            </a>
          </li>
          <li class="nav-item">
            <v-badge class="my-3 mx-8" :color="badgeColor" :content="count">
              <v-menu
                transition="slide-y-transition"
                offset-x
                close-on-content-click
                bottom
              >
                <template v-slot:activator="{ on, attrs }"
                  ><v-icon
                    @click="markasRead"
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
          <li class="nav-item dropdown">
            <div class="dropdown">
              <v-menu
                transition="slide-y-transition"
                offset-x
                close-on-content-click
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    class="my-3 mx-8"
                    color="white"
                    small
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-account-settings</v-icon
                  >
                </template>
                <v-list>
                  <v-list-item href="/optrpro">
                    <v-list-item-title class="font-weight-medium caption"
                      ><v-icon x-small class="mr-1" color="black"
                        >mdi-account-edit</v-icon
                      >
                      Edit Profile</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item @click.prevent="signOut">
                    <v-list-item-title class="font-weight-medium caption">
                      <v-icon class="mr-2" x-small color="black"
                        >mdi-logout</v-icon
                      >Sign Out</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { getAPI } from "../../axios-api";
export default {
  name: "Onavbar",
  props: {
    title: null,
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
    getAPI
      .get("/api/operators/view_operator_info/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.response == 204) {
          alert("Your account verfication failed. Details missing. Add now.");
          this.$router.push({ name: "Padd" });
        } else {
          if (this.APIData.data["status"] == 1) {
            this.vicon = "mdi-clock";
            this.vcolor = "white";
            this.vmsg = this.APIData.data["remarks"];
            alert(
              "Account verification is in progress. Please wait to be verified."
            );
            this.$router.push({ name: "OptrPro" });
          } else if (this.APIData.data["status"] == 2) {
            this.vicon = "mdi-check-circle";
            this.vcolor = "blue lighten-1";
            this.vmsg = this.APIData.data["remarks"];
          } else if (this.APIData.data["status"] == 3) {
            this.vicon = "mdi-close-circle-outline";
            this.vcolor = "red";
            this.vmsg = this.APIData.data["remarks"];
          }
        }
      })
      .catch((err) => {
        alert("Your registration is incomplete. Complete it to get verified.");
        this.$router.push({ name: "Padd" });
        console.log(err);
      });
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
        console.log(this.APIData);
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
    markasRead() {
      getAPI
        .get("/api/accounts/notification_seen/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          console.log(this.APIData);
        })
        .catch((err) => {
          console.log(err);
        });
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
