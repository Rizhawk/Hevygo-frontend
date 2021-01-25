<template>
  <v-app>
      <Opage/>
    <v-container class="mx-10">
      <v-row justify="space-around">
        <v-card class="my-10" width="400" outlined raised shaped>
          <v-card-title>Enter the details</v-card-title>
          <validation-observer ref="observer3" v-slot="{ invalid }">
            <form class="mx-8" @submit.prevent="addpan">
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
                <v-btn class="mx-3" @click="clear">clear</v-btn>
              </div>
              <div>
                <v-card-text></v-card-text>
              </div>
            </form>
          </validation-observer>
        </v-card>
      </v-row>
    </v-container>
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
  name: "Padd",
  components: {
    ValidationProvider,
    ValidationObserver,
    Opage,
  },
  data: () => {
    return {
      pan: "",
      gst_no: "",
      token: localStorage.getItem("user_token") || null,
    };
  },
  methods: {
    addpan() {
      this.$refs.observer3.validate(); //Pancard adding
    },
    clear() {
     (this.pan = ""), (this.gst_no = "");
    },
    panadd() {
      getAPI
        .post(
          "/api/operators/operator-create/",
          {
            // operator: this.opp_phn,
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
  },
};
</script>