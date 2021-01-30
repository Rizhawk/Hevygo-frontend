<template>
  <v-container class="mx-10">
    <v-row justify="space-around">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            :elevation="hover ? 24 : 6"
            class="my-8 black--text"
            width="400"
            outlined
            shaped
          >
            <v-card-title class="mx-10"
              ><h2 class="mx-15">Sign Up</h2></v-card-title
            >
            <validation-observer ref="observer" v-slot="{ invalid }">
              <!--Operator signup form begining -->

              <form class="mx-8" @submit.prevent="submit">
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required|max:10"
                >
                  <v-text-field
                    v-model="name"
                    :error-messages="errors"
                    label="Operator Name"
                    required
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
                    required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="email"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="E-mail"
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  rules="required"
                  name="checkbox"
                >
                  <v-checkbox
                    v-model="checkbox"
                    :error-messages="errors"
                    value="1"
                    label="Above details are correct"
                    type="checkbox"
                    required
                  ></v-checkbox>
                </validation-provider>

                <div class="mx-12">
                  <v-btn
                    color="primary"
                    class="mr-4"
                    type="submit"
                    :disabled="invalid"
                    @click.prevent="osignup"
                  >
                    Sign Up
                  </v-btn>
                  <v-btn @click="clear"> clear </v-btn>
                </div>
                <v-card-text>
                  <div class="my-2">
                    <span class="mx-12"
                      >Already have an account?<router-link to="/login">Login</router-link></span
                    >
                  </div>
                </v-card-text>
              </form>

              <!--Operator signup form ends -->
            </validation-observer>
          </v-card>
        </template>
      </v-hover>
    </v-row>
  </v-container>
</template>
<script>
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
  },
  data: () => {
    return {
      name: "",
      phone: "",
      email: null,
      show1: false,
      show2: false,
      checkbox: null,
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
          alert(response.message);
          this.APIData = response.data;
          console.log(this.APIData);
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          alert(err);
        });
    },
    //Function to set input field empty

    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.checkbox = null;
      this.$refs.observer.reset();
    },
  },
};
</script>
