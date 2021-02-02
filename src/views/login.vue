<template>
  <v-app id="login">
    <v-layout row wrap class="my-15">
      <v-flex lg4></v-flex>
      <v-flex xs12 sm8 md6 lg4>
        <!--Login form begining-->
        <form id="loginform" @submit.prevent="submit">
          <v-layout class="my-2" row wrap><v-flex></v-flex></v-layout>
          <v-text-field
            v-model="phone"
            placeholder="Phone Number"
            rounded
            solo
            dense
          ></v-text-field>
          <v-text-field
            v-model="password"
            placeholder="Password"
            name="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            rounded
            solo
            dense
          ></v-text-field>
          <v-layout row wrap>
            <v-flex lg2></v-flex>
            <v-flex class="mx-10 my-3">
              <v-btn
                rounded
                color="primary"
                class="my-2"
                type="submit"
                width="70%"
                @click.prevent="login"
              >
                Login
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    <!--Login form ends-->
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
export default {
  name: "Login",
  components: {},
  data: () => {
    return {
      phone: "",
      show1: false,
      password: "",
      token: null,
      passwordRules: [
        (value) => !!value || "Please type password.",
        (value) => (value && value.length >= 6) || "Invalid password",
      ],
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
          localStorage.setItem("user_token", response.data.token);
          this.APIData = response.data;
          if (response.data.user_type == 1) {
            this.$router.push({ name: "Opage" });
          } else if (response.data.user_type == 2) {
            this.$router.push({ name: "Cpage" });
          } else if (response.data.user_type == 3) {
            this.$router.push({ name: "Dpage" });
          }
        })
        .catch((err) => {
          localStorage.removeItem("user_token");
          alert("Invalid Credentials");
          console.log(err.message);
        });
    },
  },
};
</script>
