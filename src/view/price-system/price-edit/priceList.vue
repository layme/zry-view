<template>
  <div>
    <Form :model="priceDto" :label-width="50" inline>
      <FormItem label="营业日">
        <DatePicker v-model="priceDto.priceDate" type="daterange" split-panels placeholder=""
                    class="my-date-picker" :options="pickerOptions"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="primary" icon="ios-search" @click="priceDto.pageNum=1;getPriceList()"> 查 询</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="openChangePriceDialog">房价调整</Button>
      </FormItem>
      <Row>
        <FormItem label="筛选">
<!--          <Checkbox-->
<!--            :indeterminate="isIndeterminate"-->
<!--            :value="checkAll"-->
<!--            @click.prevent.native="handleCheckAllChange">全选</Checkbox>-->
          <CheckboxGroup v-model="$store.state.price.checkedPriceType" @on-change="handleCheckedCitiesChange">
            <Checkbox v-for="item in $store.state.price.priceTypeList" :key="item.code" v-if="item.isHideHousePrice === 0" :label="item.code">{{item.name}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Row>
    </Form>
    <div class="full-top">
      <Spin size="large" fix v-if="loadingTable" class="full-spin"></Spin>
      <price-card v-for="(value, key, index) in priceList" :key="index" :date="key" :price-list="value"
                  class="my-card"></price-card>
      <Card v-if="!Object.keys(priceList).length" class="my-card">
        <div class="no-data">
          <span>没有找到匹配的记录</span>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import { savePrice, getHidePriceType, getPriceMinDate, listPrice } from '@/api/price'
import priceCard from './priceCard'
import { mapActions } from 'vuex'
export default {
  name: 'priceList',
  components: {
    priceCard
  },
  data () {
    return {
      // TAB页变量
      priceDetail: [],
      priceDateDisabled: true,
      addMinDate: new Date(),
      addDateSelected: false,
      addMaxDate: null,
      unShownTypeCode: '',
      nextStep: true,
      houseTypeList: [],
      adjustType: {},
      priceDate: [],
      priceSaveDto: {
        channelCodes: '',
        houseTypeFids: '',
        startDate: null,
        endDate: null,
        specialWeeks: '',
        priceChangeDetailDtoList: [],
        adjustCode: '',
        description: '',

        // 临时变量
        priceDate: [],
        specialWeekList: [],
        addCheckedPriceTypeList: [],
        addHouseTypeList: []
      },
      activeTab: 'priceInfo',
      rules: {
        addCheckedPriceTypeList: [
          { type: 'array', required: true, message: '请选择房价类型', trigger: 'change' }
        ],
        addHouseTypeList: [
          { type: 'array', required: true, message: '请选择房型', trigger: 'change' }
        ],
        priceDate: [
          { type: 'array', required: true, message: '请选择日期', trigger: 'change' }
        ],
        adjustCode: [
          { required: true, message: '请选择调价原因', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写调价说明', trigger: 'blur' }
        ]
      },

      // 基础页变量
      dialogVisible: false,
      rowCount: {},
      checkAll: false,
      checkedPriceType: [],
      checkedPriceTypeList: [],
      isIndeterminate: true,
      isDisable: false,
      priceDto: {
        priceDate: [new Date(), new Date()],
        channelCodeList: []
      },
      priceList: [],
      priceTypeList: [],
      loadingTable: false,
      choiceDate: '',
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.choiceDate = minDate.getTime()
          if (maxDate) {
            this.choiceDate = ''
          }
        },
        disabledDate: (time) => {
          if (this.choiceDate) {
            const one = 30 * 24 * 3600 * 1000
            const minTime = this.choiceDate - one
            const maxTime = this.choiceDate + one
            return time.getTime() < minTime || time.getTime() > maxTime
          }
        }
      },
      addPickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.addDateSelected = !maxDate
        },
        disabledDate: (time) => {
          return time.getTime() < this.addMinDate - 8.64e7 || (!this.addDateSelected && this.addMaxDate && time.getTime() > this.addMaxDate)
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getCurrentHouseType',
      'getPriceTypeList',
      'getAdjustTypeList'
    ]),
    onlyNumber (row, val) {
      let license_num = row[val]
      license_num = license_num.replace(/\D/g, '')
      row[val] = license_num
    },
    createPrice () {
      let check = true
      this.priceDetail.forEach(v => {
        this.priceSaveDto.addHouseTypeList.forEach(x => {
          let priceDetail = {}
          priceDetail.channelCode = v.code
          priceDetail.houseTypeFid = x.bid
          if (v[x + '-1'] && v[x + '-1'].length > 0) {
            priceDetail.normalPrice = v[x + '-1'] * 100
            priceDetail.houseTypeFid = x
          } else { check = false }
          if (this.priceSaveDto.specialWeekList.length > 0) {
            if (v[x + '-2'] && v[x + '-2'].length > 0) { priceDetail.specialWeekPrice = v[x + '-2'] * 100 } else { check = false }
          }
          this.priceSaveDto.priceChangeDetailDtoList.push(priceDetail)
        })
      })
      if (check) {
        savePrice(this.priceSaveDto).then(res => {
          this.$Message.success('添加成功')
        }).catch(() => {
          this.priceSaveDto.priceChangeDetailDtoList = []
        })
      } else {
        this.$Message.warning('请输入全部价格')
        this.priceSaveDto.priceChangeDetailDtoList = []
      }
    },
    inputChange () {
      this.unShownTypeCode = this.unShownTypeCode.replace(/([\u4e00-\u9fa5])|(\s)|[^\d\w]/g, '')
    },
    leaveTab (activeName, oldActiveName) {
      return this.toPriceDetail('priceForm')
    },
    toPriceDetail (formName) {
      let result = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.nextStep = false

          this.activeTab = 'priceDetail'
        } else {
          result = false
          return false
        }
      })
      return result
    },
    handleUnshownTypeCodeChange (value) {
      if (this.unShownTypeCode.length === 0) { return }
      getHidePriceType(this.unShownTypeCode).then(res => {
        let code = res.body.code
        let exist = false
        this.priceTypeList.forEach(v => {
          if (v.code === code) {
            exist = true
            if (v.isBindCounterPrice === 1) {
              this.$Message.warning('该隐藏码对应的房价类型已绑定门市价，修改门市价即可')
            } else if (v.show === 1) {
              this.$Message.warning('该隐藏码已显示')
            } else {
              v.show = 1
              v.isHideHousePrice = 0
              this.priceSaveDto.addCheckedPriceTypeList.push(v.code)
              let channelCodesTemp = this.priceSaveDto.channelCodes.split(',')
              channelCodesTemp.push(v.code)
              this.handlePriceTypeChange(channelCodesTemp)
              this.$Message.success(`房价码 ${v.name} 添加成功`)
            }
          }
          if (!exist) {
            res.data.body.show = 1
            this.priceTypeList.push(res.data.body)
            this.priceSaveDto.addCheckedPriceTypeList.push(res.data.body.code)
            message('房价码：' + v.name + '添加成功，请选择', 'success')
            this.$Message.success(`房价码 ${v.name} 添加成功，请选择`)
          }
        })
      })
    },
    handlePriceTypeChange (value) {
      this.priceTypeList.forEach(v => {
        if (this.arrayContain(this.priceSaveDto.addCheckedPriceTypeList, v.code)) {
          let row = {}
          let exist = false
          row.code = v.code
          row.name = v.name
          this.priceDetail.forEach((item) => {
            if (item.code === v.code) {
              exist = true
            }
          })
          if (!exist) {
            this.priceDetail.push(row)
          }
        } else {
          this.priceDetail.forEach((item, index, object) => {
            if (item.code === v.code) {
              object.splice(index, 1)
            }
          })
        }
      })
      this.priceSaveDto.channelCodes = value.join(',')
      this.priceSaveDto.priceDate = []
      if (this.priceSaveDto.addCheckedPriceTypeList.length && this.priceSaveDto.addHouseTypeList.length) {
        this.getPriceMinDate()
        this.priceDateDisabled = false
      } else {
        this.priceDateDisabled = true
      }
    },
    arrayContain (array, obj) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === obj) { return true }
      }
      return false
    },
    handleHouseTypeChange (value) {
      this.priceSaveDto.houseTypeFids = value.join(',')
      this.priceSaveDto.priceDate = []
      if (this.priceSaveDto.addCheckedPriceTypeList.length && this.priceSaveDto.addHouseTypeList.length) {
        this.getPriceMinDate()
        this.priceDateDisabled = false
      } else {
        this.priceDateDisabled = true
      }
    },
    handleSpecialWeekChange (value) {
      this.priceSaveDto.specialWeeks = value.join(',')
    },
    // 查询可调整的最低日期
    getPriceMinDate () {
      getPriceMinDate({ houseTypeFidList: this.priceSaveDto.addHouseTypeList, channelCodeList: this.priceSaveDto.addCheckedPriceTypeList }).then(res => {
        if (res.body + 24 * 3600 * 1000 >= new Date()) {
          this.addMaxDate = res.body + 24 * 3600 * 1000
        } else {
          this.addMaxDate = new Date()
        }
      })
    },
    // 选区日期段
    onDataPickerChange (val) {
      if (val !== null) {
        this.priceSaveDto.startDate = val[0]
        this.priceSaveDto.endDate = val[1]
      } else {
        this.priceSaveDto.startDate = null
        this.priceSaveDto.endDate = null
      }
    },
    // 房价调整
    openChangePriceDialog () {
      this.dialogVisible = true
    },
    handleCheckAllChange (val) {
      if (val) {
        this.priceTypeList.forEach(v => {
          this.checkedPriceType.push(v.code)
        })
      } else {
        this.checkedPriceType = []
      }
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.priceTypeList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.priceTypeList.length
    },
    // 查询价格列表
    getPriceList () {
      this.loadingTable = true
      listPrice(this.priceDto).then(res => {
        this.priceList = res.body
        this.loadingTable = false
      }).catch(() => {
        this.loadingTable = false
      })
    }
  },
  watch: {
    '$store.state.price.priceTypeList': {
      handler (val) {
        val.forEach(item => {
          if (item.isHideHousePrice === 0) {
            this.priceDto.channelCodeList.push(item.code)
          }
        })
      }
    }
  },
  created () {
    this.getPriceTypeList().then(res => {
      res.body.forEach(item => {
        if (item.isHideHousePrice === 0) {
          this.priceDto.channelCodeList.push(item.code)
        }
        this.getPriceList()
      })
    })
    this.getAdjustTypeList()
    this.getCurrentHouseType()
    this.getPriceList()
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
  .my-date-picker {
    width: 300px;
  }
  .no-data {
    height: 100px;
    text-align: center;
    padding-top: 40px;
    color: #909399;
  }

  .full-top {
    position: relative;
    min-height: 300px;
    height: 100%;
  }

  .full-spin {
    height: 100%;
  }

  .my-card {
    margin-bottom: 20px;
    -webkit-box-shadow: #dcdee2 0 1px 6px;
    -moz-box-shadow: #dcdee2 0 1px 6px;
    box-shadow: #dcdee2 0 1px 6px;
  }
</style>
