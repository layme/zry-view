<template>
  <Form ref="priceInfoForm" :model="priceSaveDto" :rules="rules" :label-width="80" class="my-form">
    <FormItem label="房价类型" prop="addCheckedPriceTypeList">
      <CheckboxGroup v-model="priceSaveDto.addCheckedPriceTypeList" @on-change="handleChange">
        <Checkbox v-for="item in priceTypeList" :key="item.code" v-if="item.isBindCounterPrice === 0 && item.isHideHousePrice === 0"
                  :label="item.code">{{ item.name }}
        </Checkbox>
        <a v-if="!showInput" @click="handleShowInput"><Icon type="ios-add-circle-outline" /> 添加隐藏房价类型</a>
        <Input ref="inputRef" v-else v-model="hidePriceTypeCode" size="small" placeholder="输入隐藏房价码, 回车确认" style="width: 200px"
               @on-enter="handleHidePriceTypeCodeChange" @on-blur="handleBlur"/>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="房型" prop="addHouseTypeList">
      <CheckboxGroup v-model="priceSaveDto.addHouseTypeList" @on-change="handleChange">
        <Checkbox v-for="item in $store.state.price.currentHouseTypeList" :key="item.bid" :label="item.bid">
          {{ item.houseTypeParentName + item.houseName }}
        </Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="日期" prop="priceDate">
      <DatePicker type="daterange" v-model="priceSaveDto.priceDate" split-panels :placeholder="datePlaceholder" style="width: 500px" clearable
      :editable="false" :disabled="!(priceSaveDto.addCheckedPriceTypeList.length && priceSaveDto.addHouseTypeList.length)"
                  :options="dateOptions" @on-change="handleDateChange"></DatePicker>
    </FormItem>
    <FormItem label="特殊星期" prop="specialWeekList">
      <CheckboxGroup v-model="priceSaveDto.specialWeekList">
        <Checkbox v-for="item in $store.state.price.weekOptions" :key="item.value" :label="item.value">
          {{ item.label }}
        </Checkbox>
      </CheckboxGroup>
    </FormItem>
    <FormItem label="调价原因" prop="adjustCode">
      <Select v-model="priceSaveDto.adjustCode" placeholder="" style="width: 500px" clearable>
        <Option v-for="(value, key, index) in $store.state.price.adjustType" :key="index" :label="value"
                :value="key"></Option>
      </Select>
    </FormItem>
    <FormItem label="调价说明" prop="description">
      <Input type="textarea" v-model.trim="priceSaveDto.description" placeholder="" :row="4" :maxlength="200" style="width: 80%"></Input>
    </FormItem>
  </Form>
</template>
<script>
import { getHidePriceType, getPriceMinDate } from '@/api/price'
import { getDate, checkDateStr } from '@/libs/tools'
export default {
  name: 'priceInfoForm',
  data () {
    return {
      priceSaveDto: {
        channelCodes: '',
        houseTypeFids: '',
        specialWeeks: '',
        startDate: '',
        endDate: '',
        priceChangeDetailDtoList: [],
        adjustCode: '',
        description: '',
        priceDate: [],
        specialWeekList: [],
        addCheckedPriceTypeList: [],
        addHouseTypeList: []
      },
      rules: {
        addCheckedPriceTypeList: [
          { type: 'array', required: true, message: '请选择房价类型', trigger: 'change' }
        ],
        addHouseTypeList: [
          { type: 'array', required: true, message: '请选择房型', trigger: 'change' }
        ],
        priceDate: [
          { required: true,
            type: 'array',
            fields: {
              0: { type: 'date', required: true, message: '请选择日期' },
              1: { type: 'date', required: true, message: '请选择日期' }
            },
            trigger: 'change' }
        ],
        adjustCode: [
          { required: true, message: '请选择调价原因', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写调价说明', trigger: 'blur' }
        ]
      },
      priceTypeList: JSON.parse(JSON.stringify(this.$store.state.price.priceTypeList)),
      hidePriceTypeCode: '',
      showInput: false,
      maxDate: Date.now(),
      dateOptions: {
        disabledDate: (date) => {
          return date.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  computed: {
    datePlaceholder () {
      return `开始日期不能大于 ${getDate(this.maxDate, 'date')}`
    }
  },
  methods: {
    handleHidePriceTypeCodeChange () {
      this.hidePriceTypeCode = this.hidePriceTypeCode.replace(/([\u4e00-\u9fa5])|(\s)|[^\d\w]/g, '')
      if (!this.hidePriceTypeCode.length) { return }
      getHidePriceType({ typeCode: this.hidePriceTypeCode }).then(res => {
        let hide = res.body
        if (hide.isBindCounterPrice === 1) {
          this.$Message.warning('该隐藏房价类型已绑定门市价，修改门市价即可')
          return
        }
        let index = -1
        let find
        this.priceTypeList.forEach((item, i) => {
          if (item.code === hide.code) {
            index = i
            find = item
          }
        })
        if (index) {
          if (find.isHideHousePrice === 1) {
            this.priceTypeList[index].isHideHousePrice = 0
            this.priceSaveDto.addCheckedPriceTypeList.push(hide.code)
            this.handleBlur()
          } else {
            this.$Message.warning('该隐藏码已显示')
          }
        } else {
          this.$Message.success(`房价码 ${v.name} 添加成功，请选择`)
          this.priceTypeList.push(hide)
          this.priceSaveDto.addCheckedPriceTypeList.push(hide.code)
        }
      })
    },
    handleChange () {
      this.priceSaveDto.priceDate = []
      if (this.priceSaveDto.addCheckedPriceTypeList.length && this.priceSaveDto.addHouseTypeList.length) {
        this.getPriceMinDate()
      }
    },
    // 查询可调整的最低日期
    getPriceMinDate () {
      getPriceMinDate({ houseTypeFidList: this.priceSaveDto.addHouseTypeList, channelCodeList: this.priceSaveDto.addCheckedPriceTypeList }).then(res => {
        let date = res.body + 24 * 3600 * 1000
        let now = Date.now()
        date >= now ? this.maxDate = date : this.maxDate = now
      })
    },
    handleDateChange (date) {
      if (checkDateStr(date[0], getDate(this.maxDate, 'date')) === -1) {
        this.$Message.warning(`开始日期不能大于 ${getDate(this.maxDate, 'date')}`)
        this.priceSaveDto.priceDate = []
      }
    },
    validateForm () {
      this.$refs.priceInfoForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.priceSaveDto)
        } else {
          return false
        }
      })
    },
    handleShowInput () {
      this.showInput = true
      this.$nextTick(() => {
        this.$refs.inputRef.$refs.input.focus()
      })
    },
    handleBlur () {
      this.showInput = false
      this.hidePriceTypeCode = ''
    }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      let result = value
      let l = 0
      for (let i = 0; i < value.length; i++) {
        if (/[\u4e00-\u9fa5]/.test(value[i])) {
          l += 2
        } else {
          l++
        }
        if (l > 16) {
          result = value.slice(0, i) + '..'
          break
        }
      }
      return result
    }
  }
}
</script>
<style lang="less" scoped>
  @import "style";
</style>
