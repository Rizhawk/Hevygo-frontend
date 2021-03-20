<template>
  <v-app>
    <Opage />
    <v-layout row wrap class="my-15">
      <v-flex xs1 sm2 md2 lg3></v-flex>
      <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="3000"
        ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
      >
      <v-flex xs10 sm8 md6 lg5>
        <!--Form to add a new truck status-->
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form id="form7" @submit.prevent="submit">
            <validation-provider
              v-slot="{ errors }"
              name="Truck"
              :rules="{
                required: true,
              }"
            >
              <v-select
                v-model="reg"
                label="Truck"
                :error-messages="errors"
                :items="trucks"
                @input="getLoction()"
                clearable
                rounded
                dark
                outlined
                dense
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Driver"
              :rules="{
                required: true,
              }"
            >
              <v-select
                v-model="driver"
                label="Drivers"
                :error-messages="errors"
                :items="drivers"
                clearable
                dark
                rounded
                outlined
                dense
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Status"
              :rules="{
                required: true,
              }"
            >
              <v-select
                v-model="status"
                :items="stats"
                label="Status"
                :error-messages="errors"
                clearable
                rounded
                dark
                outlined
                dense
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Location"
              :rules="{
                required: true,
              }"
            >
              <v-text-field
                v-model="loc"
                label="Location"
                :error-messages="errors"
                clearable
                rounded
                dark
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <v-layout row wrap>
              <v-flex lg3></v-flex>
              <v-flex class="my-2">
                <v-btn
                  :disabled="invalid"
                  rounded
                  block
                  depressed
                  small
                  type="submit"
                  color="primary"
                  @click="truckdetails(status, loc)"
                  >Save</v-btn
                ></v-flex
              >
              <v-flex lg3></v-flex>
            </v-layout>
          </form>
        </validation-observer>
        <!--Form ends-->
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
import Opage from "../components/optrpage";
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
  message: "{_field_} can not be empty",
});
export default {
  name: "Tstatus",
  components: { Opage, ValidationProvider, ValidationObserver },
  data: () => {
    return {
      truckdata: [],
      driverdata: [],
      stats: ["Available", "Unavailable"],
      loc: "",
      status: "",
      reg: "",
      driver: "",
      trucks: [],
      id: [],
      drivers: [],
      tid: "",
      did: "",
      message: "",
      snackbar: false,
    };
  },
  beforeMount: function () {
    //Api call for fetch the reg number of all trucks
    getAPI
      .get("api/truck/truck-list/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData) {
          this.trucks.push(this.APIData[key]["registration"]);
        }
        this.truckdata = this.APIData;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  mounted: function () {
    //Api call for fetch the names of all drivers
    getAPI
      .get("api/operators/driver-list/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData) {
          this.drivers.push(this.APIData[key]["driver_name"]);
        }
        this.driverdata = this.APIData;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      (this.reg = ""),
        (this.driver = ""),
        (this.status = ""),
        (this.loc = ""),
        this.$refs.observer.reset();
    },
    getLoction() {
      for (let key in this.truckdata) {
        if (this.reg == this.truckdata[key]["registration"]) {
          this.loc = this.truckdata[key]["homelocation"];
        }
      }
    },
    truckdetails(status, loc) {
      //Api call to create a truck status
      for (let key in this.truckdata) {
        if (this.reg == this.truckdata[key]["registration"]) {
          this.tid = this.truckdata[key]["id"];
        }
      }
      for (let key in this.driverdata) {
        if (this.driver == this.driverdata[key]["driver_name"]) {
          this.did = this.driverdata[key]["id"];
        }
      }
      getAPI
        .post(
          "/api/truck/truck-status-create/",
          {
            truck: this.tid,
            driver: this.did,
            status: status,
            location: loc,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.message = "New Status Created Successfully";
          this.snackbar = true;
          this.clear();
        })
        .catch((err) => {
          if (err.response.data["truck"]) {
            alert(this.reg + " is already assgined to a driver");
          } else if (err.response.data["driver"]) {
            alert(this.driver + " is already assigned to a truck.");
          }
          console.log(err);
        });
      //
    },
  },
};
</script>
<style scoped>
</style>
<style scoped>
#form7 {
  border: solid black 2px;
  padding: 30px;
  border-radius: 30px;
  background-color: slategrey;
}
</style>