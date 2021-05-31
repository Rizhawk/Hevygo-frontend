<template>
  <v-app>
    <Propage />
    <v-layout class="my-15" row wrap>
      <v-flex xs1 sm2 md2 lg4></v-flex>
      <v-snackbar v-model="snackbar" dark top timeout="5000">
        {{ this.message }}</v-snackbar
      >
      <v-flex xs1 sm2 md2 lg4>
        <form id="detailsupdate" @submit.prevent="changeDeatils">
          <v-flex row wrap>
            <p class="mx-3 my-2 black--text font-weight-black subtitle-1">
              Change Details
            </p>
          </v-flex>
          <v-flex class="my-4"></v-flex>
          <v-text-field
            v-model="pan"
            label="PAN Number"
            maxlength="10"
            outlined
            rounded
            dense
          ></v-text-field>
          <v-text-field
            v-model="gst"
            label="GST Number"
            maxlength="15"
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
  name: "Changedetails",
  components: {
    Propage,
  },
  data: () => {
    return {
      pan: "",
      gst: "",
      snackbar: false,
      message: "",
    };
  },
  methods: {
    changeDeatils() {
      getAPI
        .put(
          "/api/operators/update_operator_info/",
          {
            pan: this.pan,
            gst_no: this.gst,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.response == 200) {
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
    clear() {
      this.pan = "";
      this.gst = "";
    },
  },
};
</script>
<style scoped>
#detailsupdate {
  border: solid black 2px;
  padding: 30px;
  border-radius: 15px;
}
</style>