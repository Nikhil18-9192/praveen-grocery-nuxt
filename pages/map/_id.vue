<template>
  <div id="shop">
    <ViewShop v-if="modal" :shop="shop" @dismiss="modal = false" />
    <div id="map"></div>
    <div class="btn">
      <MyButton @click.native="$router.push('/')">Switch To List View</MyButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleShopPage',
  data() {
    return {
      center: {
        lat: 16.69406,
        lng: 74.24647,
      },
      map: false,
      marker: false,
      image: '/marker.svg',
      modal: false,
    }
  },
  mounted() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.center,
      zoom: 12,
    })
    this.setMarker()
  },
  methods: {
    setMarker() {
      this.marker = new google.maps.Marker({
        position: { lat: this.shop.lat, lng: this.shop.lng },
        map: this.map,
        icon: this.image,
      })
      this.marker.addListener('click', () => {
        this.modal = true
        this.map.setZoom(15)
        this.map.setCenter(this.marker.getPosition())
      })
    },
  },
  computed: {
    shop() {
      return this.$store.getters.getSelectedShop
    },
  },
}
</script>

<style lang="scss" scoped>
#shop {
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 65px;
  #map {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .btn {
    position: absolute;
    bottom: 10px;
    width: 100%;
  }
}
</style>