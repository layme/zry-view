<template>
  <Form ref="areaForm" :model="areaDto" :rules="areaRules" :label-width="60">
    <FormItem label="名称" prop="areaName">
      <Input type="text" v-model.trim="areaDto.areaName" placeholder="" clearable></Input>
    </FormItem>
    <FormItem label="面积" prop="acreage">
      <Input type="text" v-model.trim="areaDto.acreage" placeholder="" clearable>
        <template slot="append">㎡</template>
      </Input>
    </FormItem>
    <FormItem label="类型" prop="areaType">
      <Select v-model="areaDto.areaType" placeholder="请选择" clearable>
        <Option v-for="item in areaTypeOptions" :key="item.value" :label="item.label"
                   :value="item.value"></Option>
      </Select>
    </FormItem>
    <FormItem label="楼栋" prop="houseBuildingFid">
      <Select v-model="areaDto.houseBuildingFid" placeholder="请选择" clearable>
        <Option v-for="item in buildingOptions" :key="item.fid" :label="item.buildingName"
                   :value="item.fid"></Option>
      </Select>
    </FormItem>
    <FormItem label="楼层" prop="floorNumber">
      <Select v-model="areaDto.floorNumber" placeholder="请选择" clearable
                 no-data-text="请先选择楼栋">
        <Option v-for="item in floorOptions" :key="item" :label="item + ' 层'"
                   :value="item"></Option>
      </Select>
    </FormItem>
  </Form>
</template>
<script>

export default {
  name: 'publicAreaForm',
  props: {
    projectBid: String,
    buildingOptions: Array,
    area: Object
  },
  data () {
    return {
      areaDto: {
        projectBid: this.projectBid,
        areaName: '',
        acreage: '',
        areaType: '',
        houseBuildingFid: '',
        floorNumber: ''
      },
      areaRules: {
        areaName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
          { max: 15, message: '不能超过15个字符', trigger: 'blur' }
        ],
        acreage: [
          { required: true, message: '请输入区域面积', trigger: 'blur' },
          { pattern: /^\d{1,4}(\.\d{0,2})?$/, message: '请输入1万以内的两位小数或整数', trigger: 'blur' }
        ],
        areaType: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        houseBuildingFid: [
          { required: true, message: '请选择楼栋', trigger: 'change' }
        ],
        floorNumber: [
          { required: true, type: 'number', message: '请选择楼层', trigger: 'change' }
        ]
      },
      areaTypeOptions: [
        {
          label: '公共区域',
          value: 'GG'
        },
        {
          label: '卫生间',
          value: 'WS'
        },
        {
          label: '洗浴间',
          value: 'XY'
        },
        {
          label: '仓库',
          value: 'CK'
        }
      ],
      canClear: false
    }
  },
  computed: {
    floorOptions: function () {
      let options = []
      this.buildingOptions.forEach((item) => {
        if (item.fid === this.areaDto.houseBuildingFid) {
          options = item.buildingRentablefloor.split(',').map(Number)
        }
      })
      return options
    }
  },
  methods: {
    validateForm () {
      this.$refs['areaForm'].validate((valid) => {
        if (valid) {
          this.$emit('success', this.areaDto)
        } else {
          this.$emit('error')
        }
      })
    },
    resetForm () {
      this.$refs['areaForm'].resetFields()
    },
    handleCounted () {
      this.resetForm('areaForm')
      this.areaDto.bid = ''
      if (Object.keys(this.area).length) {
        this.areaDto.bid = this.area.bid
        this.areaDto.projectBid = this.area.projectBid
        this.areaDto.areaName = this.area.areaName
        this.areaDto.acreage = this.area.acreage.toString()
        this.areaDto.areaType = this.area.areaType
        this.areaDto.houseBuildingFid = this.area.houseBuildingFid
        this.areaDto.floorNumber = this.area.floorNumber
        this.canClear = false
      }
    }
  },
  mounted () {
    this.handleCounted()
  },
  watch: {
    'areaDto.houseBuildingFid': function (newVal, oldVal) {
      if (this.canClear) {
        this.areaDto.floorNumber = ''
      }
      this.canClear = true
    }
  }
}
</script>
<style scoped>
</style>
