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
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
    <Modal
      v-model="visible"
      title="申请内务密码"
      :loading="modalLoading"
      @on-ok="validForm">
      <Form :model="applyDto" :rules="applyRules" ref="applyForm" :label-width="80" v-if="visible">
        <FormItem label="项目名称" prop="projectBid">
          <Select v-model="applyDto.projectBid">
            <Option
              v-for="item in projectOptions"
              :key="item.projectBid"
              :label="item.projectName"
              :value="item.projectBid">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="密码类型" prop="pswType">
          <Select v-model="applyDto.pswType">
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
export default {
  name: 'workPassword',
  data () {
    return {
      paramDto: {
        projectBid: '',
        page: 1,
        limit: 10
      },
      visible: false,
      passwordList: [
        {
          'psw_status': 1,
          'psw_type': 1,
          'project_bid': 'a3f1411cec184434ae15fa661d434787',
          'project_name': '三里屯团结自如驿'
        },
        {
          'psw_status': 1,
          'psw_type': 1,
          'project_bid': '63615afa5a344153a047aca1ea32cc51',
          'project_name': '北京CBD自如驿'
        },
        {
          'psw_status': 1,
          'psw_type': 1,
          'project_bid': '0c4a4238a98e48c582c425c1851b7979',
          'project_name': '武汉大陆坊自如驿'
        }
      ],
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
        pswType: 1
      },
      projectOptions: [],
      pswTypeOptions: [
        {
          label: '保洁密码',
          value: 1
        },
        {
          label: '维修密码',
          value: 2
        }
      ],
      applyRules: {
        projectBid: [{ required: true, type: 'date', message: '请选择项目', trigger: 'change' }],
        pswType: [{ required: true, type: 'date', message: '请选择密码类型', trigger: 'change' }]
      },
      modalLoading: true
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
