<template>
  <div>
    <Modal v-model="isShow" @on-ok="ok" :loading="loading" :mask-closable="false"
           :width="650"
    >
      <h3 slot="header" class="modal-header">VR看房</h3>
      <Input v-show="false" v-model="imgUrl" placeholder="" clearable></Input>
      <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
          <img :src="item.response ? item.response.body.attachmentImgUrl : item.url">

          <div   class="demo-upload-list-cover">
            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
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
        style="display: inline-block; width: 70px;">
        <div style="width: 70px;  line-height: 70px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
      </Modal>
      <div>
        <Input type="textarea" :rows="5" :maxlength="500" v-model="vrLinkUrl"/>
        <div v-if="!vrLinkUrl" style="color: rgb(150,150,150)">温馨提示：请输入少于500个字符！！</div>
      </div>
    </Modal>
  </div>

</template>

<script>
import { labelList, editAddImgConfig } from '@/api/marketingConfig'

export default {
  name: 'HeadImg',
  props: {
    n: {
      type: Number,
      default: 0
    },
    fid: {
      type: String,
      default: ''
    }
  },
  watch: {
    n () {
      this.imgUrl = ''
      this.imgBid = ''
      this.vrLinkUrl = ''
      this.uploadList = []
      this.labellist()
      this.isShow = true
    }
  },
  data () {
    return {
      imgUrl: '',
      imgBid: '',
      vrLinkUrl: '',
      bid: '',
      uploadList: [],
      visible: false,
      isShow: false,
      loading: true,
      uploadPicUrl: this.$store.state.app.baseUrl + '/system/upLoadImg.action'
    }
  },
  methods: {
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    formatError () {
      this.$Message.info('请上传图片类型文件')
    },
    handleView (name) {
      this.visible = true
    },
    handleRemove (file) {
      if (this.$refs.upload) {
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      } else {
        this.uploadList.splice(0, 1)
      }
      this.imgUrl = ''
    },
    labellist () {
      if (!this.fid) {
        return
      }
      let params = {
        moduleFid: this.fid,
        type: 2
      }
      labelList(params).then(res => {
        let data = res.body[0]
        if (data) {
          this.vrLinkUrl = data.link
          this.bid = data.bid
          let imgEntity = data.picUrl[0]
          if (imgEntity) {
            this.imgUrl = imgEntity.attachmentImgUrl
            this.imgBid = imgEntity.bid
          }
        }
      })
    },
    ok () {
      let imgList = []
      imgList.push({
        bid: this.imgBid,
        attachmentImgUrl: this.imgUrl
      })
      let data = []
      data.push({
        'bid': this.bid,
        'labelOrder': 1,
        'labelName': 'VR',
        'picUrl': imgList,
        'labelType': 2
      })
      let params = {
        moduleFid: this.fid,
        labelEntities: data
      }
      editAddImgConfig(params).then(res => {
        this.$Message.success('VR看房保存成功')
        this.changeLoading()
        this.isShow = false
      }).catch(() => {
        this.changeLoading()
      })
    },

    handleError (err, file, fileList) {
      this.$Message.error('图片上传失败')
      console.info(err)
    },
    handleMaxSize (file) {
      this.$Message.warning('文件大小超过了限制')
    },
    handleSuccess (response, file, fileList) {
      if (response.code !== 200) {
        this.$Message.error(response.message)
      } else {
        this.imgUrl = response.body.attachmentImgUrl
        this.uploadList = this.$refs.upload.fileList
      }
    }
  },
  created () {
  }
}

</script>

<style scoped>
  .imgwidth{
    width: 150px;
    height: 100px;
    vertical-align: middle;
  }
  .upload {
    display: inline-block;
    width: 150px;
    height: 100px;
    border: 1px dashed rgb(220, 220, 220);
    box-sizing: border-box;
    text-align: center;
    line-height: 100px;
    vertical-align: middle;
  }
  .demo-upload-list {
    display: inline-block;
    width: 150px;
    height: 85px;
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
    line-height: 83px;
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
