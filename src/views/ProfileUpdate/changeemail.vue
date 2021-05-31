<template>
  <v-app>
    <Propage />
    <v-layout class="my-15" row wrap>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-snackbar
        v-model="snackbar"
        multi-line
        color="teal darken-4"
        timeout="10000"
      >
        {{ this.message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar
        color="red darken-4"
        top
        text-color="white"
        v-model="snackbar2"
        timeout="5000"
      >
        {{ this.message2 }}
      </v-snackbar>
      <v-flex xs1 sm2 md2 lg4>
        <form id="changeemail" @submit.prevent="changeEmail">
          <v-flex row wrap>
            <p class="mx-3 my-2 black--text font-weight-black subtitle-1">
              Change Email
            </p>
          </v-flex>
          <v-flex class="my-4"></v-flex>
          <v-text-field
            v-model="email"
            label="New Email Id"
            :append-icon="icon"
            @input="checkEmail"
            outlined
            rounded
            dense
          ></v-text-field>
          <v-text-field
            v-if="otpfield"
            v-model="otp"
            label="OTP"
            @input="verified"
            maxlength="6"
            outlined
            rounded
            dense
          ></v-text-field>
          <v-layout row wrap>
            <v-flex lg3></v-flex>
            <v-flex class="mx-4">
              <v-btn
                color="primary"
                type="submit"
                class="my-2"
                dark
                block
                small
                depressed
              >
                Update
              </v-btn>
            </v-flex>
            <v-flex lg3></v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Propage from "../../components/profilepage";
export default {
  name: "Changeemail",
  components: {
    Propage,
  },
  data: () => {
    return {
      email: "",
      currentphone: "",
      otpfield: false,
      otp: "",
      icon: "",
      snackbar: false,
      message: "",
      snackbar2: false,
      message2: "",
    };
  },
  created: function () {
    getAPI
      .get("/api/accounts/is_login/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.currentphone = this.APIData.data["phone"];
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    checkEmail() {
      if (this.email.slice(this.email.length - 4) == ".com") {
        getAPI
          .get("api/accounts/check/?email=" + this.email)
          .then((response) => {
            this.APIData = response.data;
            if (this.APIData.data["new_email"] == false) {
              this.message2 = `Email Id ${this.email} is already exist`;
              this.icon2 = "mdi-close-circle-outline";
              this.snackbar2 = true;
            } else {
              this.genOtp();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    genOtp() {
      if (this.email.slice(this.email.length - 4) == ".com") {
        getAPI
          .get("api/accounts/otp_gen/?phone=" + this.currentphone)
          .then((response) => {
            this.APIData = response.data;
            this.otp = "";
            this.otpfield = true;
            this.message = `Your OTP is ${this.APIData.data["OTP"]}`;
            this.snackbar = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    verified() {
      if ((this.otp.length == 6) & (this.otp == this.APIData.data["OTP"])) {
        this.icon = "mdi-checkbox-marked-circle-outline";
      } else {
        this.icon = "mdi-close-circle-outline";
      }
    },
    clear() {
      this.email = "";
      this.otp = "";
    },
    changeEmail() {
      getAPI
        .post(
          "/api/accounts/update_email/",
          {
            email: this.email,
            otp: this.otp,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 400) {
            this.message2 = this.APIData.message;
            this.snackbar2 = true;
          } else if (this.APIData.Http_response == 200) {
            this.message = this.APIData.message;
            this.snackbar = true;
            this.clear();
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
#changeemail {
  border: solid black 2px;
  padding: 30px;
  border-radius: 15px;
}
</style>