<template>
  <Form ref="groupForm" :model="paramDto" :rules="groupRules" :label-width="100">
    <FormItem label="群聊名称" prop="name">
      <Input v-model.trim="paramDto.name" placeholder="" clearable></Input>
    </FormItem>
    <FormItem label="管理员手机号" prop="phone">
      <Input v-model.trim="paramDto.phone" placeholder="" clearable></Input>
    </FormItem>
    <FormItem label="群头像" prop="imgUrl">
      <Input v-model.trim="paramDto.imgUrl" placeholder="" clearable></Input>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'groupForm',
  props: {
    group: Object
  },
  data () {
    return {
      paramDto: {
        name: '',
        phone: '',
        imgUrl: ''
      },
      groupRules: {
        name: [
          { required: true, message: '请输入群聊名称', trigger: 'blur' },
          { max: 50, type: 'string', message: '长度在200个字符以内', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入管理员手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '手机号格式有误', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请输入管理员手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validForm () {
      this.$refs['groupForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.paramDto)
        } else {
          this.$emit('error')
        }
      })
    }
  },
  created () {
    if (Object.keys(this.group).length) {
      this.paramDto.name = this.group.name
      this.paramDto.phone = this.group.name
      this.paramDto.imgUrl = this.group.description.headUrl
    }
  }
}
</script>
<style lang="less" scoped>
</style>
