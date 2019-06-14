<template>
  <div>
    <activity-form @search="listActivity" @create="createActivity"></activity-form>
    <Table stripe :columns="columns" :data="activityList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="activityNumber">
        <a @click="toActivityDetail(row)">{{ row.activityNumber }}</a>
      </template>
      <template slot-scope="{ row }" slot="status">
        <Tag :color="statusColor(row.status)">{{ row.status | statusFilter }}</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <div v-if="row.status === 0">
          <a class="my-btn" @click="updateActivity(row.activityBid, 1)">开启</a>
          <a @click="updateActivity(row.activityBid, 2)">关闭</a>
        </div>
        <div v-else-if="row.status === 1">
          <a @click="updateActivity(row.activityBid, 2)">关闭</a>
        </div>
        <div v-else>-</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageIndex"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import activityForm from './activityForm.vue'
import { listActivity } from '@/api/activity'
export default {
  name: 'activityList',
  components: {
    activityForm
  },
  data () {
    return {
      paramDto: {
        pageIndex: 1,
        pageSize: 10
      },
      loading: false,
      activityList: [],
      total: 0,
      columns: [
        {
          title: '优惠活动编号',
          slot: 'activityNumber',
          width: 130
        },
        {
          title: '活动名称',
          key: 'activityName'
        },
        {
          title: '活动状态',
          slot: 'status'
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
          key: 'activityContent',
          tooltip: true
        },
        {
          title: '操作',
          slot: 'action',
          width: 100
        }
      ]
    }
  },
  methods: {
    listActivity (dto) {
      Object.assign(this.paramDto, dto)
      this.$delete(this.paramDto, 'dateRange')
      this.paramDto.activityStatus = this.paramDto.activityStatus.join(',')
      this.paramDto.pageIndex = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      listActivity(this.paramDto).then(res => {
        if (res.code === 200) {
          this.activityList = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    createActivity () {
      const route = {
        name: 'couponList'
      }
      this.$router.push(route)
    },
    toActivityDetail (row) {
      const activityBid = row.activityBid
      const route = {
        name: 'activityDetail',
        query: {
          activityBid
        }
      }
      this.$router.push(route)
    },
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
    },
    updateActivity (activityBid, activityStatus) {}
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
  .my-table {
    margin-top: 20px;
  }
  .my-btn {
    margin-right: 10px;
  }
  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
