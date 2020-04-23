<template lang="pug">
  v-data-table(:headers="headers" :items="logs" :items-per-page="5")
</template>

<script>
import { listFunds } from '@/utils/api'

export default {
  data () {
    return {
      logs: [],
      headers: [
        { text: 'ID', align: 'center', value: 'id' },
        { text: 'Amount', align: 'center', value: 'amount' },
        { text: 'User', align: 'center', value: 'user.full_name' },
        { text: 'Date Posted', align: 'center', value: 'created_at' }
      ]
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      try {
        const res = await this.$axios.get(listFunds(), this.$auth.getHeader())
        this.logs = res.data.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
