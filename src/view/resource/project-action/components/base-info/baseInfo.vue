<template>
  <Form ref="baseForm" :model="baseDto" :rules="baseRules" :label-width="120">
    <Row>
      <Col :span="8">
        <FormItem label="项目名称" prop="projectName">
          <Input type="text" v-model.trim="baseDto.projectName" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="城市" prop="cityCode">
          <Select v-model="baseDto.cityCode" placeholder="请选择" clearable>
            <Option v-for="city in cityOptions" :key="city.cityCode" :label="city.cityName"
                       :value="city.cityCode"></Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="区县" prop="areaCode">
          <Select v-model="baseDto.areaCode" placeholder="请选择" clearable>
            <Option v-for="area in areaOptions" :key="area.areaCode" :label="area.areaName"
                       :value="area.areaCode"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="项目地址" prop="projectAddress">
          <Input type="text" v-model.trim="baseDto.projectAddress" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="百度经度" prop="lng">
          <Input type="text" v-model="baseDto.lng" :disabled="true" placeholder=""></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="百度纬度" prop="lat">
          <Input type="text" v-model="baseDto.lat" :disabled="true" placeholder="" class="map-input"></Input>
          <a @click="mapVisible = true" style="margin-left: 12px">打开地图</a>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="商圈" prop="tradeArea">
          <Input type="text" v-model.trim="baseDto.tradeArea" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="地铁信息" prop="subwayLine">
          <Input type="text" v-model.trim="baseDto.subwayLine" placeholder="距离**线**站**米"
                    clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="建筑面积" prop="projectArea">
          <Input type="text" v-model.trim="baseDto.projectArea" placeholder="" clearable>
            <template slot="append">㎡</template>
          </Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="楼栋数" prop="buildingCount">
          <Input type="text" v-model.trim.number="baseDto.buildingCount" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="合作类型" prop="projectType">
          <Select v-model="baseDto.projectType" placeholder="请选择" clearable>
            <Option v-for="area in projectTypeOptions" :key="area.value" :label="area.label"
                       :value="area.value"></Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="项目阶段" prop="period">
          <Select v-model="baseDto.period" placeholder="请选择" clearable>
            <Option v-for="area in periodOptions" :key="area.value" :label="area.label"
                       :value="area.value"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="签约日期" prop="signDate">
          <DatePicker type="date" placeholder="请选择" v-model="baseDto.signDate" class="my-date-picker"
                      value-format="timestamp" @on-change="budgetEndLine" :editable="false" clearable></DatePicker>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="到期日期" prop="endlineDate">
          <DatePicker type="date" placeholder="请选择" v-model="baseDto.endlineDate" class="my-date-picker"
                      value-format="timestamp" :editable="false" clearable></DatePicker>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="开业日期" prop="openDate">
          <DatePicker type="date" placeholder="请选择" v-model="baseDto.openDate" class="my-date-picker"
                      value-format="timestamp"
                      :editable="false" clearable></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="项目经理" prop="projectManager">
          <Input type="text" v-model.trim="baseDto.projectManager" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="经理手机" prop="projectManagerMobile">
          <Input type="text" v-model.trim="baseDto.projectManagerMobile" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="项目电话" prop="sellPhone">
          <Input type="text" v-model.trim="baseDto.sellPhone" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="业主名称" prop="ownerBid">
          <Select v-model="baseDto.ownerBid" placeholder="请选择" clearable>
            <Option v-for="item in ownerOptions" :key="item.bid" :label="item.ownerName"
                       :value="item.bid"></Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="结算公司" prop="settlementCompany">
          <Select v-model="baseDto.settlementCompany" placeholder="请选择" clearable>
            <Option v-for="item in ownerOptions" :key="item.bid" :label="item.ownerName"
                       :value="item.bid"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="16">
        <FormItem label="项目简介" prop="projectDesc">
          <Input type="textarea" v-model.trim="baseDto.projectDesc" :rows="5" :maxlength="500" placeholder=""></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="16">
        <FormItem label="空检报告" prop="projectReportUrl">
          <Input type="textarea" v-model.trim="baseDto.projectReportUrl" :rows="3" :maxlength="400" placeholder=""></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="16">
        <FormItem>
          <Button v-if="proBid" type="warning" @click="validateForm('baseForm')">修 改</Button>
          <Button v-else type="primary" @click="validateForm('baseForm')">保 存</Button>
          <Button @click="resetForm('baseForm')" class="my-btn">重 置</Button>
        </FormItem>
      </Col>
    </Row>
    <Modal title="选取经纬坐标" v-model="mapVisible" width="900" footer-hide>
      <map-card class="map-cls" :search-style="searchStyle" :location="location" @click="handleMapClick"></map-card>
    </Modal>
  </Form>
