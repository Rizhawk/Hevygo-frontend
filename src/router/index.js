import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/Customer/booktruck.vue";
import Login from "../views/login.vue";
import Csignup from "../views/Customer/custsignup.vue";
import Osignup from "../views/Operator/optrsignup.vue";
import Cpage from "../components/custpage.vue";
import Opage from "../components/optrpage.vue";
import Admin from "../views/Admin/adminhome.vue";
import Regadmin from "../views/Admin/newadmin.vue";
import AOreg from "../views/Admin/optrreg.vue";
import ATreg from "../views/Admin/truckreg.vue";
import Tstatus from "../views/Operator/truckstatus.vue";
import Dpage from "../views/driverpage.vue";
import Treg from "../views/Operator/registertruck";
import Tadd from "../views/Operator/truckadd";
import Dreg from "../views/Operator/driveradd";
import Padd from "../views/Operator/panadd";
import Tdetails from "../views/Operator/truckdetails";
import Editdrivers from "../views/Operator/editdrivers";
import Tstats from "../views/Operator/viewstats";
import HereMap from "../views/Customer/HereMap";
import Bnewtruck from "../views/Customer/booknewtruck";
import Newcust from "../views/Customer/newcustsignup";
import Cbookings from "../views/Customer/bookings";
import Ctrack from "../views/Customer/custrack";
import ForgotPass from "../views/forgotpassword.vue";
import Propage from "../components/profilepage.vue";
import Changephone from "../views/ProfileUpdate/changephone.vue";
import Changeemail from "../views/ProfileUpdate/changeemail.vue";
import Changename from "../views/ProfileUpdate/changename.vue";
import Changepassword from "../views/ProfileUpdate/changepassword.vue";
import Changedetails from "../views/ProfileUpdate/changedetails.vue";
import Dashboard from "../views/Operator/dashboard.vue";
import DataTable from "../views/Operator/optrdatatables.vue";
import Hmap from "../views/Operator/Map.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/booktruck",
    name: "Booking",
    component: Booking,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/custsignup",
    name: "Csignup",
    component: Csignup,
  },
  {
    path: "/optrsignup",
    name: "Osignup",
    component: Osignup,
  },
  {
    path: "/adminhome",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/newadmin",
    name: "Regadmin",
    component: Regadmin,
  },
  {
    path: "/optrreg",
    name: "AOreg",
    component: AOreg,
  },
  {
    path: "/truckreg",
    name: "ATreg",
    component: ATreg,
  },
  {
    path: "/custpage",
    name: "Cpage",
    component: Cpage,
  },
  {
    path: "/optrpage",
    name: "Opage",
    component: Opage,
  },
  {
    path: "/truckstatus",
    name: "Tstatus",
    component: Tstatus,
  },
  {
    path: "/driverpage",
    name: "Dpage",
    component: Dpage,
  },
  {
    path: "/registertruck",
    name: "Treg",
    component: Treg,
  },
  {
    path: "/truckadd",
    name: "Tadd",
    component: Tadd,
  },
  {
    path: "/driveradd",
    name: "Dreg",
    component: Dreg,
  },
  {
    path: "/panadd",
    name: "Padd",
    component: Padd,
  },
  {
    path: "/truckdetails",
    name: "Tdetails",
    component: Tdetails,
  },
  {
    path: "/editdrivers",
    name: "Editdrivers",
    component: Editdrivers,
  },
  {
    path: "/viewstats",
    name: "Tstats",
    component: Tstats,
  },
  {
    path: "/HereMap",
    name: "HereMap",
    component: HereMap,
  },
  {
    path: "/booknewtruck",
    name: "Bnewtruck",
    component: Bnewtruck,
  },
  {
    path: "/newcustsignup",
    name: "Newcust",
    component: Newcust,
  },
  {
    path: "/bookings",
    name: "Cbookings",
    component: Cbookings,
  },
  {
    path: "/custrack",
    name: "Ctrack",
    component: Ctrack,
  },
  {
    path: "/forgotpassword",
    name: "ForgotPass",
    component: ForgotPass,
  },
  {
    path: "/profilepage",
    name: "Propage",
    component: Propage,
  },
  {
    path: "/changephone",
    name: "Changephone",
    component: Changephone,
  },
  {
    path: "/changeemail",
    name: "Changeemail",
    component: Changeemail,
  },
  {
    path: "/changename",
    name: "Changename",
    component: Changename,
  },
  {
    path: "/changepassword",
    name: "Changepassword",
    component: Changepassword,
  },
  {
    path: "/changedetails",
    name: "Changedetails",
    component: Changedetails,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/optrdatatables",
    name: "DataTable",
    component: DataTable,
  },
  {
    path: "/Map",
    name: "Hmap",
    component: Hmap,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
