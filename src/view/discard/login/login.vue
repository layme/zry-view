<template>
  <div class="login-body">
    <div class="login">
      <div class="div-left">
        <div class="text-title">ZINN</div>
        <div class="text-content">世界青年欢乐旅行驿站</div>
      </div>
      <div class="div-right">
        <div class="login-card">
          <div class="title">自如驿站</div>
          <div class="sub-title">Welcome !</div>
          <div class="form-con">
            <login-form @on-success-valid="handleSubmit"></login-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import watermark from '@/libs/watermark'

export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        if (res.code === 200) {
          this.$router.push({
            name: this.$config.homeName
          })
        }
      })
    }
  },
  mounted () {
    // 清除水印
    watermark.set('')
  }
}
</script>

<style lang="less" scoped>
  .login-body {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #f8f8f9;
  }
  .login {
    position: absolute;
    top: 130px;
    right: 280px;
    bottom: 130px;
    left: 280px;
    border-radius: 10px;
    overflow: hidden;
    -webkit-box-shadow: #808695 0 0 20px;
    -moz-box-shadow: #808695 0 0 20px;
    box-shadow: #808695 0 0 20px;
  }
  .div-left {
    height: 100%;
    width: ~"calc(100% * 0.6)";
    background: url('../../../assets/images/city.jpg');
    opacity: 0.9;
    float: left;
    padding: 40px 0 0 30px;
    .text-title {
      color: #ffffff;
      font-size: 70px;
      font-style: italic;
    }
    .text-content {
      color: #e8eaec;
      font-size: 18px;
    }
  }

  .div-right {
    height: 100%;
    width: ~"calc(100% * 0.4)";
    background-color: #ffffff;
    float: right;
    .login-card {
      position: relative;
      top: 60px;
      margin: 0 auto;
      padding: 30px 50px;
      text-align: center;
      .title {
        font-size: 36px;
        font-weight: bold;
      }

      .sub-title {
        font-size: 14px;
        color: #808695;
        margin-top: 10px;
      }

      .form-con {
        margin-top: 30px;
      }
    }
  }
</style>
