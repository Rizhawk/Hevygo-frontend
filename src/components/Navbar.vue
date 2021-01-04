<template>
  <nav>
    <!--Navbar-->
    <v-toolbar dark class="blue lighten-1" flat app>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-bold">HEVY</span>
        <span>GO</span>
      </v-toolbar-title>

      <v-toolbar-items class="hidden-xs-only">
        <span class="my-5 mx-16"
          ><a href="/"><p class="white--text">Home</p></a></span
        >
        <span class="my-5 mx-15"
          ><a href="/about"><p class="white--text">About Us</p></a></span
        >
        <span class="my-5 mx-15"
          ><a href="/about"><p class="white--text">Contact</p></a></span
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
    </v-toolbar>
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