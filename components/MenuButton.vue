<template>
  <div id="menu-btn">
    <div
      class="burger_menu"
      :class="[menuState ? 'menu-active' : 'menu-inactive']"
      @click="menuToggle"
    >
      <div class="burger_open">
        <span :class="menuState ? 't1' : ''"></span>
        <span :class="menuState ? 't1' : ''"></span>
        <span :class="menuState ? 't1' : ''"></span>
      </div>
      <div class="burger_close">
        <span :class="!menuState ? 't1' : ''"></span>
        <span :class="!menuState ? 't2' : ''"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileNav',
  data() {
    return {
      menuState: false,
    }
  },
  mounted() {},
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
  methods: {
    menuToggle() {
      this.$store.commit('toggleMenuState')
    },
  },
}
</script>

<style lang="scss" scoped>
#menu-btn {
  position: absolute;
  right: 16px;
  top: 30px;
  z-index: 2000;
  .burger_menu {
    position: relative;
    width: 24px;
    height: 100%;
    span {
      display: block;
      background: #000;
      border-radius: 2px;
      will-change: transform;
    }
    .burger_open {
      top: 50%;
      left: 50%;
      width: 32px;
      z-index: 2;
      overflow: hidden;
      position: absolute;
      transform: translate(-50%, -50%);
      padding-bottom: 2px;
      span {
        height: 2px;
        width: 24px;
      }
      :first-child {
        transition: 0.4s ease-in all;
      }
      :nth-child(2) {
        margin: 6px 0;
        transition: 0.5s ease-in all;
      }
      :last-child {
        transition: 0.6s ease-in all;
      }
    }
    .burger_close {
      top: 50%;
      left: 50%;
      width: 32px;
      height: 32px;
      z-index: 2;
      overflow: hidden;
      position: absolute;
      transform: translate(-50%, -50%) rotate(45deg);
      span {
        height: 2px;
        width: 24px;
        position: absolute;
      }
      :first-child {
        height: 2px;
        width: 100%;
        top: calc(50% - 1px);
        transition: 0.4s ease-in all;
      }
      :nth-child(2) {
        width: 2px;
        height: 100%;
        left: calc(50% - 1px);
        transition: 0.4s ease-in all;
      }
    }
  }
}
.t1 {
  transform: translate(-105%, 0%);
}
.t2 {
  transform: translate(0%, -105%);
}
.menu-active {
  .burger_close {
    span {
      transition-delay: 0.5s !important;
    }
  }
}
.menu-inactive {
  .burger_open {
    span {
      transition-delay: 0.5s !important;
    }
  }
}
</style>