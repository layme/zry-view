<template>
  <div>
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
        <Button type="primary" @click="uploadDialogVisible = true">上传图片</Button>
        <br/>
        <Col :span="6" v-for="item in showList" :key="item.bid">
          <Card shadow="hover" :body-style="{ padding: '0px' }" style="margin: 10px">
            <div class="img-div">
              <Button class="img-btn" size="mini" type="danger" circle icon="el-icon-delete"
                      @click="deleteImgConfirm(item.bid)">
              </Button>
              <img :src="item.attachmentImgUrl" class="img-class" alt="经营资质">
            </div>
          </Card>
        </Col>
        <div v-if="!showList.length" class="no-img">
          <div class="no-img-inner">
            暂无图片资料
          </div>
        </div>
      </Content>
    </Layout>
    <Modal title="上传图片" v-model="uploadDialogVisible" width="50" @close="handleClose">
      <div class="demo-upload-list" v-for="(item, index) in imgList" :key="index">
        <template v-if="item.status === 'finished'">
          <img :src="item.url">
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
        v-if="uploadDialogVisible"
        accept="image/*"
        multiple
        type="drag"
        :action="uploadPicUrl"
        :show-upload-list="false"
        :on-success="handleSuccess"
        :max-size="2048"
        :on-exceeded-size="handleMaxSize"
        style="display: inline-block; width: 148px;">
        <div slot="tip" class="el-upload__tip">图片大小不能超过 2MB</div>
        <div style="width: 148px; height: 148px; line-height: 148px;">
          <Icon type="ios-camera" size="20"></Icon>
        </div>
      </Upload>
      <span slot="footer" class="dialog-footer">
        <Button @click="uploadDialogVisible = false">取 消</Button>
        <Button type="primary" :disabled="!imgList.length" @click="saveData">保 存</Button>
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
      imgList: []
    }
  },
  methods: {
    listData () {
      getData(this.projectBid).then(res => {
        this.businessQualificationAtt = res.body.businessQualificationAtt
        this.contractAtt = res.body.contractAtt
        this.elseAtt = res.body.elseAtt
        this.turnTo(this.currentLabel)
      })
    },
    turnTo (name) {
      switch (name) {
        case 'qualification':
          this.showList = this.businessQualificationAtt
          this.currentLabel = 'qualification'
          break
        case 'contract':
          this.showList = this.contractAtt
          this.currentLabel = 'contract'
          break
        case 'else':
          this.showList = this.elseAtt
          this.currentLabel = 'else'
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
    handleMaxSize (file) {
      this.$Message.warning('文件大小超过了限制')
    },
    handleSuccess (response, file, fileList) {
      if (response.code === 200) {
        this.imgList.push(response.body)
      } else {
        this.$Message.error('response.message')
      }
    },
    handleRemove (file, fileList) {
      if (!file.response) {
        return
      }
      const url = file.response.body.url
      this.imgList.forEach((item, index) => {
        if (url === item.url) {
          this.imgList.splice(index, 1)
        }
      })
    },
    handleExceed (files, fileList) {
      this.$Message.warning('一次最多上传 10 张图片')
    },
    handleError (err, file, fileList) {
      this.$Message.error('图片上传失败')
      console.log('upload err ', err)
    },
    handleClose () {
      this.imgList = []
    },
    saveData () {
      let dto = {
        bid: this.projectBid
      }
      switch (this.currentLabel) {
        case 'qualification':
          dto.businessQualificationAtt = this.imgList
          break
        case 'contract':
          dto.contractAtt = this.imgList
          break
        case 'else':
          dto.elseAtt = this.imgList
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
    z-index: 3
  }
  .img-class {
    width: 100%;
    min-height: 100px;
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
  .demo-upload-list{
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
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
