<template>
  <div>
    <chat-member-form :groupName="groupName" @click="listChatMember" @join="handleJoin"></chat-member-form>
    <Table stripe :columns="columns" :data="chatList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="userInfo">
        <a @click="openGuest(row)">查看</a>
      </template>
      <template slot-scope="{ row }" slot="memberRole">
        <div>{{ row.memberRole | roleFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="memberStatus">
        <div>{{ row.memberStatu | userStatusFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a class="my-btn" v-if="row.memberStatu === 0" @click="confirmShutUp(row, 1)">禁言</a>
        <a class="my-btn" v-else @click="confirmShutUp(row, 0)">解禁</a>
        <a class="my-btn" :style="{ color: '#ed4014' }">踢出</a>
        <a v-if="row.memberRole === 0">设为管理员</a>
        <a v-else>取消管理员</a>
        <a v-if="row.memberRole === 1">设为群主</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
    <Modal
      v-model="joinVisible"
      title="加入群聊"
      :loading="joinLoading"
      @on-ok="joinGroup">
      <Form v-if="joinVisible" ref="joinForm" :model="joinDto" :rules="joinRules" :label-width="80">
        <FormItem label="用户手机" prop="customerMobile">
          <Input v-model.trim="joinDto.customerMobile" placeholder="" clearable></Input>
        </FormItem>
        <FormItem label="用户角色" prop="memberRole">
          <Select v-model="joinDto.memberRole" placeholder="请选择" clearable>
            <Option v-for="x in memberRoleOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="guestVisible"
      title="用户详情"
      width="800"
      footer-hide>
      <guest-tabs v-if="guestVisible" :idNumber="idNumber" @close="handleClose"></guest-tabs>
    </Modal>
  </div>
</template>
<script>
import chatMemberForm from './chatMemberForm.vue'
import guestTabs from '@/components/guest/guestTabs'

export default {
  name: 'chatMemberList',
  components: {
    chatMemberForm,
    guestTabs
  },
  data () {
    return {
      loading: false,
      groupName: '',
      paramDto: {
        groupId: '',
        page: 1,
        limit: 10
      },
      columns: [
        {
          title: '用户昵称',
          key: 'memberNickName'
        },
        {
          title: '用户信息',
          slot: 'userInfo'
        },
        {
          title: '用户角色',
          slot: 'memberRole'
        },
        {
          title: '用户状态',
          slot: 'memberStatus'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      chatList: [
        {
          'id': 135,
          'fid': '8a90a3665e12590e015e2c7e96b62307',
          'groupId': '25780968030209',
          'member': '5809d2d1-6c63-28a4-7e89-33cb6dffec37',
          'memberRole': 0,
          'opFid': '20223709',
          'opType': 2,
          'remark': null,
          'isDel': 0,
          'createDate': 1503985090000,
          'lastModifyDate': 1553480220000,
          'memberStatu': 0,
          'recoveryGagTime': 1503985090000,
          'memberRoleShow': null,
          'memberNickName': 'Jerry',
          'memberMobile': null
        }
      ],
      total: 0,
      joinVisible: false,
      joinLoading: true,
      joinDto: {
        groupId: '',
        customerMobile: '',
        memberRole: ''
      },
      joinRules: {
        customerMobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '手机号格式有误', trigger: 'blur' }
        ],
        memberRole: [
          { required: true, type: 'number', message: '请选择用户角色', trigger: 'change' }
        ]
      },
      memberRoleOptions: [
        {
          label: '普通成员',
          value: 1
        }
      ],
      guestVisible: false,
      idNumber: ''
    }
  },
  methods: {
    listChatMember (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.groupName = this.$route.query.groupName
      this.paramDto.groupId = this.$route.query.groupId
      console.info('paramDto', this.paramDto)
    },
    handleJoin () {
      this.joinDto.groupId = this.$route.query.groupId
      this.joinDto.customerMobile = ''
      this.joinDto.memberRole = ''
      this.joinVisible = true
    },
    joinGroup () {
      this.$refs['joinForm'].validate((valid) => {
        if (valid) {
          this.joinVisible = false
        } else {
          setTimeout(() => {
            this.joinLoading = false
            this.$nextTick(() => {
              this.joinLoading = true
            })
          }, 500)
        }
      })
    },
    confirmShutUp (row, val) {
      let ti = ''
      if (val) {
        ti = `确定要禁言 ${row.memberNickName} 吗？`
      } else {
        ti = `确定要解除 ${row.memberNickName} 的禁言吗？`
      }
      this.$Modal.confirm({
        title: '通知',
        content: '<p>' + ti + '</p>',
        onOk: () => {
          this.shutUp(row, val)
        },
        onCancel: () => {
        }
      })
    },
    shutUp (row, val) {},
    openGuest (row) {
      this.idNumber = row.member
      this.guestVisible = true
    },
    handleClose () {
      this.guestVisible = false
    }
  },
  watch: {
    '$route' (to, from) {
      this.handlePageChange()
    }
  },
  created () {
    this.handlePageChange()
  },
  filters: {
    roleFilter (val) {
      if (val === 0) {
        return '普通成员'
      } else if (val === 1) {
        return '管理员'
      } else if (val === 2) {
        return '群主'
      }
    },
    userStatusFilter (val) {
      if (val === 0) {
        return '已入群'
      }
      if (val === 1) {
        return '已禁言'
      }
    }
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

  .my-btn {
    margin-right: 20px;
  }

</style>
