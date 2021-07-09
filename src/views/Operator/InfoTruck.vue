<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="truck info" />
        <mob-nav />
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-5">
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
                    Registration and Homelocation
                  </h5>
                </div>
                <div class="card-body">
                  <validation-observer ref="observer1" v-slot="{ invalid }">
                    <form @submit.prevent="truckadd">
                      <div class="form-group">
                        <label>Registration Number</label>
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
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <label>Home Location</label>
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
                        <v-flex row justify-center
                          ><v-btn
                            type="submit"
                            x-small
                            color="rgb(34, 48, 61)"
                            :disabled="invalid"
                            depressed
                            outlined
                            >Sumbit</v-btn
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
        <Dfooter />
      </div>
    </div>
  </v-app>
</template>
<script>
import Vue from "vue";
import Dsidebar from "../../components/Operator/dashsidebar.vue";
import Dfooter from "../../components/dashfooter.vue";
import Onavbar from "../../components/Operator/OptrNav.vue";
import MobNav from "../../components/Operator/MobNav.vue";
import { getAPI } from "../../axios-api";
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "This field can not be empty",
});
Vue.config.productionTip = false;
Vue.config.devtools = false;
const apiKey = "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E";
const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=30.22,-92.02&limit=10&apikey=${apiKey}&q=`;
export default {
  name: "InfoTruck",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
    ValidationObserver,
    ValidationProvider,
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
    clear() {
      (this.optrphone = ""),
        (this.truckphone = ""),
        (this.regnumber = ""),
        (this.homeloc = "")
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
              localStorage.removeItem("truck_id");
              localStorage.setItem("tid", this.APIData.data["id"]);
              this.clear();
              this.$router.push({ name: "DetailTruck" });
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