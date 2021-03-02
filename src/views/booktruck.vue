<template>
  <v-app id="btruck">
    <Navbar />
    <v-layout class="my-5" row wrap>
      <v-flex xs1 md3 sm2 lg4></v-flex>
      <v-flex xs10 sm8 md6 lg4>
        <!--Truck booking form begining-->
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form id="book" @submit.prevent="submit">
            <v-layout class="my-2" row wrap
              ><v-flex class="mx-3"><h2>Book a Truck</h2></v-flex
              ><v-flex></v-flex
            ></v-layout>
            <v-text-field
              v-model="startlocation"
              type="search"
              @input="doSearch1"
              label="Start Location"
              prepend-inner-icon="mdi-map-marker"
              outlined
              rounded
              dense
            >
            </v-text-field>
            <v-flex>
              <v-simple-table dense v-if="dropdown1">
                <tbody>
                  <tr v-for="start in results1" :key="start.id">
                    <v-icon dense>mdi-map-marker</v-icon>
                    <td @click.prevent="getStart(start.title)">
                      {{ start.title }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-flex>
            <v-text-field
              v-model="endlocation"
              type="search"
              @input="doSearch2"
              label="End Location"
              prepend-inner-icon="mdi-map-marker"
              clearable
              outlined
              rounded
              dense
            ></v-text-field>
            <v-flex>
              <v-simple-table dense v-if="dropdown2">
                <tbody>
                  <tr v-for="end in results2" :key="end.id">
                    <v-icon dense>mdi-map-marker</v-icon>
                    <td @click.prevent="getEnd(end.title)">
                      {{ end.title }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-flex>
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
                  @click.prevent="saveData"
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
import Vue from "vue";
// import $Scriptjs from "scriptjs";
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
Vue.config.productionTip = false;
Vue.config.devtools = false;
const apiKey = "H2HPEplnWZvYwdCxIeyaFJf_RhOLUMzQXip2ADBNupY";
const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=30.22,-92.02&limit=10&apikey=${apiKey}&q=`;
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
      searchResults: [],
      endlocation: "",
      service: null,
      weight: "",
      goodstype: "",
      date: "",
      autocomplete: "",
      //
      dropdown1: false,
      dropdown2: false,
      results1: [],
      results2: [],
    };
  },
  methods: {
    async doSearch1() {
      this.dropdown1 = true;
      if (this.startlocation === "") return;
      let resp1 = await fetch(url + encodeURIComponent(this.startlocation));
      let data1 = await resp1.json();
      this.results1 = data1.items;
    },
    async doSearch2() {
      this.dropdown2 = true;
      if (this.endlocation === "") return;
      console.log("doSearch2");
      let resp2 = await fetch(url + encodeURIComponent(this.endlocation));
      let data2 = await resp2.json();
      this.results2 = data2.items;
    },
    getStart(place) {
      this.startlocation = place;
      this.dropdown1 = false;
    },
    getEnd(place) {
      this.endlocation = place;
      this.dropdown2 = false;
    },
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.name = "";
      this.startlocation = "";
      this.endlocation = "";
      this.weight = "";
      this.goodstype = "";
      this.$refs.observer.reset();
    },
    saveData() {
      localStorage.setItem("sl", this.startlocation);
      localStorage.setItem("el", this.endlocation);
      localStorage.setItem("dt", this.date);
      localStorage.setItem("wt", this.weight);
      localStorage.setItem("gt", this.goodstype);
      this.clear();
      this.$router.push({ name: "Csignup" });
    },
    //Function to set input field empty
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
  background-attachment: fixed;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  margin: auto;
  padding: 0;
}
</style>