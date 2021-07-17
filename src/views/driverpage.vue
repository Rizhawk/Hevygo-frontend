<template>
  <v-app>
    <!--Navbar-->
    <v-app-bar dense color="black" dark app>
      <v-toolbar-title class="font-weight-medium">SHUTTLE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click.prevent="logout"> Logout </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!--Navbar ends-->
    <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="10000">
      <v-flex>Customer : {{ this.customer }}</v-flex>
      <v-flex>Start Location : {{ this.start_location }}</v-flex>
      <v-flex>End Location : {{ this.end_location }}</v-flex>
      <v-flex>Cost : {{ this.fee }}</v-flex>
      <v-spacer></v-spacer>
      <v-layout class="my-2" row wrap>
        <v-flex lg2></v-flex>
        <v-flex class="mx-5">
          <v-btn small color="green" @click.prevent="sendResponse(true)" text
            >Accept</v-btn
          >
          <v-btn small color="red" @click.prevent="sendResponse(false)" text
            >Reject</v-btn
          ></v-flex
        >
      </v-layout>
    </v-snackbar>
  </v-app>
</template>
<script>
export default {
  name: "Dpage",
  data: () => {
    return {
      snackbar: false,
      start_location: "",
      end_location: "",
      fee: null,
      customer: "",
      ws: "",
    };
  },
  created: function () {
    try {
      this.ws = new WebSocket(
        "ws://shuttletestserver.herokuapp.com/ws/" +
          this.$session.get("user_id") +
          "/"
      );
      this.ws.onmessage = ({ data }) => {
        let req = JSON.parse(data);
        console.log(req);
        this.customer = req["customer"];
        this.start_location = req["src"];
        this.end_location = req["dest"];
        this.fee = req["fee"];
        this.showAlert();
      };
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    showAlert() {
      this.snackbar = true;
    },
    sendResponse(accept_reject) {
      let customer = this.$session.get("user_name");
      let src = this.start_location;
      let dest = this.end_location;
      let fee = this.fee;
      let msg = JSON.stringify({
        customer: customer,
        src: src,
        dest: dest,
        fee: fee,
        accept_reject: accept_reject,
      });
      this.ws.send(msg);
      this.disconnect();
    },
    disconnect() {
      this.snackbar = false;
      this.ws.close();
      console.log("websocket disconnected..!");
    },
    logout() {
      this.$session.destroy();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>