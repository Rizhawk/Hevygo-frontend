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
      <Admin />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <AdminNav title="Register New Admin" />
        <mob-nav />
        <!-- End Navbar -->
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
                    New Admin
                  </h5>
                </div>
                <div class="card-body">
                  <validation-observer ref="observer" v-slot="{ invalid }">
                    <form
                      style="padding:10px"
                      @submit.prevent="regAdmin(invalid)"
                    >
                      <div class="form-group">
                        <label>Name *</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="Name"
                          rules="required"
                        >
                          <v-text-field
                            v-model="admin"
                            :error-messages="errors"
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <label>Password *</label>
                        <validation-provider
                          name="Password"
                          v-slot="{ errors }"
                          rules="required"
                        >
                          <v-text-field
                            v-model="password"
                            name="password"
                            :error-messages="errors"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            maxlength="6"
                            counter="6"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <label>Confirm Password *</label>
                        <validation-provider
                          name="Confirmation"
                          v-slot="{ errors }"
                          rules="required"
                        >
                          <v-text-field
                            v-model="password2"
                            name="confirmPassword"
                            :error-messages="errors"
                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[
                              password === password2 ||
                                'The password confirmation does not match.',
                            ]"
                            maxlength="6"
                            :type="show2 ? 'text' : 'password'"
                            @click:append="show2 = !show2"
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <label>Phonenumber *</label>
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
                          label="Enter OTP *"
                          @input="verified()"
                          maxlength="6"
                          outlined
                          dense
                        ></v-text-field>
                        <label>Email Id</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="email"
                          rules="email"
                        >
                          <v-text-field
                            v-model="email"
                            :error-messages="errors"
                            @input="checkEmail"
                            :append-icon="icon2"
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <v-flex row justify-center
                          ><v-btn
                            type="submit"
                            x-small
                            color="rgb(34, 48, 61)"
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
      </div>
    </div>
  </v-app>
</template>
<script>
import Admin from "./AdminsSidebar.vue";
import AdminNav from "../Admin/AdminNavbar.vue";
import MobNav from "../Admin/MobNav.vue";
import { getAPI } from "../../axios-api";
import { required, digits, email } from "vee-validate/dist/rules";
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
  message: "required",
});
extend("email", {
  ...email,
  message: "Email must be valid",
});
export default {
  name: "AddAdmin",
  components: {
    ValidationProvider,
    ValidationObserver,
    Admin,
    AdminNav,
    MobNav,
  },
  data: () => {
    return {
      admin: "",
      password: "",
      password2: "",
      phone: "",
      icon: "",
      icon2: "",
      show1: false,
      show2: false,
      otpfield: false,
      otp: "",
      email: null,
      snackbar: false,
      message: "",
      snackbar2: "",
      message2: "",
    };
  },
  methods: {
    regAdmin(invalid) {
      this.$refs.observer.validate();
      if (this.password === this.password2) {
        if (invalid == false) {
          getAPI
            .post(
              "/api/accounts/register_admin/",
              {
                phone: this.phone,
                otp: this.otp,
                name: this.admin,
                password: this.password,
                password2: this.password2,
                user_type: 4,
                email: this.email,
              },
              {
                headers: {
                  Authorization: `Token ${this.$session.get("user_token")}`,
                },
              }
            )
            .then((response) => {
              this.APIData = response.data;
              if (this.APIData.Http_response == 200) {
                this.message = "New admin added.";
                this.snackbar = true;
                this.clear();
              } else {
                this.message2 = this.APIData.message;
                this.snackbar2 = true;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("Invalid form.");
        }
      } else {
        alert("Password confirmation failed.");
      }
    },
    clear() {
      this.$refs.observer.reset();
      this.admin = "";
      this.phone = "";
      this.password = "";
      this.password2 = "";
      this.otp = "";
      this.email = null;
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
