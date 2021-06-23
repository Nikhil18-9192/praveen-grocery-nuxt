<template>
  <div id="menu">
    <div
      class="nav-item"
      v-for="(item, i) in menuItems"
      :key="i"
      @click="$store.commit('toggleMenuState')"
    >
      <nuxt-link :to="item.path">
        {{ item.name }}
      </nuxt-link>
    </div>
    <p v-if="jwt" @click="logout">Logout</p>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { menuItems } from '@/utils'
export default {
  name: 'MenuComponent',
  data() {
    return {
      jwt: null,
    }
  },
  computed: {
    menuItems() {
      return menuItems
    },
  },
  mounted() {
    this.jwt = Cookies.get('jwt')
  },
  methods: {
    logout() {
      Cookies.remove('jwt')
      this.$store.commit('SET_USER', false)
      this.$store.commit('SET_JWT', false)
      this.$router.push('/login')
      this.$store.commit('toggleMenuState')
    },
  },
}
</script>

<style lang="scss" scoped>
#menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 205px;
  height: 100vh;
  z-index: 1500;
  background: #fff;
  padding-top: 94px;
  text-align: right;
  padding-right: 17px;

  .nav-item {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 25px;
    a {
      color: #000;
      text-decoration: none;
      &.nuxt-link-exact-active {
        color: #ff5f5f;
      }
    }
  }
  p {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 25px;
  }
}
</style>