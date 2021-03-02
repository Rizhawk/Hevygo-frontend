<template>
  <v-app id="csign">
    <Navbar />
    <v-layout class="my-3" row wrap>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-flex xs10 sm8 md6 lg4>
        <!--Customer Sign Up form begining -->
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form id="csignup" @submit.prevent="submit">
            <v-layout class="my-2" row wrap>
              <v-flex class="mx-3"><h2>Sign Up to Continue</h2></v-flex
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
                label="Customer Name"
                outlined
                rounded
                dense
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
                  :disabled="invalid"
                  @click.prevent="csignup"
                >
                  Sign Up
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex lg2></v-flex>
              <v-flex class="my-3 mx-8">
                <span
                  >Already have an account?<router-link to="/login"
                    >Login</router-link
                  ></span
                >
              </v-flex>
            </v-layout>
          </form>
        </validation-observer>
        <!--Customer Sign Up form end -->
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

// Custom Validation for the form input

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
      user_type: 2,
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
    clear() {
      this.name = "";
      this.phone = "";
      this.email = "";
      this.password = "";
      this.password2 = "";
      this.$refs.observer.reset();
    },
    //Function to call Api after click on the signup button

    csignup() {
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
          console.log(this.APIData["response"]);
          this.$session.start();
          this.$session.set("user_token", response.data.token);
          this.clear();
          this.bookTruck();
        })
        .catch((err) => {
          alert(err);
        });
    },
    bookTruck() {
      getAPI
        .post(
          "/api/customer/cust-dest-create/",
          {
            start_location: localStorage.getItem("sl"),
            end_location: localStorage.getItem("el"),
            weight: localStorage.getItem("wt"),
            goods_type: localStorage.getItem("gt"),
            date: localStorage.getItem("dt"),
          },
          {
            headers: {
              Authorization: ` Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          console.log(this.APIData);
          localStorage.clear();
          this.$router.push({ name: "HereMap" });
        })
        .catch((err) => {
          alert(err);
        });
    },

    //function to reset input field empty
  },
};
</script>
<style scoped>
#csignup {
  border: solid black 2px;
  padding: 30px;
  border-radius: 30px;
  background-color: white;
}
#csign {
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
