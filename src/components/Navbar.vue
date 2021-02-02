<template>
  <nav>
    <!--Navbar-->
    <v-app-bar dark class="black" app>
      <v-app-bar-title class="text-uppercase">
        <router-link to="/" id="link">
          <span class="font-weight-bold white--text">HEVY</span>
          <span class="white--text">GO</span></router-link
        >
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <span class="my-5 mx-15"
          ><router-link to="#" id="link"
            ><p class="white--text">About Us</p></router-link
          ></span
        >
        <span class="my-5 mx-15"
          ><router-link to="#" id="link"
            ><p class="white--text">Contact</p></router-link
          ></span
        >
        <span class="my-3 mx-15"><v-btn router to="/login" color="blue">TRACK</v-btn></span>
      </v-toolbar-items>
      <div class="hidden-sm-and-up">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-on="on"></v-app-bar-nav-icon>
          </template>
          <v-list class="responsiveMenu">
            <v-list-item>
              <v-list-item-title
                ><router-link id="link" to="/about"
                  >About Us</router-link
                ></v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                ><router-link to="/about" id="link"
                  >Contact</router-link
                ></v-list-item-title
              >
            </v-list-item>
             <v-list-item>
              <v-list-item-title
                ><router-link to="/login" id="link"
                  >Track</router-link
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
  data:()=> {
    return {
    };
  },
};
</script>

<style>
#link {
  text-decoration: none;
}
</style>