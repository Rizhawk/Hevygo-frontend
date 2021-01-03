<template>
  <v-parallax
    class="my-1"
    src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
  >
    <div class="row">
      <div class="col-4"></div>
      <div class="col-8">
        <v-container fluid class="my-10">
          <v-layout row wrap class="pa-3">
            <v-flex class="my-10">
              <div class="mx-7 caption">
                <h1 class="mx-15 display-1 light">Welcome to</h1>
              </div>
              <div class="caption"><h1 class="display-4 bold">HEVYGO</h1></div>
              <div class="caption">
                <h1 class="mx-12 light font-italic">
                  Ship everything faster..
                </h1>
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex row wrap class="pa-3 mx-5">
              <div class="mx-10 text-center">
                <v-btn
                  router
                  to="/booktruck"
                  rounded
                  color="primary"
                  dark
                  class="pd-5"
                >
                  Book your Truck Now</v-btn
                >
              </div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex row wrap class="pa-3 mx-15">
              <span class="mx-10"><p class="mx-15 my-1">Or</p></span>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex row wrap class="pa-3 mx-5">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span class="mx-15">
                    <a v-bind="attrs" v-on="on" href="/optrsignup"
                      ><p class="mx-5 bold white--text">
                        Do you have Trucks?
                      </p></a
                    >
                  </span>
                </template>
                <span>Create your Operator Account Now</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </v-parallax>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>
<style>
a {
  text-decoration: none;
}
</style>



