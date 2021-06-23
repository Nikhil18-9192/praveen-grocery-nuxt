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
    border: 1px solid $primaryColor;
    width: 100%;
    max-width: 313px;
    height: 100%;
    background: #fff;
    border-radius: 6px;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: #3e3e3e;
    text-transform: capitalize;
  }
}
</style>