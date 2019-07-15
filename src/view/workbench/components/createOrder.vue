<template>
  <div>
    <Form ref="orderForm" :model="paramDto" :rules="rules" :label-width="80">
      <Row>
        <Col span="8">
          <FormItem label="姓名" prop="orderName">
            <Input v-model.trim="paramDto.orderName" placeholder="预定人姓名" clearable></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="手机" prop="phone">
            <Input v-model.trim="paramDto.phone" placeholder="预定人手机号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="邮箱" prop="mail">
            <Input v-model.trim="paramDto.mail" placeholder="预定人邮箱" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="渠道" prop="channel">
            <Select v-model="paramDto.channel" placeholder="请选择订单来源" clearable>
              <Option v-for="(value, key) in $store.state.workbench.orderEnums" :key="value" v-if="key > 2 && key < 100"
                      :label="value" :value="key"></Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="订单号" prop="otaOrderNumber">
            <Input v-model.trim="paramDto.otaOrderNumber" placeholder="OTA订单号" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="16">
          <FormItem label="入住时段" prop="dateRange">
            <DatePicker v-model="paramDto.dateRange" type="daterange" split-panels placeholder="" class="my-date-picker"
                        :clearable="false" :editable="false" @on-change="handleDateChange"></DatePicker>
          </FormItem>
        </Col>
        <Col :span="2">
          <Button type="text" class="del-btn" @click="openBedSelector">选择床位</Button>
        </Col>
      </Row>
      <FormItem label="已选床位" prop="stayPersonInfo">
        <Tag class="my-tag"
             :key="index"
             v-for="(stayBed, index) in paramDto.stayPersonInfo"
             closable
             type="dot"
             color="primary"
             :disable-transitions="true"
             @on-close="handleClose(index)">
          {{ stayBed.houseTypeName }}-{{ stayBed.areaName }}-{{ stayBed.areaBedCode }}
        </Tag>
      </FormItem>
      <Row>
        <Col span="8">
          <FormItem label="价格类型" prop="channelCode">
            <Select v-model="paramDto.channelCode" placeholder="请选择价格类型"
                    :disabled="!paramDto.dateRange[0] || !paramDto.stayPersonInfo.length">
              <Option v-for="item in priceTypeList" v-if="item.isHideHousePrice === 0" :key="item.code"
                      :label="item.name" :value="item.code"></Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="隐藏房价码">
            <Input v-model.trim="hidePriceTypeCode" placeholder="输入隐藏房价码, 回车查询" clearable
                   :disabled="!paramDto.dateRange[0] || !paramDto.stayPersonInfo.length"
                   @on-enter="handleHidePriceTypeCodeChange"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="金额" prop="amount">
            <Input v-model.trim="paramDto.amount" placeholder="OTA下单金额" disabled>
              <template slot="prepend">¥</template>
            </Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Modal
      v-model="visible"
      title="选择床位"
      width="1000"
      @on-ok="addStayBed">
      <bed-selector ref="bedSelectorRef" v-if="visible" :start-date="paramDto.startDate" :end-date="paramDto.endDate"
                    :selected="paramDto.stayPersonInfo" @submit="handleAddStayBed"></bed-selector>
    </Modal>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
