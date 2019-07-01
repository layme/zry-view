<template>
  <div class="calendar-top">
    <table id="t" v-if="$store.state.workbench.stockData.length">
      <thead>
      <tr>
        <th colspan="2">
          <div>
            <div class="calendar-date">
              起始日
              <DatePicker
                :open="open"
                :value="startDateStr"
                format="yyyy-MM-dd"
                type="date"
                transfer
                @on-change="handleChange">
                <a @click="handleClick">
                  <template>{{ startDateStr }}</template>
                </a>
              </DatePicker>
            </div>
            <div>
              <a @click="handleBack">
                <Icon type="ios-arrow-back"></Icon>
                上一周
              </a>
              <a style="padding: 0 10px" @click="handleToday">今天</a>
              <a @click="handleForward">
                下一周
                <Icon type="ios-arrow-forward"></Icon>
              </a>
            </div>
          </div>
        </th>
        <th v-for="item in $store.state.workbench.stockData" :key="item.date">
          <date-cell :stock="item"></date-cell>
        </th>
      </tr>
      </thead>
      <tbody v-if="$store.state.workbench.workData.length">
      <template v-for="room in $store.state.workbench.workData">
        <tr v-for="(bed,bedNo) in room.beds" :key="bed.bedBid">
          <td v-if="bedNo === 0" :rowspan="room.beds.length" class="room-cell">{{ room.houseTypeName }}<br />{{ room.areaShowName }}</td>
          <td class="bed-cell">
             <bed-cell :bed="bed" @refresh="getOrderDetail"></bed-cell>
          </td>
          <td v-for="(i,no) in bed.calendarList" :key="no + '-i'" :colspan="i.length">
            <order-cell :orders="i.orders" @refresh="getOrderDetail"></order-cell>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import dateCell from './dateCell'
import bedCell from './bedCell'
import orderCell from './orderCell'
import { getDate, dateStrMove } from '@/libs/tools'

export default {
  name: 'bedCalendar',
  components: {
    dateCell,
    bedCell,
    orderCell
  },
  data () {
    return {
      bedCount: 0,
      todayStr: getDate(new Date(), 'date'),
      startDateStr: getDate(new Date(), 'date'),
      open: false,
      stockData: this.$store.state.workbench.stockData,
      roomData: this.$store.state.workbench.workData
    }
  },
  methods: {
    handleChange (date) {
      this.startDateStr = date
      if (this.startDateStr !== this.todayStr) {
        this.$emit('dateChange', this.startDateStr)
      }
      this.open = false
    },
    handleClick () {
      this.open = !this.open
    },
    handleBack () {
      this.startDateStr = dateStrMove(this.startDateStr, -7)
      this.$emit('dateChange', this.startDateStr)
    },
    handleToday () {
      this.startDateStr = this.todayStr
      this.$emit('dateChange', this.startDateStr)
    },
    handleForward () {
      this.startDateStr = dateStrMove(this.startDateStr, 7)
      this.$emit('dateChange', this.startDateStr)
    },
    getOrderDetail () {
      this.$emit('refresh')
    }
  },
  watch: {
    '$store.state.workbench.stockData' () {
    },
    '$store.state.workbench.workData' () {
    }
  }
}
</script>
<style lang="less" scoped>
  .calendar-top {
    width: 100%;
    height: ~"calc(100vh - 282px)";
    overflow: auto;
  }
  .date-cell {
    width: 70px;
  }

  .calendar-date {
    line-height: 20px;
    text-align: center;
    outline: 0;
    width: 200px;
  }

  table {
    border-collapse: collapse;
  }

  th, td {
    text-align: center;
    border: 1px solid #dcdee2;
    width: 70px;
    height: 60px;
  }

  th {
    background-color: #515a6e;
    color: #fff;
    position: sticky;
    top: 0;
    height: 60px;
    z-index: 2;
  }

  .room-cell {
    position: sticky;
    left: 0;
    z-index: 2;
    width: 130px;
    background-color: #ffffff;
  }

  .bed-cell {
    position: sticky;
    left: 130px;
    z-index: 2;
    background-color: #ffffff;
  }

  th:first-child {
    position: sticky;
    left: 0;
    z-index: 3;
  }
</style>
