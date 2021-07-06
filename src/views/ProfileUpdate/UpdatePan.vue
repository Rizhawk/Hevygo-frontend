<template>
  <v-app>
    <v-snackbar v-model="snackbar" dark top timeout="5000">
      {{ this.message }}</v-snackbar
    >
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
                    Change Pan & Gst
                  </h5>
                  <div class="card-body">
                    <form @submit.prevent="changeDeatils">
                      <div class="form-group">
                        <label>PAN Number</label>
                        <v-text-field
                          v-model="pan"
                          label="PAN Number"
                          maxlength="10"
                          outlined
                          dense
                        ></v-text-field>
                        <label>GST Number</label>
                        <v-text-field
                          v-model="gst"
                          label="GST Number"
                          maxlength="15"
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
  name: "Upan",
  components: {
    Upage,
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