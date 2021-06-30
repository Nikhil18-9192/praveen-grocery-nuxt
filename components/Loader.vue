<template>
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  data() {
    return {
      loading: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.lds-ring {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  background: rgba(255, 255, 255, 0.993);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.534);
  z-index: 1000;
  width: 55px;
  height: 55px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 35px;
  height: 35px;
  margin: 8px;
  border: 4px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000 transparent transparent transparent;
  @include for-phone-only {
    width: 25px;
    height: 25px;
  }
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
</style>