<template>
    <div>
      <Table :columns="columns1" :data="priceTypeList">
        <template slot-scope="{ row }" slot="isBindCounterPrice">
            <div>{{ row.isBindCounterPrice | priceTypeFilter }}</div>
        </template>
        <template slot-scope="{ row }" slot="isHideHousePrice">
            <div>{{ row.isHideHousePrice | priceTypeFilter }}</div>
        </template>
        <template slot-scope="{ row }" slot="isKeepInt">
            <div>{{ row.isKeepInt | priceTypeFilter }}</div>
        </template>
        <template slot-scope="{ row }" slot="bindRate">
            <div>{{ row.bindRate | bindRateFilter }}</div>
        </template>
        <template slot-scope="{ row }" slot="status">
            <div>{{ row.status | StatusFilter }}</div>
        </template>
      </Table>
      <Page :total="total" :page-size="priceTypeDto.limit" :current.sync="priceTypeDto.page" @on-change="getPriceTypeList"
        show-elevator show-total align="center"/>
      <Modal
        v-model="detailVisible"
        title="修改房价类型"
        @on-ok="addOrUpdatePriceTypeEvent">
        <updatePriceType v-if="detailVisible" :priceTypeSaveOrUpdate="priceTypeSaveOrUpdate" ref="updatePriceType" @success="handleSuccess"></updatePriceType>
    </Modal>
    </div>
</template>
<script>
import { listPriceType, addOrUpdatePriceType } from '@/api/priceType'
import updatePriceType from './updatePriceType'
export default {
  components: {
    updatePriceType
  },
  data () {
    return {
      priceTypeDto: {
        page: 1,
        limit: 10
      },
      priceTypeList: [],
      priceTypeSaveOrUpdate: {},
      total: 0,
      detailVisible: false,
      columns1: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '名称',
          key: 'channelName'
        },
        {
          title: '价格类型代码',
          key: 'typeCode'
        },
        {
          title: '绑定门市价',
          slot: 'isBindCounterPrice'
        },
        {
          title: '隐藏房价',
          slot: 'isHideHousePrice'
        },
        {
          title: '保留整数',
          slot: 'isKeepInt'
        },
        {
          title: '绑定比率',
          slot: 'bindRate'
        },
        {
          title: '状态',
          slot: 'status'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('a', {
                on: {
                  click: () => {
                    this.editPriceType(params.row)
                  }
                }
              }, '修改  '),
              h('a', {
              }, '设置无效')
            ])
          }
        }
      ]
    }
  },
  methods: {
    getPriceTypeList (priceTypeDto) {
      console.log(priceTypeDto)
      listPriceType(priceTypeDto).then(res => {
        console.log(res.body.rows)
        this.priceTypeList = res.body.rows
        this.total = res.body.total
      })
    },
    editPriceType (row) {
      this.priceTypeSaveOrUpdate = row
      console.log(row)
      this.detailVisible = true
    },
    addOrUpdatePriceTypeEvent () {
      this.$refs.updatePriceType.update()
    },
    handleSuccess (dto) {
      this.addOrUpdatePriceType(dto)
    },
    addOrUpdatePriceType (dto) {
      console.log(dto)
      addOrUpdatePriceType(dto).then(() => {
        this.$Message.success('保存成功')
        this.getPriceTypeList()
      })
    }
  },
  created () {
    this.getPriceTypeList()
  },
  filters: {
    priceTypeFilter (val) {
      return val === 0 ? '否' : val === 1 ? '是' : '未知'
    },
    bindRateFilter (val) {
      return val === null ? '未知' : val
    },
    StatusFilter (val) {
      return val === 0 ? '无效' : val === 1 ? '有效' : '未知'
    }
  }
}
</script>
