<template>
  <Form :model="paramDto" ref="repairCancelForm" :rules="rules" :label-width="80">
    <FormItem label="取消原因" prop="code">
      <Select v-model="paramDto.code" placeholder="" clearable>
        <Option
          v-for="item in reasons"
          :key="item.code"
          :label="item.name"
          :value="item.code">
        </Option>
      </Select>
    </FormItem>
    <FormItem label="取消备注" prop="description">
      <Input type="textarea" :rows="2" v-model="paramDto.description"
             maxlength="50"
             placeholder="此处最多输入50个字符"></Input>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'cancelRepairForm',
  props: {
    reasons: Array,
    billNum: String
  },
  data () {
    return {
      paramDto: {
        billNum: this.billNum,
        code: '',
        description: ''
      },
      rules: {
        code: [
          { required: true, message: '请选择取消原因', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    validForm () {
      this.$refs['repairCancelForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.paramDto)
        } else {
          this.$emit('error')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
