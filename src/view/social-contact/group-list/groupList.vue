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
import { getGroups, updateGroup, createGroup, removeGroup } from '@/api/socialContact'

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
      groupList: [],
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
      getGroups(this.paramDto).then(res => {
        this.groupList = res.body.rows
        this.total = res.body.total
      }).catch(() => {
      })
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
          groupId,
          groupName
        }
      }
      this.$router.push(route)
    },
    handleRemove (index) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定解散该群聊吗，本操作无法回滚？</p>',
        onOk: () => {
          this.removeGroup(index)
        },
        onCancel: () => {
        }
      })
    },
    removeGroup (index) {
      let data = {
        groupId: this.groupList[index].groupId,
        owner: this.groupList[index].owner
      }
      removeGroup(data).then(res => {
        this.$Message.success('解散群聊成功')
        this.visible = false
        this.listGroup()
      })
    },
    saveGroup () {
      this.$refs.groupForm.validForm()
    },
    handleSubmit (dto) {
      if (dto.groupId) {
        this.handleUpdateGroup(dto)
      } else {
        this.handleSaveGroup(dto)
      }
    },
    handleUpdateGroup (dto) {
      let data = {
        groupId: dto.groupId,
        groupname: dto.groupname,
        description: JSON.stringify({ headUrl: dto.headUrl })
      }
      updateGroup(data).then(res => {
        this.$Message.success('更新群聊成功')
        this.visible = false
        this.listGroup()
      }).catch(() => {
        this.handleError()
      })
    },
    handleSaveGroup (dto) {
      let data = {
        groupname: dto.groupname,
        mobile: dto.mobile,
        desc: JSON.stringify({ headUrl: dto.headUrl })
      }
      createGroup(data).then(res => {
        this.$Message.success('创建群聊成功')
        this.visible = false
        this.listGroup()
      }).catch(() => {
        this.handleError()
      })
    },
    handleError () {
      setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    }
  },
  created () {
    this.listGroup()
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
