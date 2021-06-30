<template>
  <div id="ham" :class="[{ anime: menuState }]" @click="menuToggle">
    <div class="burger" :class="[{ anime: menuState }]"></div>
  </div>
</template>

<script>
export default {
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
#ham {
  position: fixed;
  right: 16px;
  top: 10px;
  width: 30px;
  height: 30px;
  z-index: 2000;
  @include for-tablet-portrait-up {
    position: absolute;
  }
  &::before {
    background: #000;
    content: '';
    display: block;
    height: 4px;
    border-radius: 3px;
    margin: 7px 0;
    transition: 0.5s;
  }
  &::after {
    background: #000;
    content: '';
    display: block;
    height: 4px;
    border-radius: 3px;
    margin: 7px 0;
    transition: 0.5s;
  }
  .burger {
    background: #000;
    content: '';
    display: block;
    height: 4px;
    border-radius: 3px;
    margin: 7px 0;
    transition: 0.5s;
  }
  &.anime::after {
    transform: translateY(-10px) rotate(-135deg);
    background: $closeIcon;
  }
  &.anime::before {
    transform: translateY(12px) rotate(135deg);
    background: $closeIcon;
  }
  .burger.anime {
    transform: scale(0);
  }
}
</style>