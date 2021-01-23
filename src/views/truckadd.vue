<template>
  <nav>
    <Opage />
    <v-container class="mx-10">
      <v-row justify="space-around">
        <v-card width="500px" class="my-10" outlined raised>
          <v-card-title>Fill the Details</v-card-title>
          <validation-observer ref="observer2" v-slot="{ invalid }">
            <form class="mx-8" @submit.prevent="submit">
              <!-- <validation-provider
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
              </validation-provider> -->

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
                <v-btn @click="clear" class="mx-3">clear</v-btn>
                <v-btn
                  @click="clear"
                  class="mx-3"
                  color="red"
                  router
                  to="/registertruck"
                  >Previous</v-btn
                >
              </div>
            </form>
            <v-card-text>
              <div class="my-2 mx-5"></div>
            </v-card-text>
          </validation-observer>
        </v-card>
      </v-row>
    </v-container>
  </nav>
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
  name: "Tadd",
  components: {
    ValidationProvider,
    ValidationObserver,
    Opage,
  },
  data: () => {
    return {
      truckphone: localStorage.getItem("truck_phn") || null,
      regnumber: "",
      homeloc: "",
      token: localStorage.getItem("user_token") || null,
    };
  },
  methods: {
    submit() {
      this.$refs.observer2.validate(); //Truck details add
    },
    clear() {
      (this.optrphone = ""),
        (this.truckphone = ""),
        (this.regnumber = ""),
        (this.homeloc = ""),
        this.$refs.observer2.reset();
    },
    truckadd() {
      getAPI
        .post(
          "/api/truck/truck-create/",
          {
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
          localStorage.removeItem("truck_phn");
          this.APIData = response.data;
          alert(this.APIData['response']);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>