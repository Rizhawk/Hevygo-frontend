<template>
  <nav>
    <div class="sidebar" data-color="blue">
      <!--
        Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
    -->
      <div class="logo">
        <a href="#" class="simple-text logo-mini"></a>
        <a href="#" class="simple-text font-weight-black subtitle-1">
          SHUTTLE
        </a>
      </div>
      <div class="sidebar-wrapper my-15" id="sidebar-wrapper">
        <ul class="nav">
          <li>
            <router-link to="/booknewtruck">
              <i class="now-ui-icons shopping_delivery-fast"></i>
              <p>Book a New Truck</p>
            </router-link>
          </li>
          <li>
            <router-link to="#">
              <i class="now-ui-icons ui-1_calendar-60"></i>
              <p>Current Bookings</p>
            </router-link>
          </li>
          <li>
            <router-link to="#">
              <i class="now-ui-icons location_pin"></i>
              <p>Track Shipments</p>
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
  name: "Csidebar",
};
</script>