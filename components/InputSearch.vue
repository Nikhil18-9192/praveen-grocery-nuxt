<template>
  <div id="input-search">
    <div class="input">
      <input
        v-model="q"
        type="text"
        placeholder="Search for shop name or address"
        @input="search"
      />
      <img v-if="q == ''" src="/search.png" alt="" />
      <div v-else class="clear" @click="clearText">&#x2715;</div>
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
        this.$store.commit('SET_LOADING')
        const jwt = await Cookies.get('jwt')
        this.shops = await this.$axios.$get(`/shops?_q=${this.q}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        this.$emit('input', this.shops)
        this.$store.commit('SET_LOADING')
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async clearText() {
      this.q = ''
      this.$emit('paginate')
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
    .clear {
      position: absolute;
      right: 15px;
      top: 10px;
      cursor: pointer;
      background: #ff5f5f;
      border-radius: 50%;
      box-sizing: border-box;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 18px;
      font-weight: 800;
    }
  }
}
</style>