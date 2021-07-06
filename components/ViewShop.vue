<template>
  <div id="view">
    <div class="close" @click="$emit('dismiss')">&#x2715;</div>
    <p class="heading">Selected Shop</p>
    <div class="info">
      <h4>{{ shop.name }}</h4>
      <p class="phone">
        <a :href="'tel:+91' + shop.mobile">+91 {{ shop.mobile }}</a>
      </p>
      <p class="owner">
        owner - <span>{{ shop.owner ? shop.owner : '' }}</span>
      </p>
      <p class="address">{{ shop.address }}</p>
    </div>
    <div class="btn">
      <MyButton @click.native="openModal">Edit Shop</MyButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewShopComponent',
  props: ['shop'],
  methods: {
    openModal() {
      this.$emit('openEditModal')
    },
  },
}
</script>

<style lang="scss" scoped>
#view {
  position: fixed;
  bottom: 10px;
  left: 2%;
  height: 311px;
  width: 96%;
  max-width: 355px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1500;
  @include for-tablet-portrait-up {
    left: 50%;
    transform: translate(-50%, 0);
  }
  @include for-big-desktop-up {
    bottom: 70px;
  }
  @include for-tablet-only {
    bottom: 115px;
  }
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
    cursor: pointer;
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
    a {
      text-decoration: none;
    }
    .phone {
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      color: #000;
      max-width: 105px;
      margin: 20px auto 25px auto;
    }
    .owner {
      font-weight: 300;
      font-size: 13px;
      line-height: 15px;
      padding-bottom: 25px;
      span {
        font-weight: 500;
      }
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