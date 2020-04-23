<template lang="pug">
  v-navigation-drawer(app v-if="this.$auth.isAuthenticated()" v-model="drawer" color="secondary lighten-2")
    v-list
      v-list-item(@click="" :to="{ name: 'home' }" exact)
        v-list-item-icon
          v-icon mdi-home
        v-list-item-content
          v-list-item-title Home
      v-list-group(active-class="menu-active-list" v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action color="white")
        template(v-slot:activator)
          v-list-item-content
            v-list-item-title(v-text="item.title")
        v-list-item(active-class="menu-active-sub-list" v-for="subItem in item.items" :key="subItem.title" @click="" :to="subItem.link")
          v-list-item-content
            v-list-item-title(v-text="subItem.title")
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        {
          action: 'mdi-cash-multiple',
          title: 'Funds Management',
          items: [
            { title: 'Funds List', link: { name: 'funds-management-list' } },
            { title: 'Add Funds', link: { name: 'funds-management-add' } }
          ]
        },
        {
          action: 'mdi-account-cog',
          title: 'Accounts Management',
          items: [
            { title: 'Add New Account', link: { name: 'accounts-add' } }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
  .menu-active-list
    color #f7a7a6 !important
</style>
