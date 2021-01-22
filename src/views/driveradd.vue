<template>
  <nav>
      <Opage/>
    <v-container class="mx-10">
      <v-row justify="center">
        <v-card class="my-15" width="400" shaped outlined raised>
          <v-card-title >Add a new driver</v-card-title>
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
              </div>
            </form>
            <div>
              <v-card-text></v-card-text>
            </div>
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
      token: localStorage.getItem("user_token") || null,
    };
  },
  methods: {
    adddriver() {
      this.$refs.observer4.validate(); //Driver adding
    },
    clear4() {
      (this.optr_num = ""), (this.driver_name = ""), (this.driver_phone = "");
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
              Authorization: `Token ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          alert("Successfull")
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>