<template>
  <v-app>
    <div class="wrapper">
      <Admin />
      <div class="main-panel" id="main-panel">
        <!-- Navbar -->
        <AdminNav title="Details of Operator" />
        <mob-nav />
        <!-- End Navbar -->
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
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
                    {{ name }}
                  </h5>
                  <v-flex row justify-end>
                    <v-btn
                      v-if="status == 2"
                      color=" green darken-1"
                      small
                      text
                      dark
                      >Approved
                      <v-icon small>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="status == 3"
                      color="red lighten-1"
                      small
                      text
                      dark
                      >Rejected
                      <v-icon small>mdi-close-circle-outline</v-icon>
                    </v-btn>
                  </v-flex>
                </div>
                <div class="card-body my-4">
                  <form>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="name"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Phonenumber</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="phone"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Email Id</label>
                          <input
                            type="text"
                            placeholder="Email Id"
                            class="form-control"
                            disabled=""
                            :value="email"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>PAN</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="pan"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>GST Number</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            :value="gst"
                          />
                        </div>
                      </div>
                      <v-flex row class="my-2" justify-center>
                        <v-btn
                          v-if="status == 1 || status == 3"
                          color=" green darken-1"
                          @click.prevent="show2 = !show2"
                          x-small
                          outlined
                          dark
                          >Approve
                        </v-btn>
                        <v-btn
                          v-if="status == 2"
                          color="red lighten-1"
                          x-small
                          outlined
                          dark
                          >Suspend
                        </v-btn>
                        <v-btn
                          class="mx-2"
                          color="black"
                          x-small
                          @click.prevent="back"
                          outlined
                          dark
                          >Back
                        </v-btn>
                        <v-btn
                          v-if="status == 1"
                          color="red lighten-1"
                          x-small
                          outlined
                          dark
                          @click.prevent="show1 = !show1"
                          >Reject
                        </v-btn>
                      </v-flex>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="show1"
      hide-overlay
      persistent
      max-width="300px"
      max-height="auto"
    >
      <v-card max-width="300px" max-height="auto">
        <v-card-title class="font-weight-black body-2"
          >Remarks :
          <span class="font-weight-medium caption ml-3"
            >(What is the reason?)</span
          ></v-card-title
        >
        <v-textarea v-model="remarks" autofocus maxlength="120"></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-small color="red" dark outlined @click.prevent="reject"
            >Confirm Rejection
          </v-btn>
          <v-btn
            x-small
            color="black"
            dark
            outlined
            @click.prevent="show1 = !show1"
            >Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="show2" max-width="320">
      <v-card>
        <v-card-title class="caption font-weight-bold black--text"
          >Verified all the details and confirm approval.</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ml-5"
            x-small
            @click.prevent="giveApproval"
            outlined
            color="green"
            >Approve</v-btn
          >
          <v-btn color="red" x-small @click="show2 = !show2" outlined
            >No</v-btn
          ></v-card-actions
        >
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Admin from "./AdminsSidebar.vue";
import AdminNav from "../Admin/AdminNavbar.vue";
import MobNav from "../Admin/MobNav.vue";
export default {
  name: "ViewOperator",
  components: {
    Admin,
    AdminNav,
    MobNav,
  },
  data: () => {
    return {
      show: false,
      show1: false,
      show2: false,
      pan: "",
      gst: "",
      email: null,
      crid: "",
      is_verified: null,
      status: null,
      name: "",
      phone: "",
      remarks: "",
      snackbar: false,
      message: "",
    };
  },
  beforeCreate: function () {
    getAPI
      .get(
        "/api/admin/view_operator_info/?id=" + localStorage.getItem("optrid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        this.pan = this.APIData.data["pan"];
        this.gst = this.APIData.data["gst_no"];
        this.email = this.APIData.data["operator"]["email"];
        this.name = this.APIData.data["operator"]["name"];
        this.phone = this.APIData.data["operator"]["phone"];
        this.is_verified = this.APIData.data["operator"]["is_verified"];
        this.status = this.APIData.data["status"];
        this.show = true;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    giveApproval() {
      getAPI
        .put(
          "/api/admin/update_operator_info/",
          {
            id: localStorage.getItem("optrid"),
            remarks: "Verified",
            status: 2,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.show2false;
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reject() {
      getAPI
        .put(
          "/api/admin/update_operator_info/",
          {
            id: localStorage.getItem("optrid"),
            remarks: this.remarks,
            status: 3,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.response == 400) {
            this.message = this.APIData.message;
            this.snackbar = true;
          } else if (this.APIData.response == 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    back() {
      localStorage.removeItem("optrid");
      this.$router.push({ name: "VerifyOptr" });
    },
  },
};
</script>