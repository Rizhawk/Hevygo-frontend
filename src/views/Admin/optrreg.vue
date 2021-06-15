<template>
  <v-app>
    <Admin />
    <v-layout row wrap class="my-10">
      <v-flex xs1 sm2 md2 lg3></v-flex>
      <v-snackbar v-model="snackbar" timeout="5000"
        >{{ this.message }}
      </v-snackbar>
      <v-flex xs10 sm8 md6 lg8>
        <v-simple-table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Verified</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="details in optrdetails"
              :key="details.id"
              @click.prevent="getDetails(details.id)"
            >
              <td>{{ details.name }}</td>
              <td>{{ details.phone }}</td>
              <td>
                <v-icon
                  color="green darken-1"
                  small
                  v-if="details.is_verified == true"
                  >mdi-checkbox-marked-circle-outline</v-icon
                >
                <v-icon color="red" small v-if="details.is_verified == false"
                  >mdi-close-circle-outline</v-icon
                >
              </td>
              <td>
                <v-btn
                  :disabled="details.is_verified == false"
                  class="mx-1"
                  color="red lighten-1"
                  x-small
                  outlined
                  dark
                  >Suspend
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-dialog
          max-width="300px"
          max-height="auto"
          v-model="show"
          persistent
          overlay-opacity=".3"
        >
          <v-card color="#263238" dark max-width="300px">
            <v-card-title class="font-weight-black body-1"
              >PAN Number
              <v-spacer></v-spacer>
              <v-icon @click="show = false" color="red" class="ml-5" small
                >mdi-close</v-icon
              >
            </v-card-title>
            <v-card-subtitle v-text="pan"></v-card-subtitle>
            <v-card-title class="font-weight-black body-1"
              >GST Number</v-card-title
            >
            <v-card-subtitle v-text="gst"></v-card-subtitle>
            <v-card-title v-if="email != null" class="font-weight-black body-1"
              >E-mail ID</v-card-title
            >
            <v-card-subtitle v-if="email != null">{{ email }}</v-card-subtitle>
            <v-card-title class="font-weight-black body-1">Name</v-card-title>
            <v-card-subtitle v-text="name"></v-card-subtitle>
            <v-card-title class="font-weight-black body-1"
              >Phonenumber</v-card-title
            >
            <v-card-subtitle v-text="phone"></v-card-subtitle>
            <v-card-actions>
              <v-btn
                v-if="status == 2"
                class="mx-16"
                color=" green darken-1"
                x-small
                outlined
                dark
                >Approved
                <v-icon small>mdi-checkbox-marked-circle-outline</v-icon>
              </v-btn>
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
                v-if="status == 1"
                color="red lighten-1"
                x-small
                outlined
                dark
                @click.prevent="show1 = !show1"
                >Reject
              </v-btn>
              <v-btn
                v-if="status == 3"
                color="red lighten-1"
                x-small
                outlined
                dark
                >Rejected
                <v-icon small>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
            <v-textarea
              v-model="remarks"
              autofocus
              maxlength="120"
            ></v-textarea>
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
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Admin from "../Admin/adminhome.vue";
export default {
  name: "AOreg",
  components: {
    Admin,
  },
  data: () => {
    return {
      optrdetails: [],
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
      .get("/api/admin/list_operator/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.optrdetails = this.APIData.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    getDetails(id) {
      getAPI
        .get("/api/admin/view_operator_info/?id=" + id, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.pan = this.APIData.data["pan"];
          this.gst = this.APIData.data["gst_no"];
          this.email = this.APIData.data["user"]["email"];
          this.name = this.APIData.data["user"]["name"];
          this.phone = this.APIData.data["user"]["phone"];
          this.is_verified = this.APIData.data["user"]["is_verified"];
          this.status = this.APIData.data["status"];
          this.crid = id;
          this.show = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    giveApproval() {
      getAPI
        .put(
          "/api/admin/update_operator_info/",
          {
            id: this.crid,
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
            id: this.crid,
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
  },
};
</script>
<style scoped>
thead {
  background-color: #e64a19;
  text-align: right;
}
tbody {
  background-color: #263238;

  color: whitesmoke;
}
tr:hover {
  background-color: #37474f !important;
}
</style>