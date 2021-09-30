<template>
  <v-app>
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="specifications of truck" />
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
                    Specification of Truck
                  </h5>
                </div>
                <div class="card-body">
                  <validation-observer ref="observer">
                    <form @submit.prevent="trucketails">
                      <div class="form-group">
                        <label>Manufacturer</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="manufacturer"
                          rules="required"
                        >
                          <v-text-field
                            v-model="manufacturer"
                            :error-messages="errors"
                            name="manufacturer"
                            clearable
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <label>Type</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="type"
                          rules="required"
                        >
                          <v-combobox
                            v-model="type"
                            :items="types"
                            name="type"
                            :error-messages="errors"
                            clearable
                            outlined
                            dense
                          >
                          </v-combobox>
                        </validation-provider>
                        <label>Model</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="model"
                          rules="required"
                        >
                          <v-text-field
                            v-model="model"
                            :error-messages="errors"
                            clearable
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <label>Capacity in ton *</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="capacity"
                          rules="required"
                        >
                          <v-text-field
                            v-model="capacity"
                            :error-messages="errors"
                            clearable
                            outlined
                            dense
                          ></v-text-field>
                        </validation-provider>
                        <v-flex row justify-center
                          ><v-btn
                            type="submit"
                            x-small
                            color="rgb(34, 48, 61)"
                            depressed
                            outlined
                            >Save
                          </v-btn></v-flex
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
//Custom validation form input fields

extend("required", {
  ...required,
  message: "This field can not be empty",
});

export default {
  name: "DetailTruck",
  components: {
    Dsidebar,
    Dfooter,
    Onavbar,
    MobNav,
    ValidationProvider,
    ValidationObserver,
  },
  data: () => {
    return {
      manufacturer: "",
      type: "",
      types: [
        "6 Tyre Truck - 2 Axles",
        "10 Tyre Multy Axle Truck - 3 Axles",
        "12 Tyre Single Chassis Rigid Truck - 4 Axles",
        "14 Tyre Single Chassis Rigid Truck - 5 Axles",
        "14 Tyre Semi Trailer - 4 Axles",
        "18 Tyre Semi Trailer - 5 Axles ",
        "22 Tyre Semi Trailer - 6 Axles",
      ],
      model: "",
      capacity: "",
    };
  },
  methods: {
    trucketails() {
      //api call for add truck details
      getAPI
        .post(
          "/api/operators/add_truck_detials/",
          {
            truck_id: localStorage.getItem("tid"),
            manufacturer: this.manufacturer,
            type: this.type,
            model: this.model,
            capacity: this.capacity,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.response == 200) {
            this.message = this.APIData.message;
            this.snackbar = true;
            localStorage.removeItem("tid");
            this.$router.push({ name: "TrucksTable" });
          } else {
            alert(this.APIData.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //
    },
  },
};
</script>