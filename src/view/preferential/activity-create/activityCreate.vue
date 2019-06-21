<template>
  <Row class="full-top">
    <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
    <Col :span="20">
      <Form ref="activityForm" :model="activityDto" :rules="activityRules" :label-width="100">
        <Row>
          <Col :span="12">
            <FormItem label="优惠活动名称" prop="activityName">
              <Input v-model.trim="activityDto.activityName" placeholder="" clearable></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="活动时间" prop="dateRange">
              <DatePicker v-model="activityDto.dateRange" type="daterange" split-panels placeholder=""
                          :editable="false" class="my-date-picker" :options="datePickerOptions"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <FormItem label="活动内容" prop="activityContent">
              <Input v-model.trim="activityDto.activityContent" type="textarea" :rows="3" placeholder=""
                     clearable></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <FormItem label="使用条件" required>
              <Row class="my-row">
                <FormItem prop="" :label-width="0">
                  <Checkbox v-model="isLimitMoney" @on-change="handleIsLimitMoneyChange"></Checkbox>
                  满
                  <Input v-model.trim="activityDto.limitMoney" placeholder="" clearable
                         :disabled="!isLimitMoney" class="condition"></Input>
                  可用
                </FormItem>
              </Row>
              <Row v-if="!isLimitProject" class="my-row">
                <FormItem :label-width="0">
                  <Checkbox v-model="isLimitProject" @on-change="handleIsLimitProjectChange"></Checkbox>
                  限
                  <Select class="my-select" :disabled="!isLimitProject"></Select>
                  <Select class="my-select" :disabled="!isLimitProject"></Select>
                  可用
                </FormItem>
              </Row>
              <Row v-else v-for="(item, index) in activityDto.limitProjectInfo" :key="index" class="my-row"
                   :style="index > 0 ? { paddingLeft: '26px' } : ''">
                <FormItem :prop="'limitProjectInfo.' + index + '.projectBid'" :label-width="0">
                  <Checkbox v-model="isLimitProject" @on-change="handleIsLimitProjectChange"
                            v-if="index === 0"></Checkbox>
                  限
                  <Select v-model="item.projectBid" class="my-select" :disabled="!isLimitProject" placeholder=""
                          @on-change="handleProjectChange(index)">
                    <Option
                      v-for="item in $store.state.user.projectList"
                      :key="item.bid"
                      :label="item.projectName"
                      :value="item.bid">
                    </Option>
                  </Select>
                  <Select v-model="item.houseTypeBid" class="my-select" :disabled="!isLimitProject" placeholder="">
                    <Option
                      v-for="item in houseTypeBidGroup[index]"
                      :key="item.bid"
                      :label="item.houseTypeParentName + '·' + item.houseTypeName"
                      :value="item.bid">
                    </Option>
                  </Select>
                  可用
                  <a v-if="index === activityDto.limitProjectInfo.length - 1 && isLimitProject" class="my-btn"
                     @click="addLimitProject">增加</a>
                  <a v-else-if="index < activityDto.limitProjectInfo.length - 1 && isLimitProject" class="my-btn"
                     @click="removeLimitProject(index)">删除</a>
                </FormItem>
              </Row>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="优惠券">
            <Table stripe :columns="columns" :data="activityDto.ticketInfo" size="small">
              <template slot-scope="{ row }" slot="validity">
                <div>{{ row.limitDate ? '绑定后 ' + row.limitDate + ' 天内' : row.startDate + ' 至 ' + row.endDate }}</div>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <a @click="deleteTicket(index)">删除</a>
              </template>
            </Table>
            <a v-if="activityDto.ticketInfo.length < 99" @click="visible = true">新增优惠券</a>
          </FormItem>
        </Row>
        <Row>
          <Col span="12">
            <FormItem>
              <Button type="primary" @click="validForm"> 保 存</Button>
              <Button type="default" @click="resetForm" class="my-btn"> 重 置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Col>
    <Modal
      v-model="visible"
      title="新增优惠券"
      :modalLoading="modalLoading"
      @on-ok="saveTicket">
      <ticket-form ref="ticketForm" :batch-number="activityDto.ticketInfo.length + 1" v-if="visible"
                   @push="handlePush"></ticket-form>
    </Modal>
  </Row>
</template>
<script>
import ticketForm from '../components/ticketForm.vue'
import { getDate } from '@/libs/tools'
import { mapMutations } from 'vuex'
import { saveActivity } from '@/api/activity'
import { getHouseTypeList } from '@/api/stock'

