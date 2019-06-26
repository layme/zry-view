<template>
  <Row class="full-top">
    <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
    <Col :span="20">
      <Form :model="activity" :label-width="100">
        <Row :gutter="20">
          <Col :span="12">
            <FormItem label="优惠活动编号：">
              <span>{{ activity.activityNumber }}</span>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="优惠活动名称：">
              <span>{{ activity.activityName }}</span>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="12">
            <FormItem label="活动时间：">
              <span>{{ activity.activityStartDateStr }}</span>
              至
              <span>{{ activity.activityEndDateStr }}</span>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="活动内容：" prop="activityContent">
              <span>{{ activity.activityContent }}</span>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="使用条件：">
          <span>{{ activity | conditionFilter }}</span>
        </FormItem>
        <FormItem label="优惠券：">
          <Table stripe :columns="columns" :data="activity.tickBatchDto" size="small">
            <template slot-scope="{ row }" slot="action">
              <a v-if="row.createTicketTime" @click="showTicketDetail(row)">详情</a>
              <a v-else @click="removeTicket(row)" style="color: #ed4014">移除</a>
            </template>
          </Table>
          <a v-if="activity.tickBatchDto" @click="visible = true">追加优惠券</a>
        </FormItem>
        <FormItem v-if="ticket.length">
          <Button type="primary" @click="saveTicket">保存优惠券</Button>
        </FormItem>
      </Form>
    </Col>
    <Modal
      v-model="visible"
      title="追加优惠券"
      :loading="modalLoading"
      @on-ok="addTicket">
      <ticket-form ref="ticketForm" :batch-number="activity.tickBatchDto.length + 1" v-if="visible" @push="handlePush"></ticket-form>
    </Modal>
  </Row>
</template>
<script>
import ticketForm from '../components/ticketForm.vue'
import { getActivityDetail, saveActivity } from '@/api/activity'
export default {
  name: 'activityDetail',
  components: {
    ticketForm
  },
  data () {
    return {
      loading: false,
      activityBid: '',
      activity: {},
      columns: [
        {
          title: '批次号',
          key: 'batchNumber'
        },
        {
          title: '添加人',
          key: 'createTicketUser'
        },
        {
          title: '添加时间',
          key: 'createTicketTime'
        },
        {
          title: '数量',
          key: 'countTicket'
        },
        {
          title: '金额 / 元',
          key: 'amount'
        },
        {
          title: '操作',
          slot: 'action',
          width: 60
        }
      ],
      visible: false,
      modalLoading: true,
      datePickerOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      ticket: []
    }
  },
  methods: {
    getActivityDetail () {
      this.loading = true
      this.activityBid = this.$route.query.activityBid
      getActivityDetail(this.activityBid).then(res => {
        if (res.code === 200) {
          this.activity = res.body
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    addTicket () {
      this.$refs.ticketForm.validForm()
      setTimeout(() => {
        this.modalLoading = false
        this.$nextTick(() => {
          this.modalLoading = true
        })
      }, 500)
    },
    showTicketDetail (row) {
      const batchNumber = row.batchNumber
      const activityNumber = this.activity.activityNumber
      const route = {
        name: 'couponList',
        query: {
          batchNumber,
          activityNumber
        }
      }
      this.$router.push(route)
    },
    handlePush (val) {
      this.ticket.push(val)
      this.activity.tickBatchDto.push(
        {
          amount: val.amount,
          batchNumber: val.batchNumber,
          countTicket: val.quantity,
          createTicketTime: '',
          createTicketUser: this.$store.state.user.username
        }
      )
      this.visible = false
    },
    removeTicket (row) {
      this.ticket.splice(this.ticket.indexOf(this.ticket.find(item => item.batchNumber === row.batchNumber)), 1)
      this.activity.tickBatchDto.splice(this.activity.tickBatchDto.indexOf(this.activity.tickBatchDto.find(item => item.batchNumber === row.batchNumber)), 1)
    },
    saveTicket () {
      let dto = {
        activityBid: this.activity.activityBid,
        activityNumber: this.activity.activityNumber,
        ticketInfo: this.ticket
      }
      saveActivity(dto).then(res => {
        if (res.code === 200) {
          this.$Message.success('保存成功')
          this.getActivityDetail()
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.getActivityDetail()
    }
  },
  created () {
    this.getActivityDetail()
  },
  filters: {
    conditionFilter (val) {
      // 拼使用条件
      let limitMoney = val.limitMoney
      let activityCondition = val.activityCondition
      let condition = ''
      if (limitMoney) {
        condition = condition + '消费满 ' + limitMoney + ' 元可用'
      }
      if (activityCondition) {
        condition = condition + '、' + activityCondition
      }
      return condition
    }
  }
}
</script>
<style lang="less" scoped>
  .full-top {
    position: relative;
    height: 100%;
  }

  .full-spin {
    height: 100%;
  }
</style>
