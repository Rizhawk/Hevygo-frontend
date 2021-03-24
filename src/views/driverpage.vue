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
    <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="4000"
      ><span class="white--text mx-15">Customer Destination Details</span>
      <v-spacer></v-spacer>
      <v-layout class="my-2" row wrap>
        <v-flex lg2></v-flex>
        <v-flex class="mx-5">
          <v-btn small color="green" text>Accept</v-btn>
          <v-btn small color="red" text>Reject</v-btn></v-flex
        >
       
      </v-layout>
    </v-snackbar>
    <v-layout class="my-10" row wrap>
 <v-flex><v-btn @click="disconnect">Disconnect</v-btn></v-flex>
    </v-layout>
  </v-app>
</template>
<script>
export default {
  name: "Dpage",
  data: () => {
    return { snackbar: false, message: "" };
  },
  delimiters: ["${", "}"],
  mounted: function () {
    this.connect();
  },
  methods: {
    connect() {
      // let roomName = this.$session.get("user_token");
      //  user = "{{ user.username }}";
      this.socket = new WebSocket("wss://echo.websocket.org");
      this.socket.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
    },
    disconnect() {
      this.socket.close();
      console.log("websocket disconnected..!");
    },
    // teatsend: function () {
    //   this.socket.send(
    //     JSON.stringify({
    //       message: "code send succes",
    //       admin: this.admin,
    //       code: this.codedep,
    //     })
    //   );
    //   this.snackbar=true;
    // },
    // updateAdmin: function () {
    //   this.socket.send(
    //     JSON.stringify({
    //       message: "code send succes",
    //       admin: this.admin,
    //       code: this.codedep,
    //     })
    //   );
    // },
    logout() {
      this.$session.destroy();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>