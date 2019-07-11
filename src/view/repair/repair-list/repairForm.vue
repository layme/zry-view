<template>
  <Form :model="paramDto" :label-width="60">
    <Row :gutter="20">
      <Col :span="8">
        <FormItem label="区域">
          <Select v-model="paramDto.spaceid" placeholder="" clearable>
            <Option
              v-for="item in areaOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="大类">
          <Select v-model="paramDto.categoryCode" placeholder="" clearable>
            <Option
              v-for="item in goodsOptions"
              :key="item.typeCode"
              :label="item.typeName"
              :value="item.typeCode">
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="物品">
          <Select v-model="paramDto.goodsCode" placeholder="" clearable>
            <Option
              v-for="item in goodOptions"
              :key="item.goodsCode"
              :label="item.goodsName"
              :value="item.goodsCode"
              :disabled="item.disabled">
            </Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col :span="8">
        <FormItem label="状态">
          <Select v-model="paramDto.orderStatus" placeholder="" clearable>
            <Option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="创建时间">
          <DatePicker v-model="paramDto.createTime" type="daterange" split-panels placeholder=""
                      class="full-width" clearable></DatePicker>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="上门时间">
          <DatePicker v-model="paramDto.visitTime" type="daterange" split-panels placeholder=""
                      class="full-width" clearable></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col :span="8">
        <FormItem label="关键字">
          <Input v-model.trim="paramDto.keyWords" :maxlength="10" clearable
                 placeholder="报修人、联系人、房间号、功能区 10字以内"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <Button type="primary" icon="ios-search" @click="search"> 查 询</Button>
      </Col>
      <Col span="12" style="text-align: right">
        <Button type="primary" @click="create">在线报修</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getDate } from '@/libs/tools'
export default {
  name: 'repairForm',
  props: {
    areaOptions: Array,
    goodsOptions: Array
  },
  data () {
    return {
      paramDto: {
        projectFid: this.$store.state.user.currentProject.bid,
        spaceid: '',
        categoryCode: '',
        goodsCode: '',
        orderStatus: '',
        createTime: [],
        createTimeStart: '',
        createTimeEnd: '',
        visitTime: [],
        visitTimeStart: '',
        visitTimeEnd: '',
        keyWords: ''
      },
      // 物品
      statusOptions: [
        { value: 'TO_SEND', text: '待自如派单' },
        { value: 'TO_BE_ASSIGNED', text: '待供应商派工' },
        { value: 'WAITING', text: '待师傅接单' },
        { value: 'SIGN', text: '待师傅签到' },
        { value: 'UPPER_DOOR', text: '已上门' },
        { value: 'GENERATE_PLAN', text: '已生成维修方案' },
        { value: 'COMPLETE', text: '已完成' },
        { value: 'CANCEL', text: '已取消' }
      ]
    }
  },
  computed: {
    goodOptions () {
      if (this.paramDto.categoryCode) {
        return this.goodsOptions.find(item => item.typeCode === this.paramDto.categoryCode).goodsList
      } else {
        return []
      }
    }
  },
  methods: {
    search () {
      this.$emit('search', this.paramDto)
    },
    create () {
      this.$emit('create')
    }
  },
  watch: {
    'paramDto.createTime' (val) {
      this.paramDto.createTimeStart = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.createTimeEnd = val[1] ? getDate(val[1], 'date') : ''
    },
    'paramDto.visitTime' (val) {
      this.paramDto.visitTimeStart = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.visitTimeEnd = val[1] ? getDate(val[1], 'date') : ''
    },
    '$store.state.user.currentProject' (val) {
      this.paramDto.projectBid = val.bid
      this.search()
    }
  },
  created () {
    this.search()
  }
}
</script>
<style lang="less" scoped>
  .full-width {
    width: 100%;
  }
</style>
