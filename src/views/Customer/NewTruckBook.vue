<template>
  <v-app>
    <div class="wrapper">
      <Csidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Cnavbar title="Book a New Truck" />
        <Cmobnav />
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <h5
                    class="
                      card-title
                      font-weight-black
                      text-secondary
                      subtitle-1
                    "
                  >
                    Book a New Truck
                  </h5>
                </div>
                <div class="card-body">
                  <validation-observer ref="observer" v-slot="{ invalid }">
                    <form @submit.prevent="bookTruck">
                      <div class="form-group">
                        <label>Start Location</label>
                        <v-text-field
                          v-model="startlocation"
                          type="search"
                          @input="doSearch1"
                          prepend-inner-icon="mdi-map-marker"
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
                          <v-flex class="myDropdown">
                            <v-simple-table dense v-if="dropdown1">
                              <thead>
                                <tr @click.prevent="getLocation()">
                                  <td>
                                    <span class="material-icons">
                                      my_location
                                    </span>
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
                        <label>End Location</label>
                        <v-text-field
                          v-model="endlocation"
                          type="search"
                          class="my-5"
                          @input="doSearch2"
                          prepend-inner-icon="mdi-map-marker"
                          clearable
                          outlined
                          dense
                        ></v-text-field>
                        <v-flex class="myDropdown">
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
                        <label>Date of Transport</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="Date"
                          rules="required"
                        >
                          <v-text-field
                            v-model="date"
                            :error-messages="errors"
                            type="date"
                            clearable
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <label>Weight of Goods (In ton)</label>
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
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <label>Type of Vechicle</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="type"
                          rules="required"
                        >
                          <v-autocomplete
                            v-model="vtype"
                            :items="types"
                            name="type"
                            :error-messages="errors"
                            outlined
                            dense
                          >
                          </v-autocomplete>
                        </validation-provider>
                        <label>Type of Goods</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="Goods Type"
                          rules="required|max:10"
                        >
                          <v-text-field
                            v-model="goodstype"
                            :error-messages="errors"
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <v-flex row justify-center
                          ><v-btn
                            type="submit"
                            x-small
                            color="rgb(34, 48, 61)"
                            :disabled="invalid"
                            depressed
                            outlined
                            >Confirm</v-btn
                          ></v-flex
                        >
                      </div>
                    </form>
                  </validation-observer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import Vue from "vue";
import { getAPI } from "../../axios-api";
import Csidebar from "../../components/Customer/sidebar.vue";
import Cnavbar from "../../components/Customer/navbar.vue";
import Cmobnav from "../../components/Customer/navmob.vue";
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
const apiKey = "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E";
const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=30.22,-92.02&limit=10&apikey=${apiKey}&q=`;
export default {
  name: "Newbooking",
  components: {
    Csidebar,
    Cnavbar,
    Cmobnav,
    ValidationObserver,
    ValidationProvider,
  },
  data: () => {
    return {
      startlocation: "" || localStorage.getItem("sl"),
      endlocation: "" || localStorage.getItem("el"),
      date: "" || localStorage.getItem("dt"),
      weight: "" || localStorage.getItem("wt"),
      goodstype: "" || localStorage.getItem("gt"),
      vtype: "",
      //
      types: [
        "6 Tyre Truck - 2 Axles",
        "10 Tyre Multy Axle Truck - 3 Axles",
        "12 Tyre Single Chassis Rigid Truck - 4 Axles",
        "14 Tyre Single Chassis Rigid Truck - 5 Axles",
        "14 Tyre Semi Trailer - 4 Axles",
        "18 Tyre Semi Trailer - 5 Axles ",
        "22 Tyre Semi Trailer - 6 Axles",
      ],
      //
      dropdown1: false,
      dropdown2: false,
      results1: [],
      results2: [],
      //
      crntltln: [],
      crntloc: "",
      //
      origin: [],
      dest: [],
      startCords: "",
      endCords: "",
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
      const H = window.H;
      var platform = new H.service.Platform({
        apikey: "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E",
      });
      var service = platform.getSearchService();
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
        }
      );
    },
    swapLoc() {
      //Fuction to Swap the start and end location field values.
      let temp = this.startlocation;
      this.startlocation = this.endlocation;
      this.endlocation = temp;
    },
    clear() {
      localStorage.clear();
      this.startlocation = "";
      this.endlocation = "";
      this.weight = "";
      this.date = "";
      this.goodstype = "";
    },
    getCords() {
      const H = window.H;
      var platform = new H.service.Platform({
        apikey: "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E",
      });
      var service = platform.getSearchService();
      service.geocode(
        {
          q: this.startlocation,
        },
        (result) => {
          // Add a marker for each location found
          result.items.forEach((item) => {
            // map.addObject(new H.map.Marker(item.position));
            this.origin.push(item.position["lat"]);
            this.origin.push(item.position["lng"]);
          });
          let Norigin = this.origin.slice(0, 2);
          this.startCords = Norigin.toString();
          console.log(this.startCords);
        }
      );
      service.geocode(
        {
          q: this.endlocation,
        },
        (result) => {
          // Add a marker for each location found
          result.items.forEach((item) => {
            // map.addObject(new H.map.Marker(item.position));
            this.dest.push(item.position["lat"]);
            this.dest.push(item.position["lng"]);
          });
          let Ndest = this.dest.slice(0, 2);
          this.endCords = Ndest.toString();
          console.log(this.endCords);
          // this.bookTruck();
        }
      );
    },
    bookTruck() {
      if ((this.dropdown1 || this.dropdown2) == true) {
        //Checking if the user inputed the value from dropdown data.
        alert("Select a Location");
      } else {
        let src = JSON.stringify({
          waypoint: this.startCords,
          address: this.startlocation,
        });
        let dest = JSON.stringify({
          waypoint: this.endCords,
          address: this.endlocation,
        });
        console.log(src);
        console.log(dest);
        getAPI
          .post(
            "/api/customers/cust-dest-create/",
            {
              start_location: src,
              end_location: dest,
              weight: this.weight,
              goods_type: this.goodstype,
              date: this.date,
              vehicle_type: this.vtype,
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
            this.$router.push({ name: "RouteMap" });
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
.myDropdown {
  position: absolute;
  color: black;
  background-color: #f6f6f6;
  min-width: 250px;
  overflow: auto;
  z-index: 1;
}
</style>