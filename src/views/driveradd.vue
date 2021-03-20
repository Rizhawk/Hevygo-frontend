<template>
  <v-app>
    <Opage />
    <v-layout class="my-10" row wrap>
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
        <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="3000"
          ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
        >
        <validation-observer ref="observer3" v-slot="{invalid}">
          <form id="form6" @submit.prevent="adddriver">
            <v-layout
              ><v-flex class="my-2"
                ></v-flex
              ></v-layout
            >
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
                dark
                outlined
                rounded
                dense
                clearable
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
                dark
                outlined
                rounded
                dense
                clearable
              ></v-text-field>
            </validation-provider>
            <v-layout row wrap>
              <v-flex lg3></v-flex>
              <v-flex class="my-2">
                <v-btn
                  color="success"
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
      driver_phone: "",
      message: "",
      snackbar: false,
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
          this.message = this.APIData["response"];
          if (this.APIData["operator_name"]) {
            this.dialog = true;
          }
          this.snackbar = !this.snackbar;
          this.clear4();
        })
        .catch((err) => {
          alert(err);
        });
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
  border: solid black 2px;
  padding: 25px;
  border-radius: 30px;
  background-color: slategrey;
}
</style>
