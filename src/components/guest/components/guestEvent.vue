<template>
  <div class="top-div">
    <div class="add-div">
      <Button type="primary" icon="ios-add-circle-outline"
              @click="addEvent"> 添加事件
      </Button>
    </div>
    <div class="list-div">
      <div v-if="eventList.length">
        <guest-event-card v-for="(item, index) in eventList" :key="index" :index="index" :event="item" class="card-cls"
                          @update="handleUpdate" @remove="handleRemove"></guest-event-card>
      </div>
      <div v-else class="no-data">
        <span>暂无数据</span>
      </div>
    </div>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
    <Modal
      v-model="visible"
      :title="title">
      <Form :model="eventDto" :rules="eventRules" ref="eventForm" :label-width="60">
        <FormItem label="类型" prop="eventType">
          <Select v-model="eventDto.eventType">
            <Option
              v-for="item in eventTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="时间" prop="eventDate">
          <DatePicker type="datetime" :value="eventDto.eventDate" placeholder="选择日期时间"
                      :options="dateOptions"></DatePicker>
        </FormItem>
        <FormItem label="内容" prop="eventContent">
          <Input :rows="4" type="textarea" v-model="eventDto.eventContent"
                 :maxlength="200" placeholder="此处最多输入200个字符"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
import guestEventCard from './guestEventCard'

export default {
  name: 'guestEvent',
  props: {
    idNumber: String
  },
  components: {
    guestEventCard
  },
  data () {
    return {
      paramDto: {
        idNumber: '',
        page: 1,
        limit: 5
      },
      eventList: [
        {
          'id': 21,
          'fid': '8a5884fa6ac97b93016ad91400370005',
          'guestFid': '19e1be2308ef11e9a9ef000ec6d2a0d4',
          'sceneFid': '63615afa5a344153a047aca1ea32cc51',
          'sceneName': '北京CBD自如驿',
          'eventContent': 'sdhsh',
          'eventType': 1,
          'eventLevel': 0,
          'eventDate': 1558420125000,
          'isDel': 0,
          'createFid': '60006896',
          'createDate': 1558420127000,
          'lastModifyFid': null,
          'lastModifyDate': 1558420127000
        }, {
          'id': 20,
          'fid': '8a5884fa6ac97b93016ad913d97f0004',
          'guestFid': '19e1be2308ef11e9a9ef000ec6d2a0d4',
          'sceneFid': '63615afa5a344153a047aca1ea32cc51',
          'sceneName': '北京CBD自如驿',
          'eventContent': 'sgsergh',
          'eventType': 1,
          'eventLevel': 0,
          'eventDate': 1558420115000,
          'isDel': 0,
          'createFid': '60006896',
          'createDate': 1558420117000,
          'lastModifyFid': null,
          'lastModifyDate': 1558420117000
        }, {
          'id': 19,
          'fid': '8a5884fa6ac97b93016ad913bf400003',
          'guestFid': '19e1be2308ef11e9a9ef000ec6d2a0d4',
          'sceneFid': '63615afa5a344153a047aca1ea32cc51',
          'sceneName': '北京CBD自如驿',
          'eventContent': 'sdfg',
          'eventType': 1,
          'eventLevel': 0,
          'eventDate': 1558420108000,
          'isDel': 0,
          'createFid': '60006896',
          'createDate': 1558420111000,
          'lastModifyFid': null,
          'lastModifyDate': 1558420111000
        }
      ],
      total: 0,
      visible: false,
      title: '',
      eventDto: {
        guestFid: '',
        eventFid: '',
        eventContent: '',
        eventType: '',
        eventDate: ''
      },
      eventRules: {
        eventType: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        eventDate: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        eventContent: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { max: 200, message: '长度在200个字符以内', trigger: 'blur' }
        ]
      },
      eventTypeOptions: [{
        label: '好评',
        value: 1
      }, {
        label: '投诉',
        value: 2
      }],
      dateOptions: {
        shortcuts: [
          {
            text: '此刻',
            value () {
              return new Date()
            }
          }
        ]
      }
    }
  },
  methods: {
    getEventList () {
      console.info(this.idNumber)
    },
    handlePageChange () {
      console.info('paramDto', this.paramDto)
    },
    addEvent () {
    },
    updateEvent () {
    },
    removeEvent () {
    },
    openModal () {
      this.visible = true
      this.eventDto.guestFid = this.event.fid
      this.eventDto.eventFid = this.event.eventFid
      this.eventDto.eventContent = this.event.eventContent
      this.eventDto.eventType = this.event.eventType
      this.eventDto.eventDate = this.event.eventDate
    },
    handleUpdate (index) {
      this.visible = true
      this.eventDto.guestFid = this.eventList[index].fid
      this.eventDto.eventFid = this.eventList[index].eventFid
      this.eventDto.eventContent = this.eventList[index].eventContent
      this.eventDto.eventType = this.eventList[index].eventType
      this.eventDto.eventDate = this.eventList[index].eventDate
    },
    handleRemove () {
    }
  },
  created () {
  },
  filters: {
    genderFilter (val) {
      return val === 2 ? '男' : val === 1 ? '女' : '未知'
    },
    dateFilter (val) {
      return getDate(val, 'date')
    }
  }
}
</script>
<style lane="less" scoped>
  .top-div {
    height: 100%;
  }

  .add-div {
    text-align: right;
  }

  .list-div {
    min-height: 70%;
    overflow-y: auto;
    padding: 5px;
    /*border: 1px #000 solid;*/
  }

  .my-page {
    text-align: right;
  }

  .no-data {
    text-align: center;
    padding-top: 40px;
    color: #808695;
  }

  .card-cls {
    margin: 10px 0;
    /*margin-bottom: 10px;*/
  }
</style>
