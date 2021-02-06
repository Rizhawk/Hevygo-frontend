<template>
  <v-app id="btruck">
    <Navbar />
    <v-layout class="my-5" row wrap>
      <v-flex xs1 md3 sm2 lg4></v-flex>
      <v-flex xs8 sm8 md6 lg4>
        <!--Truck booking form begining-->

        <validation-observer ref="observer" v-slot="{ invalid }">
          <form id="book" @submit.prevent="submit">
            <v-layout class="my-2" row wrap
              ><v-flex class="mx-3"><h2>Book a Truck</h2></v-flex
              ><v-flex></v-flex
            ></v-layout>
            <!-- <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:10"
            >
              <v-text-field
                v-model="name"
                :error-messages="errors"
                label="Customer Name"
                outlined
                rounded
                dense
              ></v-text-field>
            </validation-provider> -->
            <validation-provider
              v-slot="{ errors }"
              name="Startlocation"
              rules="required|max:20"
            >
              <v-combobox
                v-model="startlocation"
                :error-messages="errors"
                label="Start Location"
                :items="address"
                prepend-inner-icon="mdi-map-marker"
                outlined
                rounded
                dense
              ></v-combobox>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="Endlocation"
              rules="required|max:20"
            >
              <v-combobox
                v-model="endlocation"
                :error-messages="errors"
                label="End Location"
                :items="address"
                prepend-inner-icon="mdi-map-marker"
                outlined
                rounded
                dense
              ></v-combobox>
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
                outlined
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
                label="Weight in ton"
                outlined
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
                label="Goods Type"
                outlined
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <v-layout class="my-1" row wrap>
              <v-flex lg2></v-flex>
              <v-flex>
                <v-btn
                  dark
                  block   
                  type="submit"
                  :disabled="invalid"
                  router
                  to="/custsignup"
                >
                  Continue
                </v-btn>
              </v-flex>
                <v-flex lg2></v-flex>
            </v-layout>
          </form>
        </validation-observer>
        <!--Truck booking form begining-->
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import Navbar from "../components/Navbar";
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
  message: "required",
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
    Navbar,
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
      citi:[],
      address:[],
    };
  },
  mounted: function () {
    fetch("cities.json")
      .then((r) => r.json())
      .then(
        (json) => {
          this.citi = json;
           for (let key in this.citi) {
          this.address.push(this.citi[key]["name"]);
        }
        },
        (response) => {
          console.log("Error loading json:", response);
        }
      );
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
  padding: 30px;
  border-radius: 30px;
  background-color: white;
}
#btruck {
  background: url("../assets/truck-12.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  margin: auto;
  padding: 0;
}
</style>