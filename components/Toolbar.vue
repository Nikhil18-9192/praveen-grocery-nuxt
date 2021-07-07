<template>
  <div id="toolbar">
    <nuxt-link
      v-if="$store.state.user"
      :to="$store.state.user.role.type == 'admin' ? '/admin' : '/'"
      ><p>Praveen Grocery</p></nuxt-link
    >
    <nuxt-link v-else to="/"><p>Praveen Grocery</p></nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ToolbarComponent',
}
</script>

<style lang="scss" scoped>
#toolbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 63px;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  @include for-tablet-portrait-up {
    width: 375px;
    position: absolute;
  }
  a {
    text-decoration: none;
  }
  p {
    font-size: 20px;
    line-height: 19px;
    font-weight: 500;
    color: $primaryColor;
  }
}
</style>