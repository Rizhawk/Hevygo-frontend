<template>
  <v-app>
    <Admin />
    <v-layout row wrap class="my-10">
      <v-flex xs1 sm2 md2 lg3></v-flex>
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
              <v-dialog
                max-width="300px"
                max-height="auto"
                v-model="show"
                overlay-opacity=".3"
              >
                <v-card color="#263238" dark max-width="300px">
                  <v-card-title class="font-weight-black body-1"
                    >PAN Number</v-card-title
                  >
                  <v-card-subtitle v-text="pan"></v-card-subtitle>
                  <v-card-title class="font-weight-black body-1"
                    >GST Number</v-card-title
                  >
                  <v-card-subtitle v-text="gst"></v-card-subtitle>
                  <v-card-title
                    v-if="email != null"
                    class="font-weight-black body-1"
                    >E-mail ID</v-card-title
                  >
                  <v-card-subtitle v-if="email != null">{{
                    email
                  }}</v-card-subtitle>
                  <v-card-title class="font-weight-black body-1"
                    >Name</v-card-title
                  >
                  <v-card-subtitle v-text="name"></v-card-subtitle>
                  <v-card-title class="font-weight-black body-1"
                    >Phonenumber</v-card-title
                  >
                  <v-card-subtitle v-text="phone"></v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      v-if="details.is_verified == true"
                      color=" green darken-1"
                      x-small
                      outlined
                      disabled
                      dark
                      >Approved
                      <v-icon small>mdi-checkbox-marked-circle-outline</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="details.is_verified == false"
                      color=" green darken-1"
                      @click.prevent="giveApproval(details.id)"
                      x-small
                      outlined
                      dark
                      >Approve
                    </v-btn>
                    <v-btn
                      class="mx-1"
                      color="red lighten-1"
                      :disabled="details.is_verified == true"
                      x-small
                      outlined
                      dark
                      @click.prevent="reject(details.id)"
                      >Reject
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
                  @click.prevent="reject(details.id)"
                  >Suspend
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
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
      pan: "",
      gst: "",
      email: null,
      name: "",
      phone: "",
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
          this.show = !this.show;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    giveApproval(id) {
      getAPI
        .put(
          "/api/admin/update_operator_info/",
          {
            id: id,
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
    reject(id) {
      getAPI
        .put(
          "/api/admin/update_operator_info/",
          {
            id: id,
            remarks: "Invalid PAN number",
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
          console.log(this.APIData);
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