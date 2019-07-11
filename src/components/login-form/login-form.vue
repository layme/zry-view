<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input prefix="ios-person" v-model.trim="form.userName" size="large" placeholder="请输入用户名" clearable></Input>
    </FormItem>
    <FormItem prop="password">
      <Input prefix="md-lock" type="password" v-model.trim="form.password" size="large" placeholder="请输入密码"
             clearable></Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" size="large" long shape="circle">登 录</Button>
      <div style="text-align: right">
        <a :href="resetPassword" target="_blank" style="color: #808695">忘记密码</a>
      </div>
    </FormItem>
  </Form>
</template>
<script>
import config from '@/config'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: '',
        password: ''
      },
      resetPassword: config.resetPassword
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
