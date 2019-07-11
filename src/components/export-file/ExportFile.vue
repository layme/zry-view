<template>
  <Modal
    :title="title"
    v-model="visible"
    :closable="false"
    :mask-closable="false">
    <Progress :percent="percent" />
    <div slot="footer">
      <Button type="text" @click="cancelExport">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { requestExportFile, getExportProcess } from '@/api/common'
export default {
  name: 'ExportFile',
  props: {
  },
  data () {
    return {
      title: '',
      visible: false,
      percent: 0,
      interval: ''
    }
  },
  methods: {
    requestExportFile (dto) {
      this.title = '导出文件准备中...'
      this.percent = 0
      this.visible = true
      requestExportFile(dto).then(res => {
        this.title = '正在导出文件...'
        this.interval = setInterval(() => this.getExportProcess(res.body), 300)
      }).catch(() => {
        this.visible = false
      })
    },
    getExportProcess (key) {
      getExportProcess(key).then(res => {
        if (res.body.finish) {
          this.percent = 100
          setTimeout(() => {
            this.visible = false
          }, 800)
          this.$Message.success('文件已生成，开始下载')
          clearInterval(this.interval)
          this.download(res.body.fileUrl)
        } else {
          this.percent = res.body.percent
        }
      }).catch(() => {
        this.visible = false
        clearInterval(this.interval)
      })
    },
    download (url) {
      const link = document.createElement('a')
      link.href = url
      link.style = 'visibility: hidden'
      link.download = `${Date.now()}.xls`
      document.body.appendChild(link)
      link.click()
      this.$forceUpdate()
      setTimeout(() => { document.body.removeChild(link) }, 1000)
    },
    cancelExport () {
      this.$Message.info('文件导出已取消')
      this.visible = false
      clearInterval(this.interval)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
