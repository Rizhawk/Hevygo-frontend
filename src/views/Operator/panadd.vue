<template>
  <v-app id="page2">
    <v-layout class="my-15" row wrap>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-flex xs10 sm8 md6 lg4 class="my-12">
        <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="3000"
          ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
        >
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form id="form5" @submit.prevent="panadd(invalid)">
            <v-flex row wrap>
              <p class="mx-3 my-2 white--text font-weight-black subtitle-1">
                Add Details
              </p>
            </v-flex>
            <v-flex class="my-4"></v-flex>
            <validation-provider
              v-slot="{ errors }"
              name="Pan number"
              rules="required"
            >
              <v-text-field
                v-model="pan"
                :error-messages="errors"
                label="PAN Number *"
                maxlength="10"
                dark
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="PAN card"
              rules="required"
            >
              <v-file-input
                v-model="panfile"
                accept="image/png,image/jpeg"
                :error-messages="errors"
                label="Upload PAN Card *"
                dark
                outlined
                dense
              ></v-file-input>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="GST Number"
              maxlength="15"
              rules="required"
            >
              <v-text-field
                v-model="gst_no"
                :error-messages="errors"
                label="Gst Number *"
                dark
                outlined
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="GST Paper"
              rules="required"
            >
              <v-file-input
                v-model="gstfile"
                accept="image/png,image/jpeg"
                :error-messages="errors"
                label="Upload GST *"
                dark
                outlined
                dense
              ></v-file-input>
            </validation-provider>
            <v-layout row wrap>
              <v-flex lg3></v-flex>
              <v-flex class="my-2">
                <v-btn small depressed block type="submit" color="primary"
                  >Save</v-btn
                >
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
import { getAPI } from "../../axios-api";
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
  message: "required",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("min", {
  ...min,
  message: "{_field_}  should be greater than {length} characters",
});
export default {
  name: "Padd",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => {
    return {
      pan: "",
      panfile: "",
      gst_no: "",
      gstfile: "",
      message: "",
      text1: false,
      text2: false,
      show: true,
      snackbar: false,
    };
  },
  methods: {
    clear() {
      (this.pan = ""), (this.gst_no = ""), this.$refs.observer.reset();
    },
    panadd(invalid) {
      this.$refs.observer.validate();
      if (invalid == false) {
        let optrInfo = new FormData();
        optrInfo.append("pan", this.pan);
        optrInfo.append("pan_scan", this.panfile);
        optrInfo.append("gst_no", this.gst_no);
        optrInfo.append("gst_scan ", this.gstfile);
        optrInfo.append("status", 1);
        optrInfo.append("remarks", "Please wait to be verified");
        getAPI
          .post("api/operators/add_operator_info/", optrInfo, {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          })
          .then((response) => {
            this.APIData = response.data;
            if (this.APIData.response == 200) {
              this.message = this.APIData.message;
              this.snackbar = !this.snackbar;
              alert("Registration successful!");
              this.$router.push({ name: "Login" });
            } else {
              this.message = this.APIData.message;
              this.snackbar = !this.snackbar;
            }
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        alert("Invalid form.");
      }
    },
  },
};
</script>
<style scoped>
#page2 {
  background: url("../../assets/truck-12.jpg");
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  margin: auto;
  padding: 0;
}
#form5 {
  border: solid white 1px;
  padding: 35px;
  border-radius: 25px;
  background-color: black;
  opacity: 0.8;
}
</style>
