<template>
  <Card dis-hover>
    <Form :model="paramDto" :label-width="70">
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="顾客: ">
            {{ guest.guestName }}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="床位: ">
            {{ guest.bedInfo }}
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="获知渠道">
            <Select v-model="paramDto.channelCode" placeholder="" clearable>
              <Option v-for="channel in channelOptions" :key="channel.dicCode" :label="channel.showName"
                      :value="channel.dicCode"></Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="到达目的">
            <Select v-model="paramDto.purposeCode" placeholder="" clearable>
              <Option v-for="purpose in purposeOptions" :key="purpose.dicCode" :label="purpose.showName"
                      :value="purpose.dicCode"></Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="印象深刻">
            <Select v-model="paramDto.areaCode" placeholder="" clearable>
              <Option v-for="area in areaOptions" :key="area.dicCode" :label="area.showName" :value="area.dicCode"></Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="24">
          <FormItem label="意见建议">
            <Input type="textarea" v-model.trim="paramDto.suggest" placeholder="" :row="2" :maxlength="200"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" @click="saveGuestInfo">保 存</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { saveGuestInfo } from '@/api/guest'
export default {
  name: 'guestInfoCollectCard',
  props: {
    guest: Object,
    channelOptions: Array,
    purposeOptions: Array,
    areaOptions: Array
  },
  data () {
    return {
      paramDto: {
        areaCode: '',
        areaName: '',
        bedInfo: '',
        channelCode: '',
        channelName: '',
        checkInDate: '',
        guestFid: '',
        guestName: '',
        orderBid: '',
        orderNumber: '',
        purposeCode: '',
        purposeName: '',
        suggest: ''
      }
    }
  },
  methods: {
    init () {
      this.paramDto.areaCode = this.guest.areaCode
      this.paramDto.areaName = this.guest.areaName
      this.paramDto.bedInfo = this.guest.bedInfo
      this.paramDto.channelCode = this.guest.channelCode
      this.paramDto.channelName = this.guest.channelName
      this.paramDto.checkInDate = this.guest.checkInDate
      this.paramDto.guestFid = this.guest.guestFid
      this.paramDto.guestName = this.guest.guestName
      this.paramDto.orderBid = this.guest.orderBid
      this.paramDto.orderNumber = this.guest.orderNumber
      this.paramDto.purposeCode = this.guest.purposeCode
      this.paramDto.purposeName = this.guest.purposeName
      this.paramDto.suggest = this.guest.suggest
    },
    saveGuestInfo () {
      this.fillDto()
      saveGuestInfo(this.paramDto).then(() => {
        this.$Message.success('保存成功')
        this.$emit('fresh')
      })
    },
    fillDto () {
      if (this.paramDto.channelCode) {
        this.paramDto.channelName = this.channelOptions.find(x => x.dicCode === this.paramDto.channelCode).showName
      }
      if (this.paramDto.purposeCode) {
        this.paramDto.purposeName = this.purposeOptions.find(x => x.dicCode === this.paramDto.purposeCode).showName
      }
      if (this.paramDto.areaCode) {
        this.paramDto.areaName = this.areaOptions.find(x => x.dicCode === this.paramDto.areaCode).showName
      }
    }
  },
  watch: {
    guest: {
      handler () {
        this.init()
      },
      deep: true
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
