<template>
  <div>
    <Modal v-model="isShow" @on-ok="ok" :loading="loading" :mask-closable="false">
      <h3 slot="header" class="modal-header">图片配置</h3>
      <Row class="row" >
        <Col span="4"><span style="color: #ed4014;">*</span>排序</Col>
        <Col span="13"><span style="color: #ed4014;">*</span>标签文本</Col>
        <Col span="3"><span style="color: #ed4014;">*</span>标签图片</Col>
        <Col span="4">操作</Col>
      </Row>
      <Row class="row" v-for="(item,index) in data " :key="item.fid">
        <Col span="4">
          <InputNumber :min="1" v-model="item.labelOrder"></InputNumber>
        </Col>
        <Col span="13">
          <Input class="width85" v-model="item.labelName"/>
        </Col>
        <Col span="3">
          <a @click.stop="uploadImg(item)" >配置</a>
        </Col>
        <Col span="4">
          <a @click.stop="deleteItem(item,index)">删除</a>
        </Col>
      </Row>
      <div class="mt20">
        <a @click.stop="addItem">+ 添加</a>
      </div>
      <img-upload :n="uploadN" :fid="labelFid" :labelOrder="labelOrder" @pic="pic" :pics="pics"></img-upload>
    </Modal>
  </div>

</template>

<script>
import ImgUpload from './ImgUpload'
import { isType } from '@/libs/tools'

export default {
  name: 'ImgConfig',
  components: {
    ImgUpload
  },
  props: {
    n: {
      type: Number,
      default: 0
    },
    fid: {
      type: String,
      default: ''
    },
    projectFid: {
      type: String,
      default: ''

    }
  },
  watch: {
    n () {
      this.labellist()
      this.isShow = true
    }
  },
  data () {
    return {
      uploadN: 0,
      isShow: false,
      data: [],
      loading: true,
      labelOrder: 0,
      labelFid: '',
      pics: []
    }
  },
  methods: {
    ok () {
    },
    uploadImg (item) {
      this.pics = []
      let order = item.labelOrder
      if (!order) {
        this.$Message.info('请先添加排序')
        return
      }
      if ((+order).toString() === 'NaN' || !isType('Number', +order)) {
        this.$Message.info('排序字段为数字')
        return
      }
      let labelOrder = this.data.filter(item => item.labelOrder === order)
      if (labelOrder && labelOrder.length > 1) {
        this.$Message.info('排序字段不能重复')
        return
      }
      if (item.picUrl) {
        this.pics = item.picUrl
      }

      this.labelFid = item.fid
      this.labelOrder = order
      this.uploadN++
    },
    deleteItem (item, index) {
      this.$Modal.confirm({
        content: '<p>确认删除？</p>',
        onOk: () => {
          if (item.fid) {
            /* let params = {
              fid: item.fid
            }
            labelremove(params).then(res=>{
              this.$Message.success('删除成功')
              this.labellist()
            }) */
          } else {
            this.data.splice(index, 1)
          }
        }
      })
    },
    addItem () {
      let order = 1
      if (this.data.length > 0) {
        order = this.data[this.data.length - 1].labelOrder
        if ((+order).toString() === 'NaN' || !isType('Number', +order)) {
          order = this.data.length + 1
        } else {
          order = parseInt(order) + 1
        }
      }
      this.data.push({
        'labelOrder': order,
        'labelName': '',
        'picUrl': [],
        'labelType': 0
      })
    },
    labellist () {
      /* if (!this.fid) {
         return
       }
       let params = {
         moduleFid: this.fid,
         type: 0
       }
       labellist(params).then(res=>{
         this.data=res.data
       }) */
    },
    pic (data) {
      if (data.length < 1) {
        return
      }
      this.pics = []
      var order = data[0].order
      let labelOrder = this.data.filter(item => { return item.labelOrder === order })
      labelOrder[0].picUrl = []
      data.forEach(item => {
        labelOrder[0].picUrl.push(item)
      })
    }
  },
  created () {

  }
}
</script>

<style scoped>
  .width80{
    width: 80px;
  }
  .width30{
    width: 30px;
  }
  .width150{
    width: 150px;
  }
  .row {
    text-align: center;
    /*margin-bottom: 10px;*/
    line-height: 32px;

    border-left: 1px solid rgb(222, 222, 222);
    border-right: 1px solid rgb(222, 222, 222);
    border-bottom: 1px solid rgb(222, 222, 222);
    padding: 7px;
  }

  .row:first-child {
    border-top: 1px solid rgb(222, 222, 222);
    background-color: rgb(248, 248, 248);
    padding: 5px;
  }

</style>
