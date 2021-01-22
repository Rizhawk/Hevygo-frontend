import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Booking from '../views/booktruck.vue'
import Login from '../views/login.vue';
import Csignup from '../views/custsignup.vue';
import Osignup from '../views/optrsignup.vue';
import Cpage from '../views/custpage.vue';
import Opage from '../views/optrpage.vue';
import Tdrivers from '../views/managedrivers.vue';
import Tmanage from '../views/managetrucks.vue';
import Tstatus from '../views/truckstatus.vue';
import Dpage from '../views/driverpage.vue';
import Treg from '../views/registertruck';
import Tadd from '../views/truckadd';
import Dreg from '../views/driveradd';
import Padd from '../views/panadd';
import Tdetails from '../views/truckdetails';
import Editdetails from '../views/editdetails';
import Regedit from '../views/editreg';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/booktruck',
    name:'Booking',
    component:Booking

  },
  {
    path:'/login',
    name:'Login',
    component:Login

  },
  {
    path:'/custsignup',
    name:'Csignup',
    component:Csignup

  },
  {
    path:'/optrsignup',
    name:'Osignup',
    component:Osignup

  },
  {
    path:'/custpage',
    name:'Cpage',
    component:Cpage

  },
  {
    path:'/optrpage',
    name:'Opage',
    component:Opage

  },
  {
    path:'/managedrivers',
    name:'Tdrivers',
    component:Tdrivers

  },
  {
    path:'/managetrucks',
    name:'Tmanage',
    component:Tmanage

  },
  {
    path:'/truckstatus',
    name:'Tstatus',
    component:Tstatus

  },
  {
    path:'/driverpage',
    name:'Dpage',
    component:Dpage

  },
  {
    path:'/registertruck',
    name:'Treg',
    component:Treg

  },
  {
    path:'/truckadd',
    name:'Tadd',
    component:Tadd

  },
  {
    path:'/driveradd',
    name:'Dreg',
    component:Dreg
  },
  {
    path:'/panadd',
    name:'Padd',
    component:Padd
  },
  {
    path:'/truckdetails',
    name:'Tdetails',
    component:Tdetails
  },
  {
    path:'/editdetails',
    name:'Editdetails',
    component:Editdetails
  },
  {
    path:'/editreg',
    name:'Regedit',
    component:Regedit
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
