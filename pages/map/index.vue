<template>
  <div id="map-view">
    <EditShopModal v-if="editModal" @dismiss="editModal = false" :shop="shop" />
    <ViewShop
      v-if="modal"
      :shop="shop"
      @dismiss="modal = false"
      @openEditModal="openEditModal"
    />
    <div id="map"></div>
    <div class="btn">
      <MyButton @click.native="pushRoute">Switch To List View</MyButton>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'MapPage',

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
      shop: {},
      editModal: false,
      shops: [],
    }
  },
  mounted() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.center,
      zoom: 12,
      zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_TOP },
      fullscreenControl: false,
    })
    this.setMarker()
  },
  methods: {
    async setMarker() {
      const jwt = Cookies.get('jwt')
      this.$axios.setToken(jwt, 'bearer')
      if (this.$store.state.user.role.type !== 'admin') {
        this.shops = await this.$axios.$get(
          `/shops?_where[user.id]=${this.$store.state.user.id}`
        )
      } else {
        this.shops = await this.$axios.$get(`/shops`)
      }

      this.$store.commit('SET_SHOPS', this.shops)
      for (let i = 0; i < this.shops.length; i++) {
        this.marker = new google.maps.Marker({
          position: { lat: this.shops[i].lat, lng: this.shops[i].lng },
          map: this.map,
          icon: this.image,
        })
        this.marker.addListener('click', () => {
          this.shop = this.shops[i]
          this.modal = true
          this.map.setZoom(15)
          this.map.setCenter({ lat: this.shop.lat, lng: this.shop.lng })
        })
      }
    },
    openEditModal() {
      this.modal = false
      this.editModal = true
    },
    pushRoute() {
      if (this.$store.state.user.role.type == 'admin') {
        this.$router.push('/admin')
      } else {
        this.$router.push('/')
      }
    },
  },
  computed: {
    allShops() {
      return this.$store.getters.getShops
    },
  },
  watch: {
    allShops(val) {
      this.shops = val
    },
  },
}
</script>

<style lang="scss" scoped>
#map-view {
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
    @include for-big-desktop-up {
      bottom: 135px;
    }
  }
}
</style>