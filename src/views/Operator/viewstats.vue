<template>
  <v-app>
    <Opage />
    <v-layout row wrap class="my-15">
      <v-flex sm2 md2 lg4></v-flex>
      <v-flex xs12 sm8 md6 lg7>
        <!--Table showing status details-->
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="white--text text-left">Truck</th>
                <th class="white--text text-left">Driver</th>
                <th class="white--text text-left">Driver's Phone</th>
                <th class="white--text text-left">Status</th>
                <th class="white--text text-left">Location</th>
                <th class="white--text text-left">Find vechicle</th>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item router to="/truckstatus">
                      Add new Truck Status
                    </v-list-item>
                  </v-list>
                </v-menu>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="truck in truckdriver"
                :key="truck.truck.id"
                @click.prevent="getDetails(truck.truck.id)"
              >
                <td class="font-weight-bold caption">
                  {{ truck.truck.registration }}
                </td>
                <td class="font-weight-bold caption">
                  {{ truck.driver["driver_name"] }}
                </td>
                <td class="font-weight-bold caption">
                  {{ truck.driver["phone"] }}
                </td>
                <td class="font-weight-bold caption">{{ truck.status }}</td>
                <td class="font-weight-bold caption">{{ truck.location }}</td>
                <td
                  class="font-weight-bold caption"
                  @click="showdetail(truck.location)"
                >
                  <v-icon color="green darken-4"> mdi-map-marker </v-icon>
                </td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!--Table ends-->
        <v-dialog
          max-width="350px"
          max-height="auto"
          v-model="show"
          persistent
          overlay-opacity=".3"
        >
          <v-card color="#708090" dark max-width="350px">
            <v-card-title class="font-weight-black body-1">Truck</v-card-title>
            <v-card-subtitle>{{ truck }}</v-card-subtitle>
            <v-card-title class="font-weight-black body-1">Driver</v-card-title>
            <v-card-subtitle>{{ driver }}</v-card-subtitle>
            <v-card-title class="font-weight-black body-1"
              >Status
            </v-card-title>
            <v-select
              class="status"
              v-model="status"
              :items="stats"
              autofocus
              dark
              outlined
              dense
            >
            </v-select>
            <v-card-title class="font-weight-black body-1"
              >Location
            </v-card-title>
            <v-card-subtitle>{{ location }}</v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                x-small
                dark
                color="green darken-4"
                depressed
                @click.prevent="updateStatus"
                >Update</v-btn
              >
              <v-btn
                x-small
                dark
                color="red darken-4"
                @click.prevent="show = !show"
                depressed
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Opage from "../../components/optrpage";
export default {
  name: "Tstats",
  components: {
    Opage,
  },
  data: () => {
    return {
      truckdriver: [],
      show: false,
      truck: "",
      driver: "",
      status: "",
      location: "",
      tid: "",
      stats: ["Unavailable", "Available"],
    };
  },
  created: function () {
    //Api call to fetch status of all trucks
    getAPI
      .get("/api/truck/list_truck_status/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.truckdriver = this.APIData.data;
      })
      .catch((err) => {
        alert(err);
      });
    //
  },
  methods: {
    showdetail(location) {
      this.$session.set("cp", location);
      this.$router.push({ name: "Tracktruck" });
    },
    getDetails(id) {
      getAPI
        .get("/api/truck/view_truck_status/?truck_id=" + id, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 200) {
            this.truck = this.APIData.data.truck["registration"];
            this.driver = this.APIData.data.driver["driver_name"];
            this.status = this.APIData.data["status"];
            this.location = this.APIData.data["location"];
            this.tid = this.APIData.data["truck"]["id"];
            this.show = true;
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
    updateStatus() {
      getAPI
        .post(
          "/api/truck/update_truck_status/",
          {
            truck_id: this.tid,
            status: this.status,
          },
          {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 200) {
            window.location.reload();
          } else {
            alert(this.APIData.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
<style scoped>
#table2 {
  border: solid white;
  padding: 5px;
  margin: 1px;
  border-radius: 22px;
}
#form7 {
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
#form3 {
  border: solid white 1px;
  padding: 25px;
  border-radius: 15px;
  background-color: #708090;
}
.status {
  width: 250px;
  left: 24px;
}
</style>