</template>
<script>
import MapCard from '@/components/baidu-map/MapCard.vue'
import { getCityList, getAreaList } from '@/api/common'
import { getOwnerList } from '@/api/owner'
import { getBaseInfo, saveBase, updateBase } from '@/api/project'

export default {
  name: 'BaseInfo',
  props: {
    projectBid: String
  },
  components: {
    MapCard
  },
  data () {
    return {
      proBid: this.projectBid,
      cityOptions: [],
      areaOptions: [],
      ownerOptions: [],
      baseDto: {
        projectName: '',
        cityCode: '',
        areaCode: '',
        projectAddress: '',
        lng: '',
        lat: '',
        tradeArea: '',
        subwayLine: '',
        projectArea: '',
        buildingCount: '',
        projectType: '',
        period: '',
        signDate: '',
        endlineDate: '',
        openDate: '',
        projectManager: '',
        projectManagerMobile: '',
        sellPhone: '',
        ownerBid: '',
        settlementCompany: '',
        projectDesc: '',
        projectReportUrl: ''
      },
      projectTypeOptions: [
        {
          label: '直营',
          value: 1
        },
        {
          label: '托管',
          value: 2
        }
      ],
      periodOptions: [
        {
          label: '工程',
          value: 1
        },
        {
          label: '爬坡',
          value: 2
        },
        {
          label: '运营',
          value: 3
        }
      ],
      baseRules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { max: 15, message: '不能超过15个字符', trigger: 'blur' }
        ],
        cityCode: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        areaCode: [
          { required: true, message: '请选择区县', trigger: 'change' }
        ],
        projectAddress: [
          { required: true, message: '请输入项目地址', trigger: 'blur' },
          { max: 50, message: '不能超过50个字符', trigger: 'blur' }
        ],
        lng: [
          { required: true, type: 'number', message: '请在地图中选择', trigger: 'change' }
        ],
        lat: [
          { required: true, type: 'number', message: '请在地图中选择', trigger: 'change' }
        ],
        tradeArea: [
          { required: true, message: '请输入项目地址', trigger: 'blur' },
          { max: 20, message: '不能超过20个字符', trigger: 'blur' }
        ],
        subwayLine: [
          { required: true, message: '请输入地铁信息', trigger: 'blur' },
          { max: 50, message: '不能超过50个字符', trigger: 'blur' }
        ],
        projectArea: [
          { required: true, message: '请输入建筑面积', trigger: 'blur' },
          { pattern: /^\d{1,4}(\.\d{0,2})?$/, message: '请输入1万以内的两位小数或整数', trigger: 'blur' }
        ],
        buildingCount: [
          { required: true, type: 'number', max: 99, message: '请输入1百以内的整数', trigger: 'blur' }
        ],
        projectType: [
          { required: true, message: '请选择合作类型', trigger: 'change' }
        ],
        period: [
          { required: true, message: '请选择项目阶段', trigger: 'change' }
        ],
        signDate: [
          { required: true, type: 'date', message: '请选择签约日期', trigger: 'change' }
        ],
        endlineDate: [
          { required: true, type: 'date', message: '请选择到期日期', trigger: 'change' }
        ],
        openDate: [
          { required: true, type: 'date', message: '请选择开业日期', trigger: 'change' }
        ],
        projectManager: [
          { required: true, message: '请输入项目经理', trigger: 'blur' },
          { max: 10, message: '不能超过10个字符', trigger: 'blur' }
        ],
        projectManagerMobile: [
          { required: true, message: '请输入经理手机', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '手机号格式有误', trigger: 'blur' }
        ],
        sellPhone: [
          { required: true, message: '请输入项目电话', trigger: 'blur' },
          { max: 50, message: '不能超过50个字符', trigger: 'blur' }
        ],
        projectDesc: [
          { required: true, message: '请输入项目简介', trigger: 'blur' },
          { max: 500, message: '不能超过500个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      location: { },
      canClear: false,
      mapVisible: false,
      searchStyle: {
        position: 'absolute',
        top: '80px',
        left: '30px',
        zIndex: 3,
        width: '270px',
        '-webkit-box-shadow': ['#dcdee2', '0', '1px', '6px'],
        '-moz-box-shadow': ['#dcdee2', '0', '1px', '6px'],
        'box-shadow': ['#dcdee2', '0', '1px', '6px']
      }
    }
  },
  methods: {
    validateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveOrUpBase()
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getCity () {
      getCityList().then(res => {
        this.cityOptions = res.body
      })
    },
    getArea (cityCode) {
      getAreaList(cityCode).then(res => {
        this.areaOptions = res.body
      })
    },
    getOwner () {
      getOwnerList().then(res => {
        this.ownerOptions = res.body
      })
    },
    getBaseInfo () {
      this.loading = true
      getBaseInfo(this.projectBid).then(res => {
        this.baseDto = res.body
        // this.getSimpleAddress()
        this.location = { lng: this.baseDto.lng, lat: this.baseDto.lat }
        this.loading = false
        this.canClear = false
      }).catch(() => {
        this.loading = false
      })
    },
    getSimpleAddress () {
      let cityLength = 0
      let areaLength = 0
      this.cityOptions.forEach((item) => {
        if (item.cityCode === this.baseDto.cityCode) {
          cityLength = item.cityName.length
        }
      })
      this.areaOptions.forEach((item) => {
        if (item.areaCode === this.baseDto.areaCode) {
          areaLength = item.areaName.length
        }
      })
      this.baseDto.projectAddress = this.baseDto.projectAddress.substring(cityLength + areaLength)
    },
    saveOrUpBase () {
      let city = ''
      let area = ''
      this.cityOptions.forEach((item) => {
        if (item.cityCode === this.baseDto.cityCode) {
          city = item.cityName
        }
      })
      this.areaOptions.forEach((item) => {
        if (item.areaCode === this.baseDto.areaCode) {
          area = item.areaName
        }
      })
      let address = this.baseDto.projectAddress
      this.baseDto.projectAddress = city + area + address
      if (this.projectBid) {
        this.updateBase(JSON.parse(JSON.stringify(this.baseDto)))
      } else {
        this.saveBase(JSON.parse(JSON.stringify(this.baseDto)))
      }
      this.baseDto.projectAddress = address
    },
    saveBase (dto) {
      this.loading = true
      saveBase(dto).then(res => {
        if (res.code === 200) {
          this.$Message.success('保存成功')
          this.proBid = res.body
          this.$store.commit('upStep', 2)
          this.$emit('success', this.proBid)
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    updateBase (dto) {
      this.loading = true
      updateBase(dto).then(res => {
        if (res.code === 200) {
          this.$Message.success('修改成功')
          this.proBid = res.body
          this.$store.commit('upStep', 2)
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleMapClick (point) {
      this.baseDto.lng = point.lng
      this.baseDto.lat = point.lat
    },
    budgetEndLine (val) {
      let date = new Date(val)
      date.setFullYear(date.getFullYear() + 10)
      date.setDate(date.getDate() - 1)
      this.baseDto.endlineDate = date
    }
  },
  watch: {
    'baseDto.cityCode': function (newVal, oldVal) {
      if (this.canClear) {
        this.baseDto.areaCode = ''
      }
      this.canClear = true
      if (newVal) {
        this.getArea(newVal)
      } else {
        this.areaOptions = []
      }
    }
  },
  created () {
    this.getCity()
    this.getOwner()
    if (this.projectBid) {
      this.getBaseInfo()
    }
  }
}
</script>
<style lang="less" scoped>
  .map-cls {
    height: 500px;
  }
  .map-input {
    width: ~"calc(100% - 60px)";
  }
  .my-btn {
    margin-left: 20px;
  }
  .my-date-picker {
    width: 100%;
  }
</style>
