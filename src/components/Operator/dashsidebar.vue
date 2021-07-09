<template>
  <nav>
    <div class="sidebar" data-color="red">
      <!--
        Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
    -->
      <div class="logo">
        <a href="#" class="simple-text logo-mini"></a>
        <a href="#" class="simple-text font-weight-black subtitle-1">
          SHUTTLE
        </a>
      </div>
      <div class="sidebar-wrapper" id="sidebar-wrapper">
        <ul class="nav">
          <li>
            <router-link to="/dashboard">
              <i class="now-ui-icons design_app"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li>
            <router-link to="/managetrucks">
              <i class="now-ui-icons shopping_delivery-fast"></i>
              <p>Trucks</p>
            </router-link>
          </li>
          <li>
            <router-link to="/Map">
              <i class="now-ui-icons location_pin"></i>
              <p>Map</p>
            </router-link>
          </li>

          <li>
            <router-link to="/managedrivers">
              <i class="now-ui-icons users_single-02"></i>
              <p>Drivers</p>
            </router-link>
          </li>
          <li>
            <router-link to="/managestatus">
              <i class="now-ui-icons travel_info"></i>
              <p>Truck Status</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/now-ui-dashboard.css";
export default {
  name: "Dsidebar",
  data: () => {
    return {};
  },
  methods: {},
};
</script>