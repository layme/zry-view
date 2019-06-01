<template>
  <div>
    <evaluate-form @search="listEvaluate"></evaluate-form>
    <evaluate-card class="my-card" v-for="(item, index) in evaluateList" :key="index" :row="item"
                   :index="index" @link="toOrderDetail" @reply="openReplyModal" @shield="confirmShieldEvaluate"></evaluate-card>
    <Card v-if="!haveData" class="my-card">
      <div class="no-data">
        <span>没有找到匹配的记录</span>
      </div>
    </Card>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>

    <Modal
      v-model="replyVisible"
      :title="replyTitle"
      :loading="replyLoading"
      @on-ok="replyValid">
      <Form v-if="replyVisible" ref="replyForm" :model="replyDto" :rules="replyRules" :label-width="0">
        <FormItem prop="feedbackRemark">
          <Input type="textarea" :rows="5" :maxlength="200" v-model="replyDto.feedbackRemark"
                 placeholder="此处最多输入200个字符"></Input>
        </FormItem>
      </Form>
      <div style="margin-top: 20px" v-if="replyDto.lowEvaluateManagerFeedbackTime">
        <span>发表于：{{ replyDto.lowEvaluateManagerFeedbackTime | dateFilter }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>回复员工：{{ replyDto.feedbackerName }}</span>
      </div>
    </Modal>
  </div>
</template>
<script>
import evaluateForm from './evaluateForm.vue'
import evaluateCard from './evaluateCard.vue'
import { getEvaluate, getProjectScore, shieldValuate, reply } from '@/api/evaluate'
import { getDate } from '@/libs/tools'

export default {
  name: 'evaluateList',
  components: {
    evaluateForm,
    evaluateCard
  },
  data: function () {
    return {
      totalScore: '',
      paramDto: {
        page: 1,
        limit: 10
      },
      loading: false,
      delay: 1500,
      replyVisible: false,
      replyLoading: true,
      replyTitle: '',
      haveData: true,
      total: 0,
      evaluateList: [
        {
          'bid': '4966329',
          'logicCode': '24952134',
          'evaluateSceneCode': '63615afa5a344153a047aca1ea32cc51',
          'businessCode': 'BJ101190319166',
          'customerAvgStarLevel': 5.0,
          'customerSuggestion': '很棒很棒很棒很棒x100 来住了25天 和大家一起做耳环 一起玩三国杀 真的特别开心 感觉大家就像一家人 房间床位很温馨 床垫软软的很舒服 地理位置也很方便 前台的小哥哥小姐姐们都特别好特别亲切 很想念那些陪伴我一起度过这段时间的你们 每一段旅行都是人生开启的新支线 而我现在要回去刷主线了哈哈哈哈 期待可以与你们再相遇 手动比心～',
          'evaluatePersonCode': '5170ab73-f23e-4d24-95c3-5e417c84c857',
          'evaluatePersonName': '',
          'evaluatePersonPhone': '13698090711',
          'evaluateTime': '2019-04-26 12:07',
          'lowEvaluateManagerFeedbackStatus': 0,
          'lowEvaluateManagerName': null,
          'lowEvaluateManagerFeedbackTime': null,
          'lowEvaluateManagerFeedbackRemark': null,
          'followUpStatus': 0,
          'evaluateStatus': 1,
          'starList': [{
            'lowEvaluateBid': '252',
            'answerContent': '5',
            'answerScore': null,
            'questionType': 7,
            'questionContent': '环境',
            'answerSignCode': '5'
          }, {
            'lowEvaluateBid': '253',
            'answerContent': '5',
            'answerScore': null,
            'questionType': 7,
            'questionContent': '卫生',
            'answerSignCode': '5'
          }, {
            'lowEvaluateBid': '251',
            'answerContent': '5',
            'answerScore': null,
            'questionType': 7,
            'questionContent': '服务',
            'answerSignCode': '5'
          }],
          'labelList': [{
            'lowEvaluateBid': '247',
            'answerContent': '环境好',
            'answerScore': '1',
            'questionType': 4,
            'questionContent': '标签',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '247',
            'answerContent': '公区有趣',
            'answerScore': '6',
            'questionType': 4,
            'questionContent': '标签',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '247',
            'answerContent': '网速快',
            'answerScore': '5',
            'questionType': 4,
            'questionContent': '标签',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '247',
            'answerContent': '干净整洁',
            'answerScore': '3',
            'questionType': 4,
            'questionContent': '标签',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '247',
            'answerContent': '位置好',
            'answerScore': '4',
            'questionType': 4,
            'questionContent': '标签',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '247',
            'answerContent': '性价比高',
            'answerScore': '7',
            'questionType': 4,
            'questionContent': '标签',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '247',
            'answerContent': '服务贴心',
            'answerScore': '2',
            'questionType': 4,
            'questionContent': '标签',
            'answerSignCode': null
          }],
          'urlList': [{
            'lowEvaluateBid': '248',
            'answerContent': 'http://image.ziroom.com/g2m2/M00/0A/C1/CtgFCVzChB2AYAWCAAENQC1JFaU819.jpg',
            'answerScore': null,
            'questionType': 5,
            'questionContent': '图片URL',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '248',
            'answerContent': 'http://image.ziroom.com/g2m2/M00/0A/C3/CtgFCFzChA-AEtKeAADDck8vf8w608.jpg',
            'answerScore': null,
            'questionType': 5,
            'questionContent': '图片URL',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '248',
            'answerContent': 'http://image.ziroom.com/g2m2/M00/0A/C1/CtgFCVzChB2AcwujAAE2RcZb_xc140.jpg',
            'answerScore': null,
            'questionType': 5,
            'questionContent': '图片URL',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '248',
            'answerContent': 'http://image.ziroom.com/g2m2/M00/0A/C1/CtgFCVzChB2ATy2YAAG4qnU9URE983.jpg',
            'answerScore': null,
            'questionType': 5,
            'questionContent': '图片URL',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '248',
            'answerContent': 'http://image.ziroom.com/g2m2/M00/0A/C3/CtgFCFzChA-AVPjmAAHXbR7ikBk424.jpg',
            'answerScore': null,
            'questionType': 5,
            'questionContent': '图片URL',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '248',
            'answerContent': 'http://image.ziroom.com/g2m2/M00/0A/C3/CtgFCFzChA-AXqiCAAHauMrZg4U191.jpg',
            'answerScore': null,
            'questionType': 5,
            'questionContent': '图片URL',
            'answerSignCode': null
          }, {
            'lowEvaluateBid': '248',
            'answerContent': 'http://image.ziroom.com/g2m2/M00/0A/C1/CtgFCVzChB2AVL0SABGyysxEsAY837.jpg',
            'answerScore': null,
            'questionType': 5,
            'questionContent': '图片URL',
            'answerSignCode': null
          }]
        }
      ],
      replyDto: {
        lowEvaluateRecordCode: 0,
        feedbackRemark: ''
      },
      evalShieldDto: {
        recordId: 0,
        isValid: 0
      },
      replyRules: {
        feedbackRemark: [
          { required: true, message: '请输入回复内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    listEvaluate (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      getEvaluate(this.evalParamDto).then(res => {
        if (res.data.status === 200) {
          this.evaluateList = res.data.body.list
          this.total = res.data.body.total
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
    openReplyModal (row) {
      if (row.lowEvaluateManagerFeedbackStatus === 0) {
        this.replyTitle = '回复评价'
      } else {
        this.replyTitle = '编辑回复'
      }
      this.replyDto.lowEvaluateRecordCode = row.logicCode
      this.replyDto.feedbackRemark = row.lowEvaluateManagerFeedbackRemark
      this.replyDto.lowEvaluateManagerFeedbackTime = row.lowEvaluateManagerFeedbackTime
      this.replyDto.feedbackerName = row.lowEvaluateManagerName
      this.replyVisible = true
    },
    replyValid () {
      this.$refs.replyForm.validate((valid) => {
        if (valid) {
          this.reply()
        } else {
          this.handleError()
        }
      })
    },
    handleError () {
      setTimeout(() => {
        this.replyLoading = false
        this.$nextTick(() => {
          this.replyLoading = true
        })
      }, 500)
    },
    reply () {
      reply(this.replyDto).then(res => {
        if (res.data.status === 200) {
          this.$Message.success('回复成功')
          setTimeout(function () {
            this.handlePageChange()
          }, this.delay)
          this.replyVisible = false
        } else {
          this.$Message.warning(res.message)
          this.handleError()
        }
      })
    },
    confirmShieldEvaluate (row) {
      let ti = ''
      let val = 0
      if (row.evaluateStatus === 1) {
        ti = '屏蔽后，用户将无法在APP中查看到该评价，'
        val = 0
      } else {
        ti = '展示后，用户可以在APP中查看到该评价，'
        val = 1
      }
      this.$Modal.confirm({
        title: '通知',
        content: `<p>${ti}</p><p>继续吗？</p>`,
        onOk: () => {
          this.shieldValuate(row, val)
        },
        onCancel: () => {
        }
      })
    },
    shieldValuate (row, val) {
      this.evalShieldDto.recordId = row.logicCode
      this.evalShieldDto.isValid = val
      shieldValuate(this.evalShieldDto).then(res => {
        if (res.code === 200) {
          this.$Message.success('操作成功')
          setTimeout(function () {
            this.handlePageChange()
          }, this.delay)
        } else {
          this.$Message.warning(res.message)
        }
      })
    },
    validateTextarea () {
      var vm = this
      if (vm.replyDto.feedbackRemark === null || vm.replyDto.feedbackRemark === '') {
        this.$Message.warning('请先填写回复内容')
        return false
      }
      return true
    }
  },
  watch: {
    'replyDto.feedbackRemark': {
      handler (val) {
        // this.replyDto.feedbackRemark = val.replace(/[\"\<\>\;\:\\]/g, ' ')
      }
    }
  },
  filters: {
    dateFilter (val) {
      return getDate(val, 'all')
    }
  },
  created () {
    this.projectScore()
    this.handlePageChange(0)
  }
}
</script>
<style lang="less" scoped>
  .my-card {
    margin-top: 20px;
    -webkit-box-shadow: #dcdee2 0 1px 6px;
    -moz-box-shadow: #dcdee2 0 1px 6px;
    box-shadow: #dcdee2 0 1px 6px;
  }

  .my-page {
    text-align: right;
    margin-top: 20px
  }

  .no-data {
    height: 100px;
    text-align: center;
    padding-top: 40px;
    color: #909399;
  }
</style>
