<template>
  <div id="home-page">
    <InputSearch v-model="shops" />
    <List class="list" :shops="shops" />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'HomePage',

  data() {
    return {
      shops: [],
    }
  },
  mounted() {
    const jwt = Cookies.get('jwt')
    if (!jwt) {
      return this.$router.push('/login')
    }
    this.fetchShops(jwt)
  },
  methods: {
    async fetchShops(jwt) {
      this.$axios.setToken(jwt, 'bearer')
      this.shops = await this.$axios.$get('/shops')
      this.$store.commit('SET_SHOPS', this.shops)
    },
  },
}
</script>

<style lang="scss" scoped>
#home-page {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 90px 20px 0 20px;
  .list {
    margin-top: 36px;
  }
}
</style>
