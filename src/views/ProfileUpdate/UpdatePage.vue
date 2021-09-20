<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-transparent
      bg-primary
      navbar-absolute
    "
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle">
          <button
            type="button"
            class="navbar-toggler"
            @click.prevent="show = !show"
          >
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand hidden-lg-and-up" href="#pablo"
          >Update profile</a
        >
      </div>
      <div class="collapse navbar-collapse justify-content-end" id="navigation">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#pablo">
              <p>
                <span class="font-weight-medium caption hidden-md-and-down"
                  >Update profile
                </span>
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <v-navigation-drawer
      dark
      v-model="show"
      clipped
      hide-overlay
      fixed
      top
      :color="this.color"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="font-weight-black subtile-1 white--text my-1"
          >
            SHUTTLE
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon dense x-small class="mx-1">mdi-account</v-icon
            >{{ username }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider color="white" class="my-16"></v-divider>
      <v-list dense nav>
        <v-list-item link :href="profile">
          <v-list-item-icon>
            <v-icon color="white" small>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/updatephone">
          <v-list-item-icon>
            <v-icon color="white" small>mdi-cellphone</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Change Phonenumber</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/updatepass">
          <v-list-item-icon>
            <v-icon color="white" small>mdi-key</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Change Password</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/updatename">
          <v-list-item-icon>
            <v-icon color="white" small>mdi-account-settings</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Change Name</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/updateemail">
          <v-list-item-icon>
            <v-icon color="white" small>mdi-email</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Change Email</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isOptr" link href="/updatepan">
          <v-list-item-icon>
            <v-icon color="white" small>mdi-cash</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Change Pan&Gst</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="#">
          <v-list-item-icon>
            <v-icon color="white" small>mdi-arrow-left-bold</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click.prevent="backTopage">
            <v-list-item-title>Back</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { getAPI } from "../../axios-api";
export default {
  name: "Upage",

  data: () => {
    return {
      profile: "",
      show: true,
      color: "",
      isOptr: false,
      username: "",
    };
  },
  beforeCreate: function () {
    getAPI
      .get("/api/accounts/is_login/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.username = this.APIData.data.username;
        if (this.APIData.data["user_type"] == 1) {
          this.color = "red";
          this.profile = "/optrpro";
          this.getOptrpro();
        } else if (this.APIData.data["user_type"] == 2) {
          this.color = "blue";
          this.profile = "/custpro";
        }
        this.user_type = this.APIData.data["user_type"];
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getOptrpro() {
      getAPI
        .get("/api/operators/view_operator_info/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.data.status == 1 || this.APIData.data.status == 3) {
            this.isOptr = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    backTopage() {
      if (this.user_type == 1) {
        this.$router.push({ name: "Dashboard" });
      } else if (this.user_type == 2) {
        this.$router.push({ name: "Newbooking" });
      }
    },
  },
};
</script>