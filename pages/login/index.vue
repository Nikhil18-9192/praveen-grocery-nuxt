<template>
  <div id="login">
    <h4>Login to continue</h4>
    <div class="form">
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <Button :loading="loading">Login</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      loading: false,
    }
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
      &::placeholder {
        font-weight: bold;
        font-size: 24px;
        line-height: 28px;
        color: #000;
      }
    }
  }
}
</style>