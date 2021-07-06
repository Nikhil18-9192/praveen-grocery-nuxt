<template>
  <div id="add-shop" :class="expand ? 'expand' : ''">
    <div class="trigger" v-if="!expand" @click="expand = true"></div>
    <div class="arrow" @click="expand = !expand">
      <div v-if="expand" class="close">&#x2715;</div>
      <p class="plus" v-else>&#x2B;</p>
    </div>
    <p class="heading">Add New Shop</p>
    <div class="form">
      <input v-model="name" type="text" placeholder="shop name" />
      <input
        v-model="mobile"
        type="number"
        placeholder="phone number"
        pattern="/^[789]\d{9}$/"
        onKeyPress="if(this.value.length==10) return false;"
      />
      <input v-model="owner" type="text" placeholder="owner name" />
      <textarea
        v-model="address"
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="shop address"
      ></textarea>
    </div>
    <div class="btn">
      <Button :loading="loading" @click.native="save">Save</Button>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { formValidation } from '@/utils/validation'
export default {
  name: 'AddShopModal',
  props: ['lat', 'lng'],
  data() {
    return {
      loading: false,
      expand: false,
      name: '',
      mobile: '',
      address: '',
      owner: '',
    }
  },
  mounted() {},
  methods: {
    async save() {
      const { name, mobile, address, owner } = this
      const number = mobile.toString()
      const validation = formValidation({
        name,
        mobile: number,
        owner,
        address,
        lat: this.lat,
      })
      if (validation.error) {
        this.$toast.error(validation.error.message)
        return
      }
      try {
        this.loading = true
        const jwt = await Cookies.get('jwt')
        await this.$axios.$post(
          `/shops`,
          {
            name: this.name,
            mobile: number,
            owner: this.owner,
            address: this.address,
            lat: this.lat,
            lng: this.lng,
            user: this.$store.state.user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        this.loading = false
        this.expand = false
        this.$router.push('/')
      } catch (error) {
        this.loading = false
        this.$toast.error(error.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#add-shop {
  position: fixed;
  bottom: 10px;
  left: 3%;
  height: 60px;
  max-height: 389px;
  width: 96%;
  margin: 0 auto;
  max-width: 355px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  padding: 0 17px;
  overflow: hidden;
  transition: 0.3s ease all;
  @include for-tablet-portrait-up {
    left: 50%;
    transform: translate(-50%, 0);
  }
  @include for-big-desktop-up {
    bottom: 75px;
  }
  @include for-tablet-only {
    bottom: 115px;
  }
  .trigger {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .arrow {
    position: absolute;
    right: 17px;
    top: 18px;
    .close {
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
    .plus {
      line-height: 1;
      font-size: 24px;
      border: 1px solid #000;
      border-radius: 50%;
      padding: 1px 6px;
    }
  }
  .heading {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #000;
    text-align: center;
    padding-top: 25px;
    min-height: 10%;
    box-sizing: border-box;
    margin-bottom: 35px;
  }
  .form {
    flex-grow: 1;
    margin-bottom: 15px;
    input {
      width: 100%;
      height: 45px;
      background: #f5f5f5;
      border-radius: 6px;
      border: none;
      margin-bottom: 15px;
      outline: none;
      padding: 15px;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      &::placeholder {
        text-transform: capitalize;
      }
    }
    textarea {
      width: 100%;
      height: 87px;
      background: #f5f5f5;
      border-radius: 6px;
      border: none;
      outline: none;
      padding: 15px;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      font-family: Roboto;
      color: #000;
      &::placeholder {
        text-transform: capitalize;
        font-weight: 500;
      }
    }
  }
  .btn {
    min-height: 20%;
  }
}
.expand {
  min-height: 435px;
}
</style>