<template>
  <v-app>
    <Opage />
    <v-layout class="my-3" row wrap>
      <v-flex lg4></v-flex>
      <v-flex xs12 sm10 md8 lg4>
        <!--Form to add truck details-->
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form id="form4" class="my-5" @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="manufacturer"
              rules="required"
            >
              <v-text-field
                v-model="manufacturer"
                label="Manufacturer *"
                :error-messages="errors"
                name="manufacturer"
                clearable
                dark
                outlined
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="type"
              rules="required"
            >
              <v-combobox
                v-model="type"
                label="Type *"
                :items="types"
                name="type"
                :error-messages="errors"
                clearable
                dark
                outlined
                rounded
                dense
              >
              </v-combobox>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="model"
              rules="required"
            >
              <v-text-field
                v-model="model"
                :error-messages="errors"
                label="Model *"
                clearable
                dark
                outlined
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="capacity"
              rules="required"
            >
              <v-text-field
                v-model="capacity"
                :error-messages="errors"
                label="Capacity in ton *"
                clearable
                dark
                outlined
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <v-layout row wrap>
              <v-flex lg3></v-flex>
              <v-flex class="my-2">
                <v-btn
                  color="primary"
                  type="submit"
                  :disabled="invalid"
                  block
                  depressed
                  rounded
                  small
                  @click.prevent="trucketails"
                >
                  Save
                </v-btn>
              </v-flex>
              <v-flex lg3></v-flex>
            </v-layout>
          </form>
        </validation-observer>
        <!--form ends here-->
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
// import { ModelSelect } from 'vue-search-select'
import Opage from "../views/optrpage";
import { getAPI } from "../axios-api";
import { required, digits, email, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");
//Custom validation form input fields

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

extend("email", {
  ...email,
  message: "Email must be valid",
});

//Custom validation ends
export default {
  name: "Tdetails",
  components: {
    ValidationProvider,
    ValidationObserver,
    Opage,
  },
  data: () => {
    return {
      manufacturer: "",
      type: "",
      types: [
        "Tipper",
        "Lorry",
        "Pickup",
        "Tanker",
        "Tow truck",
        "Van",
        "Container Truck",
        "Car transporter",
      ],
      model: "",
      capacity: "",
    };
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {},
    trucketails() {
      //api call for add truck details
      getAPI

        .post(
          "/api/truck/truck-info-create/",
          {
            truck: localStorage.getItem("tid"),
            manufacturer: this.manufacturer,
            type: this.type,
            model: this.model,
            capacity: this.capacity,
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
          localStorage.removeItem("tid");
          this.$router.push({ name: "Tmanage" });
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
  },
};
</script>
<style scoped>
#form4 {
  border: solid black 2px;
  padding: 30px;
  border-radius: 30px;
  background-color: slategrey;
}
</style>