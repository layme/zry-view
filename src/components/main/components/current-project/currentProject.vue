<template>
  <div>
    <span>当前项目：</span>
    <Dropdown @on-click="handleClick">
      <Tag color="blue">{{ $store.state.user.currentProject.projectName }}</Tag>
      <DropdownMenu slot="list">
        <DropdownItem v-for="(item, index) in projectList" :key="index" :name="item.bid">{{ item.projectName }}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'currentProject',
  props: {
    projectList: Array
  },
  methods: {
    ...mapActions([
      'changeCurrentProject'
    ]),
    handleClick (name) {
      this.changeCurrentProject(name)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
