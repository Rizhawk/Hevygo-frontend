<template>
 <nav>
   <Opage/>
   <v-container class="my-5">
        <v-layout  row wrap justify-center class="mx-10">
          <v-flex xs12 md6 lg4>
           <h1>Drivers Management</h1>
          </v-flex>
        </v-layout>
    </v-container>
 </nav>
 
</template>
<script>
import Opage from '../views/optrpage';

export default {
  components: {Opage },
  name: "Tdrivers",
};
</script>