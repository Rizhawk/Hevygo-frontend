<template>
  <v-app id="home">
    <Navbar />
    <v-layout class="my-8 mx-10" row wrap>
      <v-flex class="mx-10" xs12 sm6 md12 lg6>
        <h3 class="white--text my-15 font-weight-bold mb-5">Welcome to</h3>
        <h1 class="white--text display-3 font-weight-bold mb-5">HEVYGO</h1>
        <v-flex lg12 md6 xs12>
          <p class="white--text text-sm-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            quidem laudantium hic, tempore ratione aliquam porro voluptatem
            aspernatur sint nulla sit adipisci repellat ipsam qui molestias
            asperiores quae maiores deserunt!
          </p></v-flex
        >
        <v-btn class="btn" rounded elevation="5" router to="/booktruck">
          Book your Truck Now</v-btn
        >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <router-link id="link" to="/optrsignup"
              ><p v-bind="attrs" v-on="on" class="my-2 mx-8 bold white--text">
                Do you have Trucks?
              </p></router-link
            >
          </template>
          <span>Create your Operator Account Now</span>
        </v-tooltip>
      </v-flex>
    
    </v-layout>
    <Footer/>
  </v-app>
</template>
<script>
import Footer from '../components/footer';
import Navbar from "../components/Navbar";
export default {
  name: "Home",
  components: {
    Navbar,
    Footer
  },
  data:()=>{
    return{
    }
  }
};
</script>
<style scoped>
#home {
  background: url("../assets/truck-12.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  margin: auto;
  padding: 0;
  background-color: black;
}
.btn {
  cursor: pointer;
  background: transparent;
  border: 2px solid white;
  outline: none;
  transition: 1s ease-in-out;
}
.btn:hover {
  transition: 1s ease-in-out;
  background: steelblue;
}

.btn:hover svg {
  stroke-dashoffset: -480;
}
.btn span {
  color: white;
  font-size: 18px;
  font-weight: 100;
}
</style>



