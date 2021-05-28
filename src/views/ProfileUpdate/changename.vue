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
        <form id="changename" @submit.prevent="changeName">
          <v-flex row wrap>
            <p class="mx-3 my-2 black--text font-weight-black subtitle-1">
              Change Name
            </p>
          </v-flex>
          <v-flex class="my-4"></v-flex>
          <v-text-field
            v-model="name"
            label="New Name"
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
  name: "Changename",
  components: {
    Propage,
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
<style scoped>
#changename {
  border: solid black 2px;
  padding: 30px;
  border-radius: 15px;
}
</style>