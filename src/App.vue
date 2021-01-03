<template>
   <v-app class="grey lighten-4">
    <Navbar  v-if="!['Cpage','Opage'].includes($route.name)" />
    <v-content>
      <router-view></router-view>
    </v-content>
   
      <Footer v-if="!['Cpage','Opage'].includes($route.name)"/>
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
