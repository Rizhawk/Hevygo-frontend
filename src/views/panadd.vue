<template>
  <v-app>
    <Opage />
    <v-layout class="my-10" row wrap>
      <v-flex lg4></v-flex>
      <v-flex xs12 sm8 md6 lg4>
        <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="3000"
          ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
        >
        <validation-observer ref="observer3" v-slot="{ invalid }">
          <form id="form5" @submit.prevent="addpan">
            <v-flex class="my-2"></v-flex>
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
                placeholder="Pan Number *"
                required
                solo
                rounded
                clearable
                dense
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
                placeholder="Gst Number *"
                required
                solo
                rounded
                clearable
                dense
              ></v-text-field>
            </validation-provider>
            <v-card-text> *indicate fields are necessary </v-card-text>
            <v-layout row wrap>
              <v-flex lg3></v-flex>
            <v-flex class="mx-15">
              <v-btn @click.prevent="panadd" color="success" :disabled="invalid"
                >Add</v-btn
              >
            </v-flex>
            </v-layout>
          </form>
        </validation-observer>
      </v-flex>
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
      message: "",
      snackbar: false,
    };
  },
  methods: {
    addpan() {
      this.$refs.observer3.validate(); 
    },
    clear() {
      (this.pan = ""), (this.gst_no = ""), this.$refs.observer3.reset();
    },
    panadd() {
      getAPI
        .post(
          "/api/operators/operator-create/",
          {
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
          this.APIData = response.data;
          if(this.APIData['operator'])
          {
            this.message="Pancard already added"
          }
          else if(this.APIData["response"]){
          this.message = this.APIData["response"];
          }
          this.snackbar = !this.snackbar;
          this.clear();
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
<style scoped>
#form5 {
  border: solid white 1px;
  padding: 20px;
  border-radius: 30px;
  background-color: slategrey;
}
</style>