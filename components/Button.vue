<template>
  <div id="button">
    <button>
      <div v-if="loading" class="loader"></div>
      <slot v-else></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: ['loading'],
}
</script>

<style lang="scss" scoped>
#button {
  position: relative;
  width: 100%;
  height: 100%;
  button {
    width: 100%;
    // max-width: 313px;
    height: 57px;
    background: $primaryColor;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    .loader {
      border: 6px solid $primaryColor;
      border-radius: 50%;
      border-top: 6px solid #fff;
      width: 40px;
      height: 40px;
      -webkit-animation: spin 2s linear infinite;
      animation: spin 2s linear infinite;
      margin: 0 auto;
    }

    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style> 