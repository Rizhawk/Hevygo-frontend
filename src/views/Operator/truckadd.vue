<template>
  <v-app>
    <Opage />
    <v-layout class="my-8" row wrap>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-flex xs10 sm8 md6 lg4>
        <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="3000"
          ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
        >
        <validation-observer ref="observer2" v-slot="{ invalid }">
          <form class="my-5" id="form3" @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Registration Number"
              rules="required"
            >
              <v-text-field
                v-model="regnumber"
                :error-messages="errors"
                label="Registration Number *"
                required
                clearable
                outlined
                rounded
                dense
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="Home Location"
              rules="required"
            >
              <v-text-field
                v-model="homeloc"
                :error-messages="errors"
                label="Home Location *"
                type="search"
                @input="doSearch"
                required
                clearable
                outlined
                rounded
                dense
              ></v-text-field>
            </validation-provider>
            <v-flex>
              <v-simple-table fixed-header dense v-if="dropdown">
                <tbody>
                  <tr v-for="result in results" :key="result.id">
                    <v-icon dense>mdi-map-marker</v-icon>
                    <td @click.prevent="getLoc(result.title)">
                      {{ result.title }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-flex>
            <v-layout row wrap>
              <v-flex lg3></v-flex>
              <v-flex class="my-2">
                <v-btn
                  color="primary"
                  rounded
                  depressed
                  block
                  @click.prevent="truckadd"
                  :disabled="invalid"
                  small
                >
                  Save
                </v-btn>
              </v-flex>
              <v-flex lg3></v-flex>
            </v-layout>
          </form>
        </validation-observer>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import Vue from "vue";
import { getAPI } from "../../axios-api";
import Opage from "../../components/optrpage";
import { required, digits, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

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
Vue.config.productionTip = false;
Vue.config.devtools = false;
const apiKey = "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E";
const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=30.22,-92.02&limit=10&apikey=${apiKey}&q=`;
export default {
  name: "Tadd",
  components: {
    ValidationProvider,
    ValidationObserver,
    Opage,
  },
  data: () => {
    return {
      snackbar: false,
      message: "",
      regnumber: "",
      homeloc: "",
      dropdown: false,
      results: [],
    };
  },
  methods: {
    async doSearch() {
      //Auto suggestion Function call for Homelocation Field
      this.dropdown = true;
      if (this.homeloc === "") return;
      let resp = await fetch(url + encodeURIComponent(this.homeloc));
      let data = await resp.json();
      this.results = data.items;
    },
    getLoc(place) {
      //Input the Selected Value and Hide the Dropdown flex for Endlocation
      this.homeloc = place;
      this.dropdown = false;
    },
    submit() {
      this.$refs.observer2.validate(); //Truck details add
    },
    clear() {
      (this.optrphone = ""),
        (this.truckphone = ""),
        (this.regnumber = ""),
        (this.homeloc = ""),
        this.$refs.observer2.reset();
    },
    truckadd() {
      if (this.dropdown == true) {
        alert("Select a Location");
      } else {
        getAPI
          .post(
            "/api/operators/add_truck/ ",
            {
              crew_id: localStorage.getItem("truck_id"),
              registration: this.regnumber,
              homelocation: this.homeloc,
              verification: 1,
              remarks: "Wait to be Verified",
            },
            {
              headers: {
                Authorization: ` Token ${this.$session.get("user_token")}`,
              },
            }
          )
          .then((response) => {
            this.APIData = response.data;
            if (this.APIData.response == 200) {
              this.message = this.APIData.message;
              this.snackbar = !this.snackbar;
              localStorage.removeItem("truck_id");
              localStorage.setItem("tid", this.APIData.data["id"]);
              this.clear();
              this.$router.push({ name: "Tdetails" });
            } else {
              alert(this.APIData.message);
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
  },
};
</script>
<style scoped>
#form3 {
  border: solid #1a237e 2px;
  padding: 25px;
  border-radius: 15px;
}
</style>