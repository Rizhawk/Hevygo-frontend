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
import Dpage from '../views/driverpage.vue'
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

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
