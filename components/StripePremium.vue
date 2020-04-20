<template>
  <div>
    <form id="payment-form">
      <div id="card-element">
        <!-- Elements will create input elements here -->
      </div>

      <!-- We'll put the error messages in this element -->
      <div id="card-errors" role="alert"></div>

      <button id="submit">Realizar Pago</button>
    </form>
  </div>
</template>

<script>
import API from '~/services/api'
import { mapGetters } from 'vuex'
import stripe from '@stripe/stripe-js'

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
  computed: {
    ...mapGetters(['suscription_type', 'userName'])
  },
  mounted: function() {
    this.setUpStripe()
    console.log(stripe)
  },
  methods: {
    async setUpStripe() {
      this.stripe = this.$stripe.import()

      this.clientSecret = (await API.paymentPremium()).client_secret
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
                  name: this.userName
                }
              }
            }
          )
          console.log(result)
          if (result.error) {
            return console.error(result.error)
          }
          if (result.paymentIntent.status === 'succeeded') {
            const body = {
              id: this.userId,
              active: true
            }
            this.$store.dispatch('suscription_end_active', body)
            console.log('Transferencia Relealizada')
          }
        } catch (e) {
          console.error(e)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
#submit {
  width: 100%;
  color: white;
  background-color: DodgerBlue;
  height: 40px;
}
</style>
