<template>
  <div class="user-avator-dropdown">
    <Tooltip content="消息" placement="bottom">
      <Badge :count="messageUnreadCount" :offset="[5, 10]">
        <Icon type="md-mail" class="my-mail" :size="18" @click="message" />
      </Badge>
    </Tooltip>
    <Dropdown @on-click="handleClick">
        <span>{{ userName }}</span>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userName: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'messageList'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
      }
    }
  }
}
</script>
