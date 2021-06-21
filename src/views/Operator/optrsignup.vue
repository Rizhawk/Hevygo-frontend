<template>
  <v-app id="osign">
    <Navbar />
    <v-layout row wrap class="my-3">
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
          <!--Operator signup form begining -->

          <form id="osignup" @submit.prevent="osignup">
            <v-layout class="my-2" row wrap>
              <v-flex class="mx-3"
                ><p class="font-weight-black subtitle-1 white--text">
                  Create your operator account
                </p></v-flex
              ><v-flex></v-flex>
            </v-layout>
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required"
            >
              <v-text-field
                v-model="name"
                :error-messages="errors"
                label="Operator Name"
                outlined
                dark
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
              dark
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
              dark
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
                maxlength="10"
                :append-icon="icon"
                @input="checkPhone"
                outlined
                dark
                dense
              ></v-text-field>
            </validation-provider>
            <v-text-field
              v-if="otpfield"
              v-model="otp"
              label="OTP"
              @input="verified()"
              maxlength="6"
              outlined
              dark
              dense
            ></v-text-field>
            <validation-provider v-slot="{ errors }" name="email" rules="email">
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="E-mail"
                :append-icon="icon2"
                @input="checkEmail"
                outlined
                dark
                dense
              ></v-text-field>
            </validation-provider>
            <v-layout class="my-1" row wrap>
              <v-flex lg2></v-flex>
              <v-flex class="mx-10">
                <v-btn
                  color="primary"
                  class="mr-4"
                  type="submit"
                  dark
                  block
                  depressed
                  small
                  :disabled="invalid"
                >
                  Continue
                </v-btn>
              </v-flex>
              <v-flex lg2></v-flex>
            </v-layout>
            <v-layout class="my-2" row wrap>
              <v-flex lg2></v-flex>
              <v-flex>
                <span class="mx-13 white--text caption"
                  >Already have an account?<router-link to="/login"
                    >Login</router-link
                  ></span
                >
              </v-flex>
            </v-layout>
          </form>

          <!--Operator signup form ends -->
        </validation-observer>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import Navbar from "../../components/Navbar";
import { getAPI } from "../../axios-api";
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
      otp: "",
      otpfield: false,
      snackbar: false,
      snackbar2: false,
      message: "",
      message2: "",
      icon: "",
      icon2: "",
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
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
      this.$refs.observer.reset();
    },
    osignup() {
      this.$refs.observer.validate();
      getAPI
        .post("/api/accounts/register/", {
          phone: this.phone,
          otp: this.otp,
          name: this.name,
          password: this.password,
          password2: this.password2,
          user_type: this.user_type,
          email: this.email,
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 200) {
            this.clear();
            this.$session.set("user_token", this.APIData.data["token"]);
            this.$router.push({ name: "Padd" });
          } else {
            this.message = "Registration Failed";
            this.snackbar2 = true;
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    checkPhone() {
      if (this.phone.length == 10) {
        getAPI
          .get("api/accounts/check/?phone=" + this.phone)
          .then((response) => {
            this.APIData = response.data;
            if (this.APIData.data["new_phone"] == false) {
              this.message2 = `Phonenumber ${this.phone} is already exist`;
              this.icon = "mdi-close-circle-outline";
              this.snackbar2 = true;
            } else {
              this.genOtp();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    checkEmail() {
      if (this.email.slice(this.email.length - 4) == ".com") {
        getAPI
          .get("api/accounts/check/?email=" + this.email)
          .then((response) => {
            this.APIData = response.data;
            if (this.APIData.data["new_email"] == false) {
              this.message2 = `Email Id ${this.email} is already exist`;
              this.icon2 = "mdi-close-circle-outline";
              this.snackbar2 = true;
            } else {
              this.icon2 = "mdi-checkbox-marked-circle-outline";
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
            this.message = ` Your OTP is ${this.APIData.data["OTP"]}`;
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
      } else {
        this.icon = "mdi-close-circle-outline";
      }
    },
  },
};
</script>
<style scoped>
#osignup {
  border: solid white 1px;
  padding: 30px;
  border-radius: 30px;
  background-color: black;
  opacity: 0.8;
}
#osign {
  background: url("../../assets/truck-12.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  margin: auto;
  padding: 0;
}
</style>
