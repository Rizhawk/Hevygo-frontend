<template>
  <v-app id="osign">
    <Navbar />
    <v-layout row wrap class="my-3">
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-flex xs10 sm8 md6 lg4>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <!--Operator signup form begining -->

          <form id="osignup" @submit.prevent="submit">
            <v-layout class="my-2" row wrap>
              <v-flex class="mx-3"><p class="font-weight-bold">Create your operator account</p></v-flex
              ><v-flex></v-flex>
            </v-layout>
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:10"
            >
              <v-text-field
                v-model="name"
                :error-messages="errors"
                label="Operator Name"
                outlined
                rounded
                dense
                clearable
              ></v-text-field>
            </validation-provider>
            <v-text-field
              v-model="password"
              label="Password"
              name="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              outlined
              rounded
              dense
              clearable
            ></v-text-field>
            <v-text-field
              v-model="password2"
              label="Confirm Password"
              name="confirmPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                !!password2 || 'type confirm password',
                password === password2 ||
                  'The password confirmation does not match.',
              ]"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
              outlined
              rounded
              dense
              clearable
            ></v-text-field>

            <validation-provider
              v-slot="{ errors }"
              name="Phone Number"
              :rules="{
                required: true,
                digits: 10,
              }"
            >
              <v-text-field
                v-model="phone"
                :error-messages="errors"
                label="Phone Number"
                outlined
                rounded
                dense
                clearable
              ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="email" rules="email">
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="E-mail"
                outlined
                rounded
                dense
                clearable
              ></v-text-field>
            </validation-provider>
            <v-layout row wrap>
              <v-flex lg3></v-flex>
              <v-flex class="mx-10">
                <v-btn
                  color="primary"
                  class="mr-4"
                  type="submit"
                  rounded
                  small
                  :disabled="invalid"
                  @click.prevent="osignup"
                >
                  Sign Up
                </v-btn>
              </v-flex>
              <v-layout class="my-1" row wrap>
                <v-flex lg2></v-flex>
                <v-flex>
                  <span class="mx-8 black--text"
                    >Already have an account?<router-link to="/login"
                      >Login</router-link
                    ></span
                  >
                </v-flex>
              </v-layout>
            </v-layout>
          </form>

          <!--Operator signup form ends -->
        </validation-observer>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import Navbar from "../components/Navbar";
import { getAPI } from "../axios-api";
import { required, digits, email, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");
//Custom validation form input fields

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("min", {
  ...min,
  message: "{_field_}  should be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

//Custom validation ends

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Navbar,
  },
  data: () => {
    return {
      name: "",
      phone: "",
      email: null,
      show1: false,
      show2: false,
      user_type: 1,
      password: "",
      password2: "",
      passwordRules: [
        (value) => !!value || "Please type password.",
        (value) => (value && value.length >= 6) || "minimum 6 characters",
      ],
    };
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    //Function to call Api after click on the signup button
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.$refs.observer.reset();
    },
    osignup() {
      getAPI
        .post("/api/accounts/register/", {
          phone: this.phone,
          name: this.name,
          password: this.password,
          password2: this.password2,
          user_type: this.user_type,
          email: this.email,
        })
        .then((response) => {
          this.APIData = response.data;
          this.clear();
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          alert(err);
        });
    },
    //Function to set input field empty
  },
};
</script>
<style scoped>
#osignup {
  border: solid black 2px;
  padding: 30px;
  border-radius: 30px;
  background-color: white;
}
#osign {
  background: url("../assets/truck-12.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  margin: auto;
  padding: 0;
}
</style>
