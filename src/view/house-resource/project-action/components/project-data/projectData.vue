<template>
  <div>
    <Layout style="background-color: #ffffff;">
      <Sider style="background-color: #ffffff;" width="100">
        <ButtonGroup vertical>
          <Button :type="'qualification' === currentLabel ? 'primary' : ''" @click="turnTo('qualification')">经营资质
          </Button>
          <Button :type="'contract' === currentLabel ? 'primary' : ''" @click="turnTo('contract')">签约合同</Button>
          <Button :type="'else' === currentLabel ? 'primary' : ''" @click="turnTo('else')">其他</Button>
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
        <div v-if="!showList.length" class="no-img"><i class="el-icon-picture-outline"> 暂无数据</i></div>
      </Content>
    </Layout>
    <Modal title="上传图片" v-model="uploadDialogVisible" width="50" @close="handleClose">
      <Upload v-if="uploadDialogVisible"
              class="pic-uploader"
              list-type="picture-card"
              accept="image/*"
              multiple
              :action="uploadPicUrl"
              :limit="10"
              :before-upload="beforeUpload"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-exceed="handleExceed"
              :on-error="handleError">
        <div slot="tip" class="el-upload__tip">图片大小不能超过 2MB</div>
        <i class="el-icon-plus pic-uploader-icon"></i>
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
      uploadPicUrl: '/system/upLoadImg.action',
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
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$Message.warning('文件的大小不能超过 2MB')
      }
      return isLt2M
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

<style scoped>
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

  .pic-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .pic-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .pic-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }

  .no-img {
    color: #909399;
    margin-top: 20px;
    text-align: center;
  }
</style>
