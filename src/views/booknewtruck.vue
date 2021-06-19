<template>
  <v-app>
    <Cpage />
    <v-layout class="my-2" row wrap>
      <v-flex xs2 sm2 md2 lg4></v-flex>
      <v-flex xs8 sm8 md6 lg4>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form id="booknew" @submit.prevent="submit">
            <v-layout class="my-2" row wrap
              ><v-flex class="mx-3"><h2>Book a Truck</h2></v-flex
              ><v-flex></v-flex
            ></v-layout>
            <v-text-field
              v-model="startlocation"
              label="Start Location"
              type="search"
              @input="doSearch1"
              prepend-inner-icon="mdi-map-marker"
              clearable
              outlined
              dense
            ></v-text-field>
            <v-layout row wrap>
              <v-flex xs10 sm10 md10 lg10></v-flex>
              <v-flex
                ><v-btn @click.prevent="swapLoc()" dark x-small>
                  <span class="material-icons"> swap_vert </span>
                </v-btn></v-flex
              >
              <v-flex>
                <v-simple-table dense v-if="dropdown1">
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
            <v-text-field
              v-model="endlocation"
              label="End Location"
              type="search"
              class="my-5"
              @input="doSearch2"
              prepend-inner-icon="mdi-map-marker"
              clearable
              outlined
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
                clearable
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
                clearable
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <v-layout class="my-1" row wrap>
              <v-flex lg3></v-flex>
              <v-flex>
                <v-btn
                  dark
                  type="submit"
                  block
                  :disabled="invalid"
                  router
                  depressed
                  small
                  @click.prevent="bookTruck"
                >
                  Confirm
                </v-btn>
              </v-flex>
              <v-flex lg3></v-flex>
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
import { getAPI } from "../axios-api";
import Cpage from "../components/custpage";
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
Vue.config.productionTip = false;
Vue.config.devtools = false;
const apiKey = "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E";
const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=30.22,-92.02&limit=10&apikey=${apiKey}&q=`;
export default {
  name: "Bnewtruck",
  components: {
    ValidationProvider,
    ValidationObserver,
    Cpage,
  },
  data: () => {
    return {
      startlocation: "" || localStorage.getItem("sl"),
      endlocation: "" || localStorage.getItem("el"),
      date: "2021-06-19",
      weight: "" || localStorage.getItem("wt"),
      goodstype: "" || localStorage.getItem("gt"),
      vtype: "",
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
      //Fuction to get the gocoordinates of users's current location
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
      localStorage.clear();
      this.startlocation = "";
      this.endlocation = "";
      this.weight = "";
      this.date = "";
      this.goodstype = "";
      this.$refs.observer.reset();
    },
    bookTruck() {
      if ((this.dropdown1 || this.dropdown2) == true) {
        //Checking if the user inputed the value from dropdown data.
        alert("Select a Location");
      } else {
        console.log(this.vtype);
        getAPI
          .post(
            "/api/customer/cust-dest-create/",
            {
              start_location: this.startlocation,
              end_location: this.endlocation,
              weight: this.weight,
              vehicle_type: this.vtype,
              goods_type: this.goodstype,
              date: this.date,
            },
            {
              headers: {
                Authorization: ` Token ${this.$session.get("user_token")}`,
              },
            }
          )
          .then((response) => {
            this.APIData = response.data;
            console.log(this.APIData);
            this.$session.set("sl", this.startlocation);
            this.$session.set("el", this.endlocation);
            this.clear();
            localStorage.clear();
            this.$router.push({ name: "HereMap" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style scoped>
#booknew {
  border: solid #004d40 3px;
  padding: 30px;
  border-radius: 15px;
}
</style>
