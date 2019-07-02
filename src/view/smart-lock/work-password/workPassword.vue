<template>
  <div>
    <Button type="primary" @click="visible = true">申请内务密码</Button>
    <Table stripe :columns="columns" :data="passwordList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="pswType">
        <div>{{ row.psw_type | pswTypeFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="pswStatus">
        <Tag color="success" v-if="row.psw_status === 1">有效</Tag>
        <Tag color="warning" v-else-if="row.psw_status === 2">无效</Tag>
        <Tag color="default" v-else>未知</Tag>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageIndex"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
    <Modal
      v-model="visible"
      title="申请内务密码"
      :loading="modalLoading"
      @on-ok="validForm">
      <Form :model="applyDto" :rules="applyRules" ref="applyForm" :label-width="80" v-if="visible">
        <FormItem label="项目名称" prop="projectBid">
          <Select v-model="applyDto.projectBid" placeholder="" clearable>
            <Option
              v-for="item in $store.state.user.projectList"
              :key="item.bid"
              :label="item.projectName"
              :value="item.bid">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="密码类型" prop="passWordType">
          <Select v-model="applyDto.passWordType">
            <Option
              v-for="item in pswTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getWorkPassword, applyWorkPassword } from '@/api/smartLock'
export default {
  name: 'workPassword',
  data () {
    return {
      paramDto: {
        pageIndex: 1,
        pageSize: 10
      },
      visible: false,
      passwordList: [],
      total: 0,
      loading: false,
      columns: [
        {
          title: '项目',
          key: 'project_name'
        },
        {
          title: '密码类型',
          slot: 'pswType'
        },
        {
          title: '密码状态',
          slot: 'pswStatus'
        }
      ],
      applyDto: {
        projectBid: '',
        passWordType: '1'
      },
      projectOptions: [],
      pswTypeOptions: [
        {
          label: '保洁密码',
          value: '1'
        },
        {
          label: '维修密码',
          value: '2'
        }
      ],
      applyRules: {
        projectBid: [{ required: true, message: '请选择项目', trigger: 'change' }],
        passWordType: [{ required: true, message: '请选择密码类型', trigger: 'change' }]
      },
      modalLoading: true
    }
  },
  methods: {
    handlePageChange () {
      this.loading = true
      getWorkPassword(this.paramDto).then(res => {
        this.passwordList = res.body.rows
        this.total = res.body.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
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
      applyWorkPassword(this.applyDto).then(res => {
        this.$Message.success('内务密码申请成功')
        this.visible = false
        this.handlePageChange()
      }).catch(() => {
        this.handleError()
      })
    }
  },
  created () {
    this.handlePageChange()
  },
  filters: {
    pswTypeFilter (val) {
      switch (val) {
        case 1:
          return '保洁'
        case 2:
          return '维修'
      }
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
