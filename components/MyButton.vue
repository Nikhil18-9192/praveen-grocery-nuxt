<template>
  <div id="my-btn">
    <button>
      <slot class="slot"></slot>
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#my-btn {
  position: relative;
  width: 100%;
  height: 57px;
  text-align: center;
  button {
    width: 100%;
    max-width: 313px;
    height: 57px;
    background: $primaryColor;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    text-transform: capitalize;
  }
}
</style>