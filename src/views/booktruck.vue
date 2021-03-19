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
              ><v-flex class="mx-3"
                ><h2 class="white--text">Book a Truck</h2></v-flex
              ><v-flex></v-flex
            ></v-layout>
            <validation-provider
              v-slot="{ errors }"
              name="Startlocation"
              rules="required"
            >
              <v-text-field
                v-model="startlocation"
                type="search"
                :error-messages="errors"
                @input="doSearch1"
                label="Start Location"
                prepend-inner-icon="mdi-map-marker"
                dark
                clearable
                outlined
                dense
              >
              </v-text-field>
            </validation-provider>
            <v-layout row wrap>
              <v-flex xs10 sm10 md10 lg10></v-flex>
              <v-flex
                ><v-btn @click.prevent="swapLoc()" color="white" x-small>
                  <span class="material-icons"> swap_vert </span>
                </v-btn></v-flex
              >
              <v-flex>
                <v-simple-table dark fixed-header dense v-if="dropdown1">
                  <thead>
                    <tr @click.prevent="getLocation()">
                      <td>
                        <span class="material-icons"> my_location </span>
                      </td>
                      <td>Your Location</td>
                    </tr>
                  </thead>
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
            </v-layout>
            <validation-provider
              v-slot="{ errors }"
              name="Endlocation"
              rules="required"
            >
              <v-text-field
                class="my-5"
                v-model="endlocation"
                type="search"
                :error-messages="errors"
                @input="doSearch2"
                label="End Location"
                prepend-inner-icon="mdi-map-marker"
                clearable
                dark
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <v-flex>
              <v-simple-table fixed-header dark dense v-if="dropdown2">
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
                clearable
                dark
                outlined
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
                dark
                clearable
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="type"
              rules="required"
            >
              <v-autocomplete
                v-model="vtype"
                label="Vehicle Type"
                :items="types"
                name="type"
                :error-messages="errors"
                clearable
                flat
                dark
                outlined
                dense
              >
              </v-autocomplete>
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
                dark
                clearable
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <v-layout class="my-1" row wrap>
              <v-flex lg2></v-flex>
              <v-flex>
                <v-btn
                  color="primary"
                  block
                  type="submit"
                  :disabled="invalid"
                  router
                  small
                  depressed
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
      startlocation: "",
      searchResults: [],
      endlocation: "",
      service: null,
      weight: "",
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
      vtype: "",
      goodstype: "",
      date: "",
      //
      dropdown1: false,
      dropdown2: false,
      results1: [],
      results2: [],
      //
      crntltln: [],
      crntloc: "",
    };
  },
  methods: {
    async doSearch1() {
      //Auto suggestion Function call for Startlocation Field
      this.dropdown1 = true;
      if (this.startlocation === "") return;
      let resp1 = await fetch(url + encodeURIComponent(this.startlocation));
      let data1 = await resp1.json();
      this.results1 = data1.items;
    },
    async doSearch2() {
      //Auto suggestion call for Endloaction Field
      this.dropdown2 = true;
      if (this.endlocation === "") return;
      console.log("doSearch2");
      let resp2 = await fetch(url + encodeURIComponent(this.endlocation));
      let data2 = await resp2.json();
      this.results2 = data2.items;
    },
    getStart(place) {
      //Input the Selected Value and Hide the Dropdown flex for Startlocation
      this.startlocation = place;
      this.dropdown1 = false;
    },
    getEnd(place) {
      //Input the Selected Value and Hide the Dropdown flex for Endlocation
      this.endlocation = place;
      this.dropdown2 = false;
    },
    getLocation() {
      //Fuction call to get the user's current geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        alert("Geolocation is not supported by this browser");
      }
    },
    showPosition(position) {
      //Fuction to get the geocoordinates of users's current location
      this.crntltln.push(position.coords.latitude);
      this.crntltln.push(position.coords.longitude);
      this.crntloc = this.crntltln.toString();
      this.inputCrntloc();
    },
    inputCrntloc() {
      //Performing the Reverse Geocodeing to get the user's geolocation address.
      const H = window.H;
      // Instantiate a map and platform object:
      var platform = new H.service.Platform({
        apikey: "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E",
      });
      // Get an instance of the search service:
      var service = platform.getSearchService();
      // Call the reverse geocode method with the geocoding parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      service.reverseGeocode(
        {
          at: this.crntloc,
        },
        (result) => {
          result.items.forEach((item) => {
            this.startlocation = item.address.label;
            this.crntltln = [];
          });
          this.dropdown1 = false;
        },
        alert
      );
    },
    swapLoc() {
      //Fuction to Swap the start and end location field values.
      let temp = this.startlocation;
      this.startlocation = this.endlocation;
      this.endlocation = temp;
    },
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.startlocation = "";
      this.endlocation = "";
      this.weight = "";
      this.vtype = "";
      this.goodstype = "";
      this.$refs.observer.reset();
    },
    saveData() {
      //Saving the datas on localstorage and redirect to sign up page
      if ((this.dropdown1 || this.dropdown2) == true) {
        alert("Select a Location");
      } //Checking if the user inputed the value from dropdown data.
      else {
        localStorage.setItem("sl", this.startlocation);
        localStorage.setItem("el", this.endlocation);
        localStorage.setItem("dt", this.date);
        localStorage.setItem("wt", this.weight);
        localStorage.setItem("vt", this.vtype);
        localStorage.setItem("gt", this.goodstype);
        this.clear();
        this.$router.push({ name: "Csignup" });
      }
    },
  },
};
</script>
<style scoped>
#book {
  border: solid white 1px;
  padding: 30px;
  border-radius: 30px;
  background-color: black;
  opacity: 0.8;
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