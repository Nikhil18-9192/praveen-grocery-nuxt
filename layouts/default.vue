<template>
  <div>
    <Toolbar />
    <Hamburger />
    <transition name="slide">
      <Menu v-if="menuState" />
    </transition>
    <Nuxt />
  </div>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      menuState: false,
    }
  },
  mounted() {
    const jwt = Cookies.get('jwt')
    if (!jwt) {
      this.$router.push('/login')
    }
  },
  computed: {
    storeMenuState: function () {
      return this.$store.getters.getMenuState
    },
  },
  watch: {
    storeMenuState: function (newState) {
      this.menuState = newState
    },
  },
}
</script>
<style>
html {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e5e5e5;
  /* padding-top: 100px; */
}
#__layout {
  width: 375px;
  height: 100vh;
  min-height: 712px;
  background: #fff;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.5, 1);
}
.slide-enter,
.slide-leave-active {
  transform: translateX(100%);
}
</style>
