<template>
  <div>
    <form id="payment-form">
      <div id="card-element">
        <!-- Elements will create input elements here -->
      </div>

      <!-- We'll put the error messages in this element -->
      <div id="card-errors" role="alert"></div>

      <button id="submit">Pay</button>
    </form>

    <v-btn @click="setUpStripe">pulsame</v-btn>
  </div>
</template>

<script>
// import Stripe from '@stripe/stripe-js'
import API from '~/services/api'

// const stripe = require('stripe')('sk_test_I9y5Cytv97AlhMQIOCqNoVrF00Q2NJqGZ2')
// import createPaymentIntent from '@/services/stripe.js'

// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')

export default {
  data() {
    return {
      stripeKey: 'sk_test_I9y5Cytv97AlhMQIOCqNoVrF00Q2NJqGZ2',
      name: 'name',
      email: 'email',
      card: {
        number: '4242424242424242',
        csv: '123',
        exp_month: '05',
        exp_year: '20'
      },
      clientSecret: null,
      cardElement: null,
      cardNumberError: null,
      cardCvcError: null,
      cardMonthError: null,
      cardYearError: null,
      cardCheckSending: false,
      cardCheckError: false,
      cardCheckErrorMessage: '',
      stripe: null
    }
  },
  mounted: function() {
    this.setUpStripe()
    // console.log(this.$stripe.import())
  },
  methods: {
    prueba() {
      this.$store.dispatch('prueba')
    },
    async pago() {
      const lolo = await API.paymentSuscription()
      console.log(lolo)
    },

    async setUpStripe() {
      this.stripe = this.$stripe.import()

      this.clientSecret = (await API.paymentSuscription()).client_secret
      console.log(this.clientSecret)
      const elements = this.stripe.elements()
      const card = elements.create('card')
      // Add an instance of the card Element into the `card-element` <div>

      card.mount('#card-element')

      var form = document.getElementById('payment-form')

      form.addEventListener('submit', async ev => {
        ev.preventDefault()
        try {
          const result = await this.stripe.confirmCardPayment(
            this.clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: 'Jenny Rosen'
                }
              }
            }
          )

          if (result.error) {
            return console.error(result.error)
          }
          if (result.paymentIntent.status === 'succeeded') {
            console.log('DALE CARAJO')
          }
        } catch (e) {
          console.error(e)
        }
      })
    }
  }
  // head() {
  //   return {
  //     script: [{ src: 'https://js.stripe.com/v3/' }]
  //   }
  // }
}
</script>

<style lang="scss" scoped></style>
