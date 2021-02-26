<template>
  <v-app id="login">
    <Navbar />
    <v-layout class="my-15" row wrap>
      <v-flex xs2 sm2 md2 lg4></v-flex>
      <v-flex xs12 sm8 md6 lg4>
        <!--Login section-->
        <form id="loginform" @submit.prevent="submit">
          <v-layout row flex><v-flex class="my-4"></v-flex></v-layout>
          <v-text-field
            v-model="phone"
            label="Phone Number"
            rounded
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            name="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            rounded
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
                type="submit"
                width="50%"
                rounded
                @click.prevent="login"
              >
                Login
              </v-btn>
            </v-flex>
            <v-flex lg2></v-flex>
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
    };
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    login() {
      //Login API Call
      getAPI
        .post("/api/accounts/login/", {
          username: this.phone,
          password: this.password,
        })
        .then((response) => {
          this.$session.start();
          this.$session.set('user_token', response.data.token);
          this.APIData = response.data;
          if (response.data.user_type == 1) {
            this.$router.push({ name: "Treg" });
          } else if (response.data.user_type == 2) {
            this.$router.push({ name: "Bnewtruck" });
          } else if (response.data.user_type == 3) {
            this.$router.push({ name: "Dpage" });
          }
        })
        .catch((err) => {
          localStorage.clear();
          console.log(err);
          alert("Invalid Credentials");
        });
    },
  },
};
</script>
<style scoped>
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
  border: solid black 2px;
  padding: 35px;
  border-radius: 30px;
  background-color: white;
}
</style>
