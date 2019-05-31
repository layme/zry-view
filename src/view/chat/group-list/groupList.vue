<template>
  <div>
    <Form :model="paramDto" :label-width="70">
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="群聊名称">
            <Input v-model.trim="paramDto.name" placeholder="" clearable></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="操作人">
            <Input v-model.trim="paramDto.opBid" placeholder="系统号" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <Button type="primary" icon="ios-search" @click="listGroup"> 查 询</Button>
        </Col>
        <Col span="12" style="text-align: right">
          <Button type="primary" @click="addGroup"> 新建群聊</Button>
        </Col>
      </Row>
    </Form>
    <group-card v-for="(item, index) in groupList" :key="index" :index="index" :group="item" class="my-card"
                @detail="handleDetail" @update="updateGroup" @remove="handleRemove" ></group-card>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
    <Modal
      v-model="visible"
      :title="title"
      :loading="loading"
      @on-ok="saveGroup">
      <group-form ref="groupForm" v-if="visible" :group="row" @submit="handleSubmit" @error="handleError"></group-form>
    </Modal>
  </div>
</template>
<script>
import groupCard from './groupCard.vue'
import groupForm from './groupForm.vue'

export default {
  name: 'groupList',
  components: {
    groupCard,
    groupForm
  },
  data () {
    return {
      paramDto: {
        name: '',
        opBid: '',
        page: 1,
        limit: 5
      },
      groupList: [
        {
          id: 19,
          groupId: '25780968030209',
          name: '北京CBD自如驿',
          description: {
            headUrl: 'http://image.ziroom.com/g2/M00/60/4E/ChAFfVmk_h6AZRCyAABnJrv7xzE869.jpg',
            noticeUrl: '',
            projectBid: '63615afa5a344153a047aca1ea32cc51',
            projectName: '北京CBD自如驿'
          },
          isPublic: 0,
          membersonly: 1,
          allowinvites: 0,
          maxusers: 500,
          affiliationsCount: 1,
          inviteNeedConfirm: 1,
          owner: '5809d2d1-6c63-28a4-7e89-33cb6dffec37',
          createDate: 1503985090000,
          lastModifyDate: 1503985090000,
          isDel: 0,
          projectBid: '63615afa5a344153a047aca1ea32cc51',
          opBid: '60002160',
          opType: 2,
          isDefault: 0
        }
      ],
      total: 0,
      visible: false,
      loading: true,
      title: '',
      row: {}
    }
  },
  methods: {
    listGroup () {
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      console.info('paramDto', this.paramDto)
    },
    addGroup () {
      this.visible = true
      this.title = '新建群聊'
      this.row = {}
    },
    updateGroup (index) {
      this.visible = true
      this.title = '修改群聊'
      this.row = this.groupList[index]
    },
    handleDetail (index) {
      const groupId = this.groupList[index].groupId
      const groupName = this.groupList[index].name
      const route = {
        name: 'chatMemberList',
        query: {
          groupId: groupId,
          groupName: groupName
        }
      }
      this.$router.push(route)
    },
    handleRemove (index) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定删除该群聊吗？</p>',
        onOk: () => {
          this.removeGroup(index)
        },
        onCancel: () => {
        }
      })
    },
    removeGroup (index) {
      this.$Message.success('remove success')
    },
    saveGroup () {
      this.$refs.groupForm.validForm()
    },
    handleSubmit (dto) {
      this.visible = false
    },
    handleError () {
      setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    }
  }
}
</script>
<style lang="less" scoped>
  .my-card {
    margin-top: 20px;
    -webkit-box-shadow: #dcdee2 0 1px 6px;
    -moz-box-shadow: #dcdee2 0 1px 6px;
    box-shadow: #dcdee2 0 1px 6px;
  }

  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
