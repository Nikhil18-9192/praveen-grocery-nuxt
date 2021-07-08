<template>
  <div id="new-shop">
    <AddTagModal v-if="tagModal" @dismiss="dismiss" />
    <div class="heading">
      <p>Tap on map to drop a marker</p>
    </div>
    <div id="map"></div>
    <div class="modal">
      <AddShopModal
        :lat="lattitude"
        :lng="longitude"
        :tags="tags"
        @openModal="openModal"
      />
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'AddShopPage',

  data() {
    return {
      center: {
        lat: 16.69406,
        lng: 74.24647,
      },
      map: false,
      marker: false,
      lattitude: false,
      longitude: false,
      image: '/marker.svg',
      tags: [],
      tagModal: false,
    }
  },
  mounted() {
    this.fetchTags()
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.center,
      zoom: 12,
      zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_TOP },
      fullscreenControl: false,
    })
    this.map.addListener('click', (e) => {
      if (this.marker) {
        this.marker.setMap(null)
        this.setMarker(e.latLng)
      } else {
        this.setMarker(e.latLng)
      }
    })
  },
  methods: {
    setMarker(position) {
      this.lattitude = position.lat()
      this.longitude = position.lng()
      this.marker = new google.maps.Marker({
        position: { lat: this.lattitude, lng: this.longitude },
        map: this.map,
        icon: this.image,
      })
    },
    async fetchTags() {
      const jwt = Cookies.get('jwt')
      this.$axios.setToken(jwt, 'bearer')
      this.tags = await this.$axios.$get('/tags')
    },
    openModal() {
      this.tagModal = true
    },
    dismiss(tag) {
      this.tagModal = false
      this.tags.push(tag)
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
#new-shop {
  position: relative;
  width: 100%;
  height: 95vh;
  padding-top: 65px;
  #map {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .heading {
    padding: 15px 0;
    text-align: center;
    p {
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>