<template>
  <div>
    <project-form @search="listProject" @create="addProject"></project-form>
    <Table stripe :columns="columns" :data="projectList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="period">
        <div>{{ row.period | periodFormatter }}</div>
      </template>
      <template slot-scope="{ row }" slot="projectType">
        <div>{{ row.projectType | projectTypeFormatter }}</div>
      </template>
      <template slot-scope="{ row }" slot="count">
        <div>{{ row.roomCount }} / {{ row.bedCount }}</div>
      </template>
      <template slot-scope="{ row }" slot="isValid">
        <div>{{ row.isValid === 1 ? '启用' : '停用' }}</div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a class="my-btn" @click="validOrNot(row)">{{ row.isValid === 0 ? '启用' : '停用' }}</a>
        <a class="my-btn" v-if="row.isValid === 1" @click="showOrNot(row)">{{ row.isShow === 0 ? '展示' : '隐藏' }}</a>
        <a class="my-btn" v-if="row.isValid === 1 && row.isShow === 1" @click="canOrderOrNot(row)">{{ row.canOrder === 0 ? '开放预定' : '禁止预定' }}</a>
        <a @click="toUpdateProject(row.bid)">修改</a>
      </template>
    </Table>
  </div>
</template>
<script>
import projectForm from './projectForm.vue'
import { getProjects, validOrNot, showOrNot, canOrderOrNot } from '@/api/project'
export default {
  name: 'projectList',
  components: {
    projectForm
  },
  data () {
    return {
      paramDto: {
        pageNum: 1,
        pageSize: 100
      },
      loading: false,
      projectList: [],
      total: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '项目名称',
          key: 'projectName'
        },
        {
          title: '阶段',
          slot: 'period'
        },
        {
          title: '类型',
          slot: 'projectType'
        },
        {
          title: '地址',
          key: 'projectAddress',
          tooltip: true
        },
        {
          title: '房间数/床位数',
          slot: 'count'
        },
        {
          title: '状态',
          slot: 'isValid'
        },
        {
          title: '操作',
          slot: 'action',
          width: 190
        }
      ]
    }
  },
  methods: {
    listProject (dto) {
      this.loading = true
      Object.assign(this.paramDto, dto)
      getProjects(this.paramDto).then(res => {
        if (res.code === 200) {
          this.projectList = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    addProject () {
      const route = {
        name: 'addProject'
      }
      this.$router.push(route)
    },
    validOrNot (row) {
      let val = 0
      let ti = ''
      if (row.isValid === 1) {
        val = 0
        ti = '停用后，将无法在App等渠道显示，并暂停所有订单，已下订单也将无法操作，请确认是否继续？'
      } else {
        val = 1
        ti = '启用后，项目可正常使用，请确认是否继续？'
      }
      this.$Modal.confirm({
        title: '通知',
        content: '<p>' + ti + '</p>',
        onOk: () => {
          validOrNot(row.bid, val).then(res => {
            if (res.code === 200) {
              this.$Message.success('操作成功')
              this.handlePageChange()
            } else {
              this.$Message.warning(res.message)
            }
          })
        },
        onCancel: () => {
        }
      })
    },
    showOrNot (row) {
      let val = 0
      let ti = ''
      if (row.isShow === 1) {
        val = 0
        ti = '隐藏后，App端无法看到该项目，不影响已创建的订单，请确认是否继续？'
      } else {
        val = 1
        ti = '展示后，App端可以看到该项目，请确认是否继续？'
      }
      this.$Modal.confirm({
        title: '通知',
        content: '<p>' + ti + '</p>',
        onOk: () => {
          showOrNot(row.bid, val).then(res => {
            if (res.code === 200) {
              this.$Message.success('操作成功')
              this.handlePageChange()
            } else {
              this.$Message.warning(res.message)
            }
          })
        },
        onCancel: () => {
        }
      })
    },
    canOrderOrNot (row) {
      let val = 0
      let ti = ''
      if (row.canOrder === 1) {
        val = 0
        ti = '禁止App端预定床位，但是App端可以浏览该项目，请确认是否继续？'
      } else {
        val = 1
        ti = '允许App端预定床位，请确认是否继续？'
      }
      this.$Modal.confirm({
        title: '通知',
        content: '<p>' + ti + '</p>',
        onOk: () => {
          canOrderOrNot(row.bid, val).then(res => {
            if (res.code === 200) {
              this.$Message.success('操作成功')
              this.handlePageChange()
            } else {
              this.$Message.warning(res.message)
            }
          })
        },
        onCancel: () => {
        }
      })
    },
    toUpdateProject (projectBid) {
      const route = {
        name: 'updateProject',
        query: {
          projectBid
        }
      }
      this.$router.push(route)
    }
  },
  filters: {
    periodFormatter (val) {
      switch (val) {
        case '1':
          return '工程'
        case '2':
          return '爬坡'
        case '3':
          return '运营'
      }
    },
    projectTypeFormatter (val) {
      switch (val) {
        case '1':
          return '直营'
        case '2':
          return '托管'
        case '3':
          return '平台'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .my-table {
    margin-top: 20px
  }
  .my-btn {
    margin-right: 10px;
  }
  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
