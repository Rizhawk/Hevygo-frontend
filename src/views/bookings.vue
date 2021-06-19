<template>
  <v-app>
    <Cpage />
    <v-layout class="my-10" row wrap>
      <v-flex xs2 sm2 md2 lg2 class="mx-8"></v-flex>
      <v-snackbar v-model="show" dark timeout="10000">
        {{ this.message }}
      </v-snackbar>
      <v-flex xs12 sm8 md6 lg9>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left white--text">Date</th>
                <th class="text-left white--text">Start Location</th>
                <th class="text-left white--text">End Location</th>
                <th class="text-left white--text">View Route</th>
                <th class="text-left white--text">Transaction Details</th>
                <th class="text-left white--text">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dest in destdetails" :key="dest.id">
                <td class="font-weight-bold">{{ dest.date }}</td>
                <td class="font-weight-bold">{{ dest.start_location }}</td>
                <td class="font-weight-bold">{{ dest.end_location }}</td>
                <td
                  class="font-weight-bold"
                  @click.prevent="
                    viewRoute(dest.start_location, dest.end_location)
                  "
                >
                  <v-icon color="green darken-4"> mdi-map-marker </v-icon>
                </td>
                <td class="font-weight-bold">
                  <v-btn
                    @click.prevent="getTransaction(dest.id)"
                    x-small
                    depressed
                    color="green darken-3"
                    outlined
                    dark
                  >
                    Book Now</v-btn
                  >
                </td>
                <v-dialog v-model="dialog2" max-width="350">
                  <v-layout>
                    <v-flex style="background-color: black"
                      ><v-card-title class="font-weight-bold white--text mx-10"
                        >SHIPMENT INVOICE</v-card-title
                      ></v-flex
                    ></v-layout
                  >
                  <v-spacer></v-spacer>

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
                        <td class="subtitle-2 font-weight-black">Total Cost</td>
                        <td class="subtitle-2 font-weight-bold">
                          {{ cost }} INR
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-dialog>
                <td>
                  <v-btn
                    depressed
                    outlined
                    text
                    dark
                    x-small
                    color="red accent-4"
                    @click.prevent="deleteConfirm(dest.id)"
                    >Cancel</v-btn
                  >
                </td>
                <v-dialog persistent v-model="dialog" max-width="380">
                  <v-card>
                    <v-card-text class="subtitle-1 font-weight-bold black--text"
                      >Are you sure want to cancel this booking?</v-card-text
                    >
                    <v-spacer></v-spacer>
                    <v-flex class="ml-15">
                      <v-btn class="ml-10" small @click="dialog = !dialog" text
                        >Close</v-btn
                      >
                      <v-btn
                        small
                        @click.prevent="deleteBook(destid)"
                        text
                        color="red"
                        >Cancel</v-btn
                      ></v-flex
                    >
                  </v-card>
                </v-dialog>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
import Cpage from "../components/custpage";
export default {
  name: "Cbookings",
  components: {
    Cpage,
  },
  data: () => {
    return {
      //Datas for Bookings
      destdetails: [],
      // startloc: "",
      // endloc: "",
      // date: "",
      // weight: "",
      // gtype: "",
      destid: "",
      // custid: "",
      dialog: false, //Dialog box asking confirmation for cancel a booking
      //
      //Datas for Transaction Details
      optrname: "",
      optrphn: "",
      truckreg: "",
      truckphn: "",
      cost: "",
      dialog2: false,
      //
      start_location: "",
      vehicle_type: "",
      weight: "",
      end_location: "",
      //
      trucks: [],
      resp: "",
      resr: "",
      connection: null,
      driver: null,
      message: "",
      show: false,
    };
  },
  beforeMount() {
    //Api call to fetch all destination details of current customer
    getAPI
      .get("api/customer/cust-dest-list/", {
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
    deleteBook(did) {
      //Api call to cancel a booking
      getAPI
        .delete("api/customer/cust-dest-delete/" + did + "/", {
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
        .get("api/customer/cust-trans-detail/" + tid + "/", {
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
          this.dialog2 = true;
        })
        .catch((err) => {
          // this.checkout();// Transaction details could be seen after successfull payment.
          this.getDestdetails(tid);
          console.log(err);
        });
    },
    //
    viewRoute(start, end) {
      this.$session.set("sl", start);
      this.$session.set("el", end);
      this.$router.push({ name: "HereMap" });
    },
    deleteConfirm(did) {
      this.destid = did;
      this.dialog = !this.dialog;
    },
    //
    checkout() {
      const stripe = window.Stripe("publishable API key");
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
    getDestdetails(destid) {
      getAPI
        .get("api/customer/cust-dest-detail/" + destid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.start_location = response.data.start_location;
          this.vehicle_type = response.data.vehicle_type;
          this.weight = response.data.weight;
          this.end_location = response.data.end_location;
          this.getList();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getList() {
      getAPI
        .post(
          "api/customer/truckbooking/",
          {
            start_location: this.start_location,
            vehicle_type: this.vehicle_type,
            weight: this.weight,
            end_location: this.end_location,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          for (let key in response.data.priority1) {
            this.trucks.push(response.data.priority1[key]["truck_num"]);
          }
          for (let key in response.data.priority2) {
            this.trucks.push(response.data.priority2[key]["truck_num"]);
          }
          this.connectSocket();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async connectSocket() {
      let i = 0;
      let trucksLength = this.trucks.length;
      while (i < trucksLength) {
        const res = await this.sendMessage(i, trucksLength, this.trucks[i]);
        console.log(res);
        if (localStorage.getItem("response") == 1) {
          break;
        } else {
          i++;
        }
      }
      this.clearLocal();
    },
    sendMessage(i, trucksLength, id) {
      return new Promise((resolve) => {
        this.connection = new WebSocket(
          "ws://shuttle-server.herokuapp.com/ws/" + id + "/"
        );
        this.connection.onopen = function () {};
        setTimeout(() => {
          if (localStorage.getItem("response") == 1) {
            this.connection.close();
          } else {
            let customer = this.$session.get("user_name");
            let src = this.start_location;
            let dest = this.end_location;
            let fee = localStorage.getItem("cost");
            let accept_reject = null;
            let msg = JSON.stringify({
              customer: customer,
              src: src,
              dest: dest,
              fee: fee,
              accept_reject: accept_reject,
            });
            this.connection.send(msg);
            this.connection.onmessage = function (event) {
              let resr = JSON.parse(event.data);
              this.resp = resr["accept_reject"];
              if (this.resp == true) {
                alert(` Driver ${id} is accepted your request`);
                localStorage.setItem("response", 1);
                localStorage.setItem("driver", id);
              } else if (this.resp == false) {
                console.log(id, "Rejected the Request");
              }
              setTimeout(() => {
                if (
                  (this.resp == null || this.resp == false) &
                  (i == trucksLength - 1)
                ) {
                  alert("No Drivers are Available to accept your Ride Request");
                }
              }, 10000);
            };
          }
          resolve("Response recieved");
        }, 10000);
      });
    },
    clearLocal() {
      setTimeout(() => {
        this.driver = localStorage.getItem("driver");
        localStorage.clear();
        console.log(this.driver);
      }, 10000);
    },
  },
};
</script>
<style scoped>
#destlist {
  border: solid #556b2f 3px;
  padding: 30px;
  border-radius: 20px;
  background-color: white;
}
#title {
  background-color: black;
  font-family: monospace;
}
thead {
  background-color: #004d40;
}
tbody {
  background-color: #9e9e9e;
}
</style>