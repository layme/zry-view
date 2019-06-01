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
      evaluateList: [
        {
          'bid': 'e4cd81f612db4ace9f4f9c4659ec3d16',
          'logicCode': '3855382',
          'evaluateSceneCode': '63615afa5a344153a047aca1ea32cc51',
          'businessCode': 'BJ101181122008',
          'customerAvgStarLevel': 3.7,
          'customerSuggestion': '先是给我安排了个男生间，后又换到女生间还是没有打扫的，态度倒是很好，因为每次去北京基本都住这里，可能知道我是常客，希望下次能改进吧！',
          'evaluatePersonCode': '52d075cb-5b60-4780-baaf-9bf5bf9a3aa8',
          'evaluatePersonName': '苏畅',
          'evaluatePersonPhone': '13810353181',
          'evaluateTime': '2018-11-27 17:32',
          'lowEvaluateManagerFeedbackStatus': null,
          'lowEvaluateManagerName': null,
          'lowEvaluateManagerFeedbackTime': null,
          'lowEvaluateManagerFeedbackRemark': null,
          'followUpStatus': 2,
          'evaluateStatus': null,
          'starList': [{
            'lowEvaluateBid': 'e4cd81f612db4ace9f4f9c4659ec3d16',
            'answerContent': '环境',
            'answerScore': '3',
            'questionType': 7,
            'questionContent': '环境',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': 'e4cd81f612db4ace9f4f9c4659ec3d16',
            'answerContent': '卫生',
            'answerScore': '3',
            'questionType': 7,
            'questionContent': '卫生',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': 'e4cd81f612db4ace9f4f9c4659ec3d16',
            'answerContent': '服务',
            'answerScore': '5',
            'questionType': 7,
            'questionContent': '服务',
            'answerSignCode': null
          }],
          'labelList': [{
            'lowEvaluateBid': 'e4cd81f612db4ace9f4f9c4659ec3d16',
            'answerContent': '环境好',
            'answerScore': '1',
            'questionType': 4,
            'questionContent': '标签',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': 'e4cd81f612db4ace9f4f9c4659ec3d16',
            'answerContent': '服务贴心',
            'answerScore': '1',
            'questionType': 4,
            'questionContent': '标签',
            'answerSignCode': null
          }],
          'urlList': []
        }
      ]
    }
  },
  methods: {
    listLowEvaluate (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      getLowEvaluate(this.paramDto).then(res => {
        if (res.data.status === 200) {
          this.evaluateList = res.data.rows
          this.total = res.data.total
          this.haveData = this.total > 0
        } else {
          this.$Message.warning(res.message)
          this.haveData = false
        }
      })
    },
    projectScore () {
      getProjectScore().then(res => {
        if (res.data.status === 200) {
          this.totalScore = res.data
        } else {
          console.log('查询项目评分失败')
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
