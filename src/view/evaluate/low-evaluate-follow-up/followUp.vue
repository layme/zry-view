<template>
  <Form ref="evalFollowUpForm" :model="paramDto" :rules="rules" :label-width="0">
    <FormItem prop="content">
      <Input type="textarea" :rows="6" v-model="paramDto.content" maxlength="200"
             placeholder="此处最多输入200个字符"></Input>
    </FormItem>
    <FormItem style="text-align: center">
      <Button type="primary" @click="valid" class="my-btn">提 交</Button>
      <Button type="success" @click="finish">完 结</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'followUp',
  props: {
    lowEvaluateBid: String
  },
  data () {
    return {
      paramDto: {
        lowEvaluateBid: '',
        content: '',
        followUpStatus: null
      },
      rules: {
        content: [
          { required: true, message: '请输入跟进描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    valid () {
      this.$refs.replyForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.paramDto)
        }
      })
    },
    finish () {
      this.$emit('finish', this.paramDto.lowEvaluateBid)
    }
  },
  watch: {
    lowEvaluateBid (val) {
      this.paramDto.lowEvaluateBid = val
    }
  }
}
</script>
<style lang="less" scoped>
  .my-btn {
    margin-right: 20px;
  }
</style>
