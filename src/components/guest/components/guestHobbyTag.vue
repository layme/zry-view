<template>
  <div>
    <Row style="height: 75%">
      <Tag class="my-tag"
           :key="index"
           v-for="(tag,index) in hobbyTags"
           closable
           type="dot"
           color="primary"
           :disable-transitions="true"
           @on-close="handleClose(index)">
        {{tag}}
      </Tag>
      <Input class="my-tag input-new-tag"
             v-if="inputVisible"
             v-model="inputValue"
             ref="saveTagInput"
             :maxlength="15"
             @on-keyup.enter.native="handleInputConfirm"
             @on-blur="handleInputConfirm">
      </Input>
      <Button v-else-if="hobbyTags && hobbyTags.length < 30" class="my-tag"
              @click="showInput" icon="ios-add"> 新增
      </Button>
    </Row>
    <Row style="height: 25%; text-align: right">
      <Button v-if="isChange" type="primary" @click="saveTags"> 保 存</Button>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'guestTag',
  props: {
    idNumber: String
  },
  data () {
    return {
      hobbyTags: [],
      inputVisible: false,
      inputValue: '',
      isChange: false
    }
  },
  methods: {
    // 删除标签
    handleClose (index) {
      this.hobbyTags.splice(index, 1)
      this.isChange = true
    },

    // 显示标签输入框
    showInput () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 生成标签
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        if (this.hobbyTags.indexOf(inputValue) !== -1) {
          this.$Message.warning('标签不能重复')
          this.$refs.saveTagInput.focus()
          return
        }
        this.hobbyTags.push(inputValue)
        this.isChange = true
      }
      this.inputVisible = false
      this.inputValue = ''
    },

    // 向后台提交标签
    saveTags () {
    }
  }
}
</script>
<style lang="less" scoped>
  .my-tag {
    margin: 0 20px 20px 0;
  }

  .input-new-tag {
    width: 90px;
  }
</style>
