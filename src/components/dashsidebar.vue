<template>
  <div class="sidebar" data-color="orange">
    <!--
        Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
    -->
    <div class="logo">
      <a href="#" class="simple-text logo-mini"></a>
      <a href="#" class="simple-text font-weight-black subtitle-1"> SHUTTLE </a>
    </div>
    <div class="sidebar-wrapper" id="sidebar-wrapper">
      <ul class="nav">
        <li>
          <router-link to="/Dashboard">
            <i class="now-ui-icons design_app"></i>
            <p>Dashboard</p>
          </router-link>
        </li>
        <li>
          <router-link to="/optrdatatables">
            <i class="now-ui-icons shopping_delivery-fast"></i>
            <p>Trucks</p>
          </router-link>
        </li>
        <li>
          <router-link to="/Map">
            <i class="now-ui-icons location_map-big"></i>
            <p>Maps</p>
          </router-link>
        </li>

        <li>
          <a href="#">
            <v-icon>mdi-account</v-icon>
            <p>Drivers</p>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="now-ui-icons ui-1_bell-53"></i>
            <p>Truck Status</p>
          </a>
        </li>
        <!-- <li>
          <a href="#">
            <i class="now-ui-icons users_single-02"></i>
            <p>User Profile</p>
          </a>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
import "../assets/js/core/bootstrap.min.js";
import "../assets/js/core/popper.min.js";
import "../assets/css/bootstrap.min.css";
import "../assets/css/now-ui-dashboard.css";
import "../assets/js/plugins/perfect-scrollbar.jquery.min.js";
import "../assets/js/core/jquery.min.js";
import "../assets/js/plugins/bootstrap-notify.js";
import "../assets/js/plugins/chartjs.min.js";
export default {
  name: "Dsidebar",
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:400,700,200");
</style>