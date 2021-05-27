<template>
  <v-app>
    <Opage />
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
        <validation-observer ref="observer1" v-slot="{ invalid }">
          <form id="form2" @submit.prevent="submit">
            <v-layout
              ><v-flex
                ><p class="headline font-weight-bold">
                  Fill the details
                </p></v-flex
              ></v-layout
            >
            <validation-provider v-slot="{ errors }" name="Name">
              <v-text-field
                v-model="name"
                :error-messages="errors"
                label="Name of your truck"
                clearable
                outlined
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <v-text-field
              v-model="password"
              label="Password *"
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
              label="Confirm Password *"
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
                label=" Phone number to contact your truck *"
                maxlength="10"
                :append-icon="icon"
                @input="checkPhone"
                outlined
                rounded
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
              rounded
              dense
            ></v-text-field>
            <v-card-text>
              <span>*indicate fields are necessary</span>
            </v-card-text>
            <v-layout row wrap>
              <v-flex lg3></v-flex>
              <v-flex class="my-2">
                <v-btn
                  type="submit"
                  @click.prevent="tsignup"
                  :disabled="invalid"
                  color="primary"
                  rounded
                  small
                  depressed
                  block
                  >Save</v-btn
                >
              </v-flex>
              <v-flex lg3></v-flex>
            </v-layout>
          </form>
        </validation-observer>
      </v-flex>
      <!-- </v-card> -->
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
import Opage from "../components/optrpage";
import { required, digits, max, min } from "vee-validate/dist/rules";
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
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    Opage,
  },
  name: "Treg",
  data: () => {
    return {
      message: "",
      snackbar: false,
      message2: "",
      snackbar2: false,
      drawer: false,
      tick: false,
      group: null,
      show1: false,
      show2: false,
      next: false,
      icon: "",
      name: null,
      phone: "",
      otpfield: false,
      otp: "",
      password: "",
      password2: "",
      user_type: 3,
      phnerr: "user with this phone already exists.",
      passwordRules: [
        (value) => !!value || "Please type password.",
        (value) => (value && value.length >= 6) || "minimum 6 characters",
      ],
    };
  },
  methods: {
    submit() {
      this.$refs.observer1.validate(); //Truck registration
    },
    clear() {
      (this.phone = ""),
        (this.password = ""),
        (this.password2 = ""),
        (this.name = ""),
        this.$refs.observer1.reset();
    },
    tsignup() {
      getAPI
        .post(
          "/api/accounts/register_crew/",
          {
            name: this.name,
            phone: this.phone,
            otp: this.otp,
            password: this.password,
            password2: this.password2,
            user_type: this.user_type,
            email: null,
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
          if (this.APIData.Http_response == 200) {
            this.$router.push({ name: "Tadd" });
          } else {
            this.message2 = "Truck Registration Failed";
            this.snackbar2 = true;
          }
        })
        .catch((err) => {
          console.log(err);
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
#form2 {
  border: solid #1a237e 2px;
  padding: 30px;
  border-radius: 15px;
}
</style>