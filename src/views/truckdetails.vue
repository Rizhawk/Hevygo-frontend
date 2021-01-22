<template>
  <nav>
    <Opage />
    <v-container class="mx-10">
      <v-row justify="space-around">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 24 : 6"
              class="my-8 black--text"
              width="400"
              outlined
              shaped
            >
              <v-card-title class="mx-10"
                ><h3 class="mx-12">Enter the details</h3></v-card-title
              >
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form class="mx-8" @submit.prevent="submit">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Truck"
                    rules="required"
                  >
                    <v-select
                      v-model="truck"
                      :error-messages="errors"
                      :items="trucks"
                      label="Truck *"
                      required
                    ></v-select>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="manufacturer"
                    rules="required"
                  >
                    <v-text-field
                      v-model="manufacturer"
                      label="Manufacturer *"
                      :error-messages="errors"
                      name="manufacturer"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="type"
                    rules="required"
                  >
                    <v-select
                      v-model="type"
                      label="Type *"
                      :items="types"
                      name="type"
                      :error-messages="errors"
                    >
                    </v-select>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="model"
                    rules="required"
                  >
                    <v-text-field
                      v-model="model"
                      :error-messages="errors"
                      label="Model *"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="capacity"
                    rules="required"
                  >
                    <v-text-field
                      v-model="capacity"
                      :error-messages="errors"
                      label="Capacity *"
                    ></v-text-field>
                  </validation-provider>
                   <div>
                    <v-card-text> *indicate fields are necessary </v-card-text>
                  </div>
                  
                  <div class="mx-12 my-5">
                    <v-btn
                      color="primary"
                      class="mr-4"
                      type="submit"
                      :disabled="invalid"
                      @click.prevent="trucketails"
                    >
                      Add
                    </v-btn>
                    <v-btn @click="clear"> clear </v-btn>
                  </div>
                  <div>
                    <v-card-text> </v-card-text>
                  </div>
                </form>
              </validation-observer>
            </v-card>
          </template>
        </v-hover>
      </v-row>
    </v-container>
  </nav>
</template>
<script>
import Opage from "../views/optrpage";
import { getAPI } from "../axios-api";
import { required, digits, email, max, min } from "vee-validate/dist/rules";
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

extend("email", {
  ...email,
  message: "Email must be valid",
});

//Custom validation ends
export default {
  name: "Tdetails",
  components: {
    ValidationProvider,
    ValidationObserver,
    Opage,
  },
  data: () => {
    return {
      trucks: [],
      truck: "",
      manufacturer: "",
      type:"",
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
      model: "",
      capacity: "",
      token: localStorage.getItem("user_token") || null,
    };
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {

    },
    trucketails(){
       getAPI
      .post("/api/truck/truck-detail-create/",{        
         truck:this.truck,
         manufacturer:this.manufacturer,
         type :this.type,
         model:this.model,
         capacity:this.capacity
      },
       {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      })
      .then(response=> {
        this.APIData = response.data;
        console.log(this.APIData);      
      })
      .catch((err) => {
        alert(err);
      });

    }
  },
  beforeMount: function () {
    getAPI
      .get("/api/truck/truck-list/", {
        headers: {
          Authorization: `Token ${this.token}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData) {
          this.trucks.push(this.APIData[key]["registration"]);
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
};
</script>