<template>
  <div id="toolbar">
    <p>Grocery Data</p>
  </div>
</template>

<script>
export default {
  name: 'ToolbarComponent',
}
</script>

<style lang="scss" scoped>
#toolbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 63px;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  @include for-tablet-portrait-up {
    width: 375px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
  p {
    font-size: 16px;
    line-height: 19px;
    font-weight: 400;
    color: $primaryColor;
  }
}
</style>