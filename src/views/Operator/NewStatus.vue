<template>
  <v-app>
    <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="3000"
      ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
    >
    <div class="wrapper">
      <Dsidebar />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <Onavbar title="Add new Truck status" />
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
                    New Truck Status
                  </h5>
                </div>
                <div class="card-body">
                  <validation-observer ref="observer1" v-slot="{ invalid }">
                    <form @submit.prevent="truckdetails">
                      <div class="form-group">
                        <label>Truck</label>
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
                            outlined
                            dense
                          ></v-select>
                        </validation-provider>
                        <label>Driver</label>
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
                            outlined
                            dense
                          ></v-select>
                        </validation-provider>
                        <label>Status</label>
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
                            outlined
                            dense
                          ></v-select>
                        </validation-provider>
                        <label>Location</label>
                        <validation-provider
                          v-slot="{ errors }"
                          name="Current Location"
                          :rules="{
                            required: true,
                          }"
                        >
                          <v-text-field
                            v-model="loc"
                            label="Location"
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
                            :disabled="invalid"
                            depressed
                            outlined
                            >Add</v-btn
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
export default {
  name: "NewStatus",
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
      .get("/api/operators/list_truck/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData.data) {
          this.trucks.push(this.APIData.data[key]["registration"]);
        }
        this.truckdata = this.APIData.data;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  mounted: function () {
    //Api call for fetch the names of all drivers
    getAPI
      .get("/api/operators/list_driver/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData.data) {
          this.drivers.push(this.APIData.data[key]["driver_name"]);
        }
        this.driverdata = this.APIData.data;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  methods: {
    clear() {
      (this.reg = ""), (this.driver = ""), (this.status = ""), (this.loc = "");
    },
    getLoction() {
      for (let key in this.truckdata) {
        if (this.reg == this.truckdata[key]["registration"]) {
          this.loc = this.truckdata[key]["homelocation"];
        }
      }
      console.log(this.loc);
    },
    truckdetails() {
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
          "/api/truck/add_truck_status/",
          {
            truck_id: this.tid,
            status: this.status,
            location: this.loc,
            driver_id: this.did,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 200) {
            this.message = this.APIData.message;
            this.snackbar = true;
            this.clear();
            this.$router.push({ name: "StatusTable" });
          } else {
            this.message = this.APIData.message;
            this.snackbar = true;
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