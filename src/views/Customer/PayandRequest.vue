<template></template>
<script>
import store from "../../../store";
import { getAPI } from "../../axios-api";
export default {
  store: store,
  name: "PayReq",
  data: () => {
    return {
      //
      start_location: "",
      vehicle_type: "",
      weight: "",
      end_location: "",
      //
      connection: null,
      trucks: [],
      resp: "",
      resr: "",
      connection: null,
      driver: null,
      //
      status: "",
      st: "",
      owner: "",
      //
      saddr: "",
      eaddr: "",
    };
  },
  beforeMount: function () {
    this.$isLoading(true);
    localStorage.setItem("response", 0);
    getAPI
      .get(
        "api/customers/cust-dest-detail/?id=" + localStorage.getItem("destid"),
        {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        this.APIData = response.data;
        if (this.APIData.Http_response == 200) {
          this.start_location = this.APIData.data.start_location;

          this.vehicle_type = this.APIData.data.vehicle_type;
          this.weight = this.APIData.data.weight;
          this.end_location = this.APIData.data.end_location;

          this.st = this.APIData.data.status;
          this.payment();
        } else {
          alert("Something Went Wrong! Please try Again");
          this.$router.push({ name: "Vdestdetail" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    payment() {
      if (this.st == 4) {
        this.getList();
      } else if (this.st == 1) {
        getAPI
          .post("api/customers/pay/", {
            headers: {
              Authorization: `Token ${this.$session.get("user_token")}`,
            },
          })
          .then((response) => {
            this.APIData = response.data;
            if (this.APIData.Http_response == 200) {
              this.status = 2;
              this.updateStatusafterPay();
              console.log("Payment Successfull");
            } else {
              alert("Payment Failed");
              this.$isLoading(false);
              this.$router.push({ name: "Vdestdetail" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    updateStatusafterPay() {
      getAPI
        .put(
          "/api/customers/cust-dest-update/",
          {
            id: localStorage.getItem("destid"),
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
            this.getList();
          } else {
            alert("Something Went Wrong! Please try Again");
            this.$router.push({ name: "Vdestdetail" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    acceptOrreject() {
      getAPI
        .put(
          "/api/customers/cust-dest-update/",
          {
            id: localStorage.getItem("destid"),
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
            localStorage.removeItem("response");
            this.$isLoading(false);
            this.$router.push({ name: "Vdestdetail" });
          } else {
            alert("Something Went Wrong! Please try Again");
            this.$router.push({ name: "Vdestdetail" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createTrans() {
      getAPI
        .post(
          "api/customers/cust-trans-create/",
          {
            destination: localStorage.getItem("destid"),
            operator: this.owner,
            truck: this.driver,
            cost: this.$store.getters.totalCost,
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
          if (this.APIData.Http_response == 200) {
            this.status = 2;
            this.acceptOrreject();
          } else {
            alert("Something Went Wrong! Please try Again");
            this.$router.push({ name: "Vdestdetail" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOwnerid() {
      getAPI
        .get("/api/truck/view_truck_status/?truck_id=" + this.driver, {
          headers: {
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.Http_response == 200) {
            this.owner = this.APIData.data.truck.owner.id;
            this.createTrans();
          } else {
            alert("Something Went Wrong! Please try Again");
            this.$router.push({ name: "Vdestdetail" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getList() {
      let srcData = new FormData();
      srcData.append("start_location", this.start_location);
      srcData.append("vehicle_type", this.vehicle_type);
      srcData.append("weight", this.weight);
      srcData.append("end_location", this.end_location);
      getAPI
        .post("/api/customers/truckbooking/ ", srcData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${this.$session.get("user_token")}`,
          },
        })
        .then((response) => {
          this.APIData = response.data;
          if (this.APIData.response == 200) {
            for (let key in response.priority1) {
              this.trucks.push(this.APIData.priority1[key].truck.id);
            }
            for (let key in this.APIData.priority2) {
              this.trucks.push(this.APIData.priority2[key].truck.id);
            }
            console.log(this.trucks);
            if (this.trucks.length == 0) {
              this.status = 4;
              this.acceptOrreject();
            } else {
              this.getAddress();
            }
          } else {
            alert("Something Went Wrong! Please try Again");
            this.$router.push({ name: "Vdestdetail" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAddress() {
      const H = window.H;
      var platform = new H.service.Platform({
        apikey: "ESXHz5D5Ael8RKcRBmnboK969OKc0S9Rbm9aAlRA-8E",
      });
      var service = platform.getSearchService();
      service.reverseGeocode(
        {
          at: this.start_location,
        },
        (result) => {
          // Add a marker for each location found
          result.items.forEach((item) => {
            this.saddr = item.address.label;
          });
        }
      );
      service.reverseGeocode(
        {
          at: this.end_location,
        },
        (result) => {
          // Add a marker for each location found
          result.items.forEach((item) => {
            this.eaddr = item.address.label;
          });
          this.connectSocket();
        }
      );
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
      console.log(`connected to ${id}`);
      return new Promise((resolve) => {
        this.connection = new WebSocket(
          "ws://3.108.118.96:8001/ws/" + id + "/"
        );
        this.connection.onopen = function () {};
        setTimeout(() => {
          if (localStorage.getItem("response") == 1) {
            this.connection.close();
          } else {
            let customer = this.$session.get("user_name");
            let src = this.saddr;
            let dest = this.eaddr;
            let fee = this.$store.getters.totalCost;
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
                console.log(" Driver", id, " is accepted the request");
                localStorage.setItem("response", 1);
                localStorage.setItem("driver", id);
              } else if (this.resp == false) {
                console.log(`${id} Rejected the Request`);
              }
              setTimeout(() => {
                if (
                  (this.resp == null || this.resp == false) &
                  (i == trucksLength - 1)
                ) {
                  console.log("No one accepted the request");
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
        if (localStorage.getItem("response") == 0) {
          this.status = 4;
          this.acceptOrreject();
        } else if (localStorage.getItem("response") == 1) {
          this.driver = localStorage.getItem("driver");
          localStorage.removeItem("driver");
          localStorage.removeItem("response");
          this.getOwnerid();
        }
      }, 10000);
    },
  },
};
</script>