<template>
  <v-app>
    <Opage />
    <v-layout row wrap class="my-8">
      <v-flex sm2 md2 lg3 class="mx-5"></v-flex>
      <v-flex xs12 sm12 md8 lg8>
        <v-snackbar
          rounded="xl"
          top
          color="red darken-4"
          v-model="snackbar"
          timeout="5000"
          ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
        >
        <!--Table-->
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="white--text text-left">Truck phonenumber</th>
                <th class="white--text text-left">Registration Number</th>
                <th class="white--text text-left">Homelocation</th>
                <th class="white--text text-left">Verification</th>
                <th class="white--text text-left">Truck Specification</th>
                <th class="white--text text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="truck in trucks"
                :key="truck.id"
                @click.prevent="dialog = !dialog"
              >
                <td class="font-weight-bold caption">
                  {{ truck.truck["phone"] }}
                </td>
                <td class="font-weight-bold caption">{{ truck.registration }}</td>
                <td class="font-weight-bold caption">{{ truck.homelocation }}</td>
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-if="truck.verification == 1"
                        v-bind="attrs"
                        v-on="on"
                        color="black"
                        class="mx-5"
                        small
                      >
                        mdi-clock
                      </v-icon>
                      <v-icon
                        v-if="truck.verification == 2"
                        v-bind="attrs"
                        v-on="on"
                        color="green darken-4"
                        class="mx-5"
                        small
                      >
                        mdi-checkbox-marked-circle-outline
                      </v-icon>
                      <v-icon
                        v-if="truck.verification == 3"
                        v-bind="attrs"
                        v-on="on"
                        color="red darken-4"
                        class="mx-5"
                        small
                      >
                        mdi-close-circle-outline
                      </v-icon>
                    </template>
                    <span>{{ truck.remarks }}</span></v-tooltip
                  >
                </td>
                <td class="font-weight-bold caption" @click="showinfo(truck.id)">
                  View/Edit
                </td>
                <td>
                  <v-btn
                    outlined
                    dark
                    x-small
                    color="red darken-4"
                    @click.prevent="setDelete(truck.id)"
                    >Delete</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!--Table ends-->
        <v-dialog
          :retain-focus="false"
          v-model="dialog2"
          max-width="400px"
          light
        >
          <form id="form2">
            <v-text-field
              class="mx-8"
              label="Capacity in ton"
              clearable
              dark
              outlined
              rounded
              dense
              v-model="cap"
            >
            </v-text-field>
            <v-text-field
              class="mx-8"
              label="Manufacturer"
              clearable
              dark
              outlined
              rounded
              dense
              v-model="manf"
            >
            </v-text-field>

            <v-text-field
              class="mx-8"
              label="Model"
              clearable
              dark
              outlined
              rounded
              dense
              v-model="mod"
            >
            </v-text-field>
            <v-select
              v-model="typ"
              class="mx-8"
              :items="types"
              label="Type"
              clearable
              dark
              outlined
              rounded
              dense
            >
            </v-select>
            <v-layout row wrap>
              <v-flex lg2></v-flex>
              <v-flex class="mx-10">
                <v-btn
                  block
                  depressed
                  color="success"
                  @click.prevent="infoedit"
                  small
                  >Update</v-btn
                >
              </v-flex>
              <v-flex lg2></v-flex>
            </v-layout>
          </form>
        </v-dialog>
        <v-dialog persistent v-model="dialog1" max-width="420">
          <v-card>
            <v-card-title class="body-2 font-weight-black black--text"
              >Are you sure want to remove this truck?</v-card-title
            >

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="ml-10" x-small @click="dialog1 = !dialog1" text
                >Close</v-btn
              >
              <v-btn x-small @click.prevent="deleteTruck" text color="red"
                >Remove</v-btn
              ></v-card-actions
            >
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
    <!--Dialog box for confirmation for truck details addition-->
    <v-dialog v-model="dialog3" max-width="385">
      <v-card>
        <v-card-title class="body-2 font-weight-black black--text">
          {{ this.specmsg }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-small color="red darken-1" text @click.prevent="speclater">
            Later
          </v-btn>
          <v-btn x-small color="green darken-1" text @click.prevent="specnow">
            Add Now
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!---->
  </v-app>
</template>
<script>
import { getAPI } from "../axios-api";
import Opage from "../components/optrpage";
export default {
  name: "Tmanage",
  components: { Opage },
  data: () => {
    return {
      //trucklist
      trucks: [],
      dialog1: false,
      tspec: false,
      //
      //editreg
      dialog: false,
      trid: "",
      regnum: "",
      homeloc: "",
      owner: "",
      truck_num: "",
      message: "",
      snackbar: false,
      //
      //edit specs
      dialog2: false,
      idt: "",
      cap: "",
      manf: "",
      mod: "",
      typ: "",
      types: [
        "Tipper",
        "Lorry",
        "Pickup",
        "Tanker",
        "Tow truck",
        "Van",
        "Container Truck",
        "Car transporter",
      ],

      //
      dialog3: false,
      specmsg: "",
      //
    };
  },
  beforeMount: function () {
    getAPI
      .get("/api/operators/list_truck/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.trucks = this.APIData.data;
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    //Registation edit
    editreg(tid) {
      console.log(tid);
      getAPI
        .get("/api/truck/truck-detail/" + tid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          console.log(this.APIData);
          // this.trid = tid;
          // this.owner = owner;
          // this.truck_num = truckphn;
          // this.regnum = reg;
          // this.homeloc = homeloc;
          // this.dialog = true;
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
    uptruck(trid) {
      //Update api call
      getAPI
        .post(
          "/api/truck/truck-update/" + trid + "/",
          {
            owner: this.owner,
            truck_num: this.truck_num,
            registration: this.regnum,
            homelocation: this.homeloc,
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
          alert(err);
        });
      //
    },
    showinfo(trkid) {
      //Api call to fetch truck info
      getAPI
        .get("/api/operators/view_truck_details/?id=" + trkid, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.response == 200) {
            this.cap = this.APIData.data["capacity"];
            this.manf = this.APIData.data["manufacturer"];
            this.mod = this.APIData.data["model"];
            this.typ = this.APIData.data["type"];
            this.dialog2 = true;
          } else {
            localStorage.setItem("tid", trkid);
            this.specmsg =
              "Truck specifications are mandatory to get verified by the admin";
            this.dialog3 = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //
    },
    //Delete Api call
    deleteTruck() {
      getAPI
        .put(
          "/api/operators/delete_truck",
          {
            truck_id: this.idt,
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
            window.location.reload();
          } else {
            alert(this.APIData.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    //
    //Call when the operator wants to delete his truck.
    setDelete(id) {
      console.log(id);
      this.dialog1 = true;
      this.idt = id;
    },
    specnow() {
      this.$router.push({ name: "Tdetails" });
    }, //Call when the operator wants to add details now
    speclater() {
      localStorage.removeItem("tid");
      this.dialog3 = false;
    }, //Call when the operator does't wants to add details now
    infoedit() {
      //api call to update truck info
      getAPI
        .put(
          "/api/operators/update_truck_details/",
          {
            truck_id: this.idt,
            manufacturer: this.manf,
            type: this.typ,
            model: this.mod,
            capacity: this.cap,
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
            window.location.reload();
          } else {
            alert(this.APIData.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
      //
    },
  },
};
</script>
<style scoped>
#form {
  border: solid white 1px;
  padding: 25px;
  border-radius: 15px;
  background-color: grey;
}
#table {
  border: solid white;
  padding: 5px;
  margin: 1px;
  border-radius: 22px;
}
#form2 {
  border: solid white 1px;
  padding: 25px;
  border-radius: 15px;
  background-color: slategray;
}
thead {
  background-color: #1a237e;
}
tbody {
  background-color: #9e9e9e;
}
</style>
