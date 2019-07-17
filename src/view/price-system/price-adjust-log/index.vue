<template>
  <div style="padding: 0 24px 26px 24px ">
    <search-list @search="findData" @exportList="exportFile"></search-list>
    <Table stripe :columns="columns" :data="data" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="startDate">
        <div>{{ row.startDate | dateFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="endDate">
        <div>{{ row.endDate | dateFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="createTime">
        <div>{{ row.createTime | dateFilter }}</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="getpageList"/>
    <export-file ref="exportFile"></export-file>
  </div>
</template>
<script>
import searchList from './components/searchList'
import { listPriceChangeLog } from '@/api/price'
import ExportFile from '_c/export-file/ExportFile'

export default {
  name: 'priceAdjustLog',
  components: {
    searchList,
    ExportFile
  },

  data () {
    return {
      total: 0,
      data: [],
      loading: false,
      paramDto: {
        page: 1,
        limit: 10
      },
      columns: [
        {
          title: '开始日期',
          slot: 'startDate'
        },
        {
          title: '结束日期',
          slot: 'endDate'
        },
        {
          title: '调整房价类型',
          key: 'channelCodes'
        },
        {
          title: '调整内容',
          key: 'changeDetail',
          render: (h, params) => {
            if (params.row['changeDetail'] && params.row['changeDetail'].length > 15) {
              return h('Tooltip', {
                props: {
                  placement: 'top',
                  transfer: true
                }
              }, [
                h('div', {
                  style: {
                    whiteSpace: 'normal'
                  },
                  slot: 'content'
                }, params.row['changeDetail']),
                h('span', {}, params.row['changeDetail'].slice(0, 15) + '...')
              ])
            } else {
              return h('span', {}, params.row['changeDetail'])
            }
          }
        },
        {
          title: '调整原因',
          key: 'adjustCode'
        },
        {
          title: '创建日期',
          slot: 'createTime'
        },
        {
          title: '调价人',
          key: 'createBy'
        }
      ]
    }
  },
  methods: {
    findData (data) {
      Object.assign(this.paramDto, data)
      this.paramDto.page = 1
      this.getpageList(data)
    },
    getpageList () {
      this.loading = true
      listPriceChangeLog(this.paramDto).then(res => {
        if (!res.body) {
          return
        }
        this.data = res.body.rows
        this.total = res.body.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    changePage (n) {
      this.paramDto.page = n
      this.getpageList()
    },
    exportFile (dto) {
      let data = {
        type: 1006,
        jsonParam: JSON.stringify(dto)
      }
      this.$refs.exportFile.requestExportFile(data)
    }
  },
  created () {
    this.getpageList()
  }
}
</script>

<style scoped>
  .my-table {
    margin-top: 20px
  }
  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
