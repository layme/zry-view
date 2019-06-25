<template>
  <div>
    <Card dis-hover :bordered="false">
      <p slot="title">
        费用项目
      </p>
      <a v-if="!hasDep" slot="extra" @click.prevent="visible = true">
        <Icon type="ios-add-circle-outline"/>
        添加
      </a>
      <Row :gutter="10" v-if="hasDep" class="fee-row" v-for="(item, index) in feeList" :key="index" :class="feeRow(index)">
        <Col :span="8">
          <Tag color="blue">{{ item.depPaymentType | paymentTypeFilter }}</Tag>
        </Col>
        <Col :span="8">
          <strong>¥ {{ item.depositSum }}</strong>
        </Col>
        <Col :span="8">
          <a v-if="item.depositStatus !== 2" :style="{ color: '#2d8cf0' }">退还</a>
          <span v-else>已退还</span>
        </Col>
      </Row>
      <div v-if="!hasDep" class="no-data">暂无数据</div>
    </Card>
    <Modal
      v-model="visible"
      title="添加费用项目"
      @on-ok="saveFee">
      <Form ref="feeForm" :model="feeDto" :rules="feeRules" :label-width="50" v-if="visible">
        <FormItem label="项目" prop="type">
          <Select v-model="feeDto.type" placeholder="">
            <Option v-for="x in typeOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="金额" prop="money">
          <Input type="text" v-model.trim="feeDto.money" palceholder="请输入金额"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'feeCard',
  props: {
    order: Object
  },
  data () {
    return {
      feeList: [
        {
          orderBid: '',
          depPaymentType: '',
          depositSum: '',
          depositStatus: ''
        }
      ],
      feeDto: {
        depPaymentType: 1,
        depositSum: ''
      },
      feeRules: {
        type: [{ required: true, message: '请选择费用项目', trigger: 'change' }],
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { type: 'number', min: 0, max: 200, message: '金额介于 0～200', trigger: 'blur' }
        ]
      },
      typeOptions: [
        {
          label: '押金',
          value: 1
        }
      ],
      visible: false
    }
  },
  computed: {
    hasDep () {
      return this.feeList.length > 0
    }
  },
  methods: {
    initData () {
      if (this.order.depPaymentType) {
        this.feeList[0].orderBid = this.order.orderBid
        this.feeList[0].depPaymentType = this.order.depPaymentType
        this.feeList[0].depositSum = this.order.depositSum
        this.feeList[0].depositStatus = this.order.depositStatus
      }
    },
    saveFee () {
    },
    listFee () {
    },
    feeRow (index) {
      if (index > 0) {
        return 'fee-row-not-first'
      }
    }
  },
  watch: {
    order () {
      this.initData()
    }
  },
  created () {
    this.initData()
  },
  filters: {
    paymentTypeFilter (val) {
      switch (val) {
        case 1:
          return '押金'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .fee-row {
    border: 1px #dcdee2 solid;
    border-radius: 4px;
    padding: 20px 20px 15px 20px;
    margin: 0 -16px !important;
    &-not-first {
      margin-top: 15px;
    }
  }
  .no-data {
    height: 40px;
    text-align: center;
    padding-top: 10px;
    color: #909399;
  }
</style>
