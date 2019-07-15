<template>
    <Form :model="addPriceType" :rules="addPriceTypeRules">
        <FormItem label="名称" prop="channelName">
            <Input v-model="addPriceType.channelName" style="width:200px"></Input>
        </FormItem>
        <FormItem label="代码" prop="typeCode">
            <Input v-model="addPriceType.typeCode" style="width:200px"></Input>
        </FormItem>
        <FormItem label="渠道" prop="channelCode">
            <Input v-model="addPriceType.channelCode" style="width:200px"></Input>
        </FormItem>
        <FormItem label="绑定门市价" prop="isBindCounterPrice">
            <RadioGroup v-model="addPriceType.isBindCounterPrice">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="隐藏房价" prop="isHideHousePrice">
            <RadioGroup v-model="addPriceType.isHideHousePrice" :value="addPriceType.isHideHousePrice">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="保留整数" prop="isKeepInt">
            <RadioGroup v-model="addPriceType.isKeepInt">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="状态" prop="status">
            <RadioGroup v-model="addPriceType.status">
                <Radio label="1">有效</Radio>
                <Radio label="0">无效</Radio>
            </RadioGroup>
        </FormItem>
    </Form>
</template>
<script>
export default {
  data () {
    return {
      addPriceType: {
        fid: '',
        bindRate: '',
        channelCode: '',
        channelName: '去哪儿',
        typeCode: '',
        isBindCounterPrice: '0',
        isHideHousePrice: '0',
        isKeepInt: '0',
        status: '1'
      },
      addPriceTypeRules: {
        channelName: [
          { required: true, message: '请输入价格类型名称', trigger: 'blur' }
        ],
        typeCode: [
          { required: true, message: '请输入价格类型代码', trigger: 'blur' },
          { min: 6, message: '不能少于6个字符', trigger: 'blur' }
        ],
        channelCode: [
          { required: true, message: '请输入渠道代码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    add () {
      this.$emit('success', this.addPriceType)
    }
  }
}
</script>
