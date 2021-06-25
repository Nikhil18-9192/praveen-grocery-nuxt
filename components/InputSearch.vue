<template>
  <div id="input-search">
    <div class="input">
      <input
        v-model="q"
        type="text"
        placeholder="Search for shop name or address"
        @input="search"
      />
      <img src="/search.svg" alt="" />
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'InputSearchComponent',
  data() {
    return {
      q: '',
      shops: [],
    }
  },
  methods: {
    async search() {
      try {
        const jwt = await Cookies.get('jwt')
        this.shops = await this.$axios.$get(`/shops?name_contains=${this.q}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        this.$emit('input', this.shops)
      } catch (error) {
        this.$toast.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#input-search {
  position: relative;
  width: 100%;
  height: 100%;
  .input {
    position: relative;
    width: 332px;
    height: 51px;
    margin: 0 auto;
    input {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
      outline: none;
      border: none;
      border-radius: 45px;
      padding: 17px 24px;
      font-weight: 300;
      font-size: 14px;
      line-height: 16px;
      color: #4e4e4e;
    }
    img {
      width: 30px;
      height: 30px;
      object-fit: contain;
      position: absolute;
      right: 17px;
      top: 9px;
    }
  }
}
</style>