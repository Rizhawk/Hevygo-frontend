<template>
  <v-app>
    <Opage />
    <v-layout class="my-10" justify-center>
      <v-snackbar
        rounded="xl"
        top
        color="green darken-4"
        v-model="snackbar"
        timeout="5000"
        ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
      >
      <v-snackbar
        rounded="xl"
        top
        color="red darken-4"
        v-model="snackbar2"
        timeout="5000"
        ><span class="white--text mx-15">{{ this.message2 }}</span></v-snackbar
      >
      <v-flex xs12 sm8 md6 lg3></v-flex>
      <v-flex xs12 sm8 md6 lg6>
        <!--Drivers table-->
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="white--text text-left">Driver name</th>
                <th class="white--text text-left">Phone number</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="driver in driverdetails"
                :key="driver.id"
                @click="getaDriver(driver.id)"
              >
                <td class="font-weight-bold">{{ driver.driver_name }}</td>
                <td class="font-weight-bold">{{ driver.phone }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!--Drivers table ends-->
      </v-flex>
      <v-dialog :retain-focus="false" v-model="dialog" max-width="400px" light>
        <form id="form6">
          <v-text-field
            class="mx-8"
            label="Driver Name"
            clearable
            dark
            outlined
            dense
            rounded
            v-model="dname"
          >
          </v-text-field>
          <v-text-field
            class="mx-8"
            label="Phone number"
            clearable
            dark
            rounded
            dense
            outlined
            v-model="drphn"
          >
          </v-text-field>
          <v-layout row wrap>
            <v-flex lg2></v-flex>
            <v-flex class="mx-10">
              <v-btn
                depressed
                color="success"
                x-small
                @click.prevent="updatedr(drid)"
                >Update</v-btn
              >
              <v-btn
                class="mx-2"
                depressed
                color="red"
                x-small
                @click="dialog2 = true"
                >Delete</v-btn
              >
            </v-flex>
            <v-flex lg2></v-flex>
          </v-layout>
        </form>
      </v-dialog>
      <v-dialog v-model="dialog2" max-width="370">
        <v-card>
          <v-card-title class="body-2 font-weight-black black--text">
            Are you sure want to delete this driver?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="green darken-1" text @click="dialog2 = false">
              Close
            </v-btn>

            <v-btn small color="red darken-1" text @click="deletenow">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
import Opage from "../components/optrpage";
export default {
  data: () => {
    return {
      driverdetails: [],
      dialog: false, //dialog box form for editing the driver details
      dialog2: false, //dialog box for confirmation for deletion of a driver
      dname: "",
      drphn: "",
      ownerid: "",
      drid: "",
      snackbar: false,
      snackbar2: false,
      message: "",
      message2: "",
    };
  },
  name: "Editdrivers",
  components: {
    Opage,
  },
  beforeMount: function () {
    //Api call for fetching the data into table
    getAPI
      .get("/api/operators/list_driver/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.driverdetails = this.APIData.data;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  methods: {
    //Api call to get specific driver details
    getaDriver(id) {
      getAPI
        .get("/api/operators/view_driver/?id=" + id, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.drid = id;
          this.dname = this.APIData.data["driver_name"];
          this.drphn = this.APIData.data["phone"];
          this.ownerid = this.APIData.data["operator"];
          this.dialog = true;
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    //Api call for updating driver details
    updatedr() {
      console.log(this.drid);
      getAPI
        .put(
          "/api/operators/update_driver/",
          {
            id: this.drid,
            driver_name: this.dname,
            phone: this.drphn,
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
            window.location.reload();
          } else {
            this.message2 = this.APIData.message;
            this.snackbar2 = true;
          }
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    //Api call for delete the selected driver
    deletedr() {
      getAPI
        .put(
          "/api/operators/delete_driver/",
          { id: this.drid },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          this.message = `Driver ${this.dname} is successfully deleted`;
          this.snackbar = true;
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    //delete confirmation function call
    deletenow() {
      this.deletedr();
      this.dialog2 = false;
    },
    //
  },
};
</script>
<style scoped>
#form6 {
  border: solid white 1px;
  padding: 25px;
  border-radius: 15px;
  background-color: slategray;
}
#table {
  border: solid white;
  padding: 5px;
  margin: 1px;
  border-radius: 22px;
}
thead {
  background-color: #1a237e;
}
tbody {
  background-color: #9e9e9e;
}
</style>