<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
    <v-btn @click.prevent="submit">Pay now!</v-btn>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe";
export default {
  name: "Checkout",
  components: {
    StripeCheckout,
  },
  data() {
    this.publishableKey =
      process.env.pk_test_51IQV1aJP7xhxjS13qc7F5v51gOJVvmfcQeMsUTugXFMNAovyNgWDilrMLvom9GFcR2L02JcRppBXNwTAYR8lItH500yYIGvwMQ;
    return {
      loading: false,
      lineItems: [
        {
          price: "price_1IQVVKJP7xhxjS13Iz822kFz", // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: "file:///C:/Users/HARI%20NARAYANAN/Downloads/success.html",
      cancelURL: "file:///C:/Users/HARI%20NARAYANAN/Downloads/cancel.html",
    };
  },
  methods: {
    submit() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>