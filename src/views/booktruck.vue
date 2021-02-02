<template>
  <v-app>
    <Navbar/>
    <v-layout class="my-1" row wrap>
      <v-flex lg4></v-flex>
      <v-flex xs12 sm8 md6 lg4>
        <!--Truck booking form begining-->

        <validation-observer ref="observer" v-slot="{ invalid }">
          <form id="book" @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:10"
            >
              <v-text-field
                v-model="name"
                :error-messages="errors"
                placeholder="Customer Name"
                solo
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Startlocation"
              rules="required|max:20"
            >
              <v-text-field
                v-model="startlocation"
                :error-messages="errors"
                placeholder="Start Location"
                solo
                rounded
                dense
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="Endlocation"
              rules="required|max:20"
            >
              <v-text-field
                v-model="endlocation"
                :error-messages="errors"
                placeholder="End Location"
                solo
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Date"
              rules="required"
            >
              <v-text-field
                v-model="date"
                :error-messages="errors"
                placeholder="Date of Transport"
                type="date"
                solo
                rounded
                dense
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="Weight"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                v-model="weight"
                :error-messages="errors"
                placeholder="Weight in ton"
                solo
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Goods Type"
              rules="required|max:10"
            >
              <v-text-field
                v-model="goodstype"
                :error-messages="errors"
                placeholder="Goods Type"
                solo
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              rules="required"
              name="checkbox"
            >
              <v-checkbox
                v-model="checkbox"
                :error-messages="errors"
                value="1"
                label="Above details are correct"
                type="checkbox"
                dense
              ></v-checkbox>
            </validation-provider>
            <v-layout class="my-1" row wrap>
              <v-flex lg3></v-flex>
              <v-flex class="mx-10">
                <v-btn
                  color="success"
                  class="mr-4"
                  type="submit"
                  :disabled="invalid"
                  router
                  to="/custsignup"
                >
                  Continue
                </v-btn>
              </v-flex>
            </v-layout>
          </form>
        </validation-observer>
        <!--Truck booking form begining-->
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import Navbar from '../components/Navbar'
import { required, digits, max } from "vee-validate/dist/rules";
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
  message: "{_field_} needs to be digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
//Custom validation ends
export default {
  name: "Booking",
  components: {
    ValidationProvider,
    ValidationObserver,
    Navbar
  },
  data: () => {
    return {
      checkbox: "",
      name: "",
      startlocation: "",
      endlocation: "",
      weight: "",
      goodstype: "",
      date: "",
    };
  },

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    //Function to set input field empty
    clear() {
      this.name = "";
      this.startlocation = "";
      this.endlocation = "";
      this.weight = "";
      this.goodstype = "";
      this.$refs.observer.reset();
    },
  },
};
</script>
<style scoped>
#book {
  border: solid black 2px;
  padding: 25px;
  border-radius: 30px;
  background-color: slategrey;
}
</style>