<template>
  <div>
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
    <Button class="special-btn" type="warning" @click="confirmBlack">{{ guestInfo.isBlack | isBlackBtnFilter }}</Button>
  </div>
</template>
<script>
import { getGuests, addORemoveBlack } from '@/api/guest'

export default {
  name: 'guestInfo',
  props: {
    guestFid: String
  },
  data () {
    return {
      guestDto: {
        fid: this.guestFid,
        pageIndex: 1,
        pageSize: 1
      },
      guestInfo: {},
      guestBlackDto: {
        guestFid: '',
        currentStatus: 0
      }
    }
  },
  methods: {
    getGuestInfo () {
      getGuests(this.guestDto).then(res => {
        if (res.code === 200) {
          this.guestInfo = res.body.rows[0]
        }
      })
      this.guestInfo = {}
    },
    // 黑名单操作确认
    confirmBlack () {
      let text = this.guestInfo.isBlack === 1 ? '转为正常用户' : '转为特殊用户'
      this.$Modal.confirm({
        title: '通知',
        content: `<p>该用户将被${text}，继续？</p>`,
        onOk: () => {
          this.addORemoveBlack()
        },
        onCancel: () => {
        }
      })
    },
    // 特殊用户操作
    addORemoveBlack () {
      this.guestBlackDto.guestFid = this.guestInfo.fid
      this.guestBlackDto.currentStatus = this.guestInfo.isBlack
      addORemoveBlack(this.guestBlackDto).then(res => {
        if (res.code === 200) {
          this.guestInfo.isBlack = res.body
          this.$Message.success('操作成功')
        }
      })
    }
  },
  created () {
    this.getGuestInfo()
  },
  filters: {
    genderFilter (val) {
      return val === 2 ? '男' : val === 1 ? '女' : '未知'
    },
    isBlackBtnFilter (val) {
      return val === 1 ? '转为正常用户' : '转为特殊用户'
    }
  }
}
</script>
<style lane="less" scoped>
  .special-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
</style>
