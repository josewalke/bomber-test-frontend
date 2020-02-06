<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      stripeKey: 'pk_test_7f7Hl5LLod0AAbwoOMn13vEv00jbyvTCe7',
      name: 'name',
      email: 'email',
      card: {
        number: '4242424242424242',
        csv: '123',
        exp_month: '05',
        exp_year: '20'
      },
      cardNumberError: null,
      cardCvcError: null,
      cardMonthError: null,
      cardYearError: null,
      cardCheckSending: false,
      cardCheckError: false,
      cardCheckErrorMessage: ''
    }
  },
  head() {
    return {
      script: [{ src: 'https://js.stripe.com/v3/' }]
    }
  }
}
</script>

<style lang="scss" scoped></style>
