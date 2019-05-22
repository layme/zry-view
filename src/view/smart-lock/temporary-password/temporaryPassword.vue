<template>
  <div>
    <Button type="primary" @click="visible = true">申请临时密码</Button>
    <Table stripe :columns="columns" :data="passwordList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="applyTime">
        <div>{{ row.date | dateFilter }}</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
    <Modal
      v-model="visible"
      title="申请临时密码"
      :loading="modalLoading"
      @on-ok="validForm">
      <Form :model="applyDto" :rules="applyRules" ref="applyForm" :label-width="60" v-if="visible">
        <FormItem label="订单号" prop="orderNumber">
          <Input type="text" v-model="applyDto.orderNumber" clearable></Input>
        </FormItem>
        <FormItem label="项目" prop="projectName">
          <Input type="text" v-model="applyDto.projectName" disabled></Input>
        </FormItem>
        <FormItem label="房间" prop="areaBid">
          <Select v-model="applyDto.areaBid">
            <Option
              v-for="item in roomOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input :rows="4" type="textarea" v-model="applyDto.remark"
                 :maxlength="200" placeholder="此处最多输入200个字符"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
export default {
  name: 'temporaryPassword',
  data () {
    return {
      paramDto: {
        projectBid: '',
        page: 1,
        limit: 10
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
        orderNumber: '',
        projectName: '',
        areaBid: '',
        remark: ''
      },
      applyRules: {
        orderNumber: [
          { required: true, type: 'number', message: '请输入订单号', trigger: 'blur' }
        ],
        projectName: [
          { required: true, type: 'date', message: '输入订单号自动显示项目名', trigger: 'blur' }
        ],
        areaBid: [
          { required: true, type: 'date', message: '请选择房间', trigger: 'change' }
        ],
        remark: [
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
      console.info('paramDto', this.paramDto)
      this.loading = false
    },
    validForm () {
      this.$refs['applyForm'].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          setTimeout(() => {
            this.modalLoading = false
            this.$nextTick(() => {
              this.modalLoading = true
            })
          }, 500)
        }
      })
    },
    save () {}
  },
  created () {
    this.handlePageChange()
  },
  filters: {
    dateFilter (val) {
      return getDate(val, 'date')
    }
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
