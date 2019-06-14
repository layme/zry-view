<template>
  <Form ref="ticketForm" :model="ticketDto" :rules="ticketRules" :label-width="80">
    <FormItem label="批次编号" prop="batchNumber">
      <Input v-model.trim="ticketDto.batchNumber" placeholder="" class="my-cls" clearable disabled></Input>
    </FormItem>
    <FormItem label="生成数量" prop="quantity">
      <Input v-model.trim="ticketDto.quantity" placeholder="" class="my-cls" clearable></Input>
    </FormItem>
    <FormItem label="金额" prop="amount">
      <Input v-model.trim="ticketDto.amount" placeholder="" class="my-cls" clearable></Input>
    </FormItem>
    <FormItem label="有效期" required>
      <FormItem prop="dateRange" :label-width="0"
                :rules="dateRangeRules">
        <Radio v-model="dateRange"></Radio>
        <DatePicker v-model="ticketDto.dateRange" type="daterange" split-panels placeholder="" :editable="false"
                    :disabled="!dateRange" class="my-date-range" :options="datePickerOptions"></DatePicker>
      </FormItem>
      <FormItem prop="limitDate" :label-width="0" class="my-bottom"
                :rules="limitDateRules">
        <Radio v-model="day"></Radio>
        绑定至账户的
        <Input v-model.trim="ticketDto.limitDate" placeholder="" class="my-day"
               :disabled="!day" clearable></Input>
        天内
      </FormItem>
    </FormItem>
  </Form>
</template>
<script>
import { getDate } from '@/libs/tools'
export default {
  name: 'ticketForm',
  props: {
    batchNumber: Number
  },
  data () {
    return {
      ticketDto: {
        batchNumber: '0' + this.batchNumber,
        quantity: '',
        amount: '',
        dateRange: [],
        startDate: '',
        endDate: '',
        limitDate: '',
        createTime: ''
      },
      day: false,
      dateRange: true,
      ticketRules: {
        quantity: [
          { required: true, message: '请输入生成数量', trigger: 'blur' },
          { pattern: /^(?!00)(?:[0-9]{1,4}|10000)$/, message: '请输入 0～10000 的整数', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^(?!00)(?:[0-9]{1,4}|10000)$/, message: '请输入 0～10000 的整数', trigger: 'blur' }
        ]
      },
      datePickerOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  methods: {
    validForm () {
      this.$refs['ticketForm'].validate((valid) => {
        if (valid) {
          this.$emit('push', this.ticketDto)
        }
      })
    },
    resetFormItem (val) {
      this.$refs['ticketForm'].fields.forEach(item => {
        if (item.prop === val) {
          item.resetField()
        }
      })
    }
  },
  watch: {
    day (val) {
      this.dateRange = !val
      this.resetFormItem('limitDate')
      this.resetFormItem('dateRange')
    },
    dateRange (val) {
      this.day = !val
      this.resetFormItem('dateRange')
      this.resetFormItem('limitDate')
    },
    'ticketDto.dateRange' (val) {
      this.ticketDto.startDate = val[0] ? getDate(val[0], 'date') : ''
      this.ticketDto.endDate = val[1] ? getDate(val[1], 'date') : ''
    }
  },
  computed: {
    dateRangeRules () {
      if (this.dateRange) {
        return [
          { required: true,
            type: 'array',
            fields: {
              0: { type: 'date', required: true, message: '请选择优惠券有效期' },
              1: { type: 'date', required: true, message: '请选择优惠券有效期' }
            },
            trigger: 'change' }
        ]
      } else {
        return []
      }
    },
    limitDateRules () {
      if (this.day) {
        return [
          { required: true, message: '请输入优惠券有效期', trigger: 'blur' },
          { pattern: /^([1][8][0]|[1][0-7][0-9]|[1-9][0-9]|[0-9]|[0])$/, message: '请输入 0～180 的整数', trigger: 'blur' }
        ]
      } else {
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .my-cls {
    width: 70%;
    min-width: 200px;
  }

  .my-date-range {
    width: ~"calc(70% - 26px)";
    min-width: 174px;
  }

  .my-bottom {
    margin-top: 20px;
  }

  .my-day {
    width: 100px;
    margin: 0 5px;
  }
</style>
