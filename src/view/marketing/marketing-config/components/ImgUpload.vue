<template>
  <div>
    <Modal v-model="isShow" :loading="loading" :mask-closable="false" :class-name="z100000">
      <h3 slot="header" class="modal-header">图片上传</h3>
      <div style="display: flex;flex-wrap: wrap">
        <template v-for="item in data " v-if="data">
          <div class="fileItem">
            <div style="margin-bottom: 10px;">
              <img class="file-img" :src="item.attachmentImgUrl" alt="">
              <a href="javascript:;" style="vertical-align: bottom" @click="deleteItem(item)">删除</a>
            </div>
          </div>
        </template>
        <div class="fileItem">
          <Upload class="upload"
                  :action="uploadPicUrl"
                  :on-success="handleSuccess"
                  :headers="{'Authorization': $store.state.user.token}"
                  :show-upload-list="false"
                  :on-error="handleError"
                  :format="['jpg','jpeg','png']"
                  :on-format-error="formatError"

          >
            <Icon type="ios-plus-empty" size="80" style="vertical-align: middle"></Icon>
          </Upload>

        </div>
      </div>
    </Modal>
  </div>
</template>

<script>

export default {
  name: 'ImgUpload',
  props: {
    n: {
      type: Number,
      default: 0
    },
    fid: {
      type: String,
      default: ''
    },
    labelOrder: {
      type: Number,
      default: 0
    },
    pics: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    n () {
      this.data = []
      if (this.pics.length > 0) {
        this.data = this.pics
      }
      this.labelgetConfigImg()
      this.isShow = true
    }
  },
  data () {
    return {
      isShow: false,
      data: [],
      loading: true,
      z100000: 'z100000',
      num: 1,
      uploadPicUrl: this.$store.state.app.baseUrl + '/system/upLoadImg.action'
    }
  },
  methods: {
    formatError () {
      this.$Message.info('请上传图片类型文件')
    },
    handleError () {

    },
    handleSuccess (res) {
      let params = {
        attachmentImgUrl: res.body.attachmentImgUrl,
        moduleFid: this.fid,
        type: 1,
        order: this.labelOrder
      }
      if (!this.fid) {
        this.data.push(params)
      }
      /* labeladdConfigImg(params).then(res1 => {
        this.data.push(res1.data)
      }).catch(error=>{}) */
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    deleteItem (item) {
      if (this.data.length <= this.num) {
        this.$Message.error('至少保留' + this.num + '张图片')
        this.changeLoading()
        return
      }
      if (!this.fid) {
        this.data = this.data.filter(v => v.attachmentImgUrl !== item.attachmentImgUrl)
        this.changeLoading()
        return
      }
      let params = {
        fid: item.fid
      }
      /* labelremoveConfigImg(params).then(res => {
        this.labelgetConfigImg()
      }).catch(error=>{}) */
    },
    labelgetConfigImg () {
      if (!this.fid) {
        return
      }
      let params = {
        fid: this.fid
      }
      /* labelgetConfigImg(params).then(res => {
        this.data = res.data
      }).catch(error=>{}) */
    }
  },
  created () {
  }

}
</script>

<style scoped>
  .upload {
    display: inline-block;
    width: 150px;
    height: 85px;
    border: 1px dashed rgb(220, 220, 220);
    box-sizing: border-box;
    text-align: center;
    line-height: 80px;
  }

  .fileItem {
    margin-right: 20px;
  }

  .content-right {
    /*border: 1px solid black;*/
    overflow: hidden;
    display: flex;
    padding-left: 20px;
    box-sizing: border-box;

  }

  .file-img {
    width: 150px;
    height: 85px;
    overflow: hidden;
    display: inline-block;
    /*margin-bottom: 20px;*/
  }

  .input-width {
    width: 150px;
    margin-bottom: 10px;
  }

</style>
