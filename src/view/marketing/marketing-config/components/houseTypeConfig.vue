<template>
  <div>
    <Modal v-model="isShow" :mask-closable="false">
      <h3 slot="header" class="modal-header">房型配置</h3>
    <img-upload :n="uploadN" :fid="fid"></img-upload>
    <vr-show :n="vrShowN" :fid="fid"></vr-show>
    <Table stripe :columns="columns" :data="data" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="picConfig">
        <a class="my-btn" @click="configPic(row)">配置</a>
      </template>
      <template slot-scope="{ row }" slot="houseTypeVR">
        <a class="my-btn" @click="vrShow(row)">配置</a>
      </template>
    </Table>
    </Modal>
  </div>
</template>
<script>
import imgUpload from './imgUpload'
import vrShow from './vrShow'
import { getHouseTypeConfigList } from '@/api/marketingConfig'

export default {
  name: 'HouseTypeConfig',
  components: {
    imgUpload,
    vrShow
  },
  props: {
    n: {
      type: Number,
      default: 0
    },
    projectFid: {
      type: String,
      default: ''
    }
  },
  watch: {
    n () {
      this.getHouseTypeConfigList()
      this.isShow = true
    }
  },
  data () {
    return {
      loading: false,
      uploadN: 0,
      vrShowN: 0,
      isShow: false,
      fid: '',
      columns: [
        {
          title: '房型',
          key: 'houseTypeName',
          tooltip: true
        },
        {
          title: '房型图片',
          slot: 'picConfig'
        },
        {
          title: 'VR看房',
          slot: 'houseTypeVR'
        }
      ],
      data: []
    }
  },
  methods: {
    getHouseTypeConfigList () {
      if (!this.projectFid) {
        return
      }
      this.loading = true
      getHouseTypeConfigList({ projectBid: this.projectFid }).then(res => {
        if (!res.body) {
          return
        }
        this.data = res.body
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    configPic (row) {
      this.uploadN++
      this.fid = row.bid
    },
    vrShow (row) {
      this.vrShowN++
      this.fid = row.bid
    }
  },
  created () {
  }
}
</script>
<style lang="less" scoped>
  .my-table {
    margin-top: 20px
  }
  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
