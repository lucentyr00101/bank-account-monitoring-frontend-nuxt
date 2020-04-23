<template lang="pug">
  v-row
    v-col.mx-auto(lg="6")
      v-form(ref="form" @submit.prevent="submitForm" v-model="valid")
        v-card(shaped)
          v-card-text
            p.headline Deduct Funds
            v-text-field(label="Amount" prepend-inner-icon="mdi-currency-php" :rules="[rules.number, rules.required]" v-model="amount")
            v-text-field(label="Date" prepend-inner-icon="mdi-calendar-month" :rules="[rules.required]" disabled :value="getDate")
            v-btn.mt-5(type="submit" color="success" :disabled="!valid") Save
</template>

<script>
import moment from 'moment'
import { deductFund } from '@/utils/api'

export default {
  data () {
    return {
      valid: true,
      rules: {
        number: v => !isNaN(v) || 'Amount field must be a number!',
        required: v => !!v || 'This field is required!'
      },
      amount: 0
    }
  },
  computed: {
    getDate () {
      return moment().format('MMMM DD, YYYY')
    }
  },
  methods: {
    async submitForm () {
      if (this.$refs.form.validate()) {
        try {
          const formData = new FormData()
          formData.append('amount', this.amount)
          await this.$axios.post(deductFund(), formData, this.$auth.getHeader())
          console.log('about to emit')
          this.$root.$emit('toggleSnackbar', 'success')
        } catch (err) {
          console.log(err.response.data)
        }
      }
    }
  }
}
</script>
