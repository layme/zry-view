<template>
  <div>
    <search-list @search="listRefund"></search-list>
    <!--<img-config :n="imgConfigN" :fid="fid"></img-config>-->
    <Table stripe :columns="columns" :data="data" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="picConfig">
        <a class="my-btn" @click="configPic(row)">配置</a>
      </template>
      <template slot-scope="{ row }" slot="marketConfig">
        <a>配置</a>
      </template>
      <template slot-scope="{ row }" slot="serviceConfig">
        <a>配置</a>
      </template>
      <template slot-scope="{ row }" slot="projectPanoramicUrl">
        <a>{{ row.projectPanoramicUrl ? '修改' : '配置' }}</a>
      </template>
      <template slot-scope="{ row }" slot="projectShareUrl">
        <a>{{ row.projectShareUrl ? '修改' : '配置' }}</a>
      </template>
      <template slot-scope="{ row }" slot="houseType">
        <a>配置</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="getpageList"/>
  </div>
</template>
<script>
import searchList from './components/searchList'
// import ImgConfig from './components/ImgConfig'
import { getRefundList } from '@/api/refund'

export default {
  name: 'projectConfigIndex',
  components: {
    searchList,
    ImgConfig
  },
  data () {
    return {
      loading: false,
      imgConfigN: 0,
      fid: '',
      paramDto: {
        page: 1,
        limit: 10
      },
      columns: [
        {
          title: '项目名称',
          key: 'projectName',
          tooltip: true
        },
        {
          title: '图片配置',
          slot: 'picConfig'
        },
        {
          title: '营销标签',
          slot: 'marketConfig'
        },
        {
          title: '服务配置',
          slot: 'serviceConfig'
        },
        {
          title: 'VR看房',
          slot: 'projectPanoramicUrl'
        },
        {
          title: '分享链接',
          slot: 'projectShareUrl'
        },
        {
          title: '房型内容',
          slot: 'houseType'
        }
      ],
      data: [
        {
          'fid': '8a9093ad6a4aef21016a4d4d07aa000f',
          'projectFid': '8a9093ad6a4aef21016a4d4d06cb000e',
          'projectName': '北京建国门和平自如寓',
          'projectPanoramicUrl': 'www.baidu.com',
          'projectShareUrl': 'www.baidu.com'
        },
        {
          'fid': '8a9093ad6a0a7d7f016a0a7d7f760001',
          'projectFid': '8a9093ad6a0a7d7f016a0a7d7f520000',
          'projectName': '虾米测试下',
          'projectPanoramicUrl': '',
          'projectShareUrl': ''
        },
        {
          'fid': '8a908f0767ef44be0168195d2c7100d9',
          'projectFid': '8a908f0767ef44be0168195d2c3600d8',
          'projectName': '深圳龙华筑梦自如寓',
          'projectPanoramicUrl': 'www.baidu.com',
          'projectShareUrl': 'www.baidu.com'
        }
      ],
      total: 0
    }
  },
  methods: {
    listRefund (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.getpageList()
    },
    getpageList () {
      this.loading = true
      getRefundList(this.paramDto).then(res => {
        if (!res.body) {
          return
        }
        this.data = res.body.rows
        this.total = res.body.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    configPic (row) {
      this.imgConfigN++
      this.fid = row.fid
    }
  },
  created () {
    // this.getpageList()
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
