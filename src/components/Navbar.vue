<template>
  <nav>
    <!--Navbar-->
    <v-app-bar dark class="blue lighten-1" app>
      <v-app-bar-title class="text-uppercase">
        <span class="font-weight-bold">HEVY</span>
        <span>GO</span>
      </v-app-bar-title>

      <v-toolbar-items class="hidden-xs-only">
        <span class="my-5 mx-16"
          ><router-link to="/"><p class="white--text">Home</p></router-link></span
        >
        <span class="my-5 mx-15"
          ><router-link to="#"><p class="white--text">About Us</p></router-link></span
        >
        <span class="my-5 mx-15"
          ><router-link to="#"><p class="white--text">Contact</p></router-link></span
        >
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-up">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
          </template>
          <v-list class="responsiveMenu">
            <v-list-item>
              <v-list-item-title
                ><router-link to="/">Home</router-link></v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                ><router-link to="/about"
                  >About Us</router-link
                ></v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                ><router-link to="/about"
                  >Contact</router-link
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <!--Navbar ends-->
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
</style>