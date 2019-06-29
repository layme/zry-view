<template>
  <div>
    <Divider orientation="left">基本信息</Divider>
    <div style="margin: 0 200px">
      <Form :model="repair" :label-width="90">
        <Row :gutter="20">
          <Col :span="8">
            <FormItem label="维修单号：">
              <span>{{ repair.orderCommon.billNum }}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="维修单状态：">
              <span>{{ repair.orderCommon.orderStateName }}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="地址：">
              <span>{{ repair.orderCommon.address }}</span>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="8">
            <FormItem label="联系人：">
              <span>{{ repair.orderCommon.contactName }}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="联系电话：">
              <span>{{ repair.orderCommon.contactPhone }}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="上门时间：">
              <span>{{ repair.orderCommon.reserveDate | dateFilter }} {{ repair.orderCommon.reservePeroid }}</span>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <Divider orientation="left">维修内容</Divider>
    <div style="margin: 0 200px">
      <Form :model="repair" :label-width="90">
        <Row :gutter="20">
          <Col :span="8">
            <FormItem label="大类：">
              <span>{{ repair.orderCommon.categoryFirstName }}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="区域：">
              <span>{{ repair.orderCommon.spaceName }}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="物品：">
              <span>{{ repair.orderCommon.serviceName }}</span>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col :span="8">
            <FormItem label="故障描述：">
              <span>{{ repair.orderCommon.tagsName }}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="备注：">
              <span>{{ repair.orderCommon.description }}</span>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <Divider orientation="left">维修师傅信息</Divider>
    <div style="margin: 0 200px">
      <Form :model="repair" :label-width="90">
        <Row :gutter="20">
          <Col :span="8">
            <FormItem label="师傅姓名：">
              <span>{{ repair.orderCommon.servicerName }}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="师傅手机号：">
              <span>{{ repair.orderCommon.servicerPhone }}</span>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="派单时间：">
              <span>{{ repair.orderCommon.assignOrderTime | dateFilter }}</span>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import { getDetail } from '@/api/repair'

export default {
  name: 'repairDetail',
  data: function () {
    return {
      loading: false,
      repair: {
        orderCommon: {
          billNum: '',
          orderStateName: '',
          address: '',
          contactName: '',
          contactPhone: '',
          reserveDate: '',
          categoryFirstName: '',
          spaceName: '',
          serviceName: '',
          tagsName: '',
          description: '',
          servicerName: '',
          servicerPhone: '',
          assignOrderTime: ''
        }
      }
    }
  },
  methods: {
    getDetail () {
      getDetail(this.$route.query.orderSn).then(res => {
        if (res.code === 200) {
          this.repair = res.body
        } else {
          this.$Message.warning(res.message)
        }
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.getDetail()
    }
  },
  created () {
    this.getDetail()
  }
}
</script>
<style lang="less" scoped>
</style>
