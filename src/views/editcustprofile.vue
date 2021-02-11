<template>
  <v-layout class="my-10" row wrap>
    <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="4000"
      ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
    >
    <v-flex xs1 sm2 md2 lg2></v-flex>
    <v-flex xs12 sm8 md6 lg8>
      <v-card color="profile">
        <v-card-title class="text-center justify-center py-6">
          <p class="font-weight-bold display-1 profile--text headline">
            Edit your Profile
          </p>
        </v-card-title>

        <v-tabs fixed-tabs background-color="blue lighten-1" dark>
          <v-tabs-slider></v-tabs-slider>
          <v-tab> Change Details </v-tab>
          <v-tab> Change Password </v-tab>
          <v-tab-item>
            <v-layout class="my-10" row wrap>
              <v-flex xs1 sm2 md2 lg3></v-flex>
              <v-flex xs12 sm8 md6 lg6>
                <validation-observer v-slot="{ invalid }">
                  <form id="update">
                    <v-text-field
                      v-model="uname"
                      label="Name"
                      rounded
                      outlined
                      dense
                    ></v-text-field>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Phone Number"
                      :rules="{
                        digits: 10,
                      }"
                    >
                      <v-text-field
                        v-model="uphn"
                        label="Phonenumber"
                        :error-messages="errors"
                        rounded
                        outlined
                        dense
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="email"
                      rules="email"
                    >
                      <v-text-field
                        v-model="uemail"
                        label="Email"
                        :error-messages="errors"
                        rounded
                        outlined
                        dense
                      >
                      </v-text-field>
                    </validation-provider>
                    <v-layout row wrap class="my-1"
                      ><v-flex lg1></v-flex
                      ><v-flex class="mx-10"
                        ><v-btn
                          block
                          depressed
                          small
                          type="submit"
                          color="primary"
                          :disabled="invalid"
                          @click.prevent="uptProfile"
                          >Update</v-btn
                        ></v-flex
                      >
                      <v-flex lg1></v-flex>
                    </v-layout>
                  </form>
                </validation-observer>
              </v-flex>
            </v-layout>
          </v-tab-item>
          <v-tab-item>
            <v-layout row wrap class="my-10">
              <v-flex xs1 sm2 md2 lg3></v-flex>
              <v-flex xs12 sm8 md6 lg6>
                <form id="update2">
                  <v-text-field
                    v-model="npass"
                    label="New Password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    outlined
                    rounded
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="cnpass"
                    label="Confirm New Password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[
                      npass === cnpass ||
                        'The password confirmation does not match.',
                    ]"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    outlined
                    rounded
                    dense
                  ></v-text-field>
                  <v-layout row wrap class="my-1">
                    <v-flex lg1></v-flex>
                    <v-flex class="mx-10"
                      ><v-btn
                        small
                        depressed
                        block
                        type="submit"
                        color="primary"
                        @click.prevent="uptPassword"
                        >Update</v-btn
                      >
                    </v-flex>
                    <v-flex lg1></v-flex>
                  </v-layout>
                </form>
              </v-flex>
            </v-layout>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { getAPI } from "../axios-api";
import { digits, email } from "vee-validate/dist/rules";
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
extend("email", {
  ...email,
  message: "Email must be valid",
});
export default {
  name: "Ecprofile",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => {
    return {
      uname: "",
      uphn: "",
      uemail: "",
      password: "",
      //
      snackbar: false,
      message: "",
      //
      npass: "",
      cnpass: "",
      show1: false,
      show2: false,
      passwordRules: [
        (value) => (value && value.length >= 6) || "minimum 6 characters",
      ],
    };
  },
  beforeMount: function () {
    getAPI
      .get("/api/accounts/user-detail/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.uname = this.APIData.name;
        this.uphn = this.APIData.phone;
        this.uemail = this.APIData.email;
        this.password = this.APIData.password;
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    uptProfile() {
      getAPI
        .put(
          "/api/accounts/user-update/",
          {
            phone: this.uphn,
            password: this.password,
            password2: this.password,
            user_type: 2,
            name: this.uname,
            email: this.uemail,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.message = "Profile Updated Successfully";
          this.snackbar = true;
        })
        .catch((err) => {
          alert(err);
        });
    },
    uptPassword() {
      getAPI
        .put(
          "/api/accounts/user-update/",
          {
            phone: this.uphn,
            password: this.npass,
            password2: this.cnpass,
            user_type: 2,
            name: this.uname,
            email: this.uemail,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.message = "Password Changed Successfully";
          this.snackbar = true;
          this.clear();
        })
        .catch((err) => {
          alert(err);
        });
    },
    clear() {
      (this.npass = ""), (this.cnpass = "");
    },
  },
};
</script>
<style scoped>
.profile {
  background-color: #768594 !important;
}
.profile--text {
  color: black !important;
}
#update {
  border: solid black 2px;
  padding: 30px;
  border-radius: 30px;
  background-color: white;
}
#update2 {
  border: solid black 2px;
  padding: 30px;
  border-radius: 30px;
  background-color: white;
}
</style>