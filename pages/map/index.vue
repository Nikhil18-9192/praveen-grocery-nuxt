<template>
  <div id="map-view">
    <google-map id="map" ref="Map" :zoom="8" :center="center">
      <google-map-marker
        :draggable="true"
        v-for="(infoWindow, index) in infoWindowsList"
        :position="infoWindow.position"
        :key="index"
      />
    </google-map>
    <div class="btn">
      <MyButton>Switch To List View</MyButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapPage',
  data() {
    return {
      center: {
        lat: 16.69406,
        lng: 74.24647,
      },
      infoWindowsList: [
        { position: { lat: 16.69409, lng: 74.24647 } },
        { position: { lat: 16.686279, lng: 74.20607 } },
        { position: { lat: 17.686279, lng: 74.20607 } },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
#map-view {
  position: relative;
  width: 100%;
  height: 100vh;
  padding-top: 65px;
  .btn {
    position: absolute;
    bottom: 10px;
    width: 100%;
  }
}
</style>