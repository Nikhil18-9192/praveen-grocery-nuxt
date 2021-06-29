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
  background: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#__layout {
  position: relative;
  width: 100%;
  max-width: 375px;
  background: #fff;
  height: 100vh;
  max-height: 812px;
  overflow: hidden;
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
