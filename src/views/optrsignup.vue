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
                  v-model="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[
                    !!confirmPassword || 'type confirm password',
                    password === confirmPassword ||
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
                    v-model="phoneNumber"
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
                  >
                    Sign Up
                  </v-btn>
                  <v-btn @click="clear"> clear </v-btn>
                </div>
                <v-card-text>
                  <div class="my-2">
                    <span class="mx-12"
                      >Already have an account?<a href="">Login</a></span
                    >
                  </div>
                </v-card-text>
              </form>
            </validation-observer>
          </v-card>
        </template>
      </v-hover>
    </v-row>
  </v-container>
</template>
<script>
import { required, digits, email, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

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

//   extend('regex', {
//     ...regex,
//     message: '{_field_} {_value_} does not match {regex}',
//   })

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => {
    return {
      name: "",
      phoneNumber: "",
      email: "",
      show1: false,
      show2: false,
      checkbox: null,
      usertype:2,
      password: "",
      confirmPassword: "",
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
