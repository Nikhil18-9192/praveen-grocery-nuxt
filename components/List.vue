<template>
  <div id="list">
    <div
      class="shop"
      v-for="(item, i) in shops"
      :key="i"
      @click="openMap(item)"
    >
      <h4>{{ item.name }}</h4>
      <p class="phone">
        <a :href="'tel:+91' + item.mobile">+91 {{ item.mobile }}</a>
      </p>
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
      text-transform: capitalize;
    }
    a {
      text-decoration: none;
    }
    .phone {
      color: $primaryColor;
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      margin-bottom: 5px;
      max-width: 110px;
    }
    .address {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>