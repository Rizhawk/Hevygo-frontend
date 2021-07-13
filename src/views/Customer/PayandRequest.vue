<template></template>
<script>
import { getAPI } from "../../axios-api";
export default {
  name: "PayReq",
  methods: {
    fetchData() {
      this.$isLoading(true); // show loading screen
      //   this.$axios.post(url).then((response) => {
      //     this.$isLoading(false); // hide loading screen
      //     console.log(response);
      //   });
    },
  },
  mounted: function () {
    this.fetchData();
    console.log(this.$session.get("user_token"));
    getAPI
      .post("/api/customers/pay/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;

        console.log(this.APIData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>