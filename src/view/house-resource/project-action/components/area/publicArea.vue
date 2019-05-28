<template>
  <div>
    <Form :model="areaParamDto" :label-width="60">
      <Row :gutter="20">
        <Col :span="8">
          <FormItem label="状态">
            <Select v-model="areaParamDto.isValid" placeholder="" clearable>
              <Option v-for="item in isValidOptions" :key="item.value" :label="item.label"
                      :value="item.value"></Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="楼栋">
            <Select v-model="areaParamDto.houseBuildingFid" placeholder="" clearable>
              <Option v-for="item in buildingOptions" :key="item.fid" :label="item.buildingName"
                      :value="item.fid"></Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="楼层">
            <Select v-model="areaParamDto.floorNum" placeholder="" clearable>
              <Option v-for="item in floorOptions" :key="item" :label="item + ' 层'"
                      :value="item"></Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col :span="8">
          <FormItem label="区域名称">
            <Input type="text" v-model="areaParamDto.areaName" placeholder="" :maxlength="15" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col :span="12">
          <Button type="primary" @click="listArea"> 查 询</Button>
        </Col>
        <Col span="12" style="text-align: right">
          <Button type="primary" @click="addArea">添加区域</Button>
        </Col>
      </Row>
    </Form>
    <Table stripe :columns="columns" :data="areaList" :loading="loading" size="small" class="my-table">
      <template slot-scope="{ row }" slot="isValid">
        <div>{{ row.isValid === 1 ? '启用' : '停用' }}</div>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a class="my-btn" @click="openArea(row)">{{ row.isValid === 1 ? '停用' : '启用' }}</a>
        <a class="my-btn" @click="editArea(row)">编辑</a>
        <a @click="deleteAreaConfirm(row)">删除</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="areaParamDto.page"
          :page-size="areaParamDto.limit" @on-change="handlePageChange"/>
    <Modal :title="title" :visible.sync="dialogVisible" width="35">
      <public-area-form v-if="dialogVisible" :projectBid="projectBid" :buildingOptions="buildingOptions"
                 :area="areaData" @success="handleSuccess"></public-area-form>
    </Modal>
  </div>
</template>

<script>
import publicAreaForm from './publicAreaForm.vue'
import { getBuildings } from '@/api/building'
import { getAreas, deleteArea, validOrNot } from '@/api/publicArea'

export default {
  name: 'area',
  props: {
    projectBid: String
  },
  components: {
    publicAreaForm
  },
  data () {
    return {
      buildingOptions: [],
      isValidOptions: [
        {
          label: '启用',
          value: 0
        },
        {
          label: '停用',
          value: 1
        }
      ],
      areaParamDto: {
        projectFid: '',
        isValid: '',
        houseBuildingFid: '',
        floorNum: '',
        areaName: '',
        page: 1,
        limit: 10
      },
      loading: false,
      areaList: [],
      total: 0,
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 60
        },
        {
          title: '区域名称',
          key: 'areaName'
        },
        {
          title: '面积/㎡',
          key: 'acreage'
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
          title: '状态',
          slot: 'isValid'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      dialogVisible: false,
      title: '',
      areaData: {}
    }
  },
  computed: {
    floorOptions: function () {
      let options = []
      this.buildingOptions.forEach((item) => {
        if (item.fid === this.areaParamDto.houseBuildingFid) {
          options = item.buildingRentablefloor.split(',')
        }
      })
      return options
    }
  },
  methods: {
    getBuildOptions () {
      getBuildings(this.projectBid).then(res => {
        this.buildingOptions = res.body
      })
    },
    listArea () {
      this.areaParamDto.projectFid = this.projectBid
      this.areaParamDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      getAreas(this.areaParamDto).then(res => {
        this.areaList = res.body.list
        this.total = res.body.total
      })
    },
    addArea () {
      this.dialogVisible = true
      this.areaData = {}
      this.title = '新增区域'
    },
    editArea (index, row) {
      this.dialogVisible = true
      this.areaData = row
      this.title = '编辑区域'
    },
    deleteAreaConfirm (row) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定删除该区域吗？</p>',
        onOk: () => {
          this.deleteArea(row)
        },
        onCancel: () => {
        }
      })
    },
    deleteArea (row) {
      deleteArea(row.bid).then(res => {
        if (res.code === 200) {
          this.$Message.success('删除成功')
          this.handlePageChange()
        }
      })
    },
    openArea (row) {
      let val = 0
      let msg = ''
      if (row.isValid === 1) {
        val = 0
        msg = '停用'
      } else {
        val = 1
        msg = '启用'
      }
      validOrNot(row.bid, val).then(res => {
        if (res.code === 200) {
          this.$Message.success(msg + '成功')
          this.handlePageChange()
        }
      })
    },
    handleSuccess () {
      this.dialogVisible = false
      this.handlePageChange()
    }
  },
  watch: {
    projectBid (val) {
      if (val) {
        this.getBuildOptions()
        this.listArea()
      }
    },
    'areaParamDto.houseBuildingFid': function (newVal, oldVal) {
      this.areaParamDto.floorNum = ''
    }
  },
  created () {
    if (this.projectBid) {
      this.getBuildOptions()
      this.listArea()
    }
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
