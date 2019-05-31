<template>
  <div>
    <chat-member-form @click="listChatMember"></chat-member-form>
    <Table stripe :columns="columns" :data="chatList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="userInfo">
        <a>查看</a>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a class="my-btn">禁言</a>
        <a class="my-btn">踢出</a>
        <a>设为管理员</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import chatMemberForm from './chatMemberForm.vue'

export default {
  name: 'chatMemberList',
  components: {
    chatMemberForm
  },
  data () {
    return {
      loading: false,
      paramDto: {
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
          key: 'memberRole'
        },
        {
          title: '用户状态',
          key: 'memberStatu'
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
      total: 0
    }
  },
  methods: {
    listChatMember (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      console.info('paramDto', this.paramDto)
    }
  },
  created () {
    this.handlePageChange()
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
