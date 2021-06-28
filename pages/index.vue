<template>
  <div id="home-page">
    <InputSearch v-model="shops" />
    <List class="list" :shops="shops" @paginate="paginate" />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'HomePage',

  data() {
    return {
      shops: [],
      limit: 8,
      start: 0,
    }
  },
  mounted() {
    const jwt = Cookies.get('jwt')
    if (!jwt) {
      return this.$router.push('/login')
    }
    this.initialFetch(jwt)
  },
  methods: {
    async paginate() {
      this.start = this.shops.length
      const jwt = Cookies.get('jwt')
      this.$axios.setToken(jwt, 'bearer')
      const shops = await this.$axios.$get(
        `/shops?_start=${this.start}&_limit=${this.limit}`
      )
      this.shops.push(...shops)
    },
    async initialFetch(jwt) {
      this.$axios.setToken(jwt, 'bearer')
      this.shops = await this.$axios.$get(
        `/shops?_start=${this.start}&_limit=${this.limit}`
      )
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
