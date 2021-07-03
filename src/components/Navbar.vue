<template>
  <nav>
    <!--Navbar-->
    <v-app-bar dark class="black" app>
     <v-app-bar-title class="text-uppercase">
        <router-link to="/" id="link">
          <span class="subtitle-1 font-weight-bold white--text">SHUTTLE</span>
         </router-link
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
        <span class="my-3 mx-5"
          ><v-btn small router to="/login" color="blue">Login</v-btn></span
        >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <span class="my-3">
              <v-btn
                router
                to="/newcustsignup"
                v-bind="attrs"
                v-on="on"
                small
                outlined
                color="white"
              >
                Sign Up
              </v-btn></span
            >
          </template>
          <span>Create a Customer Account</span>
        </v-tooltip>
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
                  >Login</router-link
                ></v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title
                ><router-link to="/newcustsignup" id="link"
                  >Sign Up</router-link
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
import "../assets/css/bootstrap.min.css";
import "../assets/css/now-ui-dashboard.css";
export default {
  data: () => {
    return {};
  },
};
</script>

<style>
#link {
  text-decoration: none;
}
</style>