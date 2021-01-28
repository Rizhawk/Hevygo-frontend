<template>
  <v-app>
    <Opage />
    <v-layout row wrap class="my-8">
      <v-flex lg3></v-flex>
      <v-flex xs12 sm12 md8 lg8>
        <v-snackbar rounded="xl" text top dark v-model="snackbar" timeout="3000"
          ><span class="white--text mx-15">{{ this.message }}</span></v-snackbar
        >

        <!--Table-->
        <v-simple-table id="table" xs12 sm8 md6 lg12 fixed-header dark>
          <template v-slot:default>
            <thead id="title">
              <tr>
                <th class="text-left">Truck phonenumber</th>
                <th class="text-left">Registration Number</th>
                <th class="text-left">Verification</th>
                <th class="text-left">Truck Specification</th>
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click.prevent="tdelete = !tdelete">
                      Delete a Truck
                    </v-list-item>
                  </v-list>
                </v-menu>
              </tr>
            </thead>
            <tbody>
              <tr v-for="truck in trucks" :key="truck.truck_num">
                <v-dialog
                  :retain-focus="false"
                  v-model="dialog"
                  persistent
                  max-width="400px"
                  light
                >
                  <template v-slot:activator="{ on, attrs }">
                    <td
                      v-bind="attrs"
                      v-on="on"
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
                  </template>

                  <form id="form">
                    <v-layout class="my-8"> <v-flex></v-flex></v-layout>
                    <v-text-field
                      class="mx-8"
                      placeholder="Registation Number"
                      clearable
                      filled
                      solo
                      rounded
                      dense
                      v-model="regnum"
                    >
                    </v-text-field>
                    <v-text-field
                      class="mx-8"
                      placeholder="Homelocation"
                      clearable
                      filled
                      rounded
                      solo
                      dense
                      v-model="homeloc"
                    >
                    </v-text-field>
                    <v-flex class="mx-15">
                      <v-btn
                        class="mx-5"
                        rounded
                        color="success"
                        small
                        @click.prevent="uptruck(trid)"
                        >Update</v-btn
                      >
                      <v-btn rounded @click="dialog = !dialog" small
                        >close</v-btn
                      ></v-flex
                    >
                    <v-layout class="my-3"><v-flex></v-flex></v-layout>
                  </form>
                </v-dialog>
                <td>{{ truck.registration }}</td>
                <td>{{ truck.is_verified }}</td>
                <v-dialog
                  :retain-focus="false"
                  v-model="dialog2"
                  persistent
                  max-width="400px"
                  light
                >
                  <template v-slot:activator="{ on, attrs }">
                    <td v-bind="attrs" v-on="on" @click="showinfo(truck.id)">
                      View/Edit
                    </td>
                  </template>
                  <form id="form">
                    <v-layout class="my-8"> <v-flex></v-flex></v-layout>
                    <v-text-field
                      class="mx-8"
                      placeholder="Capacity in ton"
                      clearable
                      filled
                      solo
                      rounded
                      dense
                      v-model="cap"
                    >
                    </v-text-field>
                    <v-text-field
                      class="mx-8"
                      placeholder="Manufacturer"
                      clearable
                      filled
                      solo
                      rounded
                      dense
                      v-model="manf"
                    >
                    </v-text-field>

                    <v-text-field
                      class="mx-8"
                      placeholder="Model"
                      clearable
                      filled
                      solo
                      rounded
                      dense
                      v-model="mod"
                    >
                    </v-text-field>
                    <v-select
                      class="mx-8"
                      :items="types"
                      placeholder="Type"
                      clearable
                      filled
                      solo
                      rounded
                      dense
                      v-model="typ"
                    >
                    </v-select>
                    <v-flex class="mx-15">
                      <v-btn
                        class="mx-5"
                        rounded
                        color="success"
                        @click.prevent="infoedit(idt)"
                        small
                        >Update</v-btn
                      >
                      <v-btn rounded @click="dialog2 = !dialog2" small
                        >close</v-btn
                      ></v-flex
                    >
                    <v-layout class="my-3"><v-flex></v-flex></v-layout>
                  </form>
                </v-dialog>
                <td v-if="tdelete" @click="deleteTruck(truck.id)">
                  <v-btn icon color="red">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!--Table ends-->
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
// import VueSweetalert2 from 'vue-sweetalert2';
import { getAPI } from "../axios-api";
import Opage from "../views/optrpage";
export default {
  name: "Tmanage",
  components: { Opage },
  data: () => {
    return {
      //trucklist
      trucks: [],
      token: localStorage.getItem("user_token") || null,
      tdelete: false,
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
    };
  },
  beforeMount: function () {
    getAPI
      .get("/api/truck/truck-list/", {
        headers: {
          Authorization: `Token ${this.token}`,
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
    deleteTruck(id) {
      getAPI
        .delete("/api/truck/truck-delete/" + id + "/", {
          headers: {
            Authorization: `Token ${this.token}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.message = this.APIData;
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
            Authorization: `Token ${this.token}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.trid = tid;
          this.owner = owner;
          this.truck_num = truckphn;
          this.regnum = reg;
          this.homeloc = homeloc;
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
              Authorization: `Token ${this.token}`,
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
            Authorization: `Token ${this.token}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          this.cap = this.APIData["capacity"];
          this.manf = this.APIData["manufacturer"];
          this.mod = this.APIData["model"];
          this.typ = this.APIData["type"];
          this.idt = this.APIData["truck"];
        })
        .catch((err) => {
          alert("No specification added");
          localStorage.setItem("tid", trkid);
          this.$router.push({ name: "Tdetails" });
          console.log(err);
        });
      //
    },
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
              Authorization: `Token ${this.token}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          console.log(this.APIData);
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
  padding: 5px;
  border-radius: 30px;
  background-color: grey;
}
#table {
  border: solid white;
  padding: 5px;
  margin: 1px;
  border-radius: 22px;
}
</style>
