<template>
  <v-container class="mx-10">
    <v-row justify="space-around">
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            :elevation="hover ? 24 : 6"
            class="my-8 black--text"
            width="400"
            outlined
            shaped
          >
            <v-card-title><h2 class="mx-15">Fill the details</h2></v-card-title>

            <!--Truck booking form begining-->

            <validation-observer ref="observer" v-slot="{ invalid }">
              <form class="mx-8" @submit.prevent="submit">
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required|max:10"
                >
                  <v-text-field
                    v-model="name"
                    :counter="10"
                    :error-messages="errors"
                    label="Customer Name"
                    required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Startlocation"
                  rules="required|max:10"
                >
                  <v-text-field
                    v-model="startlocation"
                    :counter="10"
                    :error-messages="errors"
                    label="Start Location"
                    required
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="Endlocation"
                  rules="required|max:10"
                >
                  <v-text-field
                    v-model="endlocation"
                    :counter="10"
                    :error-messages="errors"
                    label="End Location"
                    required
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
                    label="Date of Transport"
                    type="date"
                    required
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
                    :counter="7"
                    :error-messages="errors"
                    label="Weight"
                    required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Goods Type"
                  rules="required|max:10"
                >
                  <v-text-field
                    v-model="goodstype"
                    :counter="10"
                    :error-messages="errors"
                    label="Goods Type"
                    required
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
                    required
                  ></v-checkbox>
                </validation-provider>
                <v-btn
                  color="success"
                  class="mr-4"
                  type="submit"
                  :disabled="invalid"
                  router
                  to="/custsignup"
                >
                  Book
                </v-btn>
                <v-btn @click="clear"> clear </v-btn>
                <v-card-text>
                  <div class="my-2 mx-5"></div>
                </v-card-text>
              </form>
            </validation-observer>

            <!--Truck booking form begining-->
          </v-card>
        </template>
      </v-hover>
    </v-row>
  </v-container>
</template>
<script>
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
  },
  data: () => {
    return {
      checkbox:"",
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
</style>