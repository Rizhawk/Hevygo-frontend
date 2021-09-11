<template>
  <v-app>
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
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Driver Registration" />
        <mob-nav />
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-5">
              <div class="card">
                <div class="card-header">
                  <h5
                    class="
                      card-title
                      font-weight-black
                      text-secondary
                      subtitle-1
                    "
                  >
                    Regitser New Driver
                  </h5>
                </div>
                <div class="card-body">
                  <validation-observer ref="observer1" v-slot="{ invalid }">
                    <form @submit.prevent="driveradd">
                      <div class="form-group">
                        <label>Driver's Name</label>
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
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <label>Driver's Phone Number</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="Driver Phone number"
                          :rules="{
                            required: true,
                          }"
                        >
                          <v-text-field
                            v-model="phone"
                            :error-messages="errors"
                            maxlength="10"
                            :append-icon="icon"
                            @input="checkPhone"
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <v-text-field
                          v-if="otpfield"
                          v-model="otp"
                          autofocus
                          label="Enter your OTP"
                          @input="verified()"
                          maxlength="6"
                          outlined
                          dense
                        ></v-text-field>
                        <v-flex row justify-center
                          ><v-btn
                            type="submit"
                            x-small
                            color="rgb(34, 48, 61)"
                            :disabled="invalid"
                            depressed
                            outlined
                            >Register</v-btn
                          ></v-flex
                        >
                      </div>
                    </form>
                  </validation-observer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dfooter />
      </div>
    </div>
    <v-dialog persistent v-model="dialog" max-width="320">
      <v-card>
        <v-card-title class="caption font-weight-bold black--text">
          You can register a new driver , only after added your pan card
          details.</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="ml-5" x-small outlined @click="panadding" color="green"
            >Add now</v-btn
          >
          <v-btn color="red" x-small @click="dialog = false" outlined>
            Later</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Dsidebar from "../../components/Operator/dashsidebar.vue";
import Dfooter from "../../components/dashfooter.vue";
import Onavbar from "../../components/Operator/OptrNav.vue";
import MobNav from "../../components/Operator/MobNav.vue";
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
  message: "This field can not be empty",
});
export default {
  name: "AddDriver",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
    ValidationObserver,
    ValidationProvider,
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
    clear4() {
      (this.driver_name = ""),
        (this.phone = ""),
        (this.otp = ""),
        (this.icon = "");
    },
    driveradd() {
      getAPI
        .post(
          "/api/operators/add_driver/",
          {
            driver_name: this.driver_name,
            phone: this.phone,
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
          if (this.APIData.response == 200) {
            this.message = this.APIData.message;
            this.snackbar = true;
            this.clear4();
            this.$router.push({ name: "DriverTable" });
          } else {
            this.message2 = this.APIData.message;
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
    panadding() {
      this.dialog = false;
      this.$router.push({ name: "Padd" });
    },
  },
};
</script>