import bedSelector from './bedSelector'
import { mapActions } from 'vuex'
import { getHidePriceType } from '@/api/price'
import { getOrderPriceByType } from '@/api/order'
export default {
  name: 'createOrder',
  components: {
    bedSelector
  },
  data () {
    return {
      paramDto: {
        projectBid: this.$store.state.user.currentProject.bid,
        cityCode: '',
        uuid: '',
        firstChannel: 2,
        channel: '',
        otaOrderNumber: '',
        orderName: '',
        phone: '',
        mail: '',
        channelCode: '',
        amount: '',
        dateRange: [],
        startDate: '',
        endDate: '',
        stayPersonInfo: []
      },
      rules: {
        orderName: [
          { required: true, message: '请输入预定人姓名', trigger: 'blur' },
          { max: 10, message: '不能超过10个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入预定人手机号', trigger: 'blur' }
        ],
        mail: [
          { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式有误', trigger: 'blur' }
        ],
        channel: [
          { required: true, message: '请输入下单渠道', trigger: 'change' }
        ],
        otaOrderNumber: [
          { required: true, message: '请输入OTA订单号', trigger: 'blur' },
          { max: 10, message: '不能超过20个字符', trigger: 'blur' }
        ],
        channelCode: [
          { required: true, message: '请输入价格类型', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请输入OTA下单金额', trigger: 'blur' },
          { pattern: /^\d{1,4}(\.\d{0,2})?$/, message: '请输入1万以内的两位小数或整数', trigger: 'blur' }
        ],
        dateRange: [
          { required: true,
            type: 'array',
            fields: {
              0: { type: 'date', required: true, message: '请选择入住时段' },
              1: { type: 'date', required: true, message: '请选择入住时段' }
            },
            trigger: 'change' }
        ],
        stayPersonInfo: [
          { required: true, type: 'array', message: '请选择入住床位', trigger: 'blur' }
        ]
      },
      priceTypeList: [],
      hidePriceTypeCode: '',
      visible: false
    }
  },
  methods: {
    ...mapActions([
      'getPriceTypeList'
    ]),
    handleHidePriceTypeCodeChange () {
      this.hidePriceTypeCode = this.hidePriceTypeCode.replace(/([\u4e00-\u9fa5])|(\s)|[^\d\w]/g, '')
      if (!this.hidePriceTypeCode.length) { return }
      getHidePriceType({ typeCode: this.hidePriceTypeCode }).then(res => {
        let hide = res.body
        let exist = false
        this.priceTypeList.forEach(item => {
          if (item.code === hide.code) {
            item.isHideHousePrice = 0
            this.paramDto.channelCode = item.code
            exist = true
          }
        })
        if (!exist) {
          this.priceTypeList.push(hide)
          this.paramDto.channelCode = item.code
        }
      })
    },
    getOrderPriceByType () {
      let dto = {
        projectFid: this.$store.state.user.currentProject.bid,
        channelCode: this.paramDto.channelCode,
        startDate: this.paramDto.startDate,
        endDate: this.paramDto.endDate,
        houseTypeBids: ''
      }
      dto.houseTypeBids = Array.from(new Set(this.paramDto.stayPersonInfo.map(item => { return item.houseTypeBid }))).join(',')
      getOrderPriceByType(dto).then(res => {
        this.paramDto.amount = res.body.toString()
      })
    },
    validateForm () {
      this.$refs.orderForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.paramDto)
        } else {
          this.$emit('error')
        }
      })
    },
    openBedSelector () {
      if (!this.paramDto.startDate || !this.paramDto.endDate) {
        this.$Message.warning('请先选择入住时段')
      } else {
        this.visible = true
      }
    },
    addStayBed () {
      this.$refs.bedSelectorRef.submit()
    },
    handleAddStayBed (dto) {
      this.paramDto.stayPersonInfo = dto
    },
    handleClose (index) {
      this.paramDto.stayPersonInfo.splice(index, 1)
    },
    handleDateChange (date) {
      if (date[0] === date[1]) {
        this.$Message.warning('不能选择同一天')
        this.paramDto.dateRange = []
      }
      this.paramDto.stockList = []
    }
  },
  watch: {
    'paramDto.dateRange' (val) {
      this.paramDto.startDate = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.endDate = val[1] ? getDate(val[1], 'date') : ''
    },
    'paramDto.channelCode' () {
      this.getOrderPriceByType()
    }
  },
  created () {
    this.getPriceTypeList().then(res => {
      this.priceTypeList = res.body
    })
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }
  .my-tag {
    margin: 0 20px 20px 0;
  }

  .del-btn {
    color: #2db7f5;
  }
</style>
