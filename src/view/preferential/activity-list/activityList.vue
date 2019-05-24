<template>
  <div>
    <activity-form @search="listActivity" @create="createActivity"></activity-form>
    <Table stripe :columns="columns" :data="activityList" :loading="loading">
      <template slot-scope="{ row }" slot="activityNumber">
        <a @click="toActivityDetail(row)">{{ row.activityNumber }}</a>
      </template>
      <template slot-scope="{ row }" slot="status">
        <Tag :color="statusColor(row.status)">{{ row.status | statusFilter }}</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a class="my-btn">开启</a>
        <a>关闭</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import activityForm from './activityForm.vue'
export default {
  name: 'activityList',
  components: {
    activityForm
  },
  data () {
    return {
      paramDto: {
        page: 1,
        limit: 10
      },
      loading: false,
      activityList: [
        {
          'activityBid': '361e026b8ab746a8a1c0bcf4e22c5b71',
          'activityNumber': 'S16082402',
          'activityName': '免费体验券',
          'status': 0,
          'activityContent': '免费体验券',
          'startDate': 20160824,
          'endDate': 20201024,
          'activityCondition': '限北京CBD自如驿(8人间、12人间)可用',
          'projectName': null,
          'houseTypeName': null,
          'showDate': '2016-08-24至2020-10-24'
        },
        {
          'activityBid': '361e026b8ab746a8a1c0bcf4e22c5b71',
          'activityNumber': 'S16082402',
          'activityName': '免费体验券',
          'status': 1,
          'activityContent': '免费体验券',
          'startDate': 20160824,
          'endDate': 20201024,
          'activityCondition': '限北京CBD自如驿(8人间、12人间)可用',
          'projectName': null,
          'houseTypeName': null,
          'showDate': '2016-08-24至2020-10-24'
        },
        {
          'activityBid': '361e026b8ab746a8a1c0bcf4e22c5b71',
          'activityNumber': 'S16082402',
          'activityName': '免费体验券',
          'status': 2,
          'activityContent': '免费体验券',
          'startDate': 20160824,
          'endDate': 20201024,
          'activityCondition': '限北京CBD自如驿(8人间、12人间)可用',
          'projectName': null,
          'houseTypeName': null,
          'showDate': '2016-08-24至2020-10-24'
        },
        {
          'activityBid': '361e026b8ab746a8a1c0bcf4e22c5b71',
          'activityNumber': 'S16082402',
          'activityName': '免费体验券',
          'status': 3,
          'activityContent': '免费体验券',
          'startDate': 20160824,
          'endDate': 20201024,
          'activityCondition': '限北京CBD自如驿(8人间、12人间)可用',
          'projectName': null,
          'houseTypeName': null,
          'showDate': '2016-08-24至2020-10-24'
        }
      ],
      total: 0,
      columns: [
        {
          title: '优惠活动编号',
          slot: 'activityNumber'
        },
        {
          title: '活动名称',
          key: 'activityName'
        },
        {
          title: '活动状态',
          slot: 'status',
          width: 100
        },
        {
          title: '活动时间',
          key: 'showDate'
        },
        {
          title: '活动范围',
          key: 'activityCondition',
          tooltip: true
        },
        {
          title: '活动内容',
          key: 'activityContent'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ]
    }
  },
  methods: {
    listActivity (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      console.info('paramDto', this.paramDto)
      this.loading = false
    },
    createActivity () {
      const route = {
        name: 'activityCreate'
      }
      this.$router.push(route)
    },
    toActivityDetail (row) {},
    statusColor (val) {
      switch (val) {
        case 0:
          return 'default'
        case 1:
          return 'green'
        case 2:
          return 'blue'
        case 3:
          return 'orange'
      }
    }
  },
  filters: {
    statusFilter (val) {
      switch (val) {
        case 0:
          return '未开启'
        case 1:
          return '进行中'
        case 2:
          return '已关闭'
        case 3:
          return '已结束'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .my-btn {
    margin-right: 10px;
  }
  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
