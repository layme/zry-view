<template>
  <div>
    <marketing-activity-search-form @search="listActivity" @create="createActivity"></marketing-activity-search-form>
    <Table stripe :columns="columns" :data="activityList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="isOnline">
        <Tag v-if="row.isOnline === 1" color="success">已上线</Tag>
        <Tag v-else color="default">已下线</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a class="my-btn" @click="changeIsOnline(row)">{{ row.isOnline === 1 ? '下线' : '上线' }}</a>
        <a class="my-btn" @click="updateActivity(row)">修改</a>
        <a @click="confirmRemove(row)" style="color: #ed4014">删除</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageNum"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
    <Modal
      v-model="visible"
      :title="title"
      :loading="modalLoading"
      width="500"
      @on-ok="saveActivity">
      <marketing-activity-form v-if="visible" ref="activityForm" :activity="row" @submit="handleSubmit"
                               @error="handleError"></marketing-activity-form>
    </Modal>
  </div>
</template>
<script>
import marketingActivitySearchForm from './marketingActivitySearchForm'
import marketingActivityForm from './marketingActivityForm'
import { getMarketingActivities, changeIsOnline, delActivity, createActivity, updateActivity } from '@/api/marketingActivity'

export default {
  name: 'marketingActivityList',
  components: {
    marketingActivitySearchForm,
    marketingActivityForm
  },
  data () {
    return {
      paramDto: {
        pageNum: 1,
        pageSize: 10
      },
      statusOptions: [
        {
          label: '已上线',
          value: 1
        },
        {
          label: '已下线',
          value: 0
        }
      ],
      loading: false,
      activityList: [],
      total: 0,
      columns: [
        {
          title: '项目名称',
          key: 'projectName'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '副标题',
          key: 'subTitle'
        },
        {
          title: '开始日期',
          key: 'startDate'
        },
        {
          title: '结束日期',
          key: 'endDate'
        },
        {
          title: '活动链接',
          key: 'jumpLink'
        },
        {
          title: '状态',
          slot: 'isOnline'
        },
        {
          title: '操作',
          slot: 'action',
          width: 130
        }
      ],
      visible: false,
      title: '',
      modalLoading: true,
      row: {}
    }
  },
  methods: {
    listActivity (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.pageNum = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      getMarketingActivities(this.paramDto).then(res => {
        this.activityList = res.body.rows
        this.total = res.body.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    changeIsOnline (row) {
      let val = 0
      let onLine = ''
      if (row.onLine === 1) {
        val = 0
        onLine = '确定要下线吗？'
      } else {
        val = 1
        onLine = '确定要上线吗？'
      }
      this.$Modal.confirm({
        title: '通知',
        content: '<p>' + onLine + '</p>',
        onOk: () => {
          let params = {
            bid: row.bid,
            isOnline: val
          }
          changeIsOnline(params).then(res => {
            this.$Message.success('操作成功')
            this.handlePageChange()
          })
        },
        onCancel: () => {
        }
      })
    },
    createActivity () {
      this.title = '新增营销活动'
      this.visible = true
      this.row = {}
    },
    updateActivity (row) {
      this.title = '修改营销活动'
      this.visible = true
      this.row = row
    },
    saveActivity () {
      this.$refs.activityForm.validForm()
    },
    handleSubmit (dto) {
      if (dto.bid) {
        this.handleUpdateActivity(dto)
      } else {
        this.handleSaveActivity(dto)
      }
    },
    handleUpdateActivity (dto) {
      updateActivity(dto).then(res => {
        this.$Message.success('更新营销活动成功')
        this.visible = false
        this.listActivity()
      }).catch(() => {
        this.handleError()
      })
    },
    handleSaveActivity (dto) {
      createActivity(dto).then(res => {
        this.$Message.success('创建营销活动成功')
        this.visible = false
        this.listActivity()
      }).catch(() => {
        this.handleError()
      })
    },
    handleError () {
      setTimeout(() => {
        this.modalLoading = false
        this.$nextTick(() => {
          this.modalLoading = true
        })
      }, 500)
    },
    confirmRemove (row) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定删除该营销活动吗？</p>',
        onOk: () => {
          delActivity({ bid: row.bid }).then(res => {
            this.$Message.success('删除成功')
            this.handlePageChange()
          })
        },
        onCancel: () => {
        }
      })
    }
  },
  created () {
    this.handlePageChange()
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
