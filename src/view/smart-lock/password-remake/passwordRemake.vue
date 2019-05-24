<template>
  <div>
    <Form :model="paramDto" :label-width="60" inline>
      <FormItem label="订单号" prop="orderNumber">
        <Input type="text" v-model.trim="paramDto.orderNumber" clearable :style="{ width: '200px' }"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" icon="ios-search" @click="getList"> 查 询</Button>
      </FormItem>
    </Form>
    <Table stripe :columns="columns" :data="passwordList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="pswStatus">
        <Tag color="success" v-if="row.pswStatus === 1">有效</Tag>
        <Tag color="warning" v-else-if="row.pswStatus === 2">无效</Tag>
        <Tag color="default" v-else>未知</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a @click="remakePassword(row)">密码重制</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
export default {
  name: 'passwordRemake',
  data () {
    return {
      paramDto: {
        projectBid: '',
        orderNumber: '',
        page: 1,
        limit: 10
      },
      loading: false,
      passwordList: [
        {
          'orderBid': 'afc09761eee642eeb365ce665a96b311',
          'areaBids': null,
          'orderCode': 'BJ101190522083',
          'projectBid': '63615afa5a344153a047aca1ea32cc51',
          'pswStatus': 1,
          'areaName': 'Q房间',
          'areaBid': '66772984bc85454f8a7647e1a42df3b1',
          'pageNum': 0,
          'pageSize': 0,
          'applyer': null,
          'operator': null
        },
        {
          'orderBid': 'f68e5b0bbeb54892a6d9b5d8a2dbd592',
          'areaBids': null,
          'orderCode': 'BJ101190521099',
          'projectBid': '63615afa5a344153a047aca1ea32cc51',
          'pswStatus': 2,
          'areaName': 'Q房间',
          'areaBid': '66772984bc85454f8a7647e1a42df3b1',
          'pageNum': 0,
          'pageSize': 0,
          'applyer': null,
          'operator': null
        },
        {
          'orderBid': 'f68e5b0bbeb54892a6d9b5d8a2dbd591',
          'areaBids': null,
          'orderCode': 'BJ101190521098',
          'projectBid': '63615afa5a344153a047aca1ea32cc51',
          'pswStatus': 0,
          'areaName': 'Q房间',
          'areaBid': '66772984bc85454f8a7647e1a42df3b1',
          'pageNum': 0,
          'pageSize': 0,
          'applyer': null,
          'operator': null
        }
      ],
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
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      console.info('paramDto', this.paramDto)
      this.loading = false
    },
    remakePassword () {
      this.$Message.success('password remark')
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
