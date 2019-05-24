<template>
  <Row>
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
              <span>{{ activity.startDate }}</span>
              至
              <span>{{ activity.endDate }}</span>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="活动内容：" prop="activityContent">
              <span>{{ activity.activityContent }}</span>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="使用条件：">
          <span>{{ activity.condition }}</span>
        </FormItem>
        <FormItem label="优惠券：">
          <Table stripe :columns="columns" :data="activity.tickBatchDto" size="small">
            <template slot-scope="{ row }" slot="action">
              <a @click="showTicketDetail(row)">详情</a>
            </template>
          </Table>
          <a v-if="activity.tickBatchDto.length < 99" @click="visible = true">追加优惠券</a>
        </FormItem>
      </Form>
    </Col>
    <Modal
      v-model="visible"
      title="追加优惠券"
      :loading="loading"
      @on-ok="saveTicket">
      <ticket-form ref="ticketForm" :batch-number="activity.tickBatchDto.length + 1" v-if="visible" @push="handlePush"></ticket-form>
    </Modal>
  </Row>
</template>
<script>
import ticketForm from '../components/ticketForm.vue'
export default {
  name: 'activityDetail',
  components: {
    ticketForm
  },
  data () {
    return {
      activityBid: '',
      activity: {
        activityNumber: 'S19052102',
        activityName: '巨幕电影',
        startDate: '2019-05-21',
        endDate: '2019-05-25',
        activityContent: '淡淡淡淡地地道道的多多多',
        condition: '满500.0可用',
        tickBatchDto: [
          {
            batchNumber: '01',
            createTicketUser: '60006896',
            createTicketTime: '2019-05-24 10:16:34',
            countTicket: 1,
            amount: 10
          }
        ]
      },
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
      loading: true,
      datePickerOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  methods: {
    getActivityDetail () {
      this.activityBid = this.$route.query.activityBid
    },
    saveTicket () {
      this.$refs.ticketForm.validForm()
      setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    showTicketDetail (row) {},
    handlePush (val) {
      this.visible = false
    }
  },
  watch: {
    '$route' (to, from) {
      this.getActivityDetail()
    }
  },
  created () {
    this.getActivityDetail()
  }
}
</script>
<style lang="less" scoped>
</style>
