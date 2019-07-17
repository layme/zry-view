<template>
  <div class="login-body">
    <div class="login animated bounceInDown">
      <div class="div-left">
        <div class="text-title">ZINN</div>
        <div class="text-content">世界青年欢乐旅行驿站</div>
        <img src="../../assets/images/people.png" class="my-img"/>
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
        this.$router.push({
          name: this.$config.homeName
        })
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: url(../../assets/images/cloud.jpg) 0 bottom repeat-x #049ec4;
    -webkit-animation: animate-cloud 20s linear infinite;
    animation: animate-cloud 20s linear infinite;
    @-webkit-keyframes animate-cloud {
      from {
        background-position: 600px 100%;
      }
      to {
        background-position: 0 100%;
      }
    }
    @-moz-keyframes animate-cloud {
      from {
        background-position: 600px 100%;
      }
      to {
        background-position: 0 100%;
      }
    }
    @-ms-keyframes animate-cloud {
      from {
        background-position: 600px 100%;
      }
      to {
        background-position: 0 100%;
      }
    }
    @-o-keyframes animate-cloud {
      from {
        background-position: 600px 100%;
      }
      to {
        background-position: 0 100%;
      }
    }
  }

  .login {
    width: 1000px;
    height: 500px;
    margin: 0 auto;
    border-radius: 4px;
    overflow: hidden;
    border: #ffffff 1px solid;
  }

  .div-left {
    height: 100%;
    width: 55%;
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

    .my-img {
      width: 500px;
      position: absolute;
      bottom: 0;
      left: 10px;
    }
  }

  .div-right {
    height: 100%;
    width: 45%;
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
