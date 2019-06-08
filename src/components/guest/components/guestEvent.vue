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
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageIndex"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
    <Modal
      v-model="visible"
      :title="title"
      :loading="loading"
      @on-ok="validForm">
      <Form :model="eventDto" :rules="eventRules" ref="eventForm" :label-width="60" v-if="visible">
        <FormItem label="项目" prop="projectBid" >
          <Select v-model="paramDto.projectBid" placeholder="" class="my-form" clearable>
            <Option
              v-for="item in $store.state.user.projectList"
              :key="item.bid"
              :label="item.projectName"
              :value="item.bid">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="类型" prop="eventType">
          <Select v-model="eventDto.eventType" class="my-form">
            <Option
              v-for="item in eventTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="时间" prop="eventDate">
          <DatePicker type="datetime" class="my-form" v-model="eventDto.eventDate" placeholder="选择日期时间"
                      :options="dateOptions"></DatePicker>
        </FormItem>
        <FormItem label="内容" prop="eventContent">
          <Input :rows="4" type="textarea" v-model.trim="eventDto.eventContent"
                 :maxlength="200" placeholder="此处最多输入200个字符"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
import guestEventCard from './guestEventCard'
import { listEvent, addOrUpdateEvent, deleteEvent } from '@/api/guest'

export default {
  name: 'guestEvent',
  props: {
    guestFid: String
  },
  components: {
    guestEventCard
  },
  data () {
    return {
      paramDto: {
        guestFid: this.guestFid,
        pageIndex: 1,
        pageSize: 3
      },
      eventList: [],
      total: 0,
      visible: false,
      loading: true,
      title: '',
      eventDto: {},
      eventRules: {
        projectBid: [
          { required: true, type: 'string', message: '请选择项目', trigger: 'change' }
        ],
        eventType: [
          { required: true, type: 'number', message: '请选择类型', trigger: 'change' }
        ],
        eventDate: [
          { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
        ],
        eventContent: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { max: 200, message: '长度在200个字符以内', trigger: 'blur' }
        ]
      },
      eventTypeOptions: [
        {
          label: '好评',
          value: 1
        }, {
          label: '投诉',
          value: 2
        }
      ],
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
    handlePageChange () {
      listEvent(this.paramDto).then(res => {
        if (res.code === 200) {
          this.eventList = res.body.rows
          this.total = res.body.total
        }
      })
    },
    addEvent () {
      this.title = '添加事件'
      this.visible = true
      this.eventDto = {
        projectBid: '',
        guestFid: this.guestFid,
        eventFid: '',
        eventContent: '',
        eventType: 1,
        eventDate: ''
      }
    },
    validForm () {
      this.$refs['eventForm'].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          setTimeout(() => {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
          }, 500)
        }
      })
    },
    save () {
      addOrUpdateEvent(this.eventDto).then(res => {
        if (res.code === 200) {
          this.$Message.success('保存成功')
          this.visible = false
          this.handlePageChange()
        } else {
          setTimeout(() => {
            this.loading = false
            this.$nextTick(() => {
              this.loading = true
            })
          }, 500)
        }
      })
    },
    handleUpdate (index) {
      this.title = '修改事件'
      this.visible = true
      this.eventDto.guestFid = this.eventList[index].fid
      this.eventDto.projectBid = this.eventList[index].projectBid
      this.eventDto.eventFid = this.eventList[index].eventFid
      this.eventDto.eventContent = this.eventList[index].eventContent
      this.eventDto.eventType = this.eventList[index].eventType
      this.eventDto.eventDate = new Date(this.eventList[index].eventDate)
    },
    handleRemove (index) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定删除该事件吗？</p>',
        onOk: () => {
          this.removeEvent(index)
        },
        onCancel: () => {
        }
      })
    },
    removeEvent () {
      deleteEvent({ guestFid: this.guestFid }).then(res => {
        if (res.code === 200) {
          this.$Message.success('删除成功')
          this.handlePageChange()
        }
      })
      this.$Message.success('remove success')
      this.visible = false
    }
  },
  created () {
    this.handlePageChange()
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
  }

  .my-form {
    width: 50%;
  }
</style>
