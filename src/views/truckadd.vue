<template>
  <v-app>
    <Opage />
      <v-layout class="my-8" row wrap>
        <v-flex lg4></v-flex>
        <v-flex xs12 sm8 md6 lg4>
        <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="3000"
          ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
        >
        <validation-observer ref="observer2" v-slot="{ invalid }">
          <form class="my-5" id="form3" @submit.prevent="submit">
            <v-layout class="my-3"> <v-flex></v-flex></v-layout>
            <validation-provider
              v-slot="{ errors }"
              name="Registration Number"
              rules="required"
            >
              <v-text-field
                v-model="regnumber"
                :error-messages="errors"
                placeholder="Registration Number *"
                required
                clearable
                solo
                rounded
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
                placeholder="Home Location *"
                required
                clearable
                solo
                rounded
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
          <v-layout class="my-3"> <v-flex></v-flex></v-layout>
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
  name: "Tadd",
  components: {
    ValidationProvider,
    ValidationObserver,
    Opage,
  },
  data: () => {
    return {
      snackbar: false,
      message: "",
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
          this.APIData = response.data;
          this.message = this.APIData["response"];
          this.snackbar = !this.snackbar;
          localStorage.removeItem("truck_phn");
          this.$router.push({ name: "Tmanage" });
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
<style scoped>
#form3 {
  border: solid white 1px;
  padding: 35px;
  border-radius: 30px;
  background-color: grey;
}
</style>