import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Booking from "../views/Customer/booktruck.vue";
import Login from "../views/login.vue";
import Csignup from "../views/Customer/custsignup.vue";
import Osignup from "../views/Operator/optrsignup.vue";
import Cpage from "../components/custpage.vue";
import Padd from "../views/Operator/panadd";
import HereMap from "../views/Customer/HereMap";
import Newcust from "../views/Customer/newcustsignup";
import Cbooking from "../views/Customer/bookings";
import Ctrack from "../views/Customer/TrackShipment.vue";
import ForgotPass from "../views/forgotpassword.vue";
import Dashboard from "../views/Operator/dashboard.vue";
import TrucksTable from "../views/Operator/ManageTrucks.vue";
import DriverTable from "../views/Operator/ManageDrivers.vue";
import StatusTable from "../views/Operator/ManageStatus.vue";
import Hmap from "../views/Operator/Map.vue";
import InfoTruck from "../views/Operator/InfoTruck.vue";
import DetailTruck from "../views/Operator/DetailsTruck.vue";
import AddDriver from "../views/Operator/AddDriver.vue";
import NewStatus from "../views/Operator/NewStatus.vue";
import Uemail from "../views/ProfileUpdate/UpdateEmail.vue";
import OptrPro from "../views/ProfileUpdate/ViewOptrProfile.vue";
import Uphone from "../views/ProfileUpdate/UpdatePhone.vue";
import Upassword from "../views/ProfileUpdate/UpdatePassword.vue";
import Uname from "../views/ProfileUpdate/UpdateName.vue";
import Upan from "../views/ProfileUpdate/UpdatePan.vue";
import Vspecs from "../views/Operator/ViewSpecs.vue";
import Vstatus from "../views/Operator/ViewStatus.vue";
import IncidentDetails from "../views/Operator/ViewIncident.vue";
import Vdriver from "../views/Operator/ViewDriver.vue";
import Newbooking from "../views/Customer/NewTruckBook.vue";
import CustPro from "../views/ProfileUpdate/ViewCustProfile.vue";
import Cbookings from "../views/Customer/CurrentBookings.vue";
import RouteMap from "../views/Customer/ShowRoute.vue";
import Vdestdetail from "../views/Customer/ViewDestDetails.vue";
import PayReq from "../views/Customer/PayandRequest.vue";
import Dpage from "../views/driverpage.vue";
import AdminDash from "../views/Admin/AdminDash.vue";
import VerifyOptr from "../views/Admin/VerifyOperator.vue";
import VerifyTruck from "../views/Admin/VerifyTruck.vue";
import AddAdmin from "../views/Admin/AddAdmin.vue";
import ViewOperator from "../views/Admin/ViewOperator.vue";
import ViewTruck from "../views/Admin/ViewTruck.vue";
import ViewIncidents from "../views/Operator/ManageIncidents.vue";
import DrillIncident from "../views/Operator/IncidentDetails.vue";
import IncidentsAdmin from "../views/Admin/TruckIncidents.vue";
import IncidentDetailsAdmin from "../views/Admin/IncidentDetails.vue";
import IncidentsByOptr from "../views/Admin/IncidentsByOptr.vue";
import MoreDetails from "../views/Admin/MoreDetails.vue";
import ViewIncident from "../views/Customer/ViewIncident.vue";
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
    path: "/admindash",
    name: "AdminDash",
    component: AdminDash,
  },

  {
    path: "/incidentsadmin",
    name: "IncidentsAdmin",
    component: IncidentsAdmin,
  },

  {
    path: "/incidentdetailsadmin",
    name: "IncidentDetailsAdmin",
    component: IncidentDetailsAdmin,
  },

  {
    path: "/incidentsbyoptr",
    name: "IncidentsByOptr",
    component: IncidentsByOptr,
  },
  {
    path: "/moredetails",
    name: "MoreDetails",
    component: MoreDetails,
  },
  {
    path: "/custpage",
    name: "Cpage",
    component: Cpage,
  },

  {
    path: "/viewincident",
    name: "ViewIncident",
    component: ViewIncident,
  },

  {
    path: "/panadd",
    name: "Padd",
    component: Padd,
  },
  {
    path: "/HereMap",
    name: "HereMap",
    component: HereMap,
  },
  {
    path: "/newcustsignup",
    name: "Newcust",
    component: Newcust,
  },
  {
    path: "/oldbookings",
    name: "Cbooking",
    component: Cbooking,
  },
  {
    path: "/trackshipment",
    name: "Ctrack",
    component: Ctrack,
  },
  {
    path: "/forgotpassword",
    name: "ForgotPass",
    component: ForgotPass,
  },
  {
    path: "/optrdash",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/managetrucks",
    name: "TrucksTable",
    component: TrucksTable,
  },
  {
    path: "/managedrivers",
    name: "DriverTable",
    component: DriverTable,
  },
  {
    path: "/managestatus",
    name: "StatusTable",
    component: StatusTable,
  },
  {
    path: "/Map",
    name: "Hmap",
    component: Hmap,
  },
  {
    path: "/infoadd",
    name: "InfoTruck",
    component: InfoTruck,
  },
  {
    path: "/detailadd",
    name: "DetailTruck",
    component: DetailTruck,
  },
  {
    path: "/driveradd",
    name: "AddDriver",
    component: AddDriver,
  },
  {
    path: "/newstatus",
    name: "NewStatus",
    component: NewStatus,
  },
  {
    path: "/updateemail",
    name: "Uemail",
    component: Uemail,
  },
  {
    path: "/optrpro",
    name: "OptrPro",
    component: OptrPro,
  },
  {
    path: "/custpro",
    name: "CustPro",
    component: CustPro,
  },
  {
    path: "/updatephone",
    name: "Uphone",
    component: Uphone,
  },
  {
    path: "/updatepass",
    name: "Upassword",
    component: Upassword,
  },
  {
    path: "/updatename",
    name: "Uname",
    component: Uname,
  },
  {
    path: "/updatepan",
    name: "Upan",
    component: Upan,
  },
  {
    path: "/viewspecs",
    name: "Vspecs",
    component: Vspecs,
  },
  {
    path: "/viewstatus",
    name: "Vstatus",
    component: Vstatus,
  },
  {
    path: "/listincidents",
    name: "ViewIncidents",
    component: ViewIncidents,
  },

  {
    path: "/viewincident",
    name: "IncidentDetails",
    component: IncidentDetails,
  },

  {
    path: "/incidentdetails",
    name: "DrillIncident",
    component: DrillIncident,
  },

  {
    path: "/viewdriver",
    name: "Vdriver",
    component: Vdriver,
  },
  {
    path: "/booknewtruck",
    name: "Newbooking",
    component: Newbooking,
  },
  {
    path: "/bookings",
    name: "Cbookings",
    component: Cbookings,
  },
  {
    path: "/showroute",
    name: "RouteMap",
    component: RouteMap,
  },
  {
    path: "/viewdestdetails",
    name: "Vdestdetail",
    component: Vdestdetail,
  },
  {
    path: "/payment",
    name: "PayReq",
    component: PayReq,
  },
  {
    path: "/verifyoperator",
    name: "VerifyOptr",
    component: VerifyOptr,
  },
  {
    path: "/verifytruck",
    name: "VerifyTruck",
    component: VerifyTruck,
  },
  {
    path: "/addnewadmin",
    name: "AddAdmin",
    component: AddAdmin,
  },
  {
    path: "/adminviewoptr",
    name: "ViewOperator",
    component: ViewOperator,
  },
  {
    path: "/adminviewtruck",
    name: "ViewTruck",
    component: ViewTruck,
  },
  //
  {
    path: "/driverpage",
    name: "Dpage",
    component: Dpage,
  },
  //
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
