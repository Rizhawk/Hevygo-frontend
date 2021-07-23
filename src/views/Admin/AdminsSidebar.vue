<template>
  <nav>
    <div class="sidebar" data-color="green">
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
            <router-link to="">
              <i class="now-ui-icons design_app"></i>
              <p>Dashboard</p>
            </router-link>
          </li>
          <li>
            <router-link to="/verifyoperator">
              <i class="now-ui-icons users_single-02"></i>
              <p>Operator Verification</p>
            </router-link>
          </li>
          <li>
            <router-link to="/verifytruck">
              <i class="now-ui-icons shopping_delivery-fast"></i>

              <p>Trcuck Verification</p>
            </router-link>
          </li>
          <li>
            <router-link to="/addnewadmin">
              <i class="now-ui-icons users_circle-08"></i>
              <p>Add New Admin</p>
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
  name: "Admin",
  data: () => {
    return {
      drawer: true,
    };
  },
  methods: {
    logout() {
      this.$session.destroy();
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style scoped>
.link {
  text-decoration: none;
  color: white;
}
</style>