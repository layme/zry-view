<template>
  <div>
    <Form :model="paramDto" :label-width="60">
      <Row :gutter="20">
        <Col :span="8">
          <FormItem label="项目">
            <Select v-model="paramDto.projectBid" placeholder="">
              <Option
                v-for="item in $store.state.user.projectList"
                :key="item.bid"
                :label="item.projectName"
                :value="item.bid">
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="用户">
            <Input v-model.trim="paramDto.name" placeholder="" :maxlength="10" clearable></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="工号">
            <Input v-model.trim="paramDto.userName" placeholder="" :maxlength="8" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="20">
        <Col span="12">
          <Button type="primary" icon="ios-search" @click="listData"> 查 询</Button>
        </Col>
        <Col span="12" style="text-align: right">
          <Button type="primary" @click="openModal">权限分配</Button>
        </Col>
      </Row>
    </Form>
    <Table stripe :columns="columns" :data="dataList" :loading="loading" class="my-table"></Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
    <Modal
      v-model="visible"
      title="权限分配"
      width="500"
      :loading="modalLoading"
      @on-ok="validForm">
      <Form ref="permissionForm" :model="permissionDto" :rules="permissionRules" :label-width="60">
        <FormItem label="项目" prop="projectBid">
          <Select v-model="permissionDto.projectBid" placeholder="">
            <Option
              v-for="item in allProjectOptions"
              :key="item.bid"
              :label="item.projectName"
              :value="item.bid">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="工号" prop="userName">
          <Input v-model.trim="permissionDto.userName" placeholder="" :maxlength="8"
                 @on-blur="getUser" @on-clear="handleClear" clearable></Input>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <Input v-model.trim="permissionDto.name" placeholder="" disabled clearable></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getProjectListAll } from '@/api/project'
import { getPermission, getUser, savePermission, delPermission } from '@/api/user'
export default {
  name: 'projectPermission',
  data () {
    return {
      paramDto: {
        projectBid: '',
        name: '',
        userName: '',
        page: 1,
        limit: 10
      },
      dataList: [],
      total: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 100
        },
        {
          title: '项目',
          key: 'projectName'
        },
        {
          title: '工号',
          key: 'username'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '操作',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('a', {
                style: { color: '#ed4014' },
                on: {
                  click: () => {
                    this.confirmDelPermission(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      loading: false,
      visible: false,
      modalLoading: true,
      allProjectOptions: [],
      permissionDto: {
        projectBid: '',
        userName: '',
        name: ''
      },
      permissionRules: {
        projectBid: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请输入工号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请先输入工号', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    listData () {
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      getPermission(this.paramDto).then(res => {
        if (res.code === 200) {
          this.dataList = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getProjectListAll () {
      getProjectListAll().then(res => {
        if (res.code === 200) {
          this.allProjectOptions = res.body
        }
      })
    },
    openModal () {
      this.visible = true
      this.$refs['permissionForm'].resetFields()
    },
    getUser () {
      if (this.permissionDto.userName) {
        getUser(this.permissionDto.userName).then(res => {
          if (res.code === 200) {
            this.permissionDto.name = res.body.name
          }
        })
      }
    },
    handleClear () {
      this.permissionDto.name = ''
    },
    validForm () {
      this.$refs['permissionForm'].validate((valid) => {
        if (valid) {
          this.savePermission()
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
    savePermission () {
      savePermission(this.permissionDto).then(res => {
        if (res.code === 200) {
          this.$Message.success('项目权限分配成功')
          this.visible = false
          this.listData()
        } else {
          this.handleError()
        }
      }).catch(() => {
        this.handleError()
      })
    },
    confirmDelPermission (row) {
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确定要删除 ${row.name} 对 ${row.projectName} 的操作权限吗？</p>`,
        onOk: () => {
          this.delPermission(row)
        },
        onCancel: () => {
        }
      })
    },
    delPermission (row) {
      delPermission(row.id).then(res => {
        if (res.code === 200) {
          this.$Message.success('删除成功')
          this.listData()
        }
      })
    }
  },
  created () {
    this.listData()
    this.getProjectListAll()
  }
}
</script>
<style lang="less" scoped>
  .my-table {
    margin-top: 20px
  }

  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
