<template>
  <v-app id="csign">
    <Navbar />
    <v-layout class="my-3" row wrap>
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
        <!--Customer Sign Up form begining -->
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form id="csignup" @submit.prevent="csignup(invalid)">
            <v-layout class="my-2" row wrap>
              <v-flex class="mx-3"
                ><p class="white--text subtitle-1 font-weight-black">
                  Sign Up to Continue
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
                label="Name *"
                dark
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              name="Password"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="password"
                label="Password *"
                name="password"
                :error-messages="errors"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                dark
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              name="Confirmation"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="password2"
                label="Confirm Password *"
                name="confirmPassword"
                :error-messages="errors"
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
                label="Phone Number *"
                maxlength="10"
                :append-icon="icon"
                @input="checkPhone"
                dark
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <v-text-field
              v-if="otpfield"
              v-model="otp"
              label="Enter OTP *"
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
                @input="checkEmail"
                :append-icon="icon2"
                dark
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <v-layout row wrap>
              <v-flex lg2></v-flex>
              <v-flex class="mx-10">
                <v-btn
                  color="primary"
                  class="mr-4"
                  type="submit"
                  block
                  small
                  depressed
                >
                  Sign Up
                </v-btn>
              </v-flex>
              <v-flex lg2></v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex lg2></v-flex>
              <v-flex class="my-4 mx-8">
                <span class="white--text caption"
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

// Custom Validation for the form input

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "required",
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
      icon: "",
      icon2: "",
      message: "",
      message2: "",
      email: null,
      show1: false,
      show2: false,
      password: "",
      password2: "",
      startlocation: localStorage.getItem("sl"),
      endlocation: localStorage.getItem("el"),
    };
  },

  methods: {
    clear() {
      this.name = "";
      this.phone = "";
      this.email = "";
      this.password = "";
      this.password2 = "";
      this.$refs.observer.reset();
    },
    //Function to call Api after click on the signup button

    csignup(invalid) {
      this.$refs.observer.validate();
      if (this.password === this.password2) {
        if (invalid == false) {
          getAPI
            .post("/api/accounts/register/", {
              phone: this.phone,
              otp: this.otp,
              name: this.name,
              password: this.password,
              password2: this.password2,
              user_type: 2,
              email: this.email,
            })
            .then((response) => {
              this.APIData = response.data;
              if (this.APIData.Http_response == 200) {
                this.$session.start();
                this.$session.set("user_token", this.APIData.data["token"]);
                this.$session.set(
                  "user_name",
                  this.APIData.data.user_info.name
                );
                this.$session.set("user_id", this.APIData.data.user_info.id);
                this.clear();
                this.bookTruck();
              } else {
                this.message = "Registration Failed";
                this.snackbar2 = true;
              }
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          alert("Invalid form.");
        }
      } else {
        alert("Password confirmation failed.");
      }
    },
    bookTruck() {
      getAPI
        .post(
          "/api/customers/cust-dest-create/",
          {
            start_location: localStorage.getItem("sl"),
            start_address: localStorage.getItem("sladdr"),
            end_location: localStorage.getItem("el"),
            end_address: localStorage.getItem("eladdr"),
            weight: localStorage.getItem("wt"),
            goods_type: localStorage.getItem("gt"),
            date: "2020-10-05",
            vehicle_type: localStorage.getItem("vt"),
          },
          {
            headers: {
              Authorization: ` Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.$session.set("sl", this.APIData.data.start_location);
          this.$session.set("el", this.APIData.data.end_location);
          localStorage.clear();
          this.$router.push({ name: "RouteMap" });
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
            this.otpfield = true;
            this.otp = "";
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
#csignup {
  border: solid white 1px;
  padding: 30px;
  border-radius: 30px;
  background-color: black;
  opacity: 0.8;
}
#csign {
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
