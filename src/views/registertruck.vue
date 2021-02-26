<template>
  <v-app>
    <Opage />
    <v-layout class="my-3" row wrap>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-flex xs10 sm8 md6 lg4>
        <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="3000"
          ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
        >
        <validation-observer ref="observer1" v-slot="{invalid}">
          <form id="form2" @submit.prevent="submit" >
            <v-layout
              ><v-flex
                ><p class="headline">Fill the details</p></v-flex
              ></v-layout
            >
            <validation-provider v-slot="{ errors }" name="Name">
              <v-text-field
                v-model="name"
                :error-messages="errors"
                label="Name of your truck"
                dark
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
              dark
              clearable
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
              dark
              clearable
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
                dark
                clearable
                outlined
                rounded
                dense
              ></v-text-field>
            </validation-provider>
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
import Opage from "../views/optrpage";
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
      drawer: false,
      tick: false,
      group: null,
      show1: false,
      show2: false,
      next: false,
      name: "",
      phone: "",
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
        .post("/api/accounts/register/", {
          name: this.name,
          phone: this.phone,
          password: this.password,
          password2: this.password2,
          user_type: this.user_type,
          email: null,
        })
        .then((response) => {
          this.APIData = response.data;
          console.log(this.APIData);
          let phonenum = this.APIData["phone"];
          if (phonenum == this.phnerr) {
            alert(this.phnerr);
          } else {
            this.message = this.APIData["response"];
            localStorage.setItem("truck_phn", phonenum);
            this.next = true;
            this.snackbar = !this.snackbar;
            this.clear();
            this.$router.push({ name: "Tadd" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
#form2 {
  border: solid black 2px;
  padding: 30px;
  border-radius: 30px;
  background-color: slategrey;
}
</style>