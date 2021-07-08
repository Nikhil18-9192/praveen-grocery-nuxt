<template>
  <div id="edit-shop">
    <div class="close" @click="$emit('dismiss')">&#x2715;</div>
    <p class="heading">Edit Shop</p>
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
      <div class="select">
        <label for="tags">Select Tag</label><br />
        <select v-model="tag" id="tags" name="tags">
          <option disabled value="Tap to select tag">Tap to select tag</option>
          <option v-for="(tag, i) in tags" :key="i" :value="tag.id">
            {{ tag.name }}
          </option>
        </select>
      </div>
      <!-- <p class="add-tag-btn" @click="openModal">Add new tag</p> -->
    </div>
    <div class="btn">
      <Button :loading="loading" @click.native="save">Save</Button>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { formEditValidation } from '@/utils/validation'
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
      owner: '',
      tag: 'Tap to select tag',
      tags: [],
    }
  },
  mounted() {
    this.fetchTags()
    if (this.shop) {
      this.name = this.shop.name
      this.mobile = this.shop.mobile
      this.address = this.shop.address
      this.owner = this.shop.owner
      this.tag = this.shop.tag.id
    }
  },
  methods: {
    async save() {
      const { name, mobile, address, owner } = this
      const number = mobile.toString()
      const validation = formEditValidation({
        name,
        mobile: number,
        address,
        owner,
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
            owner: this.owner,
            tag: this.tag,
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
    async fetchTags() {
      const jwt = Cookies.get('jwt')
      this.$axios.setToken(jwt, 'bearer')
      this.tags = await this.$axios.$get('/tags')
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
  max-height: 555px;
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
        font-weight: 500;
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
    .select {
      position: relative;
      margin-top: 9px;
      label {
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        line-height: 14px;
      }
      select {
        position: relative;
        margin-top: 10px;
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
        text-align-last: center;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
        color: #4f4f4f;
      }
    }
    .add-tag-btn {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      color: $primaryColor;
      text-align: right;
      text-transform: capitalize;
      cursor: pointer;
    }
  }
  .btn {
    min-height: 20%;
  }
}
</style>