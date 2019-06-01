<template>
  <div id="app" v-cloak>
    <Divider orientation="left">评价信息</Divider>
    <div style="margin: 0 200px">
      <info-card :evaluate="evaluate"></info-card>
    </div>
    <Divider orientation="left">跟进记录</Divider>
    <div v-if="haveData" style="margin: 0 200px">
      <follow-timeline :records="followRecords" :followUpStatus="evaluate.followUpStatus"></follow-timeline>
    </div>
    <div v-else style="height: 100px; text-align: center; padding-top: 40px">
      <span>暂无跟进记录</span>
    </div>
    <template v-if="evaluate.followUpStatus < 3">
      <Divider orientation="left">跟进反馈</Divider>
      <follow-up :lowEvaluateBid="evaluate.bid" style="margin: 0 200px"></follow-up>
    </template>
  </div>
</template>
<script>
import infoCard from './infoCard.vue'
import followTimeline from './followTimeline.vue'
import followUp from './followUp.vue'
import { getLowEvaluate, getFollowUp, saveFollowUp } from '@/api/evaluate'
export default {
  name: 'followUpLowEvaluate',
  components: {
    infoCard,
    followTimeline,
    followUp
  },
  data: function () {
    return {
      evalParamDto: {
        orderNumber: '',
        pageFlag: false
      },
      evaluate: {
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
      },
      haveData: true,
      followRecords: [
        {
          'bid': '235d6790074c4b96ac6c82928cf7aba8',
          'lowEvaluateBid': 'ab80018c9f374e38a33a2e9157a1278d',
          'content': '客人表示点错了，已经重新补了好评。',
          'createTime': '2018-09-17 16:59',
          'createUserId': '20135362',
          'createUserName': '徐敏',
          'followUpStatus': null
        }, {
          'bid': 'ab23f12ff9404f7b87c0f9fea1e71912',
          'lowEvaluateBid': 'ab80018c9f374e38a33a2e9157a1278d',
          'content': '完结',
          'createTime': '2019-04-05 00:10',
          'createUserId': '20242303',
          'createUserName': '赵其尧',
          'followUpStatus': null
        }
      ],
      evalFollowUpDto: {
        followUpStatus: '',
        content: ''
      }
    }
  },
  methods: {
    // 查询低评详情
    selectLowEvaluate () {
      this.loading = true
      this.evalParamDto.orderNumber = this.$route.query.orderNumber
      getLowEvaluate(this.evalParamDto).then(res => {
        if (res.code === 200) {
          this.evaluate = res.data.rows[0]
          this.listLowEvalFollowUp()
        } else {
          this.$Message.warning(res.message)
          this.loading = false
        }
      })
    },

    // 查询低评跟进记录
    listLowEvalFollowUp () {
      this.evalFollowUpDto.lowEvaluateBid = vm.evaluate.bid
      this.evalFollowUpDto.content = ''
      getFollowUp(this.evalFollowUpDto).then(res => {
        if (res.code === 200) {
          this.followRecords = res.data.body
          this.haveData = this.followRecords.length > 0
        } else {
          this.haveData = false
        }
      })
    },

    // 提交跟进情况
    submit () {
      this.evalFollowUpDto.followUpStatus = 2
      this.insertLowEvalFollowUp()
    },

    // 低评完结
    finish () {
      if (!this.evalFollowUpDto.content) {
        this.evalFollowUpDto.content = '完结'
      }
      this.evalFollowUpDto.followUpStatus = 3
      this.insertLowEvalFollowUp()
    },

    // 保存低评跟进情况描述
    insertLowEvalFollowUp (val) {
      saveFollowUp(this.evalFollowUpDto).then(res => {
        if (res.code === 200) {
          this.$Message.success('操作成功')
          // 局部更新低评跟进过程
          this.listLowEvalFollowUp()
          // 更新低评处理状态
          this.evaluate.followUpStatus = this.evalFollowUpDto.followUpStatus
        } else {
          this.$Message.warning(res.message)
        }
      })
    },
    confirmFinish () {
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确认完结后，将无法再修改,</p><p>继续吗？</p>`,
        onOk: () => {
          this.finish()
        },
        onCancel: () => {
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.selectLowEvaluate()
    }
  },
  // 初始时执行
  created () {
    this.selectLowEvaluate()
  }
}
</script>
<style lang="less" scoped>
</style>
