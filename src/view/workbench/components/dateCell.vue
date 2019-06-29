<template>
  <div class="content" :class="{active: stock.isActive || (stock.isSelect && $store.getters.mouseStatus)}">
    <p class="date-content">
      {{ stock.date.substring(5) }}</p>
    <P class="count-content">
      <span v-if="todayStr === stock.date" class="today">今天</span>
      <span v-else>{{ stock.date | weekFilter }}</span>
      <span style="margin-left: 10px">{{ stock.availableStockCount }}</span>
    </P>
  </div>
</template>
<script>
import { getDate, dateStrToWeek } from '@/libs/tools'

export default {
  name: 'dateCell',
  props: {
    stock: {
      type: Object
    }
  },
  data () {
    return {
      todayStr: getDate(new Date(), 'date')
    }
  },
  filters: {
    weekFilter (val) {
      return dateStrToWeek(val)
    }
  }
}
</script>
<style lang="less" scoped>
  .content {
    height: 100%;
    width: 100%;
    padding: 5px 0;
    color: #ffffff;
    line-height: 25px;
  }

  .active {
    background: #45FAAA;
  }

  .today {
    color: #f63;
    font-weight: bolder;
  }
</style>
