<template>
  <v-app>
    <Cpage />
    <v-layout class="my-10" row wrap>
      <v-flex xs2 sm2 md2 lg2 class="mx-8"></v-flex>
      <v-flex xs12 sm8 md6 lg8>
        <v-simple-table dark>
          <template v-slot:default>
            <thead>
              <tr>
                <th></th>
                <th class="text-left">Date</th>
                <th class="text-left">Start Location</th>
                <th class="text-left">End Location</th>
                <th class="text-left">View Route</th>
                <th class="text-left">Transaction Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dest in destdetails" :key="dest.id">
                <td>
                  <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        @click.prevent="viewBook(dest.id)"
                        v-bind="attrs"
                        v-on="on"
                        x-small
                        fab
                        color="black"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span> View/Edit this Booking</span>
                  </v-tooltip>
                </td>
                <td>{{ dest.date }}</td>
                <td>{{ dest.start_location }}</td>
                <td>{{ dest.end_location }}</td>
                <td
                  @click.prevent="
                    viewRoute(dest.start_location, dest.end_location)
                  "
                >
                  View
                </td>
                <td @click.prevent="getTransaction(dest.id)">View</td>
                <v-dialog v-model="dialog3" max-width="350">
                  <v-card max-width="500">
                    <v-layout>
                      <v-flex style="background-color: black"
                        ><v-card-title
                          class="font-weight-bold white--text mx-10"
                          >SHIPMENT INVOICE</v-card-title
                        ></v-flex
                      ></v-layout
                    >
                    <v-spacer></v-spacer>
                    <v-flex class="mx-2">
                      <v-simple-table>
                        <tbody>
                          <tr>
                            <td class="subtitle-2 font-weight-black">
                              Truck Owner
                            </td>
                            <td class="subtitle-2 font-weight-bold">
                              {{ optrname }}
                            </td>
                          </tr>
                          <tr>
                            <td class="subtitle-2 font-weight-black">
                              Contact Owner
                            </td>
                            <td class="subtitle-2 font-weight-bold">
                              {{ optrphn }}
                            </td>
                          </tr>
                          <tr>
                            <td class="subtitle-2 font-weight-black">Truck</td>
                            <td class="subtitle-2 font-weight-bold">
                              {{ truckreg }}
                            </td>
                          </tr>
                          <tr>
                            <td class="subtitle-2 font-weight-black">
                              Contact Driver
                            </td>
                            <td class="subtitle-2 font-weight-bold">
                              {{ truckphn }}
                            </td>
                          </tr>
                          <tr>
                            <td class="subtitle-2 font-weight-black">
                              Total Cost
                            </td>
                            <td class="subtitle-2 font-weight-bold">
                              {{ cost }} INR
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </v-flex>
                    <v-flex class="mx-15">
                      <v-card-actions>
                        <v-btn
                          small
                          depressed
                          class="mx-8"
                          color="deep-purple lighten-1"
                          @click.prevent="checkout"
                        >
                          Make Payment
                        </v-btn>
                      </v-card-actions>
                    </v-flex>
                  </v-card>
                </v-dialog>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
    </v-layout>
    <v-dialog max-width="500" v-model="dialog">
      <form id="destlist">
        <v-text-field
          v-model="startloc"
          label="Start Location"
          outlined
          dense
          clearable
        >
        </v-text-field>
        <v-text-field
          v-model="endloc"
          label="End Location"
          outlined
          dense
          clearable
        >
        </v-text-field>
        <v-text-field
          v-model="date"
          type="date"
          label="Date of Pick Up"
          outlined
          dense
          clearable
        >
        </v-text-field>
        <v-text-field
          v-model="weight"
          label="Weight of Goods"
          outlined
          dense
          clearable
        >
        </v-text-field>
        <v-text-field
          v-model="gtype"
          label="Type of Goods"
          outlined
          dense
          clearable
        >
        </v-text-field>
        <v-layout row wrap>
          <v-flex lg3></v-flex>
          <v-flex class="mx-5">
            <v-btn
              @click.prevent="updateBook(destid)"
              depressed
              small
              dark
              color="success"
              >Update</v-btn
            >
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  @click.prevent="dialog2 = true"
                  depressed
                  small
                  dark
                  color="danger"
                  class="mx-3"
                  >Cancel</v-btn
                >
              </template>
              <span>Cancel this booking</span>
            </v-tooltip>
            <v-dialog persistent v-model="dialog2" max-width="360">
              <v-card>
                <v-card-text class="subtitle-1 black--text"
                  >Are you sure want to cancel this booking?</v-card-text
                >
                <v-spacer></v-spacer>
                <v-btn small @click.prevent="dialog2 = false" text>Close</v-btn>
                <v-btn
                  small
                  @click.prevent="deleteBook(destid)"
                  text
                  color="red"
                  >Cancel</v-btn
                >
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </form>
    </v-dialog>
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
import Cpage from "../views/custpage";
export default {
  name: "Cbookings",
  components: {
    Cpage,
  },
  data: () => {
    return {
      //Datas for Bookings
      destdetails: [],
      dialog: false,
      startloc: "",
      endloc: "",
      date: "",
      weight: "",
      gtype: "",
      destid: "",
      custid: "",
      dialog2: false, //Dialog box asking confirmation for cancel a booking
      //
      //Datas for Transaction Details
      optrname: "",
      optrphn: "",
      truckreg: "",
      truckphn: "",
      cost: "",
      dialog3: false,
      //
    };
  },
  beforeMount() {
    //Api call to fetch all destination details of current customer
    getAPI
      .get("/api/customer/cust-dest-list/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.destdetails = this.APIData;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    //Api call to fetch details of a single booking
    viewBook(id) {
      getAPI
        .get("/api/customer/cust-dest-detail/" + id + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.startloc = response.data.start_location;
          this.endloc = response.data.end_location;
          this.date = response.data.date;
          this.weight = response.data.weight;
          this.gtype = response.data.goods_type;
          this.custid = response.data.customer;
          this.destid = id;
          this.dialog = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateBook(did) {
      //Api call to update the details of a booking
      getAPI
        .put(
          "/api/customer/cust-dest-update/" + did + "/",
          {
            id: did,
            start_location: this.startloc,
            end_location: this.endloc,
            weight: this.weight,
            goods_type: this.gtype,
            date: this.date,
            customer: this.custid,
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
    deleteBook(did) {
      //Api call to cancel a booking
      getAPI
        .delete("/api/customer/cust-dest-delete/" + did + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert("");
        });
    },
    //
    getTransaction(tid) {
      getAPI
        .get("/api/customer/cust-trans-detail/" + tid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.cost = response.data.data[0]["cost"];
          this.truckreg = response.data.data[1]["registration"];
          this.truckphn = response.data.data[1]["truck_num"];
          this.optrname = response.data.data[2]["owner_name"];
          this.optrphn = response.data.data[2]["owner_phone"];
          this.dialog3 = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //
    viewRoute(start, end) {
      this.$session.set("sl", start);
      this.$session.set("el", end);
      this.$router.push({ name: "HereMap" });
    },
    //
    checkout() {
      const stripe =window.Stripe("publishable API key");
      fetch("/create-checkout-session", {
        method: "POST",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (session) {
          return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
          // If redirectToCheckout fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using error.message.
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    },
  },
};
</script>
<style scoped>
#destlist {
  border: solid darkolivegreen 3px;
  padding: 30px;
  border-radius: 20px;
  background-color: white;
}
#title {
  background-color: black;
  font-family: monospace;
}
</style>