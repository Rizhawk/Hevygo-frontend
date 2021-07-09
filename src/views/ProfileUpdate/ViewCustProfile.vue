<template>
  <v-app>
    <div class="wrapper">
      <Upage/>
      <div class="main-panel" id="main-panel">
        <div class="panel-header panel-header-sm"></div>
        <div class="content">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-5">
              <div class="card">
                <div class="card-header">
                  <h5
                    class="
                      card-title
                      font-weight-black
                      text-secondary
                      subtitle-1
                    "
                  >
                    Current Profile
                  </h5>
                </div>
                <div class="card-body">
                  <form>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            placeholder="User Name"
                            :value="name"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Phonenumber</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            placeholder="Phonenumber"
                            :value="phone"
                          />
                        </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <label>Email Id</label>
                          <input
                            type="text"
                            class="form-control"
                            disabled=""
                            placeholder="Email Id"
                            :value="email"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>
<script>
import { getAPI } from "../../axios-api";
import Upage from "../ProfileUpdate/UpdatePage.vue";
export default {
  name: "CustPro",
  components: {
    Upage,
  },
  data: () => {
    return {
      name: "",
      phone: "",
      email: "",
    };
  },
  beforeCreate: function () {
    getAPI
      .get("/api/accounts/is_login/", {
        headers: {
          Authorization: `Token ${this.$session.get("user_token")}`,
        },
      })
      .then((response) => {
        this.APIData = response.data;
        this.name = this.APIData.data["username"];
        this.email = this.APIData.data["email"];
        this.phone = this.APIData.data["phone"];
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>