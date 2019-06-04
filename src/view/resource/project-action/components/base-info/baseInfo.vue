<template>
  <Form ref="baseForm" :model="baseDto" :rules="baseRules" :label-width="80" class="my-top">
    <Spin size="large" fix v-if="loading">加载中...</Spin>
    <Row :gutter="10">
      <Col :span="8">
        <FormItem label="项目名称" prop="projectName">
          <Input type="text" v-model.trim="baseDto.projectName" clearable></Input>
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
          <Input type="text" v-model.trim="baseDto.projectAddress" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="百度经度" prop="lng">
          <Input type="text" v-model="baseDto.lng" :disabled="true"></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="百度纬度" prop="lat">
          <Input type="text" v-model="baseDto.lat" :disabled="true"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="16">
        <map-card class="map-cls" :location="location" @click="handleMapClick"></map-card>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="商圈" prop="tradeArea">
          <Input type="text" v-model.trim="baseDto.tradeArea" clearable></Input>
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
          <Input type="text" v-model.trim="baseDto.projectArea" clearable>
            <template slot="append">㎡</template>
          </Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="楼栋数" prop="buildingCount">
          <Input type="text" v-model.trim.number="baseDto.buildingCount" clearable></Input>
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
          <DatePicker type="date" placeholder="请选择" v-model="baseDto.signDate"
                          value-format="timestamp"
                          style="width: 100%;" :editable="false" clearable></DatePicker>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="到期日期" prop="endlineDate">
          <DatePicker type="date" placeholder="请选择" v-model="baseDto.endlineDate"
                          value-format="timestamp"
                          style="width: 100%;" :editable="false" clearable></DatePicker>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="开业日期" prop="openDate">
          <DatePicker type="date" placeholder="请选择" v-model="baseDto.openDate"
                          value-format="timestamp"
                          style="width: 100%;" :editable="false" clearable></DatePicker>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="8">
        <FormItem label="项目经理" prop="projectManager">
          <Input type="text" v-model.trim="baseDto.projectManager" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="经理手机" prop="projectManagerMobile">
          <Input type="text" v-model.trim="baseDto.projectManagerMobile" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="8">
        <FormItem label="项目电话" prop="sellPhone">
          <Input type="text" v-model.trim="baseDto.sellPhone" clearable></Input>
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
    <Row :gutter="20">
      <Col :span="16">
        <FormItem label="项目简介" prop="projectDesc">
          <Input type="textarea" v-model.trim="baseDto.projectDesc" :rows="5" :maxlength="200"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="16">
        <FormItem label="空检报告" prop="projectReportUrl">
          <Input type="textarea" v-model.trim="baseDto.projectReportUrl" :rows="3" :maxlength="400"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="16">
        <FormItem>
          <Button v-if="projectBid" type="warning" @click="validateForm('baseForm')">修 改</Button>
          <Button v-else type="primary" @click="validateForm('baseForm')">保 存</Button>
          <Button class="my-btn" @click="resetForm('baseForm')">重 置</Button>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import MapCard from '@/components/baidu-map/MapCard.vue'
import { getCityList, getAreaList, getOwnerList } from '@/api/common'
import { getBaseInfo, saveBase, updateBase } from '@/api/project'

export default {
  name: 'baseInfo',
  components: {
    MapCard
  },
  data () {
    return {
      projectBid: '',
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
          { required: true, message: '请在地图中选择', trigger: 'change' }
        ],
        lat: [
          { required: true, message: '请在地图中选择', trigger: 'change' }
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
          { required: true, message: '请输入楼栋数', trigger: 'blur' },
          { type: 'number', max: 99, message: '请输入1百以内的整数', trigger: 'blur' }
        ],
        projectType: [
          { required: true, message: '请选择合作类型', trigger: 'change' }
        ],
        period: [
          { required: true, message: '请选择项目阶段', trigger: 'change' }
        ],
        signDate: [
          { required: true, message: '请选择签约日期', trigger: 'change' }
        ],
        endlineDate: [
          { required: true, message: '请选择到期日期', trigger: 'change' }
        ],
        openDate: [
          { required: true, message: '请选择开业日期', trigger: 'change' }
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
          { required: true, message: '请输入项目描述', trigger: 'blur' },
          { max: 200, message: '不能超过200个字符', trigger: 'blur' }
        ]
      },
      loading: false,
      location: { },
      canClear: false
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
      this.projectBid = this.$route.query.projectBid
      if (!this.projectBid) {
        return
      }
      this.loading = true
      getBaseInfo(this.projectBid).then(res => {
        this.baseDto = res.body
        this.location = { lng: this.baseDto.lng, lat: this.baseDto.lat }
        this.canClear = false
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    saveOrUpBase () {
      if (this.projectBid) {
        this.updateBase()
      } else {
        this.saveBase()
      }
    },
    saveBase () {
      this.loading = true
      saveBase(this.baseDto).then(res => {
        if (res.code === 200) {
          this.$Message.success('保存成功')
          this.projectBid = res.body
          this.$store.commit('upStep', 2)
          this.$emit('success', this.projectBid)
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    updateBase () {
      this.loading = true
      updateBase(this.baseDto).then(res => {
        if (res.code === 200) {
          this.$Message.success('修改成功')
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
    }
  },
  watch: {
    '$route' (to, from) {
      this.getBaseInfo()
    },
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
    },
    'baseDto.signDate': function (newVal, oldVal) {
      if (newVal) {
        let date = new Date(newVal)
        date.setFullYear(date.getFullYear() + 10)
        date.setDate(date.getDate() - 1)
        this.baseDto.endlineDate = date.getTime()
      } else {
        this.baseDto.endlineDate = ''
      }
    }
  },
  created () {
    this.getCity()
    this.getOwner()
    this.getBaseInfo()
  }
}
</script>
<style scoped>
  .map-cls {
    height: 300px;
    margin-left: 120px;
    margin-bottom: 23px;
  }
  .my-btn {
    margin-left: 20px;
  }
  .my-top {
    position: relative;
  }
</style>
