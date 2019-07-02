<template>
  <div>
    <Form :model="roomParamDto" :label-width="60">
      <Row :gutter="20">
        <Col :span="8">
          <FormItem label="楼栋">
            <Select v-model="roomParamDto.houseBuildingFid" placeholder="" clearable>
              <Option v-for="item in buildingOptions" :key="item.fid" :label="item.buildingName"
                      :value="item.fid"></Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="楼层">
            <Select v-model="roomParamDto.floorNumber" placeholder="" clearable>
              <Option v-for="item in floorOptions" :key="item" :label="item + ' 层'"
                      :value="item"></Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="房型分类">
            <Select v-model="roomParamDto.houseTypeClassFid" placeholder="" clearable>
              <Option v-for="item in parentHouseTypeOptions" :key="item.bid"
                      :label="item.houseName"
                      :value="item.bid"></Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col :span="8">
          <FormItem label="房型">
            <Select v-model="roomParamDto.houseTypeFid" placeholder="" clearable>
              <Option v-for="item in houseTypeOptions" :key="item.bid" :label="item.houseName"
                      :value="item.bid"></Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="房间号">
            <Input type="text" v-model="roomParamDto.roomCode" placeholder="" :maxlength="15" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <Button type="primary" icon="ios-search" @click="listRoom"> 查 询</Button>
        </Col>
        <Col span="12" style="text-align: right">
          <Button type="primary" @click="addRoom"> 新增项目</Button>
        </Col>
      </Row>
    </Form>
    <Table stripe :columns="columns" :data="roomList" :loading="loading" size="small" class="my-table">
      <template slot-scope="{ row }" slot="period">
        <a @click="editAirReport(row)">{{ row.airQualityReportUrl ? '修改' : '配置' }}</a>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a class="my-btn" @click="editRoom(row)">编辑</a>
        <a @click="deleteRoomConfirm(row)" style="color: #ed4014;">删除</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="roomParamDto.page"
          :page-size="roomParamDto.limit" @on-change="handlePageChange"/>
    <Modal
      :title="title"
      v-model="roomVisible"
      :loading="roomLoading"
      width="800"
      @on-ok="saveOrUpRoom">
      <room-form v-if="roomVisible" ref="roomForm" :projectBid="projectBid" :buildingOptions="buildingOptions"
                 :parentHouseTypeOptions="parentHouseTypeOptions" :room="roomData"
                 @success="handleSuccess" @error="handleError"></room-form>
    </Modal>
    <Modal
      title="配置空检报告"
      v-model="airVisible"
      :loading="airLoading"
      width="30"
      @on-ok="saveRoomAirReport">
      <Form ref="roomAirForm" :model="roomAirDto" :label-width="80">
        <FormItem label="空检报告" prop="airReportUrl">
          <Input type="textarea" v-model.trim="roomAirDto.airQualityReportUrl" :rows="3" :maxlength="400"
                 placeholder=""></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import roomForm from './roomForm.vue'
import { getBuildings } from '@/api/building'
import { getHouseSorts } from '@/api/houseSort'
import { getHouseTypesByHouseSort } from '@/api/houseType'
import { getRooms, deleteRoom, saveRoom, updateRoom } from '@/api/room'

