<template>
  <Form ref="ticketForm" :model="coupon" :label-width="80">
    <FormItem label="优惠活动">
      <span>{{ coupon.activityNumber }}</span>
    </FormItem>
    <FormItem label="优惠券编号">
      <span>{{ coupon.ticketNumber }}</span>
    </FormItem>
    <FormItem label="有效期">
      <FormItem :label-width="0"
                :rules="dateRangeRules">
        <Radio v-model="dateRange"></Radio>
        <DatePicker v-model="ticketDto.dateRange" type="daterange" split-panels placeholder="" :editable="false"
                    :disabled="!dateRange" class="my-date-range" :options="datePickerOptions"></DatePicker>
      </FormItem>
      <FormItem :label-width="0" class="my-bottom"
                :rules="limitDateRules">
        <Radio v-model="day"></Radio>
        绑定至账户的
        <Input v-model.trim="ticketDto.limitDate" placeholder="" class="my-day"
               :disabled="!day" clearable></Input>
        天内
      </FormItem>
    </FormItem>
    <FormItem label="优惠券状态">
      <span>{{ coupon.status }}</span>
    </FormItem>
    <FormItem label="绑定账号">
      <span>{{ coupon.customerPhone }}</span>
    </FormItem>
    <FormItem label="兑换码">
      <span>{{ coupon.redeemCode }}</span>
    </FormItem>
    <FormItem label="优惠券金额">
      <span>{{ coupon.ticketAmount }}</span>
    </FormItem>
    <FormItem label="使用条件">
      <span>{{ coupon.ticketBid }}</span>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'couponDetail',
  props: {
    coupon: Object
  },
  data () {}
}
</script>
<style lang="less" scoped>
</style>
