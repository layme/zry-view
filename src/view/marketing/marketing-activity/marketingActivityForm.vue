<template>
  <Form ref="activityForm" :model="paramDto" :rules="activityRules" :label-width="75">
    <FormItem label="活动项目" prop="projectBid">
      <Select v-model="paramDto.projectBid" placeholder="">
        <Option
          v-for="item in $store.state.user.projectList"
          :key="item.bid"
          :label="item.projectName"
          :value="item.bid">
        </Option>
      </Select>
    </FormItem>
    <FormItem label="活动标题" prop="title">
      <Input v-model.trim="paramDto.title" placeholder="" clearable></Input>
    </FormItem>
    <FormItem label="副标题" prop="subTitle">
      <Input v-model.trim="paramDto.subTitle" placeholder="" clearable></Input>
    </FormItem>
    <FormItem label="活动日期" prop="dateRange">
      <DatePicker v-model="paramDto.dateRange" type="daterange" split-panels placeholder=""
                  :editable="false" class="my-date-picker"></DatePicker>
    </FormItem>
    <FormItem label="活动链接" prop="jumpLink">
      <Input v-model.trim="paramDto.jumpLink" placeholder="" clearable></Input>
    </FormItem>
    <Row :gutter="20">
      <Col :span="12">
        <FormItem label="显示顺序" prop="imgIndex">
          <Input v-model.trim="paramDto.imgIndex" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="是否跳转" prop="isJump">
          <RadioGroup v-model="paramDto.isJump">
            <Radio :label="1">是</Radio>
            <Radio :label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getDate } from '@/libs/tools'
export default {
  name: 'marketingActivityForm',
  props: {
    activity: Object
  },
  data () {
    return {
      paramDto: {
        projectBid: '',
        title: '',
        subTitle: '',
        dateRange: [],
        startDate: '',
        endDate: '',
        jumpLink: '',
        imgIndex: '',
        isJump: ''
      },
      activityRules: {
        projectBid: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        title: [
          { required: true, type: 'string', message: '请输入标题', trigger: 'blur' }
        ],
        subTitle: [
          { required: true, type: 'string', message: '请输入副标题', trigger: 'blur' }
        ],
        dateRange: [
          { required: true,
            type: 'array',
            fields: {
              0: { type: 'date', required: true, message: '请选择活动日期' },
              1: { type: 'date', required: true, message: '请选择活动日期' }
            },
            trigger: 'change' }
        ],
        jumpLink: [
          { required: true, type: 'string', message: '请输入活动链接', trigger: 'blur' }
        ],
        imgIndex: [
          { required: true, type: 'string', message: '请输入显示顺序', trigger: 'blur' }
        ],
        isJump: [
          { required: true, type: 'number', message: '请选择是否跳转', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    validForm () {
      this.$refs['activityForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.paramDto)
        } else {
          this.$emit('error')
        }
      })
    }
  },
  watch: {
    'paramDto.dateRange' (val) {
      this.paramDto.startDate = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.endDate = val[1] ? getDate(val[1], 'date') : ''
    }
  },
  created () {
    if (Object.keys(this.activity).length) {
      this.paramDto.projectBid = this.activity.projectBid
      this.paramDto.title = this.activity.title
      this.paramDto.subTitle = this.activity.subTitle
      this.paramDto.dateRange.push(this.activity.startDate)
      this.paramDto.dateRange.push(this.activity.endDate)
      this.paramDto.jumpLink = this.activity.jumpLink
      this.paramDto.imgIndex = this.activity.imgIndex.toString()
      this.paramDto.isJump = this.activity.isJump
    }
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }
</style>
