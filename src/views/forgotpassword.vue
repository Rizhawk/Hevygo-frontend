<template>
  <v-app class="reset">
    <v-layout class="my-15" row wrap>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-snackbar
        v-model="snackbar"
        multi-line
        color="teal darken-4"
        timeout="10000"
      >
        {{ this.message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        color="red darken-4"
        top
        text-color="white"
        v-model="snackbar2"
        timeout="5000"
      >
        {{ this.message2 }}
      </v-snackbar>
      <v-flex xs10 sm8 md6 lg4>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form class="resetform" @submit.prevent="reset">
            <v-flex row wrap>
              <p class="mx-3 my-2 white--text font-weight-black subtitle-1">
                Reset Password
              </p>
            </v-flex>
            <v-flex class="my-4"></v-flex>
            <v-text-field
              v-model="phone"
              label="Phone Number"
              maxlength="10"
              :append-icon="icon"
              @input="checkPhone"
              dark
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-if="otpfield"
              v-model="otp"
              label="OTP"
              @input="verified"
              maxlength="6"
              dark
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="password"
              v-if="pass1"
              label="New Password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                (value) => !!value || 'Please type password.',
                (value) =>
                  (value && value.length >= 6) || 'minimum 6 characters',
              ]"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              dark
              outlined
              dense
            ></v-text-field>
            <validation-provider
              v-slot="{ errors }"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                v-model="password2"
                v-if="pass2"
                :error-messages="errors"
                label="Confirm Password"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  !!password2 || 'type confirm password',
                  password === password2 ||
                    'The password confirmation does not match.',
                ]"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                dark
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <v-layout row wrap>
              <v-flex lg3></v-flex>
              <v-flex class="mx-4">
                <v-btn
                  color="primary"
                  type="submit"
                  class="my-2"
                  dark
                  block
                  small
                  depressed
                  :disabled="invalid"
                >
                  Reset
                </v-btn>
              </v-flex>
              <v-flex lg3></v-flex>
            </v-layout>
          </form>
        </validation-observer>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "Required",
});
export default {
  name: "ForgotPass",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => {
    return {
      phone: "",
      icon: "",
      otp: "",
      otpfield: false,
      password: "",
      password2: "",
      show1: false,
      show2: false,
      pass1: false,
      pass2: false,
      snackbar: false,
      message: "",
      snackbar2: false,
      message2: "",
    };
  },
  methods: {
    reset() {
      this.$refs.observer.validate();
      getAPI
        .post("/api/accounts/forgot_password/", {
          phone: this.phone,
          otp: this.otp,
          password_new: this.password,
        })
        .then((response) => {
          this.APIData = response.data;
          this.clear();
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err);
          this.message2 = "Password reset has been failed.";
          this.snackbar2 = true;
        });
    },
    clear() {
      (this.phone = ""),
        (this.otp = ""),
        (this.password = ""),
        (this.password2 = "");
    },
    checkPhone() {
      if (this.phone.length == 10) {
        getAPI
          .get("api/accounts/check/?phone=" + this.phone)
          .then((response) => {
            this.APIData = response.data;
            if (this.APIData.data["new_phone"] == false) {
              this.genOtp();
            } else {
              this.message2 = `User with Phonenumber ${this.phone} does not exist`;
              this.icon = "mdi-close-circle-outline";
              this.snackbar2 = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    genOtp() {
      if (this.phone.length == 10) {
        getAPI
          .get("api/accounts/otp_gen/?phone=" + this.phone)
          .then((response) => {
            this.APIData = response.data;
            this.otp = "";
            this.otpfield = true;
            this.message = `Your OTP is ${this.APIData.data["OTP"]}`;
            this.snackbar = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    verified() {
      if ((this.otp.length == 6) & (this.otp == this.APIData.data["OTP"])) {
        this.icon = "mdi-checkbox-marked-circle-outline";
        this.pass1 = true;
        this.pass2 = true;
      } else {
        this.icon = "mdi-close-circle-outline";
        this.pass1 = false;
        this.pass2 = false;
      }
    },
  },
};
</script>
<style scoped>
.reset {
  background: url("../assets/truck-12.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  margin: auto;
  padding: 0;
}
.resetform {
  border: solid white 1px;
  padding: 35px;
  border-radius: 25px;
  background-color: black;
  opacity: 0.8;
}
</style>