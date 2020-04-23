<template lang="pug">
  v-app

    nav-drawer(v-if="this.$auth.isAuthenticated()")
    app-bar(v-if="this.$auth.isAuthenticated()")

    v-content
      v-container.h-100.grey.lighten-3(fluid)
        nuxt

    v-snackbar(v-model="snackbar.value" bottom right :color="snackbar.color")
      span.body-2 {{ snackbar.message }}
</template>

<script>
export default {
  components: {
    navDrawer: () => import('@/components/nav-drawer'),
    appBar: () => import('@/components/app-bar')
  },
  data () {
    return {
      snackbar: {
        value: false,
        color: 'green accent-4',
        message: 'Success'
      }
    }
  },
  mounted () {
    this.$root.$on('toggleSnackbar', (status) => {
      this.snackbar.value = true
      this.snackbar.color = status === 'success' ? 'green accent-4' : 'red darken-4'
      this.snackbar.message = status === 'success' ? 'Successfully saved!' : 'Something went wrong. Please try again later.'
    })
  },
  beforeDestroy () {
    this.$root.$off('toggleSnackbar')
  }
}
</script>

<style lang="stylus">
  home,  body
    margin: 0
    padding: 0
    .h-100
      height 100%
    .menu-active-list
      color #f7a7a6 !important
    .menu-active-sub-list
      color #000 !important
</style>
