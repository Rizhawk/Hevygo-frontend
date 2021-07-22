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
            <a class="nav-link">
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