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
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import projectForm from './projectForm.vue'
export default {
  name: 'projectList',
  components: {
    projectForm
  },
  data () {
    return {
      paramDto: {
        page: 1,
        limit: 10
      },
      loading: false,
      projectList: [
        {
          'bid': '9b92e3ff1fce40a7969295a3088a3f56',
          'projectName': '北京工体自如驿',
          'period': '1',
          'operateSeq': '5',
          'projectType': '1',
          'projectAddress': '北京朝阳区工体东路20号二层202',
          'houseTypeCount': '10',
          'roomCount': 30,
          'bedCount': 222,
          'isValid': 1,
          'isShow': 0,
          'canOrder': 1
        },
        {
          'bid': '0c4a4238a98e48c582c425c1851b7979',
          'projectName': '武汉大陆坊自如驿',
          'period': '2',
          'operateSeq': '5',
          'projectType': '1',
          'projectAddress': '武汉江岸区中山大道922自如驿',
          'houseTypeCount': '16',
          'roomCount': 35,
          'bedCount': 265,
          'isValid': 1,
          'isShow': 1,
          'canOrder': 1
        }
      ],
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
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    addProject () {
      const route = {
        name: 'addProject'
      }
      this.$router.push(route)
    },
    handlePageChange () {
      this.loading = true
      console.info('listProject paramDto', this.paramDto)
      this.loading = false
    },
    validOrNot (row) {},
    showOrNot (row) {},
    canOrderOrNot (row) {},
    toUpdateProject (bid) {
      const route = {
        name: 'updateProject',
        query: {
          projectBid: bid
        }
      }
      this.$router.push(route)
    }
  },
  created () {
    this.listProject()
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
