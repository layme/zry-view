<template>
  <div class="pages-tables">
    <div class="rolling-table meal-table" ref="tableBox">
      <table class="table" id="table" cellpadding="0" cellspacing="0" ref="rollingTable">
        <tr style="height: 20px">
          <th class="rows cross" colspan="2">
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
                  <a href="javascript:void(0)" @click="handleClick">
                    <template>{{ startDateStr }}</template>
                  </a>
                </DatePicker>
              </div>
              <div>
                <a>
                  <Icon type="ios-arrow-back"></Icon>
                  上一周
                </a>
                <a style="padding: 0 10px">今天</a>
                <a>
                  下一周
                  <Icon type="ios-arrow-forward"></Icon>
                </a>
              </div>
            </div>
          </th>
          <th class="rows date-cell" v-for="item in stockData" :key="item.date">
            <date-cell :stock="item" :todayStr="todayStr"/>
          </th>
        </tr>
        <template v-for="room in roomData">
          <tr v-for="(bed,bedNo) in room.beds" :key="bed.bedBid">
            <td class="cols room" v-if="bedNo === 0" :rowspan="room.beds.length">{{ room.houseTypeName }}</td>
            <td class="cols bed">
              <!--<BedCell :bed="bed"/>-->
            </td>
            <!--<td v-if="!bed.orders.length" v-for="(i,dateNo) in stockData" :key="bed.bedBid + ',i,' + dateNo"-->
            <!--@mousedown="handleMouseDown(dateNo, roomNo, bedNo)"-->
            <!--@mouseup="handleMouseUp"-->
            <!--@mouseenter="handleMouseEnter(dateNo, roomNo, bedNo)"-->
            <!--@mouseleave="handleMouseLeave(dateNo, roomNo, bedNo)">-->
            <td v-if="!bed.orders.length" v-for="(i,dateNo) in stockData" :key="bed.bedBid + ',i,' + dateNo">
              <!--<StockCell :date="stockData[dateNo]" :room="roomData[roomNo]"-->
                         <!--:bed="roomData[roomNo].beds[bedNo]"></StockCell>-->
            </td>
            <td v-else v-for="(i,dateNo) in bed.stock" :key="Math.random() + dateNo"
                :colspan="i.length">
              <div v-if="i.order" :style="orderStatus(i.order.orderStatus)" style="color: #ffffff; height: 100%; text-align: left; border-radius: 4px">
                <div>{{ i.order.name }}</div>
                <div>{{ i.order.orderNumber }}</div>
              </div>
            </td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>
