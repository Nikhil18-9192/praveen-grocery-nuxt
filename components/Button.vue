<template>
  <div id="button">
    <button>
      <div v-if="loading" class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
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
    max-width: 313px;
    height: 57px;
    background: $primaryColor;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    .lds-ring {
      display: inline-block;
      position: relative;
      width: 40px;
      height: 100%;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 25px;
      height: 25px;
      margin: 8px;
      border: 4px solid #fff;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
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