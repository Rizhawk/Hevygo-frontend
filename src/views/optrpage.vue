<template>
  <nav>
    <!--Navbar-->
    <v-app-bar color="blue lighten-1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>HEVYGO</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!--Navbar ends-->

    <!--Sidebar-->

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      light
      clipped
      color="blue-grey darken-4"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-icon size="80" dark> mdi-account-circle </v-icon>
          </v-avatar>
          <p class="white--text subheading mt-1">Operator Name</p>
        </v-flex>
      </v-layout>
      <v-list nav dark>
        <v-list-item-group
          v-model="group"
          active-class="deep-grey--text text--accent-1"
        >
          <v-row justify="center">
            <!-- Form Dialog box for registering the truck to the system-->

            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item>
                  <v-list-item-title
                    v-bind="attrs"
                    v-on="on"
                    class="white--text mx-3"
                    >Register Your Trucks
                  </v-list-item-title>
                </v-list-item>
              </template>
              <v-card>
                <v-card-title>Fill the Details</v-card-title>
                <validation-observer ref="observer1" v-slot="{ invalid }">
                  <form class="mx-8" @submit.prevent="submit1">
                    <validation-provider v-slot="{ errors }" name="Name">
                      <v-text-field
                        v-model="name"
                        :error-messages="errors"
                        label="Name of your truck"
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
                        label="Phone number to contact your truck *"
                        required
                      ></v-text-field>
                    </validation-provider>
                    <v-card-text>
                      <span>*indicate fields are necessary</span>
                    </v-card-text>
                    <div class="mx-12 my-2">
                      <v-btn
                        type="submit"
                        @click.prevent="tsignup"
                        color="success"
                        :disabled="invalid"
                        >Save</v-btn
                      >
                      <v-btn @click="clear1"> clear </v-btn>
                      <v-btn @click="dialog = false" class="mx-3">Close</v-btn>

                      <!-- Truck Registration form ends -->

                      <!--Dialog box form for entering truck details -->

                      <v-dialog v-model="dialog2" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="green"
                            class="mx-4"
                            v-bind="attrs"
                            v-on="on"
                          >
                            Next
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title>Fill the Details</v-card-title>
                          <validation-observer
                            ref="observer2"
                            v-slot="{ invalid }"
                          >
                            <form class="mx-8" @submit.prevent="submit2">
                              <validation-provider
                                v-slot="{ errors }"
                                name="Owener Phone number"
                                :rules="{
                                  required: true,
                                  digits: 10,
                                }"
                              >
                                <v-text-field
                                  v-model="optrphone"
                                  :error-messages="errors"
                                  label="Operator phone number *"
                                  required
                                ></v-text-field>
                              </validation-provider>
                              <validation-provider
                                v-slot="{ errors }"
                                name="Truck phone number"
                                :rules="{
                                  required: true,
                                  digits: 10,
                                }"
                              >
                                <v-text-field
                                  v-model="truckphone"
                                  :error-messages="errors"
                                  label="Truck Phone Number *"
                                  required
                                ></v-text-field>
                              </validation-provider>

                              <validation-provider
                                v-slot="{ errors }"
                                name="Registration Number"
                                rules="required"
                              >
                                <v-text-field
                                  v-model="regnumber"
                                  :error-messages="errors"
                                  label="Registration Number *"
                                  required
                                ></v-text-field>
                              </validation-provider>

                              <validation-provider
                                v-slot="{ errors }"
                                name="Home Location"
                                rules="required"
                              >
                                <v-text-field
                                  v-model="homeloc"
                                  :error-messages="errors"
                                  label="Home Location *"
                                  required
                                ></v-text-field>
                              </validation-provider>
                              <v-card-text>
                                <span>*indicate fields are necessary</span>
                              </v-card-text>
                              <div clas="mx-12 my-2">
                                <v-btn
                                  color="green"
                                  @click.prevent="truckadd"
                                  :disabled="invalid"
                                >
                                  Save
                                </v-btn>
                                <v-btn @click="clear2" class="mx-3">
                                  clear
                                </v-btn>
                                <v-btn @click="dialog2 = false" class="mx-3"
                                  >Close</v-btn
                                >
                              </div>
                            </form>
                            <v-card-text>
                              <div class="my-2 mx-5"></div>
                            </v-card-text>
                          </validation-observer>
                        </v-card>
                      </v-dialog>
                    </div>
                  </form>
                  <v-card-text>
                    <div class="my-2 mx-5"></div>
                  </v-card-text>
                </validation-observer>
              </v-card>
            </v-dialog>
            <!--Form for entering truck details ends -->
          </v-row>
          <v-list-item router to="/managetrucks"> Manage Trucks </v-list-item>
          <v-dialog persistent v-model="dialog4" width="400px">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item>
                <v-list-item-title v-bind="attrs" v-on="on" class="white--text"
                  >Add Drivers
                </v-list-item-title>
              </v-list-item>
            </template>
            <v-card>
              <v-card-title>Enter the details</v-card-title>
              <validation-observer ref="observer3" v-slot="{ invalid }">
                <form class="mx-8" @submit.prevent="adddriver">
                  <!-- <validation-provider
                    v-slot="{ errors }"
                    name="Owener Phone number"
                    :rules="{
                      required: true,
                      digits: 10,
                    }"
                  >
                    <v-text-field
                      v-model="optr_num"
                      :error-messages="errors"
                      label="Operator phone number *"
                      required
                    ></v-text-field>
                  </validation-provider> -->
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
                      required
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
                      v-model="driver_phone"
                      :error-messages="errors"
                      label="Driver Phone Number *"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <div>
                    <v-card-text>* indicate fields are necessary</v-card-text>
                  </div>
                  <div>
                    <v-btn
                      color="success"
                      :disabled="invalid"
                      @click.prevent="driveradd"
                      >Add</v-btn
                    >
                    <v-btn @click="clear4" class="mx-3">Clear</v-btn>
                    <v-btn @click="dialog4 = false" class="mx-2">Close</v-btn>
                  </div>
                </form>
                <div>
                  <v-card-text></v-card-text>
                </div>
              </validation-observer>
            </v-card>
          </v-dialog>
          <v-list-item router to="/managedrivers"> Manage Drivers </v-list-item>
          <v-list-item router to="/truckstatus">
            Update Trucks Status
          </v-list-item>
          <!-- Dialog box form for adding pancard -->
          <v-dialog v-model="dialog3" persistent width="400px">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-bind="attrs" v-on="on" @click.prevent="getOptr">
                Add Your Pancard
              </v-list-item>
            </template>
            <v-card>
              <v-card-title>Enter the details</v-card-title>
              <validation-observer ref="observer3" v-slot="{ invalid }">
                <form class="mx-8" @submit.prevent="addpan">
                  <!-- <validation-provider
                    v-slot="{ errors }"
                    name="Owener Phone number"
                    :rules="{
                      required: true,
                      digits: 10,
                    }"
                  >
                    <v-select
                      v-model="opphone"
                      :item="operators"
                      :error-messages="errors"
                      label="Operator phone number *"
                      required
                    ></v-select>
                  </validation-provider> -->
                  <validation-provider
                    v-slot="{ errors }"
                    name="Pan number"
                    :rules="{
                      required: true,
                    }"
                  >
                    <v-text-field
                      v-model="pan"
                      :error-messages="errors"
                      label="Pan Number *"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Gst Number"
                    :rules="{
                      required: true,
                    }"
                  >
                    <v-text-field
                      v-model="gst_no"
                      :error-messages="errors"
                      label="Gst Number *"
                      required
                    ></v-text-field>
                  </validation-provider>
                  <v-card-text> *indicate fields are necessary </v-card-text>
                  <div>
                    <v-btn
                      @click.prevent="panadd"
                      color="success"
                      :disabled="invalid"
                      >Add</v-btn
                    >
                    <v-btn class="mx-3" @click="clear3">clear</v-btn>
                    <v-btn @click="dialog3 = false" class="mx-2">Close</v-btn>
                  </div>
                  <div>
                    <v-card-text></v-card-text>
                  </div>
                </form>
              </validation-observer>
            </v-card>
          </v-dialog>
          <!-- Form for adding pancard ends -->
        </v-list-item-group>
        <v-list-item>
          <v-btn
            color="white"
            class="mx-5 my-10 black--text"
            width="80%"
            rounded
            shaped
            @click.prevent="logout"
            >Logout</v-btn
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--Sidebar ends-->
  </nav>
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
  },
  name: "Opage",
  data: () => {
    return {
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      drawer: false,
      tick: false,
      group: null,
      show1: false,
      show2: false,
      name: "",
      phone: "",
      password: "",
      password2: "",
      user_type: 3,
      token: localStorage.getItem("user_token") || null,
      passwordRules: [
        (value) => !!value || "Please type password.",
        (value) => (value && value.length >= 6) || "minimum 6 characters",
      ],
      // datas for truck details
      optrphone: "",
      truckphone: "",
      regnumber: "",
      homeloc: "",
      //datas for adding pancard
      opp_phn:localStorage.getItem("user_id"),
      pan: "",
      gst_no: "",
      //datas for adding truck drivers
      optr_num: localStorage.getItem("user_id"),
      driver_name: "",
      driver_phone: "",
      //
      phnerr:"user with this phone already exists."
    };
  },
  methods: {
    submit1() {
      this.$refs.observer1.validate(); //Truck registration
    },
    submit2() {
      this.$refs.observer2.validate(); //Truck details add
    },
    addpan() {
      this.$refs.observer3.validate(); //Pancard adding
    },
    adddriver() {
      this.$refs.observer4.validate(); //Driver adding
    },
    clear1() {
      (this.phone = ""),
        (this.password = ""),
        (this.password2 = ""),
        (this.name = ""),
        this.$refs.observer.reset();
    },
    clear2() {
      (this.optrphone = ""),
        (this.truckphone = ""),
        (this.regnumber = ""),
        (this.homeloc = ""),
        (this.isvalid = null),
        this.$refs.observer2.reset();
    },
    clear3() {
      (this.opphone = ""), (this.pan = ""), (this.gst_no = "");
    },
    clear4() {
      (this.optr_num = ""), (this.driver_name = ""), (this.driver_phone = "");
    },
    tsignup() {
      getAPI
        .post("/api/accounts/register", {
          name: this.name,
          phone: this.phone,
          password: this.password,
          password2: this.password2,
          user_type: this.user_type,
        })
        .then((response) => {
          this.APIData = response.data;
          for (let key in this.APIData) {
            if (key == "phone") {
              let phonenum=this.APIData[key];
              if(phonenum==this.phnerr){
                alert(this.phnerr)
              }else{
                alert("Registration sucessfull")
              }
            } 
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    truckadd() {
      getAPI
        .post(
          "/api/truck/truck-create/",
          {
            owner: this.optrphone,
            truck_num: this.truckphone,
            registration: this.regnumber,
            homelocation: this.homeloc,
          },
          {
            headers: {
              Authorization: ` Token ${this.token}`,
            },
          }
        )
        .then((response) => {
          alert("Truck Added Succesfull");
          this.APIData = response.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    panadd() {
      getAPI
        .post(
          "/api/operators/operator-create/",
          { 
            operator:this.opp_phn,
            pan: this.pan,
            gst_no: this.gst_no,
          },
          {
            headers: {
              Authorization: `Token ${this.token}`,
            },
          }
        )
        .then((response) => {
          alert("Pancard added succesfully");
          this.APIData = response.data;
          this.tick = true;
        })
        .catch((err) => {
          alert(err);
        });
    },
    driveradd() {
      getAPI
        .post(
          "/api/operators/driver-create/",
          {
            driver_name: this.driver_name,
            phone: this.driver_phone,
            operator_name: this.optr_num,
          },
          {
            headers: {
              Authorization: `Token ${this.token}`,
            },
          }
        )
        .then((response) => {
          alert("Driver added succesfully");
          this.APIData = response.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    logout() {
      localStorage.removeItem("user_token");
      localStorage.removeItem('user_id');
      this.$router.push({ name: "Login" });
    },
    // watch: {
    //   group() {
    //     this.drawer = false;
    //   },
    // },
  },
};
</script>