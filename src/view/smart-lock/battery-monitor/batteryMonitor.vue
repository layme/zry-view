<template>
  <div>
    <Form :model="paramDto" :label-width="60" inline>
      <FormItem label="电量区间">
        <Slider v-model="paramDto.battery" :step="10" show-stops range :style="{ width: '200px' }"></Slider>
      </FormItem>
      <FormItem>
        <Button type="primary" icon="ios-search" @click="getList"> 查 询</Button>
      </FormItem>
    </Form>
    <Table stripe :columns="columns" :data="batteryList" :loading="loading">
      <template slot-scope="{ row }" slot="power">
        <Tag :color="powerColor(row.power)">{{ row.power }}</Tag>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageIndex"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import { getPowerInfo } from '@/api/smartLock'
export default {
  name: 'batteryMonitor',
  data () {
    return {
      paramDto: {
        battery: [0, 100],
        pageIndex: 1,
        pageSize: 10
      },
      loading: false,
      batteryList: [],
      total: 0,
      columns: [
        {
          title: '项目',
          key: 'project_name'
        },
        {
          title: '楼栋',
          key: ''
        },
        {
          title: '楼层',
          key: ''
        },
        {
          title: '房间',
          key: 'area_code'
        },
        {
          title: '电量',
          slot: 'power'
        }
      ],
      projectOptions: []
    }
  },
  methods: {
    getList () {
      this.paramDto.pageIndex = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      let dto = {
        pageIndex: this.paramDto.pageIndex,
        pageSize: this.paramDto.pageSize,
        minPower: this.paramDto.battery[0],
        maxPower: this.paramDto.battery[1]
      }
      getPowerInfo(dto).then(res => {
        if (res.code === 200) {
          this.batteryList = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    powerColor (val) {
      if (val > 20) {
        return 'success'
      } else if (val > 10) {
        return 'warning'
      } else {
        return 'error'
      }
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
  .my-page {
    text-align: right;
    margin-top: 20px
  }
  .my-table {
    margin-top: 20px;
  }
</style>
