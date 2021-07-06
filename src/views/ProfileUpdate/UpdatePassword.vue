<template>
  <v-app>
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
    <div class="wrapper">
      <Upage />
      <div class="main-panel" id="main-panel">
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
                    Change Password
                  </h5>
                  <div class="card-body">
                    <form @submit.prevent="ChangePassword">
                      <div class="form-group">
                        <label>Current Password</label>
                        <v-text-field
                          v-model="oldpassword"
                          label="Current Password"
                          name="password"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show ? 'text' : 'password'"
                          @click:append="show = !show"
                          outlined
                          dense
                        ></v-text-field>
                        <label>New Password</label>
                        <v-text-field
                          v-model="password"
                          label="New Password"
                          name="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="passwordRules"
                          :type="show1 ? 'text' : 'password'"
                          @click:append="show1 = !show1"
                          outlined
                          dense
                        ></v-text-field>
                        <label>Confirm New Password</label>
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
                          dense
                        ></v-text-field>
                        <v-flex row justify-center
                          ><v-btn
                            type="submit"
                            x-small
                            color="rgb(34, 48, 61)"
                            depressed
                            outlined
                            >Update</v-btn
                          ></v-flex
                        >
                      </div>
                    </form>
                  </div>
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
import { getAPI } from "../../axios-api";
import Upage from "../ProfileUpdate/UpdatePage.vue";
export default {
  name: "Upassword",
  components: {
    Upage,
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