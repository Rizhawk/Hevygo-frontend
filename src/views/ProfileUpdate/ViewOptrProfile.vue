<template>
  <v-app>
    <div class="wrapper">
      <Upage />
      <div class="main-panel" id="main-panel">
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
                    Current Profile
                  </h5>
                </div>
                <div class="card-body">
                  <form>
                    <div class="row">
                      <div class="col-md-5">
                        <div class="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            placeholder="User Name"
                            :value="name"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label>Phonenumber</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            placeholder="Phonenumber"
                            :value="phone"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Email Id</label>
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Email Id"
                            disabled=""
                            :value="email"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-control my-6">
                      <div class="row">
                        <div class="col-md-3">
                          <label>PAN Number</label>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="PAN Number"
                            disabled=""
                            :value="pan"
                          />
                        </div>
                        <div class="col-md-3 my-4">
                          <v-chip small light @click="viewURL(panfile)">
                            <v-icon left> mdi-file-image </v-icon>
                            <span class="caption"
                              >PAN Card</span
                            >
                            &nbsp;
                          </v-chip>
                        </div>
                        <div class="col-md-3">
                          <label>Gst Number</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            placeholder="GST Number"
                            :value="gst"
                          />
                        </div>
                        <div class="col-md-3 my-4">
                          <v-chip light small @click="viewURL(gstfile)">
                            <v-icon left> mdi-file-image </v-icon>
                            <span class="caption"
                              >GST Card</span
                            >
                            &nbsp;
                          </v-chip>
                        </div>
                      </div>
                    </div>
                  </form>
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
  name: "OptrPro",
  components: {
    Upage,
  },
  data: () => {
    return {
      name: "",
      phone: "",
      email: "",
      pan: "",
      panfile: "",
      gst: "",
      gstfile: "",
    };
  },
  created: function () {
    getAPI
      .get("/api/operators/view_operator_info/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.name = this.APIData.data["operator"]["name"];
        this.phone = this.APIData.data["operator"]["phone"];
        this.email = this.APIData.data["operator"]["email"];
        this.pan = this.APIData.data.pan;
        this.panfile = this.APIData.data.pan_scan;
        this.gst = this.APIData.data.gst_no;
        this.gstfile = this.APIData.data.gst_scan;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    viewURL(link) {
      window.open(link);
    },
  },
};
</script>