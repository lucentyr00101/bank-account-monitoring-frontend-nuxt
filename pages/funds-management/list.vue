<template lang="pug">
  div
    v-data-table(:headers="headers" :items="logs" :items-per-page="pagination.per_page" :server-items-length="pagination.total" @update:page="fetchData" :loading="loading")
    h1 Total: {{ total }}
</template>

<script>
import _ from 'lodash'
import { listFunds } from '@/utils/api'

export default {
  data () {
    return {
      total: 0,
      logs: [],
      headers: [
        { text: 'ID', align: 'center', value: 'id' },
        { text: 'Amount', align: 'center', value: 'amount' },
        { text: 'User', align: 'center', value: 'user.full_name' },
        { text: 'Date Posted', align: 'center', value: 'created_at' }
      ],
      pagination: {
        total: 0,
        per_page: 0,
        current_page: 1
      },
      loading: false
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData (page = 1) {
      this.loading = true
      this.logs = []
      try {
        const res = await this.$axios.get(listFunds(page), this.$auth.getHeader())
        this.logs = res.data.data
        this.pagination.total = res.data.meta.total
        this.pagination.per_page = res.data.meta.per_page
        this.pagination.current_page = res.data.meta.current_page
        this.total = this.computeTotal(res.data.data)
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    },
    computeTotal (data) {
      return _.sumBy(data, 'amount').toLocaleString()
    }
  }
}
</script>
