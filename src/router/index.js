import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/booktruck.vue";
import Login from "../views/login.vue";
import Csignup from "../views/custsignup.vue";
import Osignup from "../views/optrsignup.vue";
import Cpage from "../components/custpage.vue";
import Opage from "../components/optrpage.vue";
import Admin from "../views/Admin/adminhome.vue";
import AOreg from "../views/Admin/optrreg.vue";
import ATreg from "../views/Admin/truckreg.vue";
import Tmanage from "../views/managetrucks.vue";
import Tstatus from "../views/truckstatus.vue";
import Dpage from "../views/driverpage.vue";
import Treg from "../views/registertruck";
import Tadd from "../views/truckadd";
import Dreg from "../views/driveradd";
import Padd from "../views/panadd";
import Tdetails from "../views/truckdetails";
import Editdrivers from "../views/editdrivers";
import Tstats from "../views/viewstats";
import HereMap from "../views/HereMap";
import Bnewtruck from "../views/booknewtruck";
import Newcust from "../views/newcustsignup";
import Cbookings from "../views/bookings";
import Ctrack from "../views/custrack";
import Tracktruck from "../views/tracktruck";
import ForgotPass from "../views/forgotpassword.vue";
import Propage from "../components/profilepage.vue";
import Changephone from "../views/ProfileUpdate/changephone.vue";
import Changeemail from "../views/ProfileUpdate/changeemail.vue";
import Changename from "../views/ProfileUpdate/changename.vue";
import Changepassword from "../views/ProfileUpdate/changepassword.vue";
import Changedetails from "../views/ProfileUpdate/changedetails.vue";

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
    path: "/managetrucks",
    name: "Tmanage",
    component: Tmanage,
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
    path: "/tracktruck",
    name: "Tracktruck",
    component: Tracktruck,
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
