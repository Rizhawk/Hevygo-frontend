<template>
  <v-app>
    <Opage />
    <v-layout class="my-10" row wrap>
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
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline"> Add your Pan card </v-card-title>

          <v-card-text>
            You can register a new driver , only after add your pan card
            details.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">
              Later
            </v-btn>

            <v-btn color="green darken-1" text @click="panadding">
              Add now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-flex xs10 sm8 md6 lg4>
        <validation-observer ref="observer3" v-slot="{ invalid }">
          <form id="form6" @submit.prevent="adddriver">
            <validation-provider
              v-slot="{ errors }"
              name="Driver Name"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                v-model="driver_name"
                :error-messages="errors"
                label="Driver Name *"
                outlined
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Driver Phone number"
              :rules="{
                required: true,
                digits: 10,
              }"
            >
              <v-text-field
                v-model="phone"
                :error-messages="errors"
                label="Driver Phone Number *"
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
            <v-layout row wrap>
              <v-flex lg3></v-flex>
              <v-flex class="my-2">
                <v-btn
                  color="primary"
                  block
                  small
                  :disabled="invalid"
                  rounded
                  depressed
                  type="submit"
                  @click.prevent="driveradd"
                  >Register</v-btn
                >
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
// import sweetalert from 'sweetalert2';
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
  name: "Dreg",
  components: {
    ValidationProvider,
    ValidationObserver,
    Opage,
  },
  data: () => {
    return {
      driver_name: "",
      phone: "",
      icon: "",
      otpfield: false,
      otp: "",
      message: "",
      snackbar: false,
      snackbar2: false,
      message2: "",
      dialog: false,
    };
  },
  methods: {
    adddriver() {
      this.$refs.observer3.validate(); //Driver adding
    },
    clear4() {
      (this.optr_num = ""),
        (this.driver_name = ""),
        (this.driver_phone = ""),
        this.$refs.observer3.reset();
    },
    driveradd() {
      getAPI
        .post(
          "/api/operators/driver-create/",
          {
            driver_name: this.driver_name,
            phone: this.driver_phone,
            otp: this.otp,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          console.log(this.APIData);
          if (this.APIData["operator_name"]) {
            this.dialog = true;
          } else {
            this.$router.push({ name: "Editdrivers" });
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
    panadding() {
      this.dialog = false;
      this.$router.push({ name: "Padd" });
    },
  },
};
</script>
<style scoped>
#form6 {
  border: solid #1a237e 2px;
  padding: 25px;
  border-radius: 15px;
}
</style>
