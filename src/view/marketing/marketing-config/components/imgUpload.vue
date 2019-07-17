<template>
  <div>
    <Modal v-model="isShow" @on-ok="ok" :loading="loading" :mask-closable="false" :class-name="z100000"
           :width="650"
    >
      <h3 slot="header" class="modal-header">图片上传</h3>
      <div style="display: flex;flex-wrap: wrap">
        <template v-for="(item, index) in data " v-if="data">
          <div class="fileItem" :key="item.bid">
            <div style="margin-bottom: 10px;">
              <img class="file-img" :src="item.attachmentImgUrl" alt=""> <br>
              <div style="display: flex; justify-content: space-around">
                <a href="javascript:;"  @click="setFirst(index)" v-if="index != 0">设为首图</a>
                <a href="javascript:;"  @click="deleteItem(item)">删除</a></div>

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
            <Icon type="ios-add" size="80" style="vertical-align: middle"></Icon>
          </Upload>

        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getConfigImg, editConfigImg } from '@/api/marketingConfig'

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
      uploadPicUrl: this.$store.state.app.baseUrl + '/system/upLoadImg.action'
    }
  },
  methods: {
    formatError () {
      this.$Message.info('请上传图片类型文件')
    },
    handleError (err, file, fileList) {
      this.$Message.error('图片上传失败')
      console.info(err)
    },
    handleSuccess (res) {
      let params = {
        attachmentImgUrl: res.body.attachmentImgUrl,
        moduleFid: this.fid,
        order: this.labelOrder
      }
      this.data.push(params)
    },
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    setFirst (index) {
      let removed = this.data.splice(index, 1)
      this.data.unshift(removed[0])
    },
    deleteItem (item) {
      this.data = this.data.filter(v => v.attachmentImgUrl !== item.attachmentImgUrl)
    },
    labelgetConfigImg () {
      if (!this.fid) {
        return
      }
      let params = {
        fid: this.fid
      }
      getConfigImg(params).then(res => {
        this.data = res.body
      }).catch(error => console.info(error))
    },
    ok () {
      this.data.forEach((ele, index) => {
        ele['attachmentOrder'] = index
        if (index === 0) {
          ele['isDefault'] = 1
        }
      })
      if (!this.fid) {
        this.$emit('pic', this.data)
        this.isShow = false
        return
      }
      editConfigImg(this.data).then(res => {
        this.$Message.success('图片配置成功')
        this.changeLoading()
        this.isShow = false
      }).catch(() => {
        this.changeLoading()
      })
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
