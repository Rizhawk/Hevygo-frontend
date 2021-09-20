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
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <h5
                    class="
                      card-title
                      font-weight-black
                      text-secondary
                      subtitle-2
                    "
                  >
                    Change PAN & GST
                  </h5>
                  <div class="card-body">
                    <form>
                      <div class="form-group">
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              color="grey lighten-2"
                              expand-icon="mdi-menu-down"
                              class="font-weight-bold caption text-secondary"
                            >
                              Update PAN Details
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <div class="form-control">
                                <label>PAN Number</label>
                                <v-text-field
                                  v-model="pan"
                                  maxlength="10"
                                  outlined
                                  dense
                                ></v-text-field>
                                <v-file-input
                                  v-model="panfile"
                                  accept="image/png,image/jpeg"
                                  label="Upload PAN Card"
                                  required
                                  outlined
                                  dense
                                ></v-file-input>
                                <v-flex row justify-center
                                  ><v-btn
                                    @click.prevent="changeDeatils"
                                    x-small
                                    class="my-3"
                                    color="rgb(34, 48, 61)"
                                    depressed
                                    outlined
                                    >Update</v-btn
                                  ></v-flex
                                >
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                        <v-expansion-panels class="my-10">
                          <v-expansion-panel>
                            <v-expansion-panel-header
                              color="grey lighten-2"
                              expand-icon="mdi-menu-down"
                              class="font-weight-bold caption text-secondary"
                            >
                              Update GST Details
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <div class="form-control">
                                <label>GST Number</label>
                                <v-text-field
                                  v-model="gst"
                                  maxlength="15"
                                  outlined
                                  dense
                                ></v-text-field>
                                <v-file-input
                                  v-model="gstfile"
                                  accept="image/png,image/jpeg"
                                  label="Upload GST"
                                  required
                                  outlined
                                  dense
                                ></v-file-input>
                                <v-flex row justify-center
                                  ><v-btn
                                    @click.prevent="changeDeatils"
                                    x-small
                                    class="my-3"
                                    color="rgb(34, 48, 61)"
                                    depressed
                                    outlined
                                    >Update</v-btn
                                  ></v-flex
                                >
                              </div>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
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
      panfile: "",
      gst: "",
      gstfile: "",
      snackbar: false,
      message: "",
    };
  },
  methods: {
    changeDeatils() {
      let uptInfo = new FormData();
      if (this.pan != "") {
        uptInfo.append("pan", this.pan);
      }
      if (this.panfile != "") {
        uptInfo.append("pan_scan", this.panfile);
      }
      if (this.gst != "") {
        uptInfo.append("gst_no", this.gst);
      }
      if (this.gstfile != "") {
        uptInfo.append("gst_scan", this.gstfile);
      }
      getAPI
        .put("/api/operators/update_operator_info/", uptInfo, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          console.log(this.APIData);
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
      this.panfile = "";
      this.gstfile = "";
      this.gst = "";
    },
  },
};
</script>