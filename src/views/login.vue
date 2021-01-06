<template>
  <v-container class="mx-10">
    <v-row justify="space-around">
      <v-hover>
        <template v-slot:default="{ hover }">
          <div class="my-10">
            <v-card
              :elevation="hover ? 24 : 6"
              class="my-15 black--text"
              width="400"
              outlined
              shaped
            >
              <v-card-title class="mx-15"
                ><h2 class="mx-15">Login</h2></v-card-title
              >
              <!--Login section-->
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form class="mx-8" @submit.prevent="submit">
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
                  <v-text-field
                    v-model="password"
                    label="Password"
                    name="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                  <div class="mx-12">
                    <v-btn
                      color="primary"
                      class="mx-12"
                      type="submit"
                      width="50%"
                      :disabled="invalid"
                    >
                      Login
                    </v-btn>
                  </div>
                 <v-card-text>
                  <div class="my-2 mx-5">
                  </div>
                </v-card-text>
                </form>
              </validation-observer>
              <!--Login form ends-->
            </v-card>
          </div>
        </template>
      </v-hover>
    </v-row>
  </v-container>
</template>
<script>
import { required, digits, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

//Custom validation begining

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

//Custom validation ends

export default {
  name: "Login",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => {
    return {
      phoneNumber: "",
      show1: false,
      password: "",
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
  },
};
</script>
