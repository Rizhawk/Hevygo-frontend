<template>
  <v-app>
    <Opage />
    <v-layout row wrap class="my-8">
      <v-flex sm2 md2 lg3></v-flex>
      <v-flex xs12 sm12 md8 lg8>
        <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="3000"
          ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
        >
        <!--Table-->
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="white--text text-left">Truck phonenumber</th>
                <th class="white--text text-left">Registration Number</th>
                <th class="white--text text-left">Verification</th>
                <th class="white--text text-left">Truck Specification</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="truck in trucks" :key="truck.truck_num">
                <td
                  class="font-weight-bold"
                  @click="
                    editreg(
                      truck.id,
                      truck.owner,
                      truck.truck_num,
                      truck.registration,
                      truck.homelocation
                    )
                  "
                >
                  {{ truck.truck_num }}
                </td>
                <v-dialog
                  :retain-focus="false"
                  v-model="dialog"
                  max-width="400px"
                  light
                >
                  <form id="form">
                    <v-text-field
                      class="mx-8"
                      label="Registation Number"
                      dark
                      clearable
                      outlined
                      rounded
                      dense
                      v-model="regnum"
                    >
                    </v-text-field>
                    <v-text-field
                      class="mx-8"
                      label="Homelocation"
                      dark
                      disabled
                      clearable
                      rounded
                      outlined
                      dense
                      v-model="homeloc"
                    >
                    </v-text-field>
                    <v-layout row wrap>
                      <v-flex lg2></v-flex>
                      <v-flex class="mx-10">
                        <v-btn
                          depressed
                          block
                          color="success"
                          small
                          @click.prevent="uptruck(trid)"
                          >Update</v-btn
                        >
                      </v-flex>
                      <v-flex lg2></v-flex>
                    </v-layout>
                  </form>
                </v-dialog>
                <td class="font-weight-bold">{{ truck.registration }}</td>
                <td class="font-weight-bold" v-if="truck.is_verified == true">
                  &#9989;
                </td>
                <td class="font-weight-bold" v-if="truck.is_verified == false">
                  &#10060;
                </td>
                <td class="font-weight-bold" @click="showinfo(truck.id)">
                  View/Edit
                </td>
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
                      class="mx-8"
                      :items="types"
                      label="Type"
                      clearable
                      dark
                      outlined
                      rounded
                      dense
                      v-model="typ"
                    >
                    </v-select>
                    <v-layout row wrap>
                      <v-flex lg2></v-flex>
                      <v-flex class="mx-10">
                        <v-btn
                          block
                          depressed
                          color="success"
                          @click.prevent="infoedit(idt)"
                          small
                          >Update</v-btn
                        >
                      </v-flex>
                      <v-flex lg2></v-flex>
                    </v-layout>
                  </form>
                </v-dialog>
                <td>
                  <v-btn
                    depressed
                    outlined
                    text
                    dark
                    x-small
                    color="red accent-4"
                    @click.prevent="dialog1 = !dialog1"
                    >Delete</v-btn
                  >
                </td>

                <v-dialog persistent v-model="dialog1" max-width="380">
                  <v-card>
                    <v-card-text class="subtitle-1 font-weight-bold black--text"
                      >Are you sure want to remove this truck?</v-card-text
                    >
                    <v-spacer></v-spacer>

                    <v-flex class="ml-15">
                      <v-btn
                        class="ml-10"
                        small
                        @click="dialog1 = !dialog1"
                        text
                        >Close</v-btn
                      >
                      <v-btn
                        small
                        @click.prevent="
                          deleteTruck(truck.id, truck.registration)
                        "
                        text
                        color="red"
                        >Remove</v-btn
                      ></v-flex
                    >
                  </v-card>
                </v-dialog>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!--Table ends-->
      </v-flex>
    </v-layout>
    <!--Dialog box for confirmation for truck details addition-->
    <v-dialog v-model="dialog3" max-width="250">
      <v-card>
        <v-card-text class="subtitle-1 black--text">
          {{ this.specmsg }}
        </v-card-text>
        <v-spacer></v-spacer>
        <v-btn small color="red darken-1" text @click="speclater()">
          Later
        </v-btn>
        <v-btn small color="green darken-1" text @click="specnow()">
          Add Now
        </v-btn>
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
      typ: "",
      //
      dialog3: false,
      specmsg: "",
    };
  },
  beforeMount: function () {
    getAPI
      .get("/api/truck/truck-list/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        for (let key in this.APIData) {
          this.trucks.push(this.APIData[key]);
        }
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    //Delete Api call
    deleteTruck(id, reg) {
      getAPI
        .delete("/api/truck/truck-delete/" + id + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.message = `Truck ${reg} is successfully removed`;
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
      this.snackbar = !this.snackbar;
    },
    //
    //Registation edit
    editreg(tid, owner, truckphn, reg, homeloc) {
      console.log(tid);
      getAPI
        .get("/api/truck/truck-detail/" + tid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.trid = tid;
          this.owner = owner;
          this.truck_num = truckphn;
          this.regnum = reg;
          this.homeloc = homeloc;
          this.dialog = true;
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
        .get("/api/truck/truck-info-detail/" + trkid + "/", {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.cap = this.APIData["capacity"];
          this.manf = this.APIData["manufacturer"];
          this.mod = this.APIData["model"];
          this.typ = this.APIData["type"];
          this.idt = this.APIData["truck"];
          this.dialog2 = true;
        })
        .catch((err) => {
          localStorage.setItem("tid", trkid);
          this.specmsg = "No specifications added";
          this.dialog3 = true;
          console.log(err);
        });
      //
    },
    specnow() {
      this.$router.push({ name: "Tdetails" });
    }, //Calls when operator wants to add details now
    speclater() {
      localStorage.removeItem("tid");
      this.dialog3 = false;
    }, //Calls when operator does'nt wants to add details now
    infoedit(idt) {
      //api call to update truck info
      getAPI
        .post(
          "/api/truck/truck-info-update/" + idt + "/",
          {
            truck: this.idt,
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
          window.location.reload();
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
  background-color: grey;
}
thead {
  background-color: #1a237e;
}
tbody {
  background-color: #9e9e9e;
}
</style>
