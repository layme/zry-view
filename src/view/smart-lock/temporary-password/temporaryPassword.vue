<template>
  <div>
    <Button type="primary" @click="openApply">申请临时密码</Button>
    <Table stripe :columns="columns" :data="passwordList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="applyTime">
        <div>{{ row.date | dateFilter }}</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageIndex"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
    <Modal
      v-model="visible"
      title="申请临时密码"
      :loading="modalLoading"
      @on-ok="validForm">
      <Form :model="applyDto" :rules="applyRules" ref="applyForm" :label-width="60">
        <FormItem label="订单号" prop="orderCode">
          <Input type="text" v-model.trim="applyDto.orderCode" placeholder="" clearable
                 @on-blur="getOrderInfo" @on-clear="handleClear"></Input>
        </FormItem>
        <FormItem label="项目" prop="projectName">
          <Input type="text" v-model="applyDto.projectName" placeholder="" disabled></Input>
        </FormItem>
        <FormItem label="房间" prop="areaBid">
          <Select v-model="applyDto.areaBid" placeholder="">
            <Option
              v-for="item in roomOptions"
              :key="item.bid"
              :label="item.area_name"
              :value="item.bid + ',' + item.area_name">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="备注" prop="memo">
          <Input :rows="4" type="textarea" v-model.trim="applyDto.memo"
                 :maxlength="200" placeholder="此处最多输入200个字符"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getApplyPwd, savePwd } from '@/api/smartLock'
import { getOrderInfoForSmartLock } from '@/api/project'
export default {
  name: 'temporaryPassword',
  data () {
    return {
      paramDto: {
        pageIndex: 1,
        pageSize: 10
      },
      loading: false,
      passwordList: [],
      total: 0,
      columns: [
        {
          title: '订单号',
          key: ''
        },
        {
          title: '申请时间',
          slot: 'applyTime'
        },
        {
          title: '申请人',
          key: ''
        },
        {
          title: '项目',
          key: ''
        },
        {
          title: '申请房间',
          key: ''
        },
        {
          title: '密码',
          key: ''
        },
        {
          title: '备注',
          key: ''
        }
      ],
      visible: false,
      modalLoading: true,
      applyDto: {
        orderBid: '',
        orderCode: '',
        projectBid: '',
        projectName: '',
        areaBid: '',
        memo: ''
      },
      applyRules: {
        orderCode: [
          { required: true, message: '请输入订单号', trigger: 'blur' }
        ],
        projectName: [
          { required: true, message: '输入订单号自动显示项目名', trigger: 'blur' }
        ],
        areaBid: [
          { required: true, message: '请选择房间', trigger: 'blur' }
        ],
        memo: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { max: 200, message: '长度在200个字符以内', trigger: 'blur' }
        ]
      },
      roomOptions: []
    }
  },
  methods: {
    handlePageChange () {
      this.loading = true
      getApplyPwd(this.paramDto).then(res => {
        if (code === 200) {
          this.passwordList = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    openApply () {
      this.handleClear()
      this.visible = true
    },
    handleClear () {
      this.applyDto.orderBid = ''
      this.applyDto.orderCode = ''
      this.applyDto.projectBid = ''
      this.applyDto.projectName = ''
      this.applyDto.areaBid = ''
      this.applyDto.memo = ''
      this.roomOptions = []
    },
    getOrderInfo () {
      if (this.applyDto.orderCode) {
        getOrderInfoForSmartLock(this.applyDto.orderCode).then(res => {
          this.applyDto.projectName = res.body.projectName
          this.applyDto.projectBid = res.body.projectBid
          this.applyDto.orderBid = res.body.orderBid
          this.roomOptions = res.body.list
          if (this.roomOptions) {
            this.applyDto.areaBid = this.roomOptions[0].bid + ',' + this.roomOptions[0].area_name
          }
        })
      }
    },
    validForm () {
      this.$refs['applyForm'].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          this.handleError()
        }
      })
    },
    handleError () {
      setTimeout(() => {
        this.modalLoading = false
        this.$nextTick(() => {
          this.modalLoading = true
        })
      }, 500)
    },
    save () {
      savePwd(this.applyDto).then(res => {
        this.visible = false
        this.handlePageChange()
      }).catch(() => {
        this.handleError()
      })
    }
  },
  watch: {
    '$store.state.user.currentProject' (val) {
      if (Object.keys(val).length) {
        this.handlePageChange()
      }
    }
  },
  created () {
    this.handlePageChange()
  }
}
</script>
<style lang="less" scoped>
  .my-page {
    text-align: right;
    margin-top: 20px
  }
  .my-table {
    margin-top: 20px;
  }
</style>
