<template>
  <Card dis-hover>
    <p slot="title">
      退款金额操作
    </p>
    <div slot="extra">
      <span>编辑退订方式：
        <i-switch size="large" v-model="refund.cancelExitWay" :true-value="1" :false-value="0"
                  @on-change="handleSwitchChange">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </span>
      <span :style="{ marginLeft: '20px' }">申请时间：{{ refund.createTime }}</span>
    </div>
    <Row v-for="(person, index) in refund.personVoList" :key="index" class="person">
      <Col :span="6">
        <span>姓名：{{ person.name }}</span>
      </Col>
      <Col :span="6">
        <span>房型：{{ person.houseTypeShowName }}</span>
      </Col>
      <Col :span="6">
        <span>床位号：{{ person.bedCode }}</span>
      </Col>
      <Col :span="6">
        <span>床位状态：{{ person.status }}</span>
      </Col>
    </Row>
    <Table :columns="columns" :data="refund.detailOperationVos"></Table>
  </Card>
</template>
<script>
export default {
  name: 'refundCard',
  data () {
    return {
      refund: {
        'id': null,
        'bid': 'd4c942cdf9ac45038b457712ed9ede07',
        'parentBid': 'af9a473a3dc641bb989169fb1138782c',
        'refundBid': '6880e83903af486792a151e54b54c68f',
        'payAmount': null,
        'favourAmount': null,
        'penaltyAmount': null,
        'rentedAmount': null,
        'refundAmount': null,
        'totalRentedAmount': null,
        'cancelExitWay': 1,
        'isDel': null,
        'isValid': null,
        'createUserId': null,
        'createTime': 1520599781000,
        'lastModifyUserId': null,
        'lastModifyTime': null,
        'detailOperationVos': [
          {
            'id': null,
            'bid': 'f27ce2d7d3f643409638e1b3ecd34d15',
            'orderBid': null,
            'refundBid': null,
            'refundDetailBid': 'd4c942cdf9ac45038b457712ed9ede07',
            'feeType': 2,
            'feeAmount': 99,
            'oldFeeAmount': 99,
            'oldValue': null,
            'isTaken': 1,
            'takenDate': '2018-03-10',
            'isDel': null,
            'isValid': null,
            'createUserId': null,
            'createTime': null,
            'lastModifyUserId': null,
            'lastModifyTime': null
          }
        ],
        'personVoList': [
          {
            'bid': 'cba6dd9353a247409a78b52597a773f5',
            'name': '杨洋',
            'phone': null,
            'houseTypeBid': null,
            'houseTypeShowName': '4人间（男生）',
            'areaBedBid': '9995f0d4db0947a2b3d77c0d0ae0e190',
            'orderBid': null,
            'houseTypeName': null,
            'areaBid': null,
            'status': 8,
            'bedCode': 'FJ10104904',
            'startDate': null,
            'endDate': null,
            'refundDetailBid': 'd4c942cdf9ac45038b457712ed9ede07'
          }
        ]
      },
      columns: [
        {
          title: '日期',
          key: 'customer'
        },
        {
          title: '费用项',
          key: 'customer'
        },
        {
          title: '是否收取',
          key: 'customer'
        },
        {
          title: '金额',
          key: 'customer'
        }
      ]
    }
  },
  methods: {
    handleSwitchChange (val) {
      console.info('switch ', val)
    }
  }
}
</script>
<style lang="less" scoped>
  .person {
    border: 1px #dcdee2 solid;
    border-radius: 4px;
    /*margin-bottom: 20px;*/
    padding: 10px;
  }
</style>
