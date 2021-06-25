<template>
  <div id="new-shop">
    <div class="heading">
      <p>Tap on map to drop a marker</p>
    </div>
    <div id="map"></div>
    <div class="modal">
      <AddShopModal :lat="lattitude" :lng="longitude" />
    </div>
  </div>
</template>

<script>
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
    }
  },
  mounted() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.center,
      zoom: 12,
    })
    this.map.addListener('click', (e) => {
      if (this.marker) {
        return
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
        position: position,
        map: this.map,
        icon: this.image,
      })
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
  .modal {
    position: absolute;
    bottom: 10px;
    width: 100%;
  }
}
</style>