export default {
  name: 'activityCreate',
  components: {
    ticketForm
  },
  data () {
    return {
      activityDto: {
        activityName: '',
        dateRange: [],
        startDate: '',
        endDate: '',
        activityContent: '',
        limitMoney: '',
        limitProjectInfo: [],
        ticketInfo: []
      },
      houseTypeBidGroup: [],
      activityRules: {
        activityName: [
          { required: true, message: '请输入优惠活动名称', trigger: 'blur' },
          { type: 'string', max: 50, message: '最多输入50字', trigger: 'blur' }
        ],
        dateRange: [
          {
            required: true,
            type: 'array',
            fields: {
              0: { type: 'date', required: true, message: '请选择活动时间' },
              1: { type: 'date', required: true, message: '请选择活动时间' }
            },
            trigger: 'change'
          }
        ],
        activityContent: [
          { required: true, message: '请输入活动内容', trigger: 'blur' },
          { type: 'string', max: 200, message: '最多输入200字', trigger: 'blur' }
        ]
      },
      isLimitMoney: false,
      isLimitProject: false,
      columns: [
        {
          title: '批次号',
          key: 'batchNumber'
        },
        {
          title: '添加人',
          key: 'creator'
        },
        {
          title: '添加时间',
          key: 'createTime'
        },
        {
          title: '数量',
          key: 'quantity'
        },
        {
          title: '金额 / 元',
          key: 'amount'
        },
        {
          title: '有效期',
          slot: 'validity',
          width: 190
        },
        {
          title: '操作',
          slot: 'action',
          width: 60
        }
      ],
      loading: false,
      visible: false,
      modalLoading: true,
      datePickerOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    handleIsLimitMoneyChange (val) {
      if (!val) {
        this.activityDto.limitMoney = ''
      }
    },
    handleIsLimitProjectChange (val) {
      if (!val) {
        this.activityDto.limitProjectInfo = [
          {
            projectBid: '',
            houseTypeBid: ''
          }
        ]
      }
    },
    addLimitProject () {
      this.activityDto.limitProjectInfo.push(
        {
          projectBid: '',
          houseTypeBid: ''
        }
      )
      this.houseTypeBidGroup.push([])
    },
    removeLimitProject (index) {
      this.activityDto.limitProjectInfo.splice(index, 1)
      this.houseTypeBidGroup.splice(index, 1)
    },
    handlePush (val) {
      this.$set(val, 'creator', this.$store.state.user.username)
      this.activityDto.ticketInfo.push(val)
      this.visible = false
    },
    saveTicket () {
      this.$refs.ticketForm.validForm()
      setTimeout(() => {
        this.modalLoading = false
        this.$nextTick(() => {
          this.modalLoading = true
        })
      }, 500)
    },
    deleteTicket (index) {
      this.activityDto.ticketInfo.splice(index, 1)
    },
    resetForm () {
      this.$refs['activityForm'].resetFields()
    },
    validForm () {
      this.$refs['activityForm'].validate((valid) => {
        if (valid) {
          this.saveActivity()
        }
      })
    },
    saveActivity () {
      this.loading = true
      saveActivity(this.activityDto).then(res => {
        if (res.code === 200) {
          this.$Message.success('保存成功，跳转回优惠活动列表')
          this.closeTag({ name: 'createActivity' })
          this.$router.push({ name: 'activityList' })
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleProjectChange (index) {
      console.info('index ', index)
      getHouseTypeList(this.activityDto.limitProjectInfo[index].projectBid).then(res => {
        if (res.code === 200) {
          this.houseTypeBidGroup.splice(index, 1, res.body)
        }
      })
    }
  },
  watch: {
    'activityDto.dateRange' (val) {
      this.activityDto.startDate = val[0] ? getDate(val[0], 'dateNumber') : ''
      this.activityDto.endDate = val[1] ? getDate(val[1], 'dateNumber') : ''
    }
  }
}
</script>
<style lang="less" scoped>
  .my-date-picker {
    width: 100%;
  }

  .condition {
    width: 100px;
    margin: 0 5px;
  }

  .my-select {
    width: 200px;
    margin: 0 5px;
  }

  .my-row {
    margin-bottom: 20px;
  }

  .my-btn {
    margin-left: 10px;
  }

  .full-top {
    position: relative;
    height: 100%;
  }
  .full-spin {
    height: 100%;
  }
</style>
