<template>
  <div>
    <Modal v-model="isShow" @on-ok="ok" :loading="loading" :mask-closable="false">
      <h3 slot="header" class="modal-header">服务配置</h3>
      <div v-for="item in data" class="mb16" :key="item.facilitiesTypeCode">
        <div class="left">{{item.facilitiesTypeName}}：</div>
        <div class="right">
          <Checkbox class="item" v-for="item1 in item.facilitiesVoList" :key="item1.facilitiesTypeCode" v-model="item1.isSelected">{{item1.facilitiesName}}</Checkbox>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { selectProjectFacilities, saveProjectFacilities } from '@/api/marketingConfig'

export default {
  name: 'serviceConfig',
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
      this.selectProjectFacilities()
      this.isShow = true
    }
  },
  data () {
    return {
      isShow: false,
      data: [],
      loading: true
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
      let ret = []
      this.data.forEach(ele => {
        ele.facilitiesVoList.forEach(ele1 => {
          ele1['facilitiesTypeCode'] = ele.facilitiesTypeCode
          ele1.isSelected && ret.push(ele1)
        })
      })
      let params = {
        moduleFid: this.fid,
        facilitiesTypeDtoList: ret
      }
      saveProjectFacilities(params).then(res => {
        this.$Message.success('配置成功')
        this.isShow = false
      })
    },
    selectProjectFacilities () {
      if (!this.fid) {
        return
      }
      let params = {
        projectBid: this.fid
      }
      selectProjectFacilities(params).then(res => {
        this.data = res.body
      }).catch(error => console.info(error))
    }
  }

}
</script>

<style scoped>
  .item{
    margin-right: 20px;
    margin-bottom: 10px;
  }
  .left,.right{
    display: inline-block;
    vertical-align: top;
  }
  .left{
    margin-right: 10px;
    width: 60px;
    text-align: right;
  }
  .right{
    width: 300px;
  }

</style>
