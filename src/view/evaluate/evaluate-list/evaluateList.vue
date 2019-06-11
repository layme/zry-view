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
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageIndex"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>

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
        <span>发表于：{{ replyDto.lowEvaluateManagerFeedbackTime | dateTimeFilter }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>回复员工：{{ replyDto.feedbackerName }}</span>
      </div>
    </Modal>
  </div>
</template>
<script>
import evaluateForm from './evaluateForm.vue'
import evaluateCard from './evaluateCard.vue'
import { getEvaluate, getProjectScore, shieldValuate, reply } from '@/api/evaluate'

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
        pageIndex: 1,
        pageSize: 5
      },
      loading: false,
      delay: 1500,
      replyVisible: false,
      replyLoading: true,
      replyTitle: '',
      haveData: true,
      total: 0,
      evaluateList: [],
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
      this.paramDto.pageIndex = 1
      this.handlePageChange()
      this.projectScore(this.paramDto.projectBid)
    },
    handlePageChange () {
      this.$delete(this.paramDto, 'evaluateTime')
      getEvaluate(this.paramDto).then(res => {
        if (res.code === 200) {
          this.evaluateList = res.body.list
          this.total = res.body.total
          this.haveData = this.total > 0
        } else {
          this.haveData = false
        }
      })
    },
    projectScore (projectBid) {
      getProjectScore(projectBid).then(res => {
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
  created () {
    this.projectScore()
    this.handlePageChange()
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
