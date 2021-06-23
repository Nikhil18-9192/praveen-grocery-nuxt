<template></template>

<script>
import Cookies from 'js-cookie'
export default {
  mounted() {
    Cookies.remove('jwt')
    this.$router.push('/login')
  },
}
</script>

<style>
</style>