export default {
  name: 'room',
  props: {
    projectBid: String
  },
  components: {
    roomForm
  },
  data () {
    return {
      buildingOptions: [],
      parentHouseTypeOptions: [],
      houseTypeOptions: [],
      roomParamDto: {
        projectFid: this.projectBid,
        houseBuildingFid: '',
        floorNumber: '',
        houseTypeFid: '',
        houseTypeClassFid: '',
        roomCode: '',
        page: 1,
        limit: 10
      },
      loading: false,
      roomList: [],
      total: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '房型分类',
          key: 'paHouseName'
        },
        {
          title: '房型名称',
          key: 'houseShowName'
        },
        {
          title: '楼栋',
          key: 'buildingName'
        },
        {
          title: '楼层',
          key: 'floorNumber'
        },
        {
          title: '房源编号',
          key: 'areaCode'
        },
        {
          title: '房源名称',
          key: 'areaName'
        },
        {
          title: '床位数量',
          key: 'amount'
        },
        {
          title: '空检报告',
          slot: 'period'
        },
        {
          title: '操作',
          slot: 'action',
          width: 100
        }
      ],
      roomVisible: false,
      roomLoading: true,
      title: '',
      roomData: {},
      airVisible: false,
      airLoading: true,
      roomAirDto: {
        bid: '',
        airQualityReportUrl: '',
        airQualityReportUrlBak: ''
      }
    }
  },
  methods: {
    getBuildOptions () {
      if (this.projectBid) {
        getBuildings(this.projectBid).then(res => {
          this.buildingOptions = res.body
        })
      }
    },
    getParentHouseTypeOptions () {
      if (this.projectBid) {
        getHouseSorts(this.projectBid).then(res => {
          this.parentHouseTypeOptions = res.body
        })
      }
    },
    getHouseTypeOptions (data) {
      getHouseTypesByHouseSort(data).then(res => {
        this.houseTypeOptions = res.body
      })
    },
    listRoom () {
      if (this.projectBid) {
        this.roomParamDto.projectFid = this.projectBid
        this.roomParamDto.page = 1
        this.handlePageChange()
      }
    },
    handlePageChange () {
      this.loading = true
      getRooms(this.roomParamDto).then(res => {
        this.roomList = res.body.list
        this.total = res.body.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    addRoom () {
      this.roomVisible = true
      this.roomData = {}
      this.title = '新增房间'
    },
    editRoom (row) {
      this.roomVisible = true
      this.roomData = row
      this.title = '编辑房间'
    },
    saveOrUpRoom () {
      this.$refs.roomForm.validateForm()
    },
    handleSuccess (dto) {
      if (dto.bid) {
        this.updateRoom(dto)
      } else {
        this.saveRoom(dto)
      }
      this.roomVisible = false
      this.handlePageChange()
    },
    handleError () {
      setTimeout(() => {
        this.roomLoading = false
        this.$nextTick(() => {
          this.roomLoading = true
        })
      }, 500)
    },
    saveRoom (dto) {
      saveRoom(dto).then(res => {
        this.$Message.success('保存成功')
        this.handlePageChange()
      })
    },
    updateRoom (dto) {
      updateRoom(dto).then(res => {
        this.$Message.success('修改成功')
        this.handlePageChange()
      })
    },
    deleteRoomConfirm (row) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定删除该房间吗？</p>',
        onOk: () => {
          this.deleteRoom(row)
        },
        onCancel: () => {
        }
      })
    },
    deleteRoom (row) {
      deleteRoom(row.bid).then(res => {
        this.$Message.success('删除成功')
        this.handlePageChange()
      })
    },
    editAirReport (row) {
      this.roomAirDto.bid = row.bid
      this.roomAirDto.airQualityReportUrl = row.airQualityReportUrl
      this.roomAirDto.airQualityReportUrlBak = row.airQualityReportUrl
      this.airVisible = true
    },
    saveRoomAirReport () {
      if (this.roomAirDto.airQualityReportUrl === this.roomAirDto.airQualityReportUrlBak) {
        this.$Message.info('数据没有更新')
        this.airVisible = false
      } else {
        updateRoom(this.roomAirDto).then(res => {
          this.$Message.success('保存成功')
          this.airVisible = false
          this.handlePageChange()
        }).catch(() => {
          this.airSaveError()
        })
      }
    },
    airSaveError () {
      this.airLoading = false
      this.$nextTick(() => {
        this.airLoading = true
      })
    }
  },
  computed: {
    floorOptions: function () {
      let options = []
      this.buildingOptions.forEach((item) => {
        if (item.fid === this.roomParamDto.houseBuildingFid) {
          options = item.buildingRentablefloor.split(',')
        }
      })
      return options
    }
  },
  watch: {
    projectBid () {
      this.getBuildOptions()
      this.getParentHouseTypeOptions()
      this.listRoom()
    },
    'roomParamDto.houseBuildingFid': function (newVal, oldVal) {
      this.roomParamDto.floorNumber = ''
    },
    'roomParamDto.houseTypeFid': function (newVal, oldVal) {
      this.roomParamDto.houseTypeClassFid = ''
      if (newVal) {
        this.getHouseTypeOptions(newVal)
      } else {
        this.houseTypeOptions = []
      }
    }
  },
  created () {
    this.getBuildOptions()
    this.getParentHouseTypeOptions()
    this.listRoom()
  }
}
</script>

<style lang="less" scoped>
  .my-table {
    margin-top: 20px
  }
  .my-btn {
    margin-right: 10px;
  }

  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
