<template lang="pug">
  v-row.h-100(align="center" justify="center")
    v-col(lg="4")
      v-form(ref="form" @submit.prevent="registerUser" v-model="valid")
        v-stepper(v-model="e1")
          v-stepper-header
            v-stepper-step(:complete="e1 > 1" step="1") Personal Information
            v-divider
            v-stepper-step(:complete="e1 > 2" step="2") Basic Bank Information
          v-stepper-items
            v-stepper-content(step="1")
              v-text-field(width="50%" :rules="[rules.required]" label="First Name" outlined v-model="data.first_name" :readonly="loading")
              v-text-field(width="50%" :rules="[rules.required]" label="Middle Initial" outlined v-model="data.middle_initial" :readonly="loading")
              v-text-field(width="50%" :rules="[rules.required]" label="Last Name" outlined v-model="data.last_name" :readonly="loading")
              v-text-field(width="50%" :rules="[rules.required]" label="Birthday" outlined v-model="data.birthday" :readonly="loading")
              v-text-field(width="50%" :rules="[rules.required]" label="Email Address" outlined v-model="data.email" :readonly="loading")
              v-text-field(:rules="[rules.required]" label="Password" outlined v-model="data.password" type="password" :readonly="loading")
              .d-flex.justify-space-between.pt-0.pb-3.align-center
                nuxt-link.mb-0.tertiary--text(:to="{ name: 'login' }") Already has an Account? Login here
                v-btn.px-8(color="primary" @click="e1 = 2") Next
            v-stepper-content(step="2")
              v-text-field(width="50%" :rules="[rules.required]" label="Bank Name" outlined v-model="data.bank_name" :readonly="loading")
              v-text-field(width="50%" :rules="[rules.required]" label="Account Type" outlined v-model="data.account_type" :readonly="loading")
              v-text-field(width="50%" :rules="[rules.required]" label="Account Number" outlined v-model="data.account_number" :readonly="loading")
              .d-flex.justify-space-between.pt-0.pb-3.align-center
                v-btn.px-8.white--text(color="tertiary" @click="e1 = 1") Back
                v-btn.px-8(color="primary" type="submit" :loading="loading" :disabled="!valid") Register
</template>

<script>
import { register } from '@/utils/api'

export default {
  data () {
    return {
      e1: 1,
      alert: {
        type: 'success',
        message: '',
        show: false
      },
      loading: false,
      valid: true,
      data: {
        first_name: '',
        middle_initial: '',
        last_name: '',
        birthday: '',
        email: '',
        password: '',
        bank_name: '',
        account_type: '',
        account_number: ''
      },
      rules: {
        required: v => !!v || 'This field is required!'
      }
    }
  },
  methods: {
    async registerUser () {
      if (this.$refs.form.validate()) {
        try {
          const formData = new FormData()
          formData.append('first_name', this.data.first_name)
          formData.append('middle_initial', this.data.middle_initial)
          formData.append('last_name', this.data.last_name)
          formData.append('birthday', this.data.birthday)
          formData.append('email', this.data.email)
          formData.append('password', this.data.password)
          formData.append('bank_name', this.data.bank_name)
          formData.append('account_type', this.data.account_type)
          formData.append('account_number', this.data.account_number)
          await this.$axios.post(register(), formData, this.$auth.getHeader())
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
</script>
