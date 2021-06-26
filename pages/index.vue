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
  async asyncData({ $axios, store }) {
    const jwt = await Cookies.get('jwt')
    if (!jwt) {
      return
    }
    const shops = await $axios.$get('/shops', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    store.commit('SET_SHOPS', shops)
    return { shops }
  },
  data() {
    return {
      shops: [],
    }
  },
  mounted() {
    const jwt = Cookies.get('jwt')
    if (!jwt) {
      this.$router.push('/login')
    }
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
