<template>
  <div>
    <Modal v-model="isShow" @on-ok="ok" :loading="loading" :mask-closable="false">
      <h3 slot="header" class="modal-header">营销标签</h3>
      <Row class="row" >
        <Col span="5"><span style="color: #ed4014;">*</span>排序</Col>
        <Col span="14"><span style="color: #ed4014;">*</span>标签文本</Col>
        <Col span="5">操作</Col>
      </Row>
      <Row class="row" v-for="(item,index) in data " :key="item.fid">
        <Col span="5">
          <InputNumber :min="1" :precision="0.1" v-model="item.labelOrder"></InputNumber>
        </Col>
        <Col span="14">
          <Input class="width85" v-model="item.labelName" :maxlength="10"/>
        </Col>
        <Col span="5">
          <a @click.stop="deleteItem(item, index)">删除</a>
        </Col>
      </Row>
      <div class="mt20">
        <a @click.stop="addItem">+ 添加</a>
      </div>
    </Modal>
  </div>

</template>

<script>
import { isType } from '@/libs/tools'
import { labelList, labelremove, editAddImgConfig } from '@/api/marketingConfig'

export default {
  name: 'marketLabel',
  components: {
  },
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
      this.data = []
      this.labellist()
      this.isShow = true
    }
  },
  data () {
    return {
      isShow: false,
      data: [],
      loading: true,
      labelOrder: 0
    }
  },
  methods: {
    changeLoading () {
      this.loading = false
      this.$nextTick(() => {
        this.loading = true
      })
    },
    ok () {
      let a1 = []
      let isNull = false

      if (this.data.length === 0) {
        this.isShow = false
        this.changeLoading()
        return
      }
      this.data.forEach(ele => {
        if (!ele.labelName || !ele.labelOrder) {
          isNull = true
          return
        }

        a1.push(ele.labelOrder + '')
      })

      if (isNull) {
        this.$Message.info('排序或标签名不能为空')
        this.changeLoading()
        return
      }

      let a2 = new Set(a1)
      if (a1.length !== a2.size) {
        this.$Message.info('排序不能重复')
        this.changeLoading()
        return
      }
      let params = {
        moduleFid: this.fid,
        labelEntities: this.data
      }
      editAddImgConfig(params).then(res => {
        this.changeLoading()
        this.labellist()
        this.$Message.success('标签保存成功')
      }).catch(() => {
        this.changeLoading()
      })
    },
    deleteItem (item, index) {
      this.$Modal.confirm({
        content: '<p>确认删除？</p>',
        onOk: () => {
          if (item.bid) {
            let params = {
              fid: item.bid
            }
            labelremove(params).then(res => {
              this.$Message.success('删除成功')
              this.labellist()
            })
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
        'bid': '',
        'labelOrder': order,
        'labelName': '',
        'labelType': 1
      })
    },
    labellist () {
      if (!this.fid) {
        return
      }
      let params = {
        moduleFid: this.fid,
        type: 1
      }
      labelList(params).then(res => {
        this.data = res.body
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
