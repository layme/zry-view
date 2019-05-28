<template>
  <div>
    <Layout>
      <Sider class="my-sider">
        <!--<Tabs :tab-position="position" style="height: 100%;" :value="currentLabel" @tab-click="handleProjectData">-->
          <!--<TabPane label="经营资质" name="qualification"></TabPane>-->
          <!--<TabPane label="签约合同" name="contract"></TabPane>-->
          <!--<TabPane label="其他" name="else"></TabPane>-->
        <!--</Tabs>-->
        <ButtonGroup vertical>
          <Button type="primary">经营资质</Button>
          <Button type="primary">签约合同</Button>
          <Button type="primary">其他</Button>
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
        <div v-if="!showList.length" style="color: #909399; margin-top: 20px; text-align: center"><i class="el-icon-picture-outline"> 暂无数据</i></div>
      </Content>
    </Layout>
    <Modal title="上传图片" :visible.sync="uploadDialogVisible" width="50" @close="handleClose">
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
    handleProjectData (tab) {
      this.turnTo(tab.name)
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
      this.$confirm('确定删除该图片吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteImg(val)
      }).catch(() => {
      })
    },
    deleteImg (val) {
      deleteData(val).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.listData()
        }
      })
    },
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message({
          message: '文件的大小不能超过 2MB',
          type: 'warning'
        })
      }
      return isLt2M
    },
    handleSuccess (response, file, fileList) {
      if (response.code === 200) {
        this.imgList.push(response.body)
      } else {
        this.$message({
          message: response.message,
          type: 'error'
        })
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
      this.$message({
        message: '一次最多上传 10 张图片',
        type: 'warning'
      })
    },
    handleError (err, file, fileList) {
      this.$message({
        message: '图片上传失败',
        type: 'error'
      })
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
          this.$message({
            message: '保存成功',
            type: 'success'
          })
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
  .my-sider {
    width: 100px;
    margin-right: 20px;
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
</style>
