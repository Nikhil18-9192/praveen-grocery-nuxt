<template>
  <div id="add-tag">
    <div class="close" @click="$emit('dismiss')">&#x2715;</div>
    <p class="heading">Add New Tag</p>
    <div class="form">
      <input v-model="tag" type="text" placeholder="Tag Name" />
    </div>
    <div class="btn">
      <Button :loading="loading" @click.native="save">Save</Button>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'AddTagModal',
  data() {
    return {
      tag: '',
      loading: false,
    }
  },
  methods: {
    async save() {
      this.loading = true
      const jwt = await Cookies.get('jwt')
      try {
        const tag = await this.$axios.$post(
          '/tags',
          { name: this.tag },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        this.loading = false
        this.$emit('dismiss', tag)
      } catch (error) {
        this.loading = false
        this.$toast.error(error.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#add-tag {
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 10px;
  left: 3%;
  z-index: 1100;
  max-height: 240px;
  padding: 0 17px;
  max-width: 355px;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
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
  .close {
    position: absolute;
    right: 17px;
    top: 18px;
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
    color: #000;
    text-align: center;
    padding-top: 25px;
    min-height: 10%;
    box-sizing: border-box;
    margin-bottom: 35px;
  }
  .form {
    margin-bottom: 35px;
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
  }
}
</style>