<template>
  <div>
    <Form :model="paramDto" :label-width="50" inline @keydown.enter.native="listPriceType">
      <FormItem label="名称">
        <Input v-model="paramDto.name" class="my-con" clearable></Input>
      </FormItem>
      <FormItem label="状态">
        <Select v-model="paramDto.status" placeholder="" class="my-con" clearable>
          <Option v-for="item in priceTypeStatus" :key="item.value" :value="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <Button icon="ios-search" type="primary" @click="listPriceType" class="my-btn"> 查 询</Button>
      <Button type="primary" @click="addPriceType" class="my-btn">添加价格类型</Button>
    </Form>
    <Table :row-class-name="rowClassName"  :columns="columns" :data="priceTypeList" :loading="loading">
      <template slot-scope="{ row }" slot="isBindCounterPrice">
        <div>{{ row.isBindCounterPrice | yesOrNoFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="isHideHousePrice">
        <div>{{ row.isHideHousePrice | yesOrNoFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="isKeepInt">
        <div>{{ row.isKeepInt | yesOrNoFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="status">
        <Tag v-if="row.status === 1" color="primary">有效</Tag>
        <Tag v-else color="warning">无效</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a @click="updatePriceType(row)" class="my-a">修改</a>
        <a @click="confirmSetIsInvalid(row)" class="my-a">
          {{ row.status === 1 ? '置为无效' : '置为有效' }}
        </a>
        <a v-if="row.isBindCounterPrice === 1  && row.isCanGeneratePrice === 1" @click="confirmGeneratePrice(row)">
          生成房价
        </a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
    <Modal
      v-model="priceVisible"
      :title="title"
      :loading="priceLoading"
      width="500"
      @on-ok="validForm">
      <price-type-form v-if="priceVisible" ref="priceTypeForm" :price="row"
                    @submit="addOrUpdatePriceType" @error="handleError"></price-type-form>
    </Modal>
  </div>
</template>
<script>
import priceTypeForm from './priceTypeForm'
import { listPriceType, addOrUpdatePriceType, setIsInvalid, generatePrice } from '@/api/priceType'
import './table.less'

export default {
  name: 'priceTypeList',
  components: {
    priceTypeForm
  },
  data () {
    return {
      paramDto: {
        name: '',
        status: '',
        page: 1,
        limit: 10
      },
      priceTypeStatus: [
        {
          label: '有效',
          value: 1
        }, {
          label: '无效',
          value: 0
        }
      ],
      columns: [
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
          key: 'bindRate',
          render: (h, params) => {
            return h('div', params.row.bindRate ? `${params.row.bindRate} %` : '-')
          }
        },
        {
          title: '状态',
          slot: 'status'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200
        }
      ],
      loading: false,
      priceTypeList: [],
      total: 0,
      title: '',
      priceVisible: false,
      priceLoading: true,
      row: {}
    }
  },
  methods: {
    listPriceType () {
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      listPriceType(this.paramDto).then(res => {
        this.priceTypeList = res.body.rows
        this.total = res.body.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    rowClassName (row, index) {
      if (index === 1) {
        return 'demo-table-info-row'
      }
      return ''
    },
    addPriceType () {
      this.title = '添加房价类型'
      this.row = {}
      this.priceVisible = true
    },
    updatePriceType (row) {
      this.title = '修改房价类型'
      this.row = row
      this.priceVisible = true
    },
    validForm () {
      this.$refs.priceTypeForm.validForm()
    },
    addOrUpdatePriceType (dto) {
      addOrUpdatePriceType(dto).then(() => {
        this.$Message.success('保存成功')
        this.priceVisible = false
        this.handlePageChange()
      }).catch(() => {
        this.handleError()
      })
    },
    handleError () {
      setTimeout(() => {
        this.priceLoading = false
        this.$nextTick(() => {
          this.priceLoading = true
        })
      }, 500)
    },
    confirmSetIsInvalid (row) {
      let val = 0
      let ti = ''
      if (row.status === 1) {
        val = 0
        ti = '确定将改价格类型置为 无效 状态吗？'
      } else {
        val = 1
        ti = '确定将改价格类型置为 有效 状态吗？'
      }
      this.$Modal.confirm({
        title: '通知',
        content: '<p>' + ti + '</p>',
        onOk: () => {
          setIsInvalid(row.fid, val).then(res => {
            this.$Message.success('操作成功')
            this.handlePageChange()
          })
        },
        onCancel: () => {
        }
      })
    },
    confirmGeneratePrice (row) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定生成房价吗？</p>',
        onOk: () => {
          generatePrice({ fid: row.fid }).then(res => {
            this.$Message.success('价格生成成功')
            this.priceVisible = false
            this.handlePageChange()
          })
        },
        onCancel: () => {
        }
      })
    }
  },
  created () {
    this.listPriceType()
  },
  filters: {
    yesOrNoFilter (val) {
      return val === 1 ? '是' : '否'
    }
  }
}
</script>
<style lang="less" scoped>
  .my-btn {
    margin-left: 20px;
  }
  .my-a {
    margin-right: 10px;
  }
  .my-con {
    width: 300px;
  }
  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
