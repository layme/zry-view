<template>
  <div>
    <chat-member-form :groupName="groupName" @search="listChatMember" @join="handleJoin"></chat-member-form>
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
        <template v-if="row.memberRole === 0">
          <a class="my-btn" v-if="row.memberStatu === 0" @click="confirmAddGagMember(row)">禁言</a>
          <a class="my-btn" v-else @click="confirmRemoveGagMember(row)">解禁</a>
          <a class="my-btn" :style="{ color: '#ed4014' }" @click="confirmRemoveMember(row)">踢出</a>
          <a v-if="row.memberRole === 0 && row.memberStatu === 0" @click="confirmAddAdminMember(row)">设为管理员</a>
        </template>
        <template v-else-if="row.memberRole === 1">
          <a class="my-btn" @click="confirmDeleteAdminMember(row)">取消管理员</a>
          <a @click="confirmTransferGroup(row)">成为群主</a>
        </template>
        <template v-else>
          <span>-</span>
        </template>
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
import { getMembers, addGagMember, removeGagMember, removeMember, addAdminMember, deleteAdminMember, transferGroup } from '@/api/socialContact'
import { mapMutations } from 'vuex'

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
          slot: 'action',
          width: 200
        }
      ],
      chatList: [],
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
    ...mapMutations([
      'closeTag'
    ]),
    handleCloseTag () {
      this.closeTag({
        name: 'chatMemberList'
      })
    },
    listChatMember (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      this.groupName = this.$route.query.groupName
      this.paramDto.groupId = this.$route.query.groupId
      if (!this.groupName || !this.paramDto.groupId) {
        this.loading = false
        this.$Message.warning('请通过群列表访问群聊成员页面')
        this.handleCloseTag()
        this.$router.push({ name: 'home' })
      }
      getMembers(this.paramDto).then(res => {
        this.chatList = res.body.rows
        this.total = res.body.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
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
    confirmAddGagMember (row) {
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确定要禁言 ${row.memberNickName} 吗？</p>`,
        onOk: () => {
          this.addGagMember(row)
        },
        onCancel: () => {
        }
      })
    },
    addGagMember (row) {
      let dto = {
        groupId: row.groupId,
        members: [row.member]
      }
      addGagMember(dto).then(res => {
        this.$Message.success('禁言成功')
        this.handlePageChange()
      })
    },
    confirmRemoveGagMember (row) {
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确定要解除 ${row.memberNickName} 的禁言吗？</p>`,
        onOk: () => {
          this.removeGagMember(row)
        },
        onCancel: () => {
        }
      })
    },
    removeGagMember (row) {
      let dto = {
        groupId: row.groupId,
        members: [row.member]
      }
      removeGagMember(dto).then(res => {
        this.$Message.success('解禁成功')
        this.handlePageChange()
      })
    },
    confirmRemoveMember (row) {
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确定要将 ${row.memberNickName} 踢出群聊吗？</p>`,
        onOk: () => {
          this.removeMember(row)
        },
        onCancel: () => {
        }
      })
    },
    removeMember (row) {
      let dto = {
        groupId: row.groupId,
        members: [row.member]
      }
      removeMember(dto).then(res => {
        this.$Message.success('踢出群聊成功')
        this.handlePageChange()
      })
    },
    confirmAddAdminMember (row) {
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确定要将 ${row.memberNickName} 设为管理员吗？</p>`,
        onOk: () => {
          this.addAdminMember(row)
        },
        onCancel: () => {
        }
      })
    },
    addAdminMember (row) {
      let dto = {
        groupId: row.groupId,
        members: [row.member],
        memberRole: 1
      }
      addAdminMember(dto).then(res => {
        this.$Message.success('管理员设置成功')
        this.handlePageChange()
      })
    },
    confirmDeleteAdminMember (row) {
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确定要取消 ${row.memberNickName} 的管理员身份吗？</p>`,
        onOk: () => {
          this.deleteAdminMember(row)
        },
        onCancel: () => {
        }
      })
    },
    deleteAdminMember (row) {
      let dto = {
        groupId: row.groupId,
        members: [row.member]
      }
      deleteAdminMember(dto).then(res => {
        this.$Message.success('管理员取消成功')
        this.handlePageChange()
      })
    },
    confirmTransferGroup (row) {
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确定要将 ${row.memberNickName} 设为群主吗？</p><p>老群主将会变成普通成员</p>`,
        onOk: () => {
          this.transferGroup(row)
        },
        onCancel: () => {
        }
      })
    },
    transferGroup (row) {
      let dto = {
        groupId: row.groupId,
        owner: row.member
      }
      transferGroup(dto).then(res => {
        this.$Message.success('群主转移成功')
        this.handlePageChange()
      })
    },
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
