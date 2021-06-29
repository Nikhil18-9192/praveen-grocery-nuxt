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
  // max-width: 375px;
  height: 63px;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 16px;
    line-height: 19px;
    font-weight: 400;
    color: $primaryColor;
  }
}
</style>