<template>
  <Form :model="paramDto" :label-width="80">
    <Row :gutter="20">
      <Col :span="8">
        <FormItem label="项目">
          <Select v-model="paramDto.projectBid" placeholder="" clearable>
            <Option
              v-for="item in $store.state.user.projectList"
              :key="item.bid"
              :label="item.projectName"
              :value="item.bid">
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="订单编号">
          <Input v-model.trim="paramDto.orderNumber" placeholder="" :maxlength="20"></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="评价日期">
          <DatePicker v-model="paramDto.evaluateTime" type="daterange" split-panels placeholder=""
                      class="full-width" clearable></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col :span="8">
        <FormItem label="处理状态">
          <Select v-model="paramDto.followUpStatus" placeholder="" clearable>
            <Option
              v-for="item in dealStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="总分区间">
          <Select v-model="paramDto.totalScore" placeholder="" clearable>
            <Option
              v-for="item in totalScoreOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col :span="12">
        <Button type="primary" @click="search">查 询</Button>
      </Col>
      <Col :span="12" :style="{ textAlign: 'right' }">
        <count-to :end="totalScore" :count-class="countText" :decimals="1">
          <span class="slot-text" slot="left">项目总体评星:&nbsp;</span>
        </count-to>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getDate } from '@/libs/tools'
import countTo from '_c/count-to'

export default {
  name: 'lowEvaluateForm',
  props: {
    totalScore: {
      type: Number,
      default: 5
    }
  },
  components: {
    countTo
  },
  data () {
    return {
      paramDto: {
        projectBid: this.$store.state.user.projectList[0],
        orderNumber: '',
        evaluateTime: [],
        startDate: '',
        endDate: '',
        totalScore: '',
        followUpStatus: '',
        pageFlag: true
      },
      dealStatusOptions: [
        {
          value: 1,
          label: '已提醒'
        },
        {
          value: 2,
          label: '跟进中'
        },
        {
          value: 3,
          label: '已完结'
        }
      ],
      totalScoreOptions: [
        {
          value: 4,
          label: '4.0~4.5 (不含4.0)'
        },
        {
          value: 3,
          label: '3.5~4.0 (不含3.5)'
        },
        {
          value: 2,
          label: '3.5及其以下'
        }
      ],
      countText: {
        fontSize: '22px',
        color: '#2d8cf0'
      }
    }
  },
  methods: {
    search () {
      this.$emit('search', this.paramDto)
    }
  },
  watch: {
    'paramDto.evaluateTime' (val) {
      this.paramDto.startDate = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.endDate = val[1] ? getDate(val[1], 'date') : ''
    }
  }
}
</script>
<style lang="less" scoped>
  .full-width {
    width: 100%;
  }

  .my-span {
    line-height: 32px;
    font-size: 18px;
  }
  .slot-text{
    font-size: 18px;
  }
</style>
