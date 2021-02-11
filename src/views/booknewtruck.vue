<template>
  <v-app>
    <Cpage />
    <v-layout class="my-5" row wrap>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-flex xs12 sm8 md6 lg4>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form id="booknew" @submit.prevent="submit">
            <v-layout class="my-2" row wrap
              ><v-flex class="mx-3"><h2>Book a Truck</h2></v-flex
              ><v-flex></v-flex
            ></v-layout>
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
                clearable
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
                clearable
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
                  :disabled="invalid"
                  router
                  rounded
                  small
                  @click.prevent="bookTruck"
                >
                  Confirm
                </v-btn>
                <v-btn
                  small
                  class="mx-2"
                  color="red"
                  @click.prevent="clear"
                  rounded
                  >Reset</v-btn
                >
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
      citi: [],
      address: [],
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
          //   this.$router.push({ name: "HereMap" });
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
