<template>
  <div id="login">
    <h4>Login to continue</h4>
    <div class="form">
      <input v-model="username" type="email" placeholder="email" />
      <input v-model="password" type="password" placeholder="password" />
      <Button class="btn" :loading="loading" @click.native="login"
        >Login</Button
      >
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'LoginPage',
  data() {
    return {
      loading: false,
      username: '',
      password: '',
    }
  },

  beforeCreate() {
    const jwt = Cookies.get('jwt')
    if (jwt) {
      this.$router.push('/')
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        const res = await this.$axios.$post(`/auth/local`, {
          identifier: this.username,
          password: this.password,
        })
        this.$store.commit('SET_USER', res.user)
        this.$store.commit('SET_JWT', res.jwt)
        Cookies.set('jwt', res.jwt, { expires: 365 })
        this.$axios.setToken(res.jwt, 'bearer')
        if (res.user.role.type == 'admin') {
          this.$router.push('/admin')
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        this.$toast.error(error.message)
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#login {
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 30px;

  h4 {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #848484;
    margin-bottom: 34px;
  }
  .form {
    input {
      width: 100%;
      max-width: 313px;
      height: 57px;
      border: 1px solid #000000;
      margin-bottom: 20px;
      border-radius: 6px;
      padding: 15px 20px;
      background: #f7f7f7;
      outline: none;
      font-weight: 400;
      font-size: 24px;
      line-height: 28px;
      &::placeholder {
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        color: #000;
        text-transform: capitalize;
      }
    }
    .btn {
      margin-top: 15px;
    }
  }
}
</style>