<template>
  <Form ref="roomForm" :model="roomDto" :rules="roomRules" :label-width="80">
    <Row>
      <Col :span="12">
        <FormItem label="房间名称" prop="areaName">
          <Input type="text" v-model.trim="roomDto.areaName" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="12">
        <FormItem label="楼栋" prop="houseBuildingFid">
          <Select v-model="roomDto.houseBuildingFid" placeholder="请选择" clearable>
            <Option v-for="item in buildingOptions" :key="item.fid" :label="item.buildingName"
                       :value="item.fid"></Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="楼层" prop="floorNumber">
          <Select v-model="roomDto.floorNumber" placeholder="请选择" clearable
                     no-data-text="请先选择楼栋">
            <Option v-for="item in floorOptions" :key="item" :label="item + ' 层'"
                       :value="item"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="12">
        <FormItem label="房型分类" prop="houseTypeParentBid">
          <Select v-model="roomDto.houseTypeParentBid" placeholder="请选择" clearable>
            <Option v-for="item in parentHouseTypeOptions" :key="item.bid"
                       :label="item.houseName"
                       :value="item.bid"></Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="房型名称" prop="houseTypeBid">
          <Select v-model="roomDto.houseTypeBid" placeholder="请选择" clearable
                     no-data-text="请先选择房型分类">
            <Option v-for="item in houseTypeOptions" :key="item.bid" :label="item.houseName"
                       :value="item.bid"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="12">
        <FormItem label="面积" prop="acreage">
          <Input type="text" v-model.trim="roomDto.acreage" placeholder="" clearable>
            <template slot="append">㎡</template>
          </Input>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="朝向" prop="windowToward">
          <Select v-model="roomDto.windowToward" placeholder="请选择" clearable>
            <Option v-for="item in windowTowardOptions" :key="item.value" :label="item.label"
                       :value="item.value"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getHouseTypesByHouseSort } from '@/api/houseType'

export default {
  name: 'roomForm',
  props: {
    projectBid: String,
    buildingOptions: Array,
    parentHouseTypeOptions: Array,
    room: Object
  },
  data () {
    return {
      houseTypeOptions: [],
      windowTowardOptions: [
        {
          label: '东',
          value: 1
        },
        {
          label: '南',
          value: 2
        },
        {
          label: '西',
          value: 3
        },
        {
          label: '北',
          value: 4
        },
        {
          label: '东南',
          value: 5
        },
        {
          label: '西北',
          value: 6
        },
        {
          label: '东北',
          value: 7
        },
        {
          label: '西南',
          value: 8
        },
        {
          label: '人造天井',
          value: 9
        }
      ],
      roomDto: {
        projectBid: this.projectBid,
        bid: '',
        houseBuildingFid: '',
        floorNumber: '',
        areaName: '',
        houseTypeParentBid: '',
        houseTypeBid: '',
        acreage: '',
        windowToward: ''
      },
      roomRules: {
        areaName: [
          { required: true, message: '请输入房间名称', trigger: 'blur' },
          { max: 15, message: '不能超过15个字符', trigger: 'blur' }
        ],
        houseBuildingFid: [
          { required: true, message: '请选择楼栋', trigger: 'change' }
        ],
        floorNumber: [
          { required: true, type: 'number', message: '请选择楼层', trigger: 'change' }
        ],
        houseTypeParentBid: [
          { required: true, message: '请选择房型分类', trigger: 'change' }
        ],
        houseTypeBid: [
          { required: true, message: '请选择房型名称', trigger: 'change' }
        ],
        acreage: [
          { required: true, message: '请输入面积', trigger: 'blur' },
          { pattern: /^\d{1,4}(\.\d{0,2})?$/, message: '请输入1万以内的两位小数或整数', trigger: 'blur' }
        ],
        windowToward: [
          { required: true, type: 'number', message: '请选择朝向', trigger: 'change' }
        ]
      },
      canClear: false,
      canClearF: false
    }
  },
  computed: {
    floorOptions: function () {
      let options = []
      this.buildingOptions.forEach((item) => {
        if (item.fid === this.roomDto.houseBuildingFid) {
          options = item.buildingRentablefloor.split(',').map(Number)
        }
      })
      return options
    }
  },
  methods: {
    validateForm () {
      this.$refs['roomForm'].validate((valid) => {
        if (valid) {
          this.$emit('success', this.roomDto)
        } else {
          this.$emit('error')
        }
      })
    },
    resetForm () {
      this.$refs['roomForm'].resetFields()
    },
    handleCounted () {
      this.resetForm('roomForm')
      this.roomDto.roomBid = ''
      if (Object.keys(this.room).length) {
        this.roomDto.bid = this.room.bid
        this.roomDto.houseBuildingFid = this.room.houseBuildingFid
        this.roomDto.floorNumber = this.room.floorNumber
        this.roomDto.areaName = this.room.areaName
        this.roomDto.houseTypeParentBid = this.room.houseTypeParentBid
        this.roomDto.houseTypeBid = this.room.houseTypeBid
        this.roomDto.acreage = this.room.acreage
        this.roomDto.windowToward = this.room.windowToward
        this.canClear = false
        this.canClearF = false
      }
    },
    getHouseTypeOptions (data) {
      getHouseTypesByHouseSort(data).then(res => {
        this.houseTypeOptions = res.body
      })
    }
  },
  watch: {
    'roomDto.houseTypeParentBid': function (newVal, oldVal) {
      if (this.canClear) {
        this.roomDto.houseTypeBid = ''
      }
      this.canClear = true
      if (newVal) {
        this.getHouseTypeOptions(newVal)
      } else {
        this.houseTypeOptions = []
      }
    },
    'roomDto.houseBuildingFid': function (newVal, oldVal) {
      if (this.canClearF) {
        this.roomDto.floorNumber = ''
      }
      this.canClearF = true
    }
  },
  mounted () {
    this.handleCounted()
  }
}
</script>
<style scoped>
  .Select {
    width: 100%;
  }
</style>
