<template>
    <Form :model="priceTypeSaveOrUpdateDto" :rules="priceTypeFormRules">
        <FormItem label="名称" prop="channelName">
            <Input v-model="priceTypeSaveOrUpdateDto.channelName" style="width:200px"></Input>
        </FormItem>
        <FormItem label="代码" prop="typeCode">
            <Input v-model="priceTypeSaveOrUpdateDto.typeCode" style="width:200px"></Input>
        </FormItem>
        <FormItem label="绑定门市价" prop="isBindCounterPrice">
            <RadioGroup v-model="priceTypeSaveOrUpdateDto.isBindCounterPrice">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="隐藏房价" prop="isHideHousePrice">
            <RadioGroup v-model="priceTypeSaveOrUpdateDto.isHideHousePrice" :value="priceTypeSaveOrUpdateDto.isHideHousePrice">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="保留整数" prop="isKeepInt">
            <RadioGroup v-model="priceTypeSaveOrUpdateDto.isKeepInt">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="状态" prop="status">
            <RadioGroup v-model="priceTypeSaveOrUpdateDto.status">
                <Radio label="1">有效</Radio>
                <Radio label="0">无效</Radio>
            </RadioGroup>
        </FormItem>
    </Form>
</template>
<script>
export default {
  name: 'updatePriceType',
  props: {
    priceTypeSaveOrUpdate: Object
  },
  data () {
    return {
      priceTypeSaveOrUpdateDto: {
        fid: '',
        bindRate: '',
        channelCode: '',
        channelName: '',
        typeCode: '',
        isBindCounterPrice: '',
        isHideHousePrice: '',
        isKeepInt: '',
        status: ''
      },
      priceTypeFormRules: {
        channelName: [
          { required: true, message: '请输入价格类型名称', trigger: 'blur' }
        ],
        typeCode: [
          { required: true, message: '请输入价格类型代码', trigger: 'blur' },
          { min: 6, message: '不能少于6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    update () {
      this.$emit('success', this.priceTypeSaveOrUpdateDto)
    }
  },
  created () {
    let vm = this
    if (Object.keys(this.priceTypeSaveOrUpdate).length) {
      vm.priceTypeSaveOrUpdateDto.fid = this.priceTypeSaveOrUpdate.fid
      vm.priceTypeSaveOrUpdateDto.bindRate = this.priceTypeSaveOrUpdate.bindRate
      vm.priceTypeSaveOrUpdateDto.channelCode = this.priceTypeSaveOrUpdate.channelCode
      vm.priceTypeSaveOrUpdateDto.channelName = this.priceTypeSaveOrUpdate.channelName
      vm.priceTypeSaveOrUpdateDto.typeCode = this.priceTypeSaveOrUpdate.typeCode
      vm.priceTypeSaveOrUpdateDto.isBindCounterPrice = String(this.priceTypeSaveOrUpdate.isBindCounterPrice)
      vm.priceTypeSaveOrUpdateDto.isHideHousePrice = String(this.priceTypeSaveOrUpdate.isHideHousePrice)
      vm.priceTypeSaveOrUpdateDto.isKeepInt = String(this.priceTypeSaveOrUpdate.isKeepInt)
      vm.priceTypeSaveOrUpdateDto.status = String(this.priceTypeSaveOrUpdate.status)
    }
  }
}
</script>
