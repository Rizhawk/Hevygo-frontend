<template>
  <v-app>
    <Propage />
    <v-layout class="my-15" row wrap>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-snackbar
        v-model="snackbar"
        multi-line
        color="teal darken-4"
        timeout="5000"
      >
        {{ this.message }}
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
        <form id="changepass" @submit.prevent="ChangePassword">
          <v-flex row wrap>
            <p class="mx-3 my-2 black--text font-weight-black subtitle-1">
              Change Password
            </p>
          </v-flex>
          <v-flex class="my-4"></v-flex>
          <v-text-field
            v-model="oldpassword"
            label="Current Password"
            name="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            outlined
            rounded
            dense
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="New Password"
            name="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            outlined
            rounded
            dense
          ></v-text-field>
          <v-text-field
            v-model="password2"
            label="Confirm New Password"
            name="confirmPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[
              !!password2 || 'type confirm password',
              password === password2 ||
                'The password confirmation does not match.',
            ]"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            outlined
            rounded
            dense
          ></v-text-field>
          <v-layout class="my-2" row wrap>
            <v-flex lg2></v-flex>
            <v-flex class="mx-10">
              <v-btn color="primary" type="submit" dark block small depressed>
                Update
              </v-btn>
            </v-flex>
            <v-flex lg2></v-flex>
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
  name: "Changepassword",
  components: {
    Propage,
  },
  data: () => {
    return {
      oldpassword: "",
      password: "",
      password2: "",
      show: false,
      show1: false,
      show2: false,
      snackbar: false,
      message: "",
      snackbar2: false,
      message2: "",
      passwordRules: [
        (value) => (value && value.length >= 6) || "minimum 6 characters",
      ],
    };
  },
  methods: {
    clear() {
      this.oldpassword = "";
      this.password = "";
      this.password2 = "";
    },
    ChangePassword() {
      getAPI
        .post(
          "/api/accounts/update_password/",
          {
            password: this.oldpassword,
            password_new: this.password,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 401) {
            this.message2 = this.APIData.message;
            this.snackbar2 = true;
          } else if (this.APIData.Http_response == 200) {
            this.message = this.APIData.message;
            this.snackbar = true;
            this.clear();
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
#changepass {
  border: solid black 2px;
  padding: 30px;
  border-radius: 15px;
}
</style>
