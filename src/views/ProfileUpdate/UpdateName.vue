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
                    Change Name
                  </h5>
                  <div class="card-body">
                    <form @submit.prevent="changeName">
                      <div class="form-group">
                        <label>New Name</label>
                        <v-text-field
                          v-model="name"
                          label="New Name"
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
  name: "Uname",
  components: {
    Upage,
  },
  data: () => {
    return {
      name: "",
      snackbar: false,
      message: "",
      snackbar2: false,
      message2: "",
    };
  },
  methods: {
    changeName() {
      getAPI
        .post(
          "/api/accounts/update_name/",
          {
            name: this.name,
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
            this.name = "";
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