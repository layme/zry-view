<template>
  <Form ref="groupForm" :model="paramDto" :rules="groupRules" :label-width="100">
    <FormItem label="群聊名称" prop="groupname">
      <Input v-model.trim="paramDto.groupname" placeholder="" clearable></Input>
    </FormItem>
    <FormItem label="管理员手机号" prop="mobile" v-if="!paramDto.groupId">
      <Input v-model.trim="paramDto.mobile" placeholder="" clearable></Input>
    </FormItem>
    <FormItem label="群头像" prop="headUrl">
      <Input v-show="false" v-model="paramDto.headUrl" placeholder="" clearable></Input>
      <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
          <img :src="item.response ? item.response.body.attachmentImgUrl : item.url">
          <div class="demo-upload-list-cover">
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        v-if="!uploadList.length"
        ref="upload"
        accept="image/*"
        type="drag"
        :headers="{ 'Authorization': $store.state.user.token }"
        :action="uploadPicUrl"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :max-size="200"
        :on-exceeded-size="handleMaxSize"
        style="display: inline-block; width: 46px;">
        <div style="width: 46px; line-height: 46px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <div v-if="!uploadList.length">图片大小不能超过 200KB</div>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'groupForm',
  props: {
    group: Object
  },
  data () {
    return {
      paramDto: {
        groupId: '',
        groupname: '',
        mobile: '',
        headUrl: ''
      },
      groupRules: {
        groupname: [
          { required: true, message: '请输入群聊名称', trigger: 'blur' },
          { max: 50, type: 'string', message: '长度在200个字符以内', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入管理员手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '手机号格式有误', trigger: 'blur' }
        ],
        headUrl: [
          { required: true, message: '请上传头像图片', trigger: 'blur' }
        ]
      },
      uploadPicUrl: this.$store.state.app.baseUrl + '/system/upLoadImg.action',
      uploadList: []
    }
  },
  methods: {
    validForm () {
      this.$refs['groupForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.paramDto)
        } else {
          this.$emit('error')
        }
      })
    },
    handleMaxSize (file) {
      this.$Message.warning('文件大小超过了限制')
    },
    handleSuccess (response, file, fileList) {
      if (response.code !== 200) {
        this.$Message.error(response.message)
      } else {
        this.paramDto.headUrl = response.body.attachmentImgUrl
        this.uploadList = this.$refs.upload.fileList
      }
    },
    handleError (err, file, fileList) {
      this.$Message.error('图片上传失败')
      console.info(err)
    },
    handleRemove (file) {
      if (this.$refs.upload) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      } else {
        this.uploadList.splice(0, 1)
      }
      this.paramDto.headUrl = ''
    }
  },
  created () {
    if (Object.keys(this.group).length) {
      this.paramDto.groupId = this.group.groupId
      this.paramDto.groupname = this.group.name
      this.paramDto.headUrl = JSON.parse(this.group.description).headUrl
      this.uploadList.push({
        url: this.paramDto.headUrl,
        status: 'finished'
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .demo-upload-list {
    display: inline-block;
    width: 48px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
