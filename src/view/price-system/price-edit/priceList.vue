<template>
  <div>
    <Form :model="priceDto" :label-width="50" inline @keydown.enter.native="getPriceList">
      <FormItem label="营业日">
        <DatePicker v-model="priceDto.priceDate" type="daterange" split-panels placeholder=""
                    class="my-date-picker" @on-change="handleDateRange" :clearable="false" :editable="false"></DatePicker>
      </FormItem>
      <Button type="primary" icon="ios-search" @click="getPriceList" class="my-btn"> 查 询</Button>
      <Button type="primary" @click="openChangePriceDialog" class="my-btn">房价调整</Button>
      <Row>
        <FormItem label="筛选">
          <CheckboxGroup v-model="checkedPriceType">
            <Checkbox v-for="item in $store.state.price.priceTypeList" :key="item.code" v-if="item.isHideHousePrice === 0" :label="item.code">{{item.name}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Row>
    </Form>
    <div class="full-top">
      <Spin size="large" fix v-if="loadingTable" class="full-spin"></Spin>
      <price-card v-for="(value, key, index) in priceList" :key="index" :date="key" :price-list="value" :checked-price-type="checkedPriceType"
                  class="my-card"></price-card>
      <Card v-if="!Object.keys(priceList).length" class="my-card">
        <div class="no-data">
          <span>没有找到匹配的记录</span>
        </div>
      </Card>
    </div>
    <Modal
      v-model="modalVisible"
      title="房价调整"
      :width="1300"
      footer-hide>
      <price-edit v-if="modalVisible" @success="modalVisible = false"></price-edit>
    </Modal>
  </div>
</template>
<script>
import { listPrice } from '@/api/price'
import priceCard from './priceCard'
import { mapActions } from 'vuex'
import priceEdit from './priceEdit'
import { daysBetweenDateStr } from '@/libs/tools'
export default {
  name: 'priceList',
  components: {
    priceCard,
    priceEdit
  },
  data () {
    return {
      priceDto: {
        priceDate: [new Date(), new Date()],
        channelCodeList: []
      },
      checkedPriceType: [],
      priceList: [],
      modalVisible: false,
      loadingTable: false
    }
  },
  methods: {
    ...mapActions([
      'getCurrentHouseType',
      'getPriceTypeList',
      'getAdjustTypeList'
    ]),
    handleDateRange (date) {
      if (daysBetweenDateStr(date[0], date[1]) > 30) {
        this.$Message.warning('最多查询30天的价格')
        this.priceDto.priceDate = [new Date(), new Date()]
      }
    },
    // 房价调整
    openChangePriceDialog () {
      this.modalVisible = true
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
  created () {
    this.getPriceTypeList().then(res => {
      res.body.forEach(item => {
        if (item.isHideHousePrice === 0) {
          this.priceDto.channelCodeList.push(item.code)
          if (this.checkedPriceType.length < 3) {
            this.checkedPriceType.push(item.code)
          }
        }
      })
      this.getPriceList()
    })
    this.getAdjustTypeList()
    this.getCurrentHouseType()
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

  .my-btn {
    margin-left: 20px;
  }
</style>
