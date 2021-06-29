<template>
  <div id="edit-shop">
    <div class="close" @click="$emit('dismiss')">&#x2715;</div>
    <p class="heading">Edit Shop</p>
    <div class="form">
      <input v-model="name" type="text" placeholder="shop name" />
      <input v-model="mobile" type="number" placeholder="phone number" />
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
  name: 'EditShopModal',
  props: ['shop'],
  data() {
    return {
      loading: false,
      expand: false,
      name: '',
      mobile: '',
      address: '',
    }
  },
  mounted() {
    if (this.shop) {
      this.name = this.shop.name
      this.mobile = this.shop.mobile
      this.address = this.shop.address
    }
  },
  methods: {
    async save() {
      const { name, mobile, address } = this
      const number = mobile.toString()
      const validation = formValidation({
        name,
        mobile: number,
        address,
      })

      if (validation.error) {
        this.$toast.error(validation.error.message)
        return
      }
      try {
        this.loading = true
        const jwt = await Cookies.get('jwt')
        const result = await this.$axios.$put(
          `/shops/${this.shop.id}`,
          {
            name: this.name,
            mobile: number,
            address: this.address,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        this.loading = false
        this.$emit('dismiss', result)
      } catch (error) {
        this.loading = false
        this.$toast.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#edit-shop {
  position: fixed;
  bottom: 10px;
  left: 2%;
  height: 100%;
  max-height: 389px;
  width: 96%;
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
    box-sizing: border-box;
    margin-bottom: 35px;
  }
  .form {
    flex-grow: 1;
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
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      font-family: Roboto;
      &::placeholder {
        text-transform: capitalize;
      }
    }
  }
  .btn {
    min-height: 20%;
  }
}
</style>