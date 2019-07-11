<template>
  <div>
    <el-form :model="priceDto" label-width="100px" name="form" action="">
      <el-row :gutter="20" class="form-class">
        <el-col :span="11" class="form-class">
          <el-form-item label="营业日">
            <el-date-picker
              v-model="priceDto.priceDate"
              type="daterange"
              align="right"
              clearable
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
              >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="3" class="form-class">
          <el-form-item>
            <el-button type="warning" icon="el-icon-search" @click="priceDto.pageNum=1;getPriceList()"> 查 询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="3" class="form-class">
          <el-form-item></el-form-item>
        </el-col>
        <el-col :span="3" class="form-class">
          <el-button type="success" @click="openChangePriceDialog"> 房价调整</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'priceList',
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
    onlyNumber (row, val) {
      var license_num = row[val]
      license_num = license_num.replace(/\D/g, '')
      row[val] = license_num
    },
    createPrice () {
      let vm = this
      let check = true
      vm.priceDetail.forEach(v => {
        vm.priceSaveDto.addHouseTypeList.forEach(x => {
          let priceDetail = {}
          priceDetail.channelCode = v.code
          priceDetail.houseTypeFid = x.bid
          if (v[x + '-1'] && v[x + '-1'].length > 0) {
            priceDetail.normalPrice = v[x + '-1'] * 100
            priceDetail.houseTypeFid = x
          } else { check = false }
          if (vm.priceSaveDto.specialWeekList.length > 0) {
            if (v[x + '-2'] && v[x + '-2'].length > 0) { priceDetail.specialWeekPrice = v[x + '-2'] * 100 } else { check = false }
          }
          vm.priceSaveDto.priceChangeDetailDtoList.push(priceDetail)
        })
      })
      if (check) {
        instance.post('/price/savePrice.action', JSON.stringify(vm.priceSaveDto))
          .then(function (res) {
            if (res.data.code === 200) {
              message('添加成功', 'success')
              setTimeout(function () { window.location.reload() }, 1000)
            } else {
              vm.priceSaveDto.priceChangeDetailDtoList = []
              message('生成失败', 'error')
            }
          })
          .catch(function (err) {
            vm.priceSaveDto.priceChangeDetailDtoList = []
            catchError(err)
          })
      } else {
        message('请输入全部价格', 'warning')
        vm.priceSaveDto.priceChangeDetailDtoList = []
      }
    },
    inputChange () {
      this.unShownTypeCode = this.unShownTypeCode.replace(/([\u4e00-\u9fa5])|(\s)|[^\d\w]/g, '')
    },
    leaveTab (activeName, oldActiveName) {
      return this.toPriceDetail('priceForm')
    },
    toPriceDetail (formName) {
      let vm = this
      let result = true
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.nextStep = false

          vm.activeTab = 'priceDetail'
        } else {
          result = false
          return false
        }
      })
      return result
    },
    handleUnshownTypeCodeChange (value) {
      let vm = this
      if (vm.unShownTypeCode.length === 0) { return }
      instance.post('/price/getHidePriceType.action', { typeCode: vm.unShownTypeCode })
        .then(function (res) {
          if (!res.data.body) {
            message('该隐藏码不存在', 'warning')
            return
          }
          let code = res.data.body.code
          let exist = false
          vm.priceTypeList.forEach(v => {
            if (v.code === code) {
              exist = true
              if (v.isBindCounterPrice === 1) { message('该隐藏码对应的房价类型已绑定门市价，修改门市价即可', 'warning') } else if (v.show === 1) {
                message('该隐藏码已显示', 'warning')
              } else {
                v.show = 1
                v.isHideHousePrice = 0
                vm.priceSaveDto.addCheckedPriceTypeList.push(v.code)
                let channelCodesTemp = vm.priceSaveDto.channelCodes.split(',')
                channelCodesTemp.push(v.code)
                vm.handlePriceTypeChange(channelCodesTemp)
                message('房价码：' + v.name + '添加成功', 'success')
              }
            }
          })
          if (!exist) {
            res.data.body.show = 1
            vm.priceTypeList.push(res.data.body)
            vm.priceSaveDto.addCheckedPriceTypeList.push(res.data.body.code)
            message('房价码：' + v.name + '添加成功，请选择', 'success')
          }
        })
        .catch(function (err) {
          catchError(err)
        })
    },
    handlePriceTypeChange (value) {
      let vm = this
      vm.priceTypeList.forEach(v => {
        if (vm.arrayContain(vm.priceSaveDto.addCheckedPriceTypeList, v.code)) {
          let row = {}
          let exist = false
          row.code = v.code
          row.name = v.name
          vm.priceDetail.forEach((item, index, object) => {
            if (item.code === v.code) {
              exist = true
            }
          })
          if (!exist) {
            vm.priceDetail.push(row)
          }
        } else {
          vm.priceDetail.forEach((item, index, object) => {
            if (item.code === v.code) {
              object.splice(index, 1)
            }
          })
        }
      })
      vm.priceSaveDto.channelCodes = value.join(',')

      vm.priceSaveDto.priceDate = []
      if (vm.priceSaveDto.addCheckedPriceTypeList.length > 0 && vm.priceSaveDto.addHouseTypeList.length > 0) {
        vm.getPriceMinDate()
        vm.priceDateDisabled = false
      } else {
        vm.priceDateDisabled = true
      }
    },
    handleHouseTypeChange (value) {
      var vm = this
      this.priceSaveDto.houseTypeFids = value.join(',')

      vm.priceSaveDto.priceDate = []
      if (vm.priceSaveDto.addCheckedPriceTypeList.length > 0 && vm.priceSaveDto.addHouseTypeList.length > 0) {
        vm.getPriceMinDate()
        vm.priceDateDisabled = false
      } else {
        vm.priceDateDisabled = true
      }
    },
    handleSpecialWeekChange (value) {
      this.priceSaveDto.specialWeeks = value.join(',')
    },
    // 查询可调整的最低日期
    getPriceMinDate () {
      var vm = this
      instance.post('/price/getPriceMinDate.action', { houseTypeFidList: vm.priceSaveDto.addHouseTypeList, channelCodeList: vm.priceSaveDto.addCheckedPriceTypeList })
        .then(function (res) {
          if (res.data.body + 24 * 3600 * 1000 >= new Date()) { vm.addMaxDate = res.data.body + 24 * 3600 * 1000 } else { vm.addMaxDate = new Date() }
        })
        .catch(function (err) {
          catchError(err)
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
    openChangePriceDialog (row, event) {
      this.dialogVisible = true
    },
    // 合并行
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      var vm = this
      if (columnIndex === 0) {
        return {
          rowspan: vm.rowCount[rowIndex] > 0 ? vm.rowCount[rowIndex] : 0,
          colspan: vm.rowCount[rowIndex] > 0 ? 1 : 0
        }
      }
    },
    // 动态选择列
    checkPrice (val) {
      var result = false
      this.checkedPriceType.forEach(v => {
        if (v === val) { result = true }
      })
      return result
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
    // 查询调价原因枚举
    getAdjustTypeList () {
      var vm = this
      instance.post('/price/listAdjustType.action', {})
        .then(function (res) {
          vm.adjustType = res.data.body
        })
        .catch(function (err) {
          catchError(err)
        })
    },
    // 查询房型
    getCurrentHouseTypeList () {
      var vm = this
      instance.post('/houseType/getCurrentHouseTypeList.action', {})
        .then(function (res) {
          vm.houseTypeList = res.data.body
        })
        .catch(function (err) {
          catchError(err)
        })
    },
    // 查询项目价格类型
    getPriceTypeList () {
      var vm = this
      instance.post('/price/listProjectPriceType.action', {})
        .then(function (res) {
          vm.priceTypeList = res.data.body
          let count = 0
          vm.priceTypeList.forEach((v, index) => {
            if (v.isHideHousePrice === 0) {
              vm.priceDto.channelCodeList.push(v.code)
              if (count++ < 3) { vm.checkedPriceType.push(v.code) }
            }
          })
          vm.getPriceList()
        })
        .catch(function (err) {
          catchError(err)
        })
    },
    // 查询价格列表
    getPriceList () {
      var vm = this
      vm.loadingTable = true
      instance.post('/price/listPrice.action', JSON.stringify(vm.priceDto))
        .then(function (res) {
          let rows = res.data.body
          // 合并行计算
          for (let i = 0, count = 1; i < rows.length; i++) {
            if (rows[i + 1] && rows[i].priceDate === rows[i + 1].priceDate) {
              vm.rowCount[i] = 0
              count++
            } else {
              vm.rowCount[i] = count > 1 ? 0 : 1
              if (count > 1) {
                vm.rowCount[i - count + 1] = count
              }
              count = 1
            }
          }
          vm.priceList = rows
          vm.loadingTable = false
        })
        .catch(function (err) {
          catchError(err)
          vm.loadingTable = false
        })
    },
    tableRowClassName ({ row, rowIndex }) {
      var vm = this
      let rows = vm.priceList
      if (rowIndex === 0) {
        row.className = 'warning-row'
        return row.className
      }
      if (rows[rowIndex].priceDate === rows[rowIndex - 1].priceDate) {
        row.className = rows[rowIndex - 1].className
        return row.className
      } else {
        row.className = rows[rowIndex - 1].className === 'warning-row' ? 'success-row' : 'warning-row'
        return row.className
      }
    },
    arrayContain (array, obj) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === obj) { return true }
      }
      return false
    }

  },
  created () {
    this.getPriceTypeList()
    this.getAdjustTypeList()
    this.getCurrentHouseTypeList()
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      let result = value
      let l = 0
      for (var i = 0; i < value.length; i++) {
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
</style>
