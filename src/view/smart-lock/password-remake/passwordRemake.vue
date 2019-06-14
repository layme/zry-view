<template>
  <div>
    <Form :model="paramDto" :label-width="60" inline>
      <FormItem label="订单号" prop="orderNumber">
        <Input type="text" v-model.trim="paramDto.orderCode" clearable :style="{ width: '200px' }"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" icon="ios-search" @click="getList"> 查 询</Button>
      </FormItem>
    </Form>
    <Table stripe :columns="columns" :data="passwordList" :loading="loading">
      <template slot-scope="{ row }" slot="pswStatus">
        <Tag color="success" v-if="row.pswStatus === 1">有效</Tag>
        <Tag color="warning" v-else-if="row.pswStatus === 2">无效</Tag>
        <Tag color="default" v-else>未知</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a @click="remakeConfirm(row)">密码重制</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageNum"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import { getPwdRemakeList, resetOrderPassword } from '@/api/smartLock'
export default {
  name: 'passwordRemake',
  data () {
    return {
      paramDto: {
        orderCode: '',
        pageNum: 1,
        pageSize: 10
      },
      loading: false,
      passwordList: [],
      total: 0,
      columns: [
        {
          title: '订单号',
          key: 'orderCode'
        },
        {
          title: '楼栋',
          key: ''
        },
        {
          title: '楼层',
          key: ''
        },
        {
          title: '房间名称',
          key: 'areaName'
        },
        {
          title: '密码状态',
          slot: 'pswStatus'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ]
    }
  },
  methods: {
    getList () {
      this.paramDto.pageNum = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      getPwdRemakeList(this.paramDto).then(res => {
        if (res.code === 200) {
          this.passwordList = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    remakeConfirm (row) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定重制该订单的密码吗？</p>',
        onOk: () => {
          this.remakePassword(row)
        },
        onCancel: () => {
        }
      })
    },
    remakePassword (row) {
      let dto = {
        orderBid: row.orderBid,
        projectBid: row.projectBid,
        areaBid: row.areaBid
      }
      resetOrderPassword(dto).then(res => {
        if (res.code === 200) {
          this.$Message.success('密码重制成功')
          this.handlePageChange()
        }
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
  .my-page {
    text-align: right;
    margin-top: 20px
  }

  .my-table {
    margin-top: 20px;
  }
</style>
