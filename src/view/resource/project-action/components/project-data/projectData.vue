<template>
  <div class="full-top">
    <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
    <Layout style="background-color: #ffffff;">
      <Sider style="background-color: #ffffff;" width="100">
        <ButtonGroup vertical>
          <Button :type="'qualification' === currentLabel ? 'primary' : 'default'" @click="turnTo('qualification')">经营资质
          </Button>
          <Button :type="'contract' === currentLabel ? 'primary' : 'default'" @click="turnTo('contract')">签约合同</Button>
          <Button :type="'else' === currentLabel ? 'primary' : 'default'" @click="turnTo('else')">其他</Button>
        </ButtonGroup>
      </Sider>
      <Content>
        <Button type="primary" @click="openUpload">上传图片</Button>
        <br/>
        <Col :span="6" v-for="item in showList" :key="item.bid" class="my-img-col">
          <div class="img-div">
            <Button class="img-btn" type="error" size="small" shape="circle" icon="md-trash"
                    @click="deleteImgConfirm(item.bid)"></Button>
            <img :src="item.attachmentImgUrl" class="img-class" :alt="currentName">
          </div>
        </Col>
        <div v-if="!showList.length" class="no-img">
          <div class="no-img-inner">
            暂无图片资料
          </div>
        </div>
      </Content>
    </Layout>
    <Modal :title="title" v-model="uploadDialogVisible" width="50">
      <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
        <template v-if="item.status === 'finished'">
          <img :src="item.response.body.attachmentImgUrl">
          <div class="demo-upload-list-cover">
            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
          </div>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </div>
      <Upload
        ref="upload"
        accept="image/*"
        multiple
        type="drag"
        :headers="{ 'Authorization': $store.state.user.token }"
        :action="uploadPicUrl"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        :max-size="2048"
        :on-exceeded-size="handleMaxSize"
        style="display: inline-block; width: 146px;">
        <div style="width: 146px; line-height: 146px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <div>图片大小不能超过 2MB</div>
      <span slot="footer" class="dialog-footer">
        <Button type="text" @click="uploadDialogVisible = false">取 消</Button>
        <Button type="primary" :disabled="!uploadList.length" @click="saveData">保 存</Button>
      </span>
    </Modal>
  </div>
</template>

<script>
import { getData, saveData, deleteData } from '@/api/projectData'

export default {
  name: 'projectData',
  props: {
    projectBid: String
  },
  data () {
    return {
      position: 'left',
      businessQualificationAtt: [],
      contractAtt: [],
      elseAtt: [],
      showList: [],
      uploadDialogVisible: false,
      uploadPicUrl: this.$store.state.app.baseUrl + '/system/upLoadImg.action',
      currentLabel: 'qualification',
      currentName: '',
      title: '',
      imgList: [],
      uploadList: [],
      loading: false
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    listData () {
      this.loading = true
      getData(this.projectBid).then(res => {
        if (res.code === 200) {
          this.businessQualificationAtt = res.body.businessQualificationAtt
          this.contractAtt = res.body.contractAtt
          this.elseAtt = res.body.elseAtt
          this.turnTo(this.currentLabel)
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    turnTo (name) {
      switch (name) {
        case 'qualification':
          this.showList = this.businessQualificationAtt
          this.currentLabel = 'qualification'
          this.currentName = '经营资质'
          break
        case 'contract':
          this.showList = this.contractAtt
          this.currentLabel = 'contract'
          this.currentName = '签约合同'
          break
        case 'else':
          this.showList = this.elseAtt
          this.currentLabel = 'else'
          this.currentName = '其他'
          break
      }
    },
    deleteImgConfirm (val) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定删除该图片吗？</p>',
        onOk: () => {
          this.deleteImg(val)
        },
        onCancel: () => {
        }
      })
    },
    deleteImg (val) {
      deleteData(val).then(res => {
        if (res.code === 200) {
          this.$Message.success('删除成功')
          this.listData()
        }
      })
    },
    openUpload () {
      this.$refs.upload.fileList.length = 0
      this.title = `上传图片 - ${this.currentName}`
      this.uploadDialogVisible = true
    },
    handleMaxSize (file) {
      this.$Message.warning('文件大小超过了限制')
    },
    handleSuccess (response, file, fileList) {
      if (response.code !== 200) {
        this.$Message.error(response.message)
      }
    },
    handleError (err, file, fileList) {
      this.$Message.error('图片上传失败')
      console.info(err)
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    saveData () {
      let dto = {
        bid: this.projectBid
      }
      switch (this.currentLabel) {
        case 'qualification':
          dto.businessQualificationAtt = []
          this.uploadList.forEach(item => {
            dto.businessQualificationAtt.push(item.response.body)
          })
          break
        case 'contract':
          dto.contractAtt = []
          this.uploadList.forEach(item => {
            dto.contractAtt.push(item.response.body)
          })
          break
        case 'else':
          dto.elseAtt = []
          this.uploadList.forEach(item => {
            dto.elseAtt.push(item.response.body)
          })
          break
      }
      saveData(dto).then(res => {
        if (res.code === 200) {
          this.$Message.success('保存成功')
          this.uploadDialogVisible = false
          this.listData()
        }
      })
    }
  },
  created () {
    this.listData()
  }
}
</script>

<style lang="less" scoped>
  .my-img-col {
    margin: 20px 20px 0 0;
  }
  .img-div {
    position: relative;
  }

  .img-btn {
    display: none;
  }

  .img-div:hover .img-btn {
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 3;
  }

  .img-class {
    width: 100%;
    min-height: 100px;
    border-radius: 4px;
    -webkit-box-shadow: #dcdee2 0 1px 6px;
    -moz-box-shadow: #dcdee2 0 1px 6px;
    box-shadow: #dcdee2 0 1px 6px;
  }

  .el-main {
    padding: 0 20px;
  }

  .no-img {
    margin-top: 100px;
  }

  .no-img-inner {
    font-size: 30px;
    color: #e8eaec;
    text-align: center;
    width: 400px;
    border: #e8eaec 1px solid;
    border-radius: 4px;
    line-height: 230px;
    margin: 0 auto;
  }

  .demo-upload-list {
    display: inline-block;
    width: 148px;
    height: 148px;
    text-align: center;
    line-height: 148px;
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

  .full-top {
    position: relative;
    height: 100%;
  }

  .full-spin {
    height: 100%;
  }
</style>
