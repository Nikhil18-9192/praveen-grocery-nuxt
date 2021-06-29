<template>
  <div id="list" @scroll="loadMore">
    <div
      class="shop"
      v-for="(item, i) in shops"
      :key="i"
      @click="openMap(item)"
    >
      <h4>{{ item.name }}</h4>
      <p class="phone">+91 {{ item.mobile }}</p>
      <p class="address">{{ item.address }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListComponent',
  props: ['shops'],
  data() {
    return {}
  },
  methods: {
    openMap(shop) {
      this.$store.commit('SET_SHOP', shop)
      this.$router.push(`/map/${shop.name}`)
    },
    loadMore() {
      const listElm = document.querySelector('#list')
      if (
        listElm != null &&
        listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight
      ) {
        this.$emit('paginate')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#list {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 500px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #f9f9f9;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  .shop {
    padding: 15px 0;
    border-bottom: 1px solid #dddddd;
    h4 {
      font-weight: 700;
      font-size: 18px;
      line-height: 21px;
      margin-bottom: 8px;
    }
    .phone {
      color: $primaryColor;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 5px;
    }
    .address {
      font-weight: 300;
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>