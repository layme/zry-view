<template>
  <div>
    <low-evaluate-form @search="listLowEvaluate" :totalScore="totalScore"></low-evaluate-form>
    <low-evaluate-card class="my-card" v-for="(item, index) in evaluateList" :key="index" :row="item"
                       :index="index" @link="toOrderDetail" @follow="toFollowUp"></low-evaluate-card>
    <Card v-if="!haveData" class="my-card">
      <div class="no-data">
        <span>没有找到匹配的记录</span>
      </div>
    </Card>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import lowEvaluateForm from './lowEvaluateForm.vue'
import lowEvaluateCard from './lowEvaluateCard.vue'
import { getLowEvaluate, getProjectScore } from '@/api/evaluate'

export default {
  name: 'lowEvaluateList',
  components: {
    lowEvaluateForm,
    lowEvaluateCard
  },
  data: function () {
    return {
      paramDto: {
        page: 1,
        limit: 10
      },
      totalScore: 5,
      loading: false,
      // 处理状态
      // 查询结果显示控制
      haveData: true,
      // 分页总数
      total: 0,
      // 列表查询结果
      evaluateList: []
    }
  },
  methods: {
    listLowEvaluate (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
      this.projectScore()
    },
    handlePageChange () {
      this.$delete(this.paramDto, 'evaluateTime')
      getLowEvaluate(this.paramDto).then(res => {
        if (res.code === 200) {
          this.evaluateList = res.body.rows
          this.total = res.body.total
          this.haveData = this.total > 0
        } else {
          this.$Message.warning(res.message)
          this.haveData = false
        }
      })
    },
    projectScore () {
      getProjectScore(this.$store.state.user.currentProject.bid).then(res => {
        if (res.code === 200) {
          this.totalScore = res.body
        }
      })
    },
    toOrderDetail (orderNumber) {
      const route = {
        name: 'orderDetail',
        query: {
          orderNumber
        }
      }
      this.$router.push(route)
    },
    toFollowUp (orderNumber) {
      const route = {
        name: 'lowEvaluateFollowUp',
        query: {
          orderNumber
        }
      }
      this.$router.push(route)
    }
  },
  filters: {
    // 状态转文字
    statusFilter (val) {
      if (val === 1) {
        return '已提醒'
      } else if (val === 2) {
        return '跟进中'
      } else {
        return '已完结'
      }
    }
  },
  // 初始时执行
  created () {
    this.projectScore()
    this.handlePageChange()
  }
}
</script>
<style lang="less" scoped>
  .full-width {
    width: 100%;
  }

  .my-table {
    margin-top: 20px
  }

  .my-page {
    text-align: right;
    margin-top: 20px
  }

  .my-card {
    margin-top: 20px;
    -webkit-box-shadow: #dcdee2 0 1px 6px;
    -moz-box-shadow: #dcdee2 0 1px 6px;
    box-shadow: #dcdee2 0 1px 6px;
  }

  .no-data {
    height: 100px;
    text-align: center;
    padding-top: 40px;
    color: #909399;
  }
</style>
