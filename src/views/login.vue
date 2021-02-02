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
                      v-model="phone"
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
                      @click.prevent="login"
                    >
                      Login
                    </v-btn>
                  </div>
                  <v-card-text>
                    <div class="my-2 mx-5"></div>
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
import { getAPI } from "../axios-api";
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
        .post("/api/accounts/login", {
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
          alert(err.message);
        });
    },
  },
};
</script>