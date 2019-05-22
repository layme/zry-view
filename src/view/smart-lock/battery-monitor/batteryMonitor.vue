<template>
  <div>
    <Form :model="paramDto" :label-width="60" inline>
      <FormItem label="项目名称">
        <Select v-model="paramDto.projectBid" :style="{ width: '200px' }">
          <Option
            v-for="item in projectOptions"
            :key="item.projectBid"
            :label="item.projectName"
            :value="item.projectBid">
          </Option>
        </Select>
      </FormItem>
      <FormItem label="电量区间">
        <Slider v-model="paramDto.battery" :step="10" show-stops range :style="{ width: '200px' }"></Slider>
      </FormItem>
      <FormItem>
        <Button type="primary" icon="ios-search" @click="getList"> 查 询</Button>
      </FormItem>
    </Form>
    <Table stripe :columns="columns" :data="batteryList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="power">
        <Tag :color="powerColor(row.power)">{{ row.power }}</Tag>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
export default {
  name: 'batteryMonitor',
  data () {
    return {
      paramDto: {
        projectBid: '',
        battery: [20, 70],
        page: 1,
        limit: 10
      },
      loading: false,
      batteryList: [
        {
          'create_time': 1558504800000,
          'area_code': 'A房间',
          'project_bid': 'a3f1411cec184434ae15fa661d434787',
          'battery_msg_id': '89b874fb74154113b738c29a353ca6cf',
          'device_type': 'room_lock',
          'area_id': '816a4629c4ea4bc1abf9b3466d87f762',
          'project_name': '三里屯团结自如驿',
          'uuid': 'e27560275eefcc556b61ce659534bb6e',
          'last_update_time': 1558504800000,
          'extra': 'sn:lkjl0007170700298934;mac:A87F61988AF7;',
          'is_del': 0,
          'onoff_line': 1,
          'id': 1152,
          'power': 65,
          'manufactory_id': '2259',
          'power_refreshtime': 1558497348000,
          'bind_time': 1503375350000,
          'gateway': '630a5b45cd618b3ec44dfb7d2ff63007'
        },
        {
          'create_time': 1558504800000,
          'area_code': 'B房间',
          'project_bid': 'a3f1411cec184434ae15fa661d434787',
          'battery_msg_id': '89b874fb74154113b738c29a353ca6cf',
          'device_type': 'room_lock',
          'area_id': '816a4629c4ea4bc1abf9b3466d87f762',
          'project_name': '三里屯团结自如驿',
          'uuid': 'e27560275eefcc556b61ce659534bb6e',
          'last_update_time': 1558504800000,
          'extra': 'sn:lkjl0007170700298934;mac:A87F61988AF7;',
          'is_del': 0,
          'onoff_line': 1,
          'id': 1152,
          'power': 17,
          'manufactory_id': '2259',
          'power_refreshtime': 1558497348000,
          'bind_time': 1503375350000,
          'gateway': '630a5b45cd618b3ec44dfb7d2ff63007'
        },
        {
          'create_time': 1558504800000,
          'area_code': 'C房间',
          'project_bid': 'a3f1411cec184434ae15fa661d434787',
          'battery_msg_id': '89b874fb74154113b738c29a353ca6cf',
          'device_type': 'room_lock',
          'area_id': '816a4629c4ea4bc1abf9b3466d87f762',
          'project_name': '三里屯团结自如驿',
          'uuid': 'e27560275eefcc556b61ce659534bb6e',
          'last_update_time': 1558504800000,
          'extra': 'sn:lkjl0007170700298934;mac:A87F61988AF7;',
          'is_del': 0,
          'onoff_line': 1,
          'id': 1152,
          'power': 6,
          'manufactory_id': '2259',
          'power_refreshtime': 1558497348000,
          'bind_time': 1503375350000,
          'gateway': '630a5b45cd618b3ec44dfb7d2ff63007'
        }
      ],
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
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      console.info('paramDto', this.paramDto)
      this.loading = false
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
