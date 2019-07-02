<template>
  <div class="top-div">
    <Row>
      <Tag class="my-tag"
           :key="index"
           v-for="(tag,index) in guestHobbyDto.hobbyTags"
           closable
           type="dot"
           color="primary"
           :disable-transitions="true"
           @on-close="handleClose(index)">
        {{tag}}
      </Tag>
      <Input class="my-tag input-new-tag"
             v-if="inputVisible"
             v-model.trim="inputValue"
             ref="saveTagInput"
             :maxlength="15"
             @keyup.enter.native="handleInputConfirm"
             @on-blur="handleInputConfirm">
      </Input>
      <Button v-else-if="guestHobbyDto.hobbyTags && guestHobbyDto.hobbyTags.length < 30" class="my-tag"
              @click="showInput" icon="ios-add"> 新增
      </Button>
    </Row>
    <Row class="special-row">
      <Button v-if="isChange" type="primary" @click="saveTags"> 保 存</Button>
    </Row>
  </div>
</template>
<script>
import { listHobby, saveTags } from '@/api/guest'
export default {
  name: 'guestTag',
  props: {
    guestFid: String
  },
  data () {
    return {
      guestHobbyDto: {
        guestFid: this.guestFid,
        hobbyTags: []
      },
      inputVisible: false,
      inputValue: '',
      isChange: false
    }
  },
  methods: {
    listHobby () {
      listHobby(this.guestFid).then(res => {
        this.guestHobbyDto.hobbyTags = res.body
      })
    },
    // 删除标签
    handleClose (index) {
      this.guestHobbyDto.hobbyTags.splice(index, 1)
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
        if (this.guestHobbyDto.hobbyTags.indexOf(inputValue) !== -1) {
          this.$Message.warning('标签不能重复')
          this.$refs.saveTagInput.focus()
          return
        }
        this.guestHobbyDto.hobbyTags.push(inputValue)
        this.isChange = true
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 向后台提交标签
    saveTags () {
      saveTags(this.guestHobbyDto).then(res => {
        this.$Message.success('保存成功')
        this.listHobby()
        this.isChange = false
      })
    }
  },
  created () {
    this.listHobby()
  }
}
</script>
<style lang="less" scoped>
  .top-div {
    height: 100%;
  }
  .my-tag {
    margin: 0 20px 20px 0;
  }

  .input-new-tag {
    width: 90px;
  }
  .special-row {
    position: absolute;
    width: 100%;
    text-align: right;
    bottom: 20px;
    padding-right: 20px;
  }
</style>
