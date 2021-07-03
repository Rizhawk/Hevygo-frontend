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
        <form>
          <div class="input-group no-border">
            <input
              type="text"
              value=""
              class="form-control"
              placeholder="Search..."
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <i class="now-ui-icons ui-1_zoom-bold"></i>
              </div>
            </div>
          </div>
        </form>
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
          <li class="nav-item dropdown">
            <!-- <a
              class="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="now-ui-icons loader_gear"></i>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
              <router-link class="dropdown-item" to="/login"
                >Sign Out</router-link
              >
            </div> -->

            <v-menu transition="slide-y-transition" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="my-3"
                  color="white"
                  small
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-account-settings</v-icon
                >
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title class="font-weight-medium caption"
                    >Edit Profile</v-list-item-title
                  >
                </v-list-item>
                <v-list-item to="/login">
                  <v-list-item-title class="font-weight-medium caption"
                    >Sign Out</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { getAPI } from "../axios-api";
export default {
  name: "Onavbar",
  props: {
    title: "",
  },
  data: () => {
    return {
      vcolor: "",
      vicon: "",
      vmsg: "",
      demo: {},
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
          this.username = this.APIData.data["user"]["name"];
          this.email = this.APIData.data["user"]["email"];
          this.phone = this.APIData.data["user"]["phone"];
          if (this.APIData.data["status"] == 1) {
            this.vicon = "mdi-clock";
            this.vcolor = "black";
            this.vmsg = this.APIData.data["remarks"];
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
        console.log(err);
      });
  },
};
</script>