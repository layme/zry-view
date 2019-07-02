<template>
  <div>
    <Form :model="paramDto" :label-width="40">
      <FormItem label="房型">
        <Select v-model="paramDto.houseTypeBid" placeholder="请选择房型" class="my-select"
                @on-change="handleChange">
          <Option v-for="item in $store.state.workbench.houseTypeList" :key="item.bid"
                  :label="item.houseTypeParentName + '-' + item.houseTypeName" :value="item.bid"></Option>
        </Select>
      </FormItem>
    </Form>
    <div class="full-top">
      <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
      <div v-if="!stockData.length" class="no-data">暂无数据</div>
      <Form v-else :label-width="70">
        <CheckboxGroup v-model="selectedAreaBedBid" @on-change="handleCheckbox">
          <FormItem v-for="item in stockData" :key="item.bid" :label="item.showName">
            <Row>
              <Col v-for="i in item.aresBedList" :key="i.bid" :span="24 / item.aresBedList.length"
                   style="text-align: center">
                <Checkbox :label="item.houseTypeBid + ',' + item.bid + ',' + i.bid" :disabled="i.status !== 1" class="my-checkbox">
                  {{ i.bedCode | bedCodeFilter }}
                </Checkbox>
              </Col>
            </Row>
          </FormItem>
        </CheckboxGroup>
      </Form>
    </div>
    <Form :label-width="80">
      <FormItem label="已选床位：">
        <Tag class="my-tag"
             :key="index"
             v-for="(stayBed, index) in selectedBed"
             closable
             type="dot"
             color="primary"
             :disable-transitions="true"
             @on-close="handleClose(index)">
          {{ stayBed.houseTypeName }}-{{ stayBed.areaName }}-{{ stayBed.areaBedCode }}
        </Tag>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { getStock } from '@/api/stock'
export default {
  name: 'bedSelector',
  props: {
    startDate: String,
    endDate: String,
    selected: Array
  },
  data () {
    return {
      paramDto: {
        checkInTime: this.startDate,
        checkOutTime: this.endDate,
        houseTypeBid: ''
      },
      loading: false,
      allStockData: [],
      stockData: [],
      selectedBed: [],
      selectedAreaBedBid: []
    }
  },
  methods: {
    handleChange () {
      this.getStock()
    },
    getStock () {
      this.loading = true
      getStock(this.paramDto).then(res => {
        this.stockData = res.body
        this.allStockData.push(...res.body)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    findHouseTypeName (bid) {
      let house = this.$store.state.workbench.houseTypeList.find(item => item.bid === bid)
      return house.houseTypeParentName + '-' + house.houseTypeName
    },
    handleCheckbox () {
      this.selectedBed = []
      this.selectedAreaBedBid.forEach(item => {
        let a = item.split(',')
        let area = this.allStockData.find(x => x.bid === a[1])
        if (area) {
          let bed = area.aresBedList.find(y => y.bid === a[2])
          if (bed) {
            this.selectedBed.push({
              houseTypeBid: a[0],
              houseTypeName: this.findHouseTypeName(a[0]),
              areaBid: area.bid,
              areaName: area.areaName,
              areaBedBid: bed.bid,
              areaBedCode: bed.bedCode.substring(bed.bedCode.length - 2)
            })
          }
        }
      })
    },
    handleClose (index) {
      let areaBed = this.selectedBed[index]
      this.selectedAreaBedBid.splice(this.selectedAreaBedBid.indexOf(areaBed.houseTypeBid + ',' + areaBed.areaBid + ',' + areaBed.areaBedBid), 1)
      this.selectedBed.splice(index, 1)
    },
    submit () {
      this.$emit('submit', this.selectedBed)
    }
  },
  created () {
    if (this.selected.length) {
      this.selectedBed = this.selected
      this.selected.forEach(item => this.selectedAreaBedBid.push(item.houseTypeBid + ',' + item.areaBid + ',' + item.areaBedBid))
    }
  }
}
</script>
<style lang="less" scoped>
  .my-select {
    width: 200px;
  }
  .full-top {
    position: relative;
    min-height: 300px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding-top: 20px;
    margin-bottom: 20px;
  }

  .full-spin {
    height: 100%;
  }

  .my-checkbox {
    border: 1px #dcdee2 solid;
    border-radius: 4px;
    padding: 0 10px;
  }

  .no-data {
    height: 40px;
    text-align: center;
    padding-top: 10px;
    color: #909399;
  }
</style>
