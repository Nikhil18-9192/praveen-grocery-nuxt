<template>
  <div id="home-page">
    <p>{{ user.user.username }}</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  mounted() {
    console.log('user', this.$store.getters.getUser)
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
  watch: {
    user(val) {
      console.log('test', val)
    },
  },
}
</script>

<style lang="scss" scoped>
#home-page {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 70px;
}
</style>
