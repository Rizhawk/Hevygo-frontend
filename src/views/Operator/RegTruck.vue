<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      multi-line
      top
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
        <Onavbar title="Register New Truck" />
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
                    Regitser a Truck
                  </h5>
                </div>
                <div class="card-body">
                  <validation-observer ref="observer1" v-slot="{ invalid }">
                    <form @submit.prevent="tsignup">
                      <div class="form-group">
                        <label>Name</label>
                        <validation-provider v-slot="{ errors }" name="Name">
                          <v-text-field
                            v-model="name"
                            :error-messages="errors"
                            label="Name of your truck"
                            clearable
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <label>Phonenumber</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="Phone Number"
                          :rules="{
                            required: true,
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
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <v-text-field
                          v-if="otpfield"
                          v-model="otp"
                          label="Enter your OTP"
                          @input="verified()"
                          maxlength="6"
                          outlined
                          dense
                        ></v-text-field>
                        <label>Password</label>
                        <v-text-field
                          v-model="password"
                          label="Password *"
                          name="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="passwordRules"
                          :type="show1 ? 'text' : 'password'"
                          @click:append="show1 = !show1"
                          outlined
                          dense
                        ></v-text-field>
                        <label>Confirm Password</label>
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
                            >Save & Next</v-btn
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
  </v-app>
</template>
<script>
import Dsidebar from "../../components/dashsidebar.vue";
import Dfooter from "../../components/dashfooter.vue";
import Onavbar from "../../components/OptrNav.vue";
import MobNav from "../../components/MobNav.vue";
import { getAPI } from "../../axios-api";
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
  name: "Rtruck",
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
      passwordRules: [
        (value) => !!value || "Please type password.",
        (value) => (value && value.length >= 6) || "minimum 6 characters",
      ],
    };
  },
  methods: {
    clear() {
      (this.phone = ""),
        (this.password = ""),
        (this.password2 = ""),
        (this.name = "");
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
          if (this.APIData.Http_response == 200) {
            localStorage.setItem("truck_id", this.APIData.data["id"]);
            this.$router.push({ name: "InfoTruck" });
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
  width: 480px;
}
</style>