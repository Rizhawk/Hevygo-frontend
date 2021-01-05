<template>
  <nav>
    <!--Navbar-->
    <v-app-bar color="blue lighten-1" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>HEVYGO</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <!--Navbar ends-->

    <!--Sidebar-->

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      light
      clipped
      color="blue-grey darken-4"
    >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-icon size="80" dark> mdi-account-circle </v-icon>
          </v-avatar>
          <p class="white--text subheading mt-1">Operator Name</p>
        </v-flex>
      </v-layout>
      <v-list nav dark>
        <v-list-item-group
          v-model="group"
          active-class="deep-grey--text text--accent-1"
        >
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item>
                  <v-list-item-title
                    v-bind="attrs"
                    v-on="on"
                    class="white--text mx-3"
                    >Register Your Trucks
                  </v-list-item-title>
                </v-list-item>
              </template>
              <v-card>
                <v-card-title>Fill the Details</v-card-title>
                <validation-observer ref="observer" v-slot="{ invalid }">
                  <form class="mx-8" @submit.prevent="submit">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Name"
                      rules="required|max:10"
                    >
                      <v-text-field
                        v-model="name"
                        :error-messages="errors"
                        label="Operator Name"
                        required
                      ></v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Phone Number"
                      :rules="{
                        required: true,
                        digits: 10,
                      }"
                    >
                      <v-text-field
                        v-model="phone"
                        :error-messages="errors"
                        label="Phone number to contact your truck"
                        required
                      ></v-text-field>
                    </validation-provider>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      name="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="passwordRules"
                      :type="show1 ? 'text' : 'password'"
                      @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-text-field
                      v-model="password2"
                      label="Confirm Password"
                      name="confirmPassword"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[
                        !!password2 || 'type confirm password',
                        password === password2 ||
                          'The password confirmation does not match.',
                      ]"
                      :type="show2 ? 'text' : 'password'"
                      @click:append="show2 = !show2"
                    ></v-text-field>
                    <validation-provider
                      v-slot="{ errors }"
                      name="email"
                      rules="email"
                    >
                      <v-text-field
                        v-model="email"
                        :error-messages="errors"
                        label="E-mail"
                      ></v-text-field>
                    </validation-provider>
                    <div class="mx-12">
                      <v-btn
                        color="primary"
                        class="mr-4"
                        type="submit"
                        :disabled="invalid"
                        @click.prevent="tsignup"
                      >
                        Register
                      </v-btn>
                      <v-btn @click="clear"> clear </v-btn>
                      <v-btn @click="dialog = false"> close </v-btn>
                    </div>
                  </form>
                  <v-card-text>
                    <div class="my-2 mx-5"></div>
                  </v-card-text>
                </validation-observer>
              </v-card>
            </v-dialog>
          </v-row>

          <v-list-item>
            <v-list-item-title class="white--text"
              >Manage Trucks
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="white--text"
              >Add Drivers
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="white--text"
              >Manage Drivers
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="white--text"
              >Update Trucks Status</v-list-item-title
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="white--text"
              >Add Your Pancard
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        <v-list-item>
          <v-btn
            color="white"
            class="mx-5 my-10 black--text"
            width="80%"
            rounded
            shaped
            >Logout</v-btn
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--Sidebar ends-->
  </nav>
</template>
<script>
import { getAPI } from "../axios-api";
import { required, digits, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("min", {
  ...min,
  message: "{_field_}  should be greater than {length} characters",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  name: "Opage",
  data: () => {
    return {
      dialog: false,
      drawer: false,
      group: null,
      show1: false,
      show2: false,
      name: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
      user_type: 3,
      passwordRules: [
        (value) => !!value || "Please type password.",
        (value) => (value && value.length >= 6) || "minimum 6 characters",
      ],
    };
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      (this.phone = ""),
        (this.password = ""),
        (this.password2 = ""),
        (this.name = ""),
        (this.email = ""),
        this.$refs.observer.reset();
    },
    tsignup() {
      getAPI
        .post("/api/accounts/register", {
          phone: this.phone,
          name: this.name,
          password: this.password,
          password2: this.password2,
          user_type: this.user_type,
          email: this.email,
        })
        .then((response) => {
          alert("Truck Registration Succesfull");
          this.APIData = response.data;
          // this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          alert(err);
        });
    },
    watch: {
      group() {
        this.drawer = false;
      },
    },
  },
};
</script>