<script>
import { createIScroll } from '@/libs/iscrollTable'
import dateCell from './dateCell'
export default {
  name: 'bedCalendar',
  props: {
    todayStr: {
      type: String
    }
  },
  components: {
    dateCell
  },
  data () {
    return {
      bedCount: 0,
      startDateStr: this.todayStr,
      open: false,
      stockData: this.$store.state.workbench.stockData,
      roomData: this.$store.state.workbench.workData
    }
  },
  methods: {
    getBedCount () {
      let temp = 0
      if (this.roomList.length > 0) {
        this.roomList.forEach((room) => {
          room.beds.forEach((bed) => {
            temp++
          })
        })
      }
      this.bedCount = temp
    },
    handleMouseDown (dateNo, roomNo, bedNo) {
      // 设置鼠标按下状态
      this.$store.commit('setMouse', true)
      // 设置原点
      this.$store.commit('setOrigin', {
        dateIndex: dateNo,
        bedIndex: this.roomData[roomNo].beds[bedNo].index
      })
      this.isSelect(dateNo, roomNo, bedNo)
    },
    handleMouseUp () {
      this.$store.commit('setModal', true)
    },
    handleClick () {
      this.open = !this.open
    },
    handleChange (date) {
      this.startDateStr = date
      this.open = false
    },
    handleMouseEnter (dateNo, roomNo, bedNo) {
      this.stockData[dateNo].isActive = true
      this.roomData[roomNo].beds[bedNo].isActive = true
      this.isSelect(dateNo, roomNo, bedNo)
      this.isNoSelect(dateNo, this.roomData[roomNo].beds[bedNo].index)
    },
    handleMouseLeave (dateNo, roomNo, bedNo) {
      this.stockData[dateNo].isActive = false
      this.roomData[roomNo].beds[bedNo].isActive = false
    },
    isSelect (dateNo, roomNo, bedNo) {
      if (this.$store.getters.mouseStatus) {
        this.stockData[dateNo].isSelect = true
        this.roomData[roomNo].beds[bedNo].isSelect = true
      }
    },
    isNoSelect (dateIndex, bedIndex) {
      if (!this.$store.getters.mouseStatus) {
        return
      }
      let origin = this.$store.getters.originData

      if (dateIndex > origin.dateIndex) {
        for (let i = 0; i < this.stockData.length; i++) {
          if (i < origin.dateIndex || i > dateIndex) {
            this.stockData[i].isSelect = false
          }
        }

        if (bedIndex < origin.bedIndex) {
          // 第一象限
          console.info('第一象限')

          this.roomData.forEach((room) => {
            room.beds.forEach((bed) => {
              if (bed.index < bedIndex || bed.index > origin.bedIndex) {
                bed.isSelect = false
              }
            })
          })
        } else {
          // 第四象限
          console.info('第四象限')
          this.roomData.forEach((room) => {
            room.beds.forEach((bed) => {
              if (bed.index > bedIndex || bed.index < origin.bedIndex) {
                bed.isSelect = false
              }
            })
          })
        }
      } else {
        for (let i = 0; i < this.stockData.length; i++) {
          if (i > origin.dateIndex || i < dateIndex) {
            this.stockData[i].isSelect = false
          }
        }

        if (bedIndex < origin.bedIndex) {
          // 第二象限
          console.info('第二象限')
          this.roomData.forEach((room) => {
            room.beds.forEach((bed) => {
              if (bed.index < bedIndex || bed.index > origin.bedIndex) {
                bed.isSelect = false
              }
            })
          })
        } else {
          // 第三象限
          console.info('第三象限')
          this.roomData.forEach((room) => {
            room.beds.forEach((bed) => {
              if (bed.index > bedIndex || bed.index < origin.bedIndex) {
                bed.isSelect = false
              }
            })
          })
        }
      }
    },
    drawOrder (orders, stock, dateNo) {
      orders.forEach(item => {
        if (item.startDate === stock[dateNo].date) {
          let length = this.dateMinus(item.startDate, item.endDate)
          stock.splice(dateNo, length)
          return length
        }
      })
      return 1
    },
    dateMinus (date1, date2) {
      let s = new Date(date1)
      let e = new Date(date2)
      let days = e.getTime() - s.getTime()
      return parseInt(days / (1000 * 60 * 60 * 24))
    },
    copyStock () {
      this.roomData.forEach(room => {
        room.beds.forEach(bed => {
          this.$set(bed, 'stock', JSON.parse(JSON.stringify(this.stock)))
        })
      })
    },
    flushData () {
      this.roomData.forEach(room => {
        room.beds.forEach(bed => {
          this.$set(bed, 'stock', JSON.parse(JSON.stringify(this.stock)))
          bed.stock.forEach((st, index) => {
            this.$set(st, 'length', 1)
            this.$set(st, 'order', null)
            bed.orders.forEach(order => {
              if (order.startDate === st.date) {
                let length = this.dateMinus(order.startDate, order.endDate)
                length = length > 1 ? length : 1
                if (length > 1) {
                  bed.stock.splice(index + 1, length)
                }
                st.length = length
                st.order = order
              }
            })
          })
        })
      })
    },
    orderStatus (status) {
      if (status === 1) {
        return { backgroundColor: '#2d8cf0' }
      } else if (status === 2) {
        return { backgroundColor: '#19be6b' }
      } else if (status === 6) {
        return { backgroundColor: '#ff9900' }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      createIScroll('.meal-table')
      // this.flushData()
    })
  }
}
</script>
<style lang="less" scoped>
  .pages-tables {
    -webkit-overflow-scrolling: auto;
    position: relative;
    height: 100%;
    width: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .rolling-table {
    height: 1000px;
    font-size: 14px;
    color: #86939a;
    background-color: #fff;
    width: 100%;
    -webkit-overflow-scrolling: auto;
    position: relative;
    top: 0;
    overflow: hidden;
  }

  .rows {
    position: relative;
    z-index: 3;
    height: 50px;
  }

  .cross {
    position: relative;
    z-index: 5;
    width: 180px;
  }

  .date-cell {
    width: 70px;
  }

  table td {
    border: 0 solid #000;
    font-size: 14px;
    background: #fff;
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .table {
    //   border-collapse: collapse; //去掉重复的border
    color: #86939e;
    font-size: 14px;
    border-bottom: 1px solid #dcdee2;
    border-right: 1px solid #dcdee2;
    min-height: 100%;
    text-align: center;
    td {
      border-top: 1px solid #dcdee2;
      border-left: 1px solid #dcdee2;
      white-space: nowrap;
      height: 60px;
      line-height: 20px;
      /*padding: 5px;*/
    }
    th {
      color: #43484d;
      white-space: nowrap;
      /*height: 30px;*/
      /*line-height: 20px;*/
      /*padding: 0 5px;*/
      background-color: #f3f4f6;
      font-weight: normal;
      border-top: 1px solid #dcdee2;
      border-left: 1px solid #dcdee2;
    }
  }

  tr1 {
    position: relative;
    background-color: #fff;
    &:nth-of-type(odd) {
      td {
        // background-color: pink;
      }
    }
  }

  .room {
    width: 110px;
  }

  .bed {
    width: 70px;
  }

  .calendar-date {
    height: 20px;
    line-height: 20px;
    text-align: center;
    outline: 0;
  }

  .calendar-date span {
    cursor: pointer;
  }

  .active {
    background: #45FAAA;
  }
</style>
