<template>
  <div class="con">
    <div class="subscript">
      {{ refundInfo.refundStatus | refundStatusFilter }}
    </div>
    <Row>
      <strong class="order order-number">订单号：{{ refundInfo.orderNumber }}</strong>
    </Row>
    <refund-card v-for="(refund, index) in refundList" :key="index" :index="index + 1" :refundStatus="refundInfo.refundStatus"
                 :refund="refund" class="card-cls"></refund-card>
    <refund-verify-card class="card-cls"></refund-verify-card>
  </div>
</template>
<script>
import refundCard from './components/refundCard'
import refundVerifyCard from './components/refundVerifyCard'

export default {
  name: 'refundDetail',
  components: {
    refundCard,
    refundVerifyCard
  },
  data () {
    return {
      orderBid: this.$route.query.orderBid,
      refundInfo: {
        bid: '',
        orderNumber: 'BJ201905170001',
        refundStatus: 3,
        createTime: '2019-05-17 10:34:12'
      },
      refundList: [
        {
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
          'detailOperationVos': [{
            'id': null,
            'bid': 'f27ce2d7d3f643409638e1b3ecd34d15',
            'orderBid': null,
            'refundBid': null,
            'refundDetailBid': 'd4c942cdf9ac45038b457712ed9ede07',
            'feeType': 2,
            'feeAmount': 99.0,
            'oldFeeAmount': 99.0,
            'oldValue': null,
            'isTaken': 1,
            'takenDate': '2018-03-10',
            'isDel': null,
            'isValid': null,
            'createUserId': null,
            'createTime': null,
            'lastModifyUserId': null,
            'lastModifyTime': null
          }],
          'personVoList': [{
            'bid': 'cba6dd9353a247409a78b52597a773f5',
            'name': '洋洋',
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
          }]
        }, {
          'id': null,
          'bid': '2d3c24d0586d41cb9f36f1159ce17fb2',
          'parentBid': 'd90e278b52564d8d84d72b315f48e503',
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
          'createTime': 1520600240000,
          'lastModifyUserId': null,
          'lastModifyTime': null,
          'detailOperationVos': [{
            'id': null,
            'bid': '7d7b9e824a5e46a49181bc5953e1e8bb',
            'orderBid': null,
            'refundBid': null,
            'refundDetailBid': '2d3c24d0586d41cb9f36f1159ce17fb2',
            'feeType': 2,
            'feeAmount': 99.0,
            'oldFeeAmount': 99.0,
            'oldValue': null,
            'isTaken': 1,
            'takenDate': '2018-03-10',
            'isDel': null,
            'isValid': null,
            'createUserId': null,
            'createTime': null,
            'lastModifyUserId': null,
            'lastModifyTime': null
          }],
          'personVoList': [{
            'bid': '7ae8ff50681c499594fbbafba773d5d3',
            'name': '容乐',
            'phone': null,
            'houseTypeBid': null,
            'houseTypeShowName': '4人间（男生）',
            'areaBedBid': 'da2898c764cf48039ace4506b0243ff0',
            'orderBid': null,
            'houseTypeName': null,
            'areaBid': null,
            'status': 8,
            'bedCode': 'FJ10104903',
            'startDate': null,
            'endDate': null,
            'refundDetailBid': '2d3c24d0586d41cb9f36f1159ce17fb2'
          }]
        }, {
          'id': null,
          'bid': '7a16f50ec9dc41ff97c3499f62db3d5e',
          'parentBid': '665ec0f7b5bd432892e36a7c832eb3c9',
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
          'createTime': 1520600272000,
          'lastModifyUserId': null,
          'lastModifyTime': null,
          'detailOperationVos': [{
            'id': null,
            'bid': 'b9c28cb4e0bf40548e83f5834ab7fc8f',
            'orderBid': null,
            'refundBid': null,
            'refundDetailBid': '7a16f50ec9dc41ff97c3499f62db3d5e',
            'feeType': 2,
            'feeAmount': 99.0,
            'oldFeeAmount': 99.0,
            'oldValue': null,
            'isTaken': 1,
            'takenDate': '2018-03-10',
            'isDel': null,
            'isValid': null,
            'createUserId': null,
            'createTime': null,
            'lastModifyUserId': null,
            'lastModifyTime': null
          }],
          'personVoList': [{
            'bid': 'bb59207254054662acdbfb12c841054c',
            'name': '容齐',
            'phone': null,
            'houseTypeBid': null,
            'houseTypeShowName': '4人间（男生）',
            'areaBedBid': '00fc618920e243c29e59560e8228e4f0',
            'orderBid': null,
            'houseTypeName': null,
            'areaBid': null,
            'status': 8,
            'bedCode': 'FJ10104902',
            'startDate': null,
            'endDate': null,
            'refundDetailBid': '7a16f50ec9dc41ff97c3499f62db3d5e'
          }]
        }
      ]
    }
  },
  methods: {},
  filters: {
    refundStatusFilter (val) {
      switch (val) {
        case 0:
          return '待核实'
        case 1:
          return '待打款'
        case 2:
          return '打款成功'
        case 3:
          return '打款异常'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .order {
    margin: 0 15px;
    font-size: 20px;
    &-number {
      margin-left: 50px;
    }
    &-switch {
      margin-top: -5px;
    }
  }

  .card-cls {
    margin-top: 20px;
    -webkit-box-shadow: #dcdee2 0 0 10px;
    -moz-box-shadow: #dcdee2 0 0 10px;
    box-shadow: #dcdee2 0 0 10px;
  }

  .con {
    position: relative;
  }

  .subscript {
    color: #fff;
    height: 40px;
    width: 200px;
    position: absolute;
    left: -90px;
    top: -10px;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    background-color: #2d8cf0;
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
</style>
