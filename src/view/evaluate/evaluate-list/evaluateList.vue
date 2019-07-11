<template>
  <div>
    <evaluate-form @search="listEvaluate"></evaluate-form>
    <div class="full-top">
      <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
      <evaluate-card class="my-card" v-for="(item, index) in evaluateList" :key="index" :row="item"
                     :index="index" @link="toOrderDetail" @reply="openReplyModal"
                     @shield="confirmShieldEvaluate"></evaluate-card>
      <Card v-if="!evaluateList.length" class="my-card">
        <div class="no-data">
          <span>没有找到匹配的记录</span>
        </div>
      </Card>
    </div>
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
        <span>回复时间：{{ replyDto.lowEvaluateManagerFeedbackTime | dateTimeFilter }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
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
      delay: 1000,
      replyVisible: false,
      replyLoading: true,
      replyTitle: '',
      total: 0,
      evaluateList: [],
      replyDto: {
        lowEvaluateRecordCode: 0,
        feedbackRemark: ''
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
      this.loading = true
      this.$delete(this.paramDto, 'evaluateTime')
      getEvaluate(this.paramDto).then(res => {
        this.evaluateList = res.body.rows
        this.total = res.body.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    projectScore () {
      getProjectScore(this.$store.state.user.currentProject.bid).then(res => {
        this.totalScore = res.data
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
        this.$Message.success('回复成功，数据稍后刷新')
        setTimeout(() => {
          this.handlePageChange()
        }, this.delay)
        this.replyVisible = false
      }).catch(() => {
        this.handleError()
      })
    },
    confirmShieldEvaluate (row) {
      let ti = ''
      let action = ''
      let val = 0
      if (row.evaluateStatus === 1) {
        ti = '屏蔽后，用户将无法在APP中查看到该评价，'
        action = '屏蔽'
        val = 0
      } else {
        ti = '展示后，用户可以在APP中查看到该评价，'
        action = '展示'
        val = 1
      }
      this.$Modal.confirm({
        title: '通知',
        content: `<p>${ti}</p><p>继续吗？</p>`,
        onOk: () => {
          this.shieldValuate(row, val, action)
        },
        onCancel: () => {
        }
      })
    },
    shieldValuate (row, val, action) {
      let evalShieldDto = {
        recordId: row.logicCode,
        isValid: val
      }
      shieldValuate(evalShieldDto).then(res => {
        this.$Message.success(`${action}成功`)
        setTimeout(() => {
          this.handlePageChange()
        }, this.delay)
      })
    }
  },
  watch: {
    'replyDto.feedbackRemark': {
      handler (val) {
        // this.replyDto.feedbackRemark = val.replace(/[\"\<\>\;\:\\]/g, ' ')
      }
    }
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

  .full-top {
    position: relative;
    min-height: 300px;
    height: 100%;
  }

  .full-spin {
    height: 100%;
  }
</style>
