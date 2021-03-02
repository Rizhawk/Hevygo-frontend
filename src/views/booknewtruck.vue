<template>
  <v-app>
    <Cpage />
    <v-layout class="my-5" row wrap>
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
              outlined
              rounded
              dense
            ></v-text-field>
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
              label="End Location"
              type="search"
              @input="doSearch2"
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
                clearable
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
                clearable
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
                clearable
                outlined
                rounded
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
import Cpage from "../views/custpage";
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
const apiKey = "H2HPEplnWZvYwdCxIeyaFJf_RhOLUMzQXip2ADBNupY";
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
      date: "" || localStorage.getItem("dt"),
      weight: "" || localStorage.getItem("wt"),
      goodstype: "" || localStorage.getItem("gt"),
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
      localStorage.clear();
      this.name = "";
      this.startlocation = "";
      this.endlocation = "";
      this.weight = "";
      this.date = "";
      this.goodstype = "";
      this.$refs.observer.reset();
    },
    bookTruck() {
      getAPI
        .post(
          "/api/customer/cust-dest-create/",
          {
            start_location: this.startlocation,
            end_location: this.endlocation,
            weight: this.weight,
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
          this.clear();
          localStorage.clear();
          this.$router.push({ name: "Cbookings" });
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
<style scoped>
#booknew {
  border: solid black 2px;
  padding: 30px;
  border-radius: 30px;
  background-color: white;
}
</style>
