<template>
  <div>
    <Form ref="lockForm" :model="paramDto" :rules="rules" :label-width="80">
      <Row>
        <Col :span="10">
          <FormItem label="原因" prop="reason">
            <Select v-model="paramDto.reason" placeholder="请选择原因" class="my-form-ui">
              <Option v-for="item in reasonOptions" :key="item.value"
                      :label="item.label" :value="item.value"></Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="20">
          <FormItem label="备注">
            <Input type="textarea" v-model.trim="paramDto.remark" placeholder="锁定备注，200字" :row="2"
                   :maxlength="200"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="20">
          <FormItem label="锁定时段" prop="dateRange">
            <DatePicker v-model="paramDto.dateRange" type="daterange" split-panels placeholder="" class="my-form-ui"
                        :options="datePickerOptions" :clearable="false" :editable="false" @on-change="handleDateChange"></DatePicker>
          </FormItem>
        </Col>
        <Col :span="4">
          <Button type="text" class="del-btn" @click="openBedSelector">选择床位</Button>
        </Col>
      </Row>
      <FormItem label="已选床位" prop="stockList">
        <Tag class="my-tag"
             :key="index"
             v-for="(stayBed, index) in paramDto.stockList"
             closable
             type="dot"
             color="primary"
             :disable-transitions="true"
             @on-close="handleClose(index)">
          {{ stayBed.houseTypeName }}-{{ stayBed.areaName }}-{{ stayBed.areaBedCode }}
        </Tag>
      </FormItem>
    </Form>
    <Modal
      v-model="visible"
      title="选择床位"
      width="1000"
      @on-ok="addStayBed">
      <bed-selector ref="bedSelectorRef" v-if="visible" :start-date="paramDto.startDate" :end-date="paramDto.endDate"
                    :selected="paramDto.stockList" @submit="handleAddStayBed"></bed-selector>
    </Modal>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
import bedSelector from './bedSelector'
export default {
  name: 'lockBed',
  components: {
    bedSelector
  },
  data () {
    return {
      paramDto: {
        dateRange: [],
        startDate: '',
        endDate: '',
        reason: 1,
        remark: '',
        stockList: []
      },
      rules: {
        dateRange: [
          { required: true,
            type: 'array',
            fields: {
              0: { type: 'date', required: true, message: '请选择锁定时段' },
              1: { type: 'date', required: true, message: '请选择锁定时段' }
            },
            trigger: 'change' }
        ],
        stockList: [
          { required: true, type: 'array', message: '请选择锁定床位', trigger: 'blur' }
        ]
      },
      reasonOptions: [
        {
          label: 'OTA库存',
          value: 1
        },
        {
          label: '装修',
          value: 2
        },
        {
          label: '维修',
          value: 3
        },
        {
          label: '其他',
          value: 4
        }
      ],
      datePickerOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      visible: false
    }
  },
  methods: {
    openBedSelector () {
      if (!this.paramDto.startDate || !this.paramDto.endDate) {
        this.$Message.warning('请先选择入住时段')
      } else {
        this.visible = true
      }
    },
    handleClose (index) {
      this.paramDto.stockList.splice(index, 1)
    },
    addStayBed () {
      this.$refs.bedSelectorRef.submit()
    },
    handleAddStayBed (dto) {
      this.paramDto.stockList = dto
    },
    validateForm () {
      this.$refs.lockForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.paramDto)
        } else {
          this.$emit('error')
        }
      })
    },
    handleDateChange () {
      this.paramDto.stockList = []
    }
  },
  watch: {
    'paramDto.dateRange' (val) {
      this.paramDto.startDate = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.endDate = val[1] ? getDate(val[1], 'date') : ''
    }
  }
}
</script>
<style lang="less" scoped>
  .my-form-ui {
    width: 100%;
  }
</style>
