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
        <Onavbar title="Truck Registration" />
        <mob-nav />
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
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
                    Register New Truck
                  </h5>
                </div>
                <div class="card-body">
                  <validation-observer ref="observer1" v-slot="{ invalid }">
                    <form @submit.prevent="tsignup">
                      <div class="form-group">
                        <div class="row">
                          <div class="col-md-6">
                            <label>Name</label>
                            <validation-provider
                              v-slot="{ errors }"
                              name="Name"
                            >
                              <v-text-field
                                v-model="name"
                                :error-messages="errors"
                                outlined
                                dense
                              ></v-text-field>
                            </validation-provider>
                          </div>
                          <div class="col-md-6">
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
                                maxlength="10"
                                :append-icon="icon"
                                @input="checkPhone"
                                outlined
                                dense
                              ></v-text-field>
                            </validation-provider>
                          </div>
                        </div>
                        <div class="row" v-if="otpfield">
                          <div class="col-md-3"></div>
                          <div class="col-md-6">
                            <label>Enter your OTP</label>
                            <v-text-field
                              v-model="otp"
                              @input="verified()"
                              maxlength="6"
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                          <div class="col-md-3"></div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Password</label>
                            <v-text-field
                              v-model="password"
                              name="password"
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="passwordRules"
                              :type="show1 ? 'text' : 'password'"
                              @click:append="show1 = !show1"
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                          <div class="col-md-6">
                            <label>Confirm Password</label>
                            <v-text-field
                              v-model="password2"
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
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Registration Number</label>
                            <validation-provider
                              v-slot="{ errors }"
                              rules="required"
                            >
                              <v-text-field
                                v-model="regnumber"
                                :error-messages="errors"
                                required
                                outlined
                                dense
                              ></v-text-field>
                            </validation-provider>
                          </div>
                          <div class="col-md-6">
                            <label>Home Location</label>
                            <validation-provider
                              v-slot="{ errors }"
                              rules="required"
                            >
                              <v-text-field
                                v-model="homeloc"
                                :error-messages="errors"
                                type="search"
                                @input="doSearch"
                                required
                                clearable
                                outlined
                                dense
                              ></v-text-field>
                            </validation-provider>
                            <v-flex class="myDropdown">
                              <v-simple-table
                                fixed-header
                                dense
                                v-if="dropdown"
                              >
                                <tbody>
                                  <tr
                                    v-for="result in results"
                                    :key="result.id"
                                  >
                                    <v-icon dense>mdi-map-marker</v-icon>
                                    <td @click.prevent="getLoc(result.title)">
                                      {{ result.title }}
                                    </td>
                                  </tr>
                                </tbody>
                              </v-simple-table>
                            </v-flex>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Rc Book</label>
                            <validation-provider
                              v-slot="{ errors }"
                              name="Rc Book"
                              rules="required"
                            >
                              <v-file-input
                                v-model="rcbook"
                                :error-messages="errors"
                                required
                                clearable
                                outlined
                                dense
                              ></v-file-input>
                            </validation-provider>
                          </div>
                          <div class="col-md-6">
                            <label>Validity Upto</label>
                            <v-text-field
                              v-model="rcexp"
                              :error-messages="errors"
                              type="date"
                              required
                              clearable
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Fitness Certificate</label>
                            <validation-provider
                              v-slot="{ errors }"
                              rules="required"
                            >
                              <v-file-input
                                v-model="fitcert"
                                :error-messages="errors"
                                required
                                clearable
                                outlined
                                dense
                              ></v-file-input>
                            </validation-provider>
                          </div>
                          <div class="col-md-6">
                            <label>Validity Upto</label>
                            <v-text-field
                              v-model="fitexp"
                              :error-messages="errors"
                              type="date"
                              required
                              clearable
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Insurance Certificate</label>
                            <validation-provider
                              v-slot="{ errors }"
                              rules="required"
                            >
                              <v-file-input
                                v-model="insur"
                                :error-messages="errors"
                                required
                                clearable
                                outlined
                                dense
                              ></v-file-input>
                            </validation-provider>
                          </div>
                          <div class="col-md-6">
                            <label>Validity Upto</label>
                            <v-text-field
                              v-model="insexp"
                              :error-messages="errors"
                              type="date"
                              required
                              clearable
                              outlined
                              dense
                            ></v-text-field>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <label>Permit Paper</label>
                            <validation-provider
                              v-slot="{ errors }"
                              rules="required"
                            >
                              <v-file-input
                                v-model="permit"
                                :error-messages="errors"
                                required
                                clearable
                                outlined
                                dense
                              ></v-file-input>
                            </validation-provider>
                          </div>
                        </div>
                        <v-flex row justify-center
                          ><v-btn
                            type="submit"
                            x-small
                            color="rgb(34, 48, 61)"
                            :disabled="invalid"
                            depressed
                            outlined
                            >Sumbit</v-btn
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
import Vue from "vue";
import Dsidebar from "../../components/Operator/dashsidebar.vue";
import Dfooter from "../../components/dashfooter.vue";
import Onavbar from "../../components/Operator/OptrNav.vue";
import MobNav from "../../components/Operator/MobNav.vue";
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
Vue.config.productionTip = false;
Vue.config.devtools = false;
const apiKey = "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E";
const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=30.22,-92.02&limit=10&apikey=${apiKey}&q=`;
export default {
  name: "InfoTruck",
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
      //Registration
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
      //
      snackbar: false,
      message: "",
      regnumber: "",
      homeloc: "",
      dropdown: false,
      results: [],
      //
      rcbook: "",
      rcexp: "",
      fitcert: "",
      fitexp: "",
      insur: "",
      insexp: "",
      permit: "",
    };
  },
  methods: {
    async doSearch() {
      //Auto suggestion Function call for Homelocation Field
      this.dropdown = true;
      if (this.homeloc === "") return;
      let resp = await fetch(url + encodeURIComponent(this.homeloc));
      let data = await resp.json();
      this.results = data.items;
    },
    getLoc(place) {
      //Input the Selected Value and Hide the Dropdown flex for Endlocation
      this.homeloc = place;
      this.dropdown = false;
    },
    clear() {
      this.optrphone = "";
      this.truckphone = "";
      this.regnumber = "";
      this.homeloc = "";
      this.phone = "";
      this.password = "";
      this.password2 = "";
      this.name = "";
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
            this.truckadd(this.APIData.data["id"]);
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
    truckadd(id) {
      if (this.dropdown == true) {
        alert("Select a Location");
      } else {
        getAPI
          .post(
            "/api/operators/add_truck/ ",
            {
              crew_id: id,
              registration: this.regnumber,
              homelocation: this.homeloc,
              verification: 1,
              remarks: "Wait to be Verified",
            },
            {
              headers: {
                Authorization: ` Token ${this.$session.get("user_token")}`,
              },
            }
          )
          .then((response) => {
            this.APIData = response.data;
            if (this.APIData.response == 200) {
              localStorage.setItem("tid", this.APIData.data["id"]);
              this.clear();
              this.$router.push({ name: "DetailTruck" });
            } else {
              alert(this.APIData.message);
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
  },
};
</script>
<style scoped>
.myDropdown {
  position: absolute;
  color: black;
  background-color: #f6f6f6;
  min-width: 250px;
  overflow: auto;
  z-index: 1;
}
</style>
