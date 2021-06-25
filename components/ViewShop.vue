<template>
  <div id="view">
    <div class="close" @click="$emit('dismiss')">&#x2715;</div>
    <p class="heading">Selected Shop</p>
    <div class="info">
      <h4>{{ shop.name }}</h4>
      <p class="phone">+91 {{ shop.mobile }}</p>
      <p class="address">{{ shop.address }}</p>
    </div>
    <div class="btn">
      <MyButton @click.native="$router.push('/add-shop')">Edit Shop</MyButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewShopComponent',
  props: ['shop'],
}
</script>

<style lang="scss" scoped>
#view {
  position: fixed;
  bottom: 10px;
  left: 10px;
  height: 311px;
  width: 100%;
  max-width: 355px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1500;
  .close {
    position: absolute;
    right: 12px;
    top: 10px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: #ff9e9e;
    color: #fff;
    box-sizing: border-box;
  }
  .heading {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #bcbcbc;
    text-align: center;
    padding-top: 25px;
    min-height: 10%;
  }
  .info {
    flex-grow: 1;
    margin-top: 30px;
    text-align: center;
    h4 {
      font-weight: 700;
      font-size: 18px;
      line-height: 21px;
      color: $primaryColor;
    }
    .phone {
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      margin-top: 20px;
      margin-bottom: 25px;
      color: #000;
    }
    .address {
      font-weight: 300;
      font-size: 13px;
      line-height: 15px;
    }
  }
  .btn {
    min-height: 22%;
  }
}
</style>