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
            <a class="nav-link" href="#pablo">
              <p>
                <span class="font-weight-medium caption"
                  >{{ this.$session.get("user_name") }}
                </span>
              </p>
            </a>
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
                  <v-list-item href="/custpro">
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
export default {
  name: "Cnavbar",
  props: {
    title: null,
  },
  data: () => {
    return {
      navBar: true,
    };
  },
  created: function () {
    this.isMobile();
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