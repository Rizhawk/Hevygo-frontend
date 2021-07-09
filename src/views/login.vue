<template>
  <v-app id="login">
    <Navbar />
    <v-layout class="my-15" row wrap>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-snackbar
        rounded="md"
        top
        light
        color="red darken-4"
        v-model="snackbar"
        timeout="3000"
        ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
      >
      <v-flex xs10 sm8 md6 lg4>
        <!--Login section-->
        <form id="loginform" @submit.prevent="login">
          <v-text-field
            v-model="phone"
            label="Phone Number"
            autofocus
            dark
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            name="password"
            dark
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            outlined
            dense
          ></v-text-field>

          <v-layout row wrap>
            <v-flex lg2></v-flex>
            <v-flex class="mx-4">
              <v-btn
                color="primary"
                class="my-2"
                block
                small
                depressed
                type="submit"
                width="50%"
              >
                Login
              </v-btn>
            </v-flex>
            <v-flex lg2></v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex lg4></v-flex>
            <v-flex class="mx-4">
              <router-link to="/forgotpassword" class="link">
                <p class="white--text my-3 caption">
                  Forgot Password?
                </p></router-link
              >
            </v-flex>
            <v-flex lg4></v-flex>
          </v-layout>
        </form>
        <!--Login form ends-->
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import Navbar from "../components/Navbar";
import { getAPI } from "../axios-api";
export default {
  name: "Login",
  components: { Navbar },
  data: () => {
    return {
      phone: "",
      show1: false,
      password: "",
      snackbar: false,
      message: "",
    };
  },
  methods: {
    login() {
      //Login API Call
      getAPI
        .post("api/accounts/login/", {
          username: this.phone,
          password: this.password,
        })
        .then((response) => {
          this.APIData = response.data;
          this.$session.start();
          this.$session.set("user_token", this.APIData.data["token"]);
          this.$session.set("user_name", this.APIData.data["username"]);
          this.$session.set("user_id", this.APIData.data["user_id"]);
          if (this.APIData.data["user_type"] == 1) {
            this.$router.push({ name: "Dashboard" });
          } else if (this.APIData.data["user_type"] == 2) {
            this.$router.push({ name: "Newbooking" });
          } else if (this.APIData.data["user_type"] == 3) {
            this.$router.push({ name: "Dpage" });
          } else if (this.APIData.data["user_type"] == 4) {
            this.$router.push({ name: "Admin" });
          }
        })
        .catch((err) => {
          console.log(err);
          this.message = "Login failed due to Invalid Credentials ";
          this.snackbar = true;
        });
    },
  },
};
</script>
<style scoped>
.link {
  text-decoration: none;
}
#login {
  background: url("../assets/truck-12.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  margin: auto;
  padding: 0;
}
#loginform {
  border: solid white 1px;
  padding: 35px;
  border-radius: 25px;
  background-color: black;
  opacity: 0.8;
}
</style>
