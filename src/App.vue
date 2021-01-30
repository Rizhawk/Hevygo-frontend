<template>
   <v-app class="grey lighten-4">
    <Navbar  v-if="!['Cpage','Opage','Tmanage','Tdrivers','Tstatus','Treg','Tadd','Padd','Dreg','Tdetails','Editdrivers','Tstats'].includes($route.name)" />
    <v-main>
      <router-view></router-view>
    </v-main>   
      <Footer v-if="!['Cpage','Opage','Tmanage','Tdrivers','Tstatus','Treg','Tadd','Padd','Dreg','Tdetails','Editdrivers','Tstats'].includes($route.name)"/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/footer';
export default {
  name: 'App',

  components: {
    Navbar,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
