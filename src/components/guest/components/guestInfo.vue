<template>
  <Form :model="guestInfo" :label-width="120">
    <Row :gutter="20">
      <Col span="12">
        <FormItem label="性 别：">
          <span>{{ guestInfo.gender | genderFilter }}</span>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="累计入住：">
          <span>{{ guestInfo.checkInTimes + ' 次' }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <FormItem label="籍 贯：">
          <span>{{ guestInfo.birthplace }}</span>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="最近入住项目：">
          <span>{{ guestInfo.lastProjectName ? guestInfo.lastProjectName : '自如民宿' }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <FormItem label="出生日期：">
          <span>{{ guestInfo.birth }}</span>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="最近入住时间：">
          <span>{{ guestInfo.lastCheckIn | dateFilter }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <FormItem label="证件类型：">
          <span>{{ guestInfo.idType | idTypeFilter }}</span>
        </FormItem>
      </Col>
      <Col span="12">
        <FormItem label="手机号码：">
          <span>{{guestInfo.mobile}}</span>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <FormItem label="证件号码：">
          <span>{{ guestInfo.idNumber }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <FormItem label="证件地址：">
          <span>{{ guestInfo.idAddress }}</span>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getDate } from '@/libs/tools'

export default {
  name: 'guestInfoCard',
  props: {
    idNumber: String,
    guest: Object
  },
  data () {
    return {
      guestInfo: this.guest
    }
  },
  methods: {
    getGuestInfo () {
      console.info(this.idNumber)
      this.guestInfo = {
        'fid': '8c0364f40f3d11e9be1200ffe680200f',
        'name': '蒋东',
        'gender': 2,
        'idType': 1,
        'idNumber': '33032419910328****',
        'birthplace': null,
        'birth': '1991-03-28',
        'idAddress': null,
        'mobile': '134****1245',
        'checkInTimes': 28,
        'lastProjectName': '北京CBD自如驿',
        'lastCheckIn': 1558195200000,
        'isBlack': 0
      }
    }
  },
  created () {
    if (!this.guestInfo) {
      this.getGuestInfo()
    }
  },
  filters: {
    genderFilter (val) {
      return val === 2 ? '男' : val === 1 ? '女' : '未知'
    },
    dateFilter (val) {
      return getDate(val, 'date')
    },
    idTypeFilter (val) {
      switch (val) {
        case 0:
          return '其他'
        case 1:
          return '身份证'
        case 2:
          return '护照'
        case 3:
          return '军官证'
        case 4:
          return '通行证'
        case 5:
          return '驾驶证'
        case 6:
          return '台胞证'
        case 7:
          return '社保卡'
        case 8:
          return '省份证'
        case 9:
          return '社保卡'
        case 10:
          return '学生证'
        case 11:
          return '回乡证'
        case 12:
          return '营业执照'
        case 13:
          return '港澳通行证'
        case 14:
          return '户口本'
        case 15:
          return '居住证'
        case 16:
          return '营业执照'
      }
    }
  }
}
</script>
<style lane="less" scoped>
</style>
