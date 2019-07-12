<template>
  <div>
    <Modal v-model="show" @on-ok="ok" :loading="loading" :mask-closable="false">
      <h3 slot="header" class="modal-header">分享链接</h3>
      <div>
        <Input type="textarea" :rows="4" :maxlength="500" v-model="projectShareUrl"/>
        <div v-if="!projectShareUrl" style="color: rgb(150,150,150)">温馨提示：请输入少于500个字符！！</div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getProjectConfigInfo, updateProjectConfigInfo } from '@/api/marketingConfig'

export default {
  name: 'shareLink',
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
      this.projectShareUrl = ''
      this.getProjectConfigInfo()
      this.show = true
    }
  },
  data () {
    return {
      show: false,
      projectShareUrl: '',
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
    getProjectConfigInfo () {
      if (!this.fid) {
        return
      }
      let params = {
        fid: this.fid
      }
      getProjectConfigInfo(params).then(res => {
        this.projectShareUrl = res.body.projectShareUrl
      })
    },
    ok () {
      let data = {
        bid: this.fid,
        projectShareUrl: this.projectShareUrl
      }
      updateProjectConfigInfo(data).then(res => {
        this.$Message.success('分享链接配置成功')
        this.changeLoading()
        this.show = false
      }).catch(() => {
        this.changeLoading()
      })
    }
  }
}
</script>

<style scoped>

</style>
