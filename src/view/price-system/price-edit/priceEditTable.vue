<template>
  <Table :columns="columns" :data="detail" border class="my-table"></Table>
</template>
<script>
export default {
  name: 'priceEditTable',
  props: {
    priceInfo: Object
  },
  data () {
    return {
      priceDto: {
        specialWeekList: [],
        addCheckedPriceTypeList: [],
        addHouseTypeList: []
      },
      detail: []
    }
  },
  computed: {
    columns () {
      let list = [{
        title: '房价类型',
        key: 'name',
        align: 'center',
        width: 120,
        fixed: 'left'
      }]
      this.priceDto.addHouseTypeList.forEach((item) => {
        let house = this.$store.state.price.currentHouseTypeList.find(x => x.bid === item)
        let vm = this
        let dto = {
          title: house.houseTypeParentName + house.houseName,
          align: 'center',
          children: [{
            title: '平日',
            align: 'center',
            minWidth: 120,
            render: (h, params) => {
              return h('InputNumber', {
                props: {
                  value: params.row[`${house.bid}-normalPrice`],
                  min: 1,
                  max: 10000
                },
                style: {
                  width: '100%'
                },
                on: {
                  input: val => {
                    vm.detail[params.index][`${house.bid}-normalPrice`] = val
                  }
                }
              })
            }
          }]
        }
        if (this.priceDto.specialWeekList.length) {
          dto.children.push({
            title: '周末',
            align: 'center',
            minWidth: 120,
            render: (h, params) => {
              return h('InputNumber', {
                props: {
                  value: params.row[`${house.bid}-specialWeekPrice`],
                  min: 1,
                  max: 10000
                },
                style: {
                  width: '100%'
                },
                on: {
                  input: val => {
                    vm.detail[params.index][`${house.bid}-specialWeekPrice`] = val
                  }
                }
              })
            }
          })
        }
        list.push(dto)
      })
      return list
    }
  },
  methods: {
    buildPriceDetail () {
      this.priceDto.addCheckedPriceTypeList.forEach(v => {
        let price = this.$store.state.price.priceTypeList.find(x => x.code === v)
        let dto = {
          code: price.code,
          name: price.name
        }
        this.priceDto.addHouseTypeList.forEach(x => {
          dto[`${x}-normalPrice`] = null
          if (this.priceDto.specialWeekList.length) {
            dto[`${x}-specialWeekPrice`] = null
          }
        })
        this.detail.push(dto)
      })
    },
    valid () {
      let flag = false
      this.detail.some(item => {
        Object.keys(item).some(x => {
          if (x !== 'code' && x !== 'name' && !item[x]) {
            this.$Message.warning('请输入价格，不能留有空的')
            flag = true
            return flag
          }
        })
        return flag
      })
      if (!flag) {
        this.createPrice()
      }
    },
    createPrice () {
      this.priceDto.priceChangeDetailDtoList = []
      this.detail.forEach(item => {
        this.priceDto.addHouseTypeList.forEach(x => {
          let price = {
            channelCode: item.code,
            houseTypeFid: '',
            normalPrice: '',
            specialWeekPrice: ''
          }
          price.houseTypeFid = x
          price.normalPrice = item[`${x}-normalPrice`] * 100
          if (this.priceDto.specialWeekList.length) {
            price.specialWeekPrice = item[`${x}-specialWeekPrice`] * 100
          }
          this.priceDto.priceChangeDetailDtoList.push(price)
        })
      })
      this.$emit('submit', this.priceDto)
    }
  },
  created () {
    this.priceDto = this.priceInfo
    this.buildPriceDetail()
  }
}
</script>
<style lang="less" scoped>
  @import "style";
</style>
