<template>
    <!--    <Form :label-width="50" inline>-->
    <!--      <FormItem label="分时促销开关">-->
<!--          <span>分时促销开关</span>-->
<!--            <i-switch  v-model="isOpenTime">-->
<!--              <span slot="open" >开</span>-->
<!--              <span slot="close" >关</span>-->
<!--            </i-switch>-->
<!--    &lt;!&ndash;      </FormItem>&ndash;&gt;-->
<!--    &lt;!&ndash;      <Row>&ndash;&gt;-->
<!--            <FormItem label="分时促销时间">-->
<!--              <TimePicker :clearable="false" type="timerange" format="HH:mm:ss" v-model="timeData" :disabled="!isOpenTime"></TimePicker>-->
<!--            </FormItem>-->
    <!--      </Row>-->
    <!--    </Form>-->
  <div>
    <div class="mb20">
      <span class="mr20">分时促销开关</span>
      <i-switch v-model="isOpenTime">
        <span slot="open">开</span>
        <span slot="close">关</span>
      </i-switch>
    </div>
    <div class="mb20">
      <span class="mr20">分时促销时间</span>
      <TimePicker :clearable="false" type="timerange" format="HH:mm:ss" v-model="timeData"
                  :disabled="!isOpenTime"></TimePicker>
    </div>

    <div class="mb20">

<!--      <Row class="row">-->
<!--        <Col span="2">房价类型</Col>-->
<!--        <Col span="2" v-for="(item) in data" :key="item.houseTypeFid">{{item.houseName}}</Col>-->
<!--      </Row>-->
<!--      <Row class="row">-->
<!--        <Col span="2">门市价 /元</Col>-->
<!--        <Col span="2" v-for="(item) in data" :key="item.houseTypeFid">-->
<!--          <InputNumber :precision="0.1" v-model="item.copyTimePrice" :disabled="!isOpenTime"></InputNumber>-->
<!--        </Col>-->
<!--      </Row>-->

      <div class="row">
        <div class="item">房价类型</div>
        <div class="item"  v-for="(item) in data" :key="item.houseTypeFid">{{item.houseName}}</div>
      </div>
      <div class="row">
        <div class="item input">
          <span>门市价</span>
        </div>
        <div class="item input"  v-for="(item) in data" :key="item.houseTypeFid">
          <InputNumber
            style="display: block;width: 100%"
            :key="item.houseTypeFid" :min="0"
                       :precision="0.1" v-model="item.copyTimePrice" :disabled="!isOpenTime"></InputNumber>
        </div>
      </div>

    </div>
    <Button class="mr20" type="primary" @click="save" :loading="loading">生成房价</Button>
  </div>
</template>
<script>
import { listTimePrice, saveTimePrice } from '@/api/price'
import { getDate } from '@/libs/tools'

export default {
  name: 'partTimePrice',
  data () {
    return {
      isOpenTime: '',
      timeData: [new Date(), new Date()],
      priceDto: {
        isOpenTime: '',
        startTime: '',
        endTime: '',
        priceTimeSaveDetailDtoList: [],
        houseTypeFids: ''
      },
      data: [],
      loading: false
    }
  },
  methods: {
    init () {
      this.findList()
    },
    findList () {
      listTimePrice().then(res => {
        if (!res.body) {
          return
        }
        this.data = res.body
        if (this.data.length === 0) {
          this.$Message.info('请先在价格列表设置当日门市价')
          return
        }
        this.data.forEach(item => {
          item.copyTimePrice = item.timePrice || item.timePrice === 0 ? item.timePrice / 100 : null
          if (item.startTime && item.endTime) {
            this.timeData.splice(0, 1, getDate(item.startTime, 'time'))
            this.timeData.splice(1, 1, getDate(item.endTime, 'time'))
          }
        })
        this.isOpenTime = this.data[0].isOpenTime === 1
      }).catch(() => {
      })
    },
    save () {
      if (this.data.length === 0) {
        this.$Message.info('请先在价格列表设置当日门市价')
        return
      }
      this.loading = true
      this.data.forEach(item => {
        item.timePrice = item.copyTimePrice ? item.copyTimePrice * 100 : null
      })
      let fids = this.data.map(item => {
        return item.houseTypeFid
      })
      this.priceDto.houseTypeFids = fids.toString()
      this.priceDto.priceTimeSaveDetailDtoList = this.data
      this.priceDto.isOpenTime = this.isOpenTime ? 1 : 0
      this.priceDto.startTime = this.timeData[0]
      this.priceDto.endTime = this.timeData[1]
      saveTimePrice(this.priceDto).then(res => {
        this.$Message.success('生成分时促销价格成功')
        this.loading = false
      }).catch(res => {
        this.loading = false
      }).finally(() => {
        this.loading = false
        this.findList()
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
  .row {
    text-align: center;
    line-height: 32px;
    border: 1px solid rgb(222, 222, 222);
    margin-top: -1px;
    display: flex;

    /*border-left: 1px solid rgb(222, 222, 222);*/
    /*border-right: 1px solid rgb(222, 222, 222);*/
    /*border-bottom: 1px solid rgb(222, 222, 222);*/
    padding: 7px;
    font-weight: bold;
  }
  .item{
    flex: 1;
  }
  .input{
    padding: 0 20px;
  }
  .mb20{
    margin-bottom: 16px;
  }
  .mr20{
    margin-right: 20px;
  }
</style>
