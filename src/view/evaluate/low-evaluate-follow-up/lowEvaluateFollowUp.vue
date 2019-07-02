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
      <follow-up ref="followUpForm" :lowEvaluateBid="evaluate.bid" style="margin: 0 200px"
                 @submit="followUp" @finish="confirmFinish"></follow-up>
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
      evaluate: {},
      haveData: true,
      followRecords: [],
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
        this.evaluate = res.body.rows[0]
        this.listLowEvalFollowUp()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    // 查询低评跟进记录
    listLowEvalFollowUp () {
      this.evalFollowUpDto.lowEvaluateBid = this.evaluate.bid
      this.evalFollowUpDto.content = ''
      getFollowUp(this.evalFollowUpDto).then(res => {
        this.followRecords = res.body
        this.haveData = this.followRecords.length > 0
      }).catch(() => {
        this.haveData = false
      })
    },

    // 提交跟进情况
    followUp (dto) {
      dto.followUpStatus = 2
      this.insertLowEvalFollowUp(dto)
    },

    confirmFinish (dto) {
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确认完结后，将无法再修改,</p><p>继续吗？</p>`,
        onOk: () => {
          this.finish(dto)
        },
        onCancel: () => {
        }
      })
    },
    // 低评完结
    finish (dto) {
      if (!dto.content) {
        dto.content = '完结'
      }
      dto.followUpStatus = 3
      this.insertLowEvalFollowUp(dto)
    },

    // 保存低评跟进情况描述
    insertLowEvalFollowUp (dto) {
      saveFollowUp(dto).then(res => {
        this.$Message.success('操作成功')
        // 局部更新低评跟进过程
        this.listLowEvalFollowUp()
        // 更新低评处理状态
        this.evaluate.followUpStatus = dto.followUpStatus
        this.$refs.followUpForm.reset()
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
