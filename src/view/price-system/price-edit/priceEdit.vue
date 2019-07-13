<template>
  <div>
    <Steps :current="current" style="margin-bottom: 20px">
      <Step title="基础信息"></Step>
      <Step title="设置价格"></Step>
    </Steps>
    <price-info-form ref="infoRef" v-show="current === 0" @next="nextStep"></price-info-form>
    <price-edit-table ref="priceTableRef" v-if="current === 1" :price-info="priceSaveDto" @submit="savePrice"></price-edit-table>
    <div style="text-align: right">
      <Button v-if="current === 0" type="primary" ghost @click="validInfo">下一步 <Icon type="ios-arrow-forward" /></Button>
      <Button v-if="current === 1" type="primary" ghost @click="current = 0" style="margin-right: 20px"><Icon type="ios-arrow-back" /> 上一步</Button>
      <Button v-if="current === 1" type="primary" @click="createPrice">生成房价</Button>
    </div>
  </div>
</template>
<script>
import priceInfoForm from './priceInfoForm'
import priceEditTable from './priceEditTable'
import { savePrice } from '@/api/price'
import { getDate } from '@/libs/tools'
export default {
  name: 'priceEdit',
  components: {
    priceInfoForm,
    priceEditTable
  },
  data () {
    return {
      current: 0,
      priceSaveDto: {}
    }
  },
  methods: {
    validInfo () {
      this.$refs.infoRef.validateForm()
    },
    nextStep (dto) {
      this.current = 1
      this.priceSaveDto = dto
    },
    createPrice () {
      this.$refs.priceTableRef.valid()
    },
    savePrice (dto) {
      dto.channelCodes = dto.addCheckedPriceTypeList.join(',')
      dto.houseTypeFids = dto.addHouseTypeList.join(',')
      dto.specialWeeks = dto.specialWeekList.join(',')
      dto.startDate = getDate(dto.priceDate[0], 'date')
      dto.endDate = getDate(dto.priceDate[1], 'date')
      savePrice(dto).then(() => {
        this.$Message.success('价格保存成功')
        this.$emit('success')
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
