<template>
  <Form :model="paramDto" ref="repairSaveForm" :rules="rules" :label-width="80">
    <Divider orientation="left">基本信息</Divider>
    <Row>
      <Col :span="12">
        <FormItem label="报修区域" prop="areaType">
          <Select v-model="paramDto.areaType" placeholder="" clearable>
            <Option value="0" label="公区"></Option>
            <Option value="1" label="房间"></Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="12" v-if="isRoom">
        <FormItem label="房间号" prop="roomNum">
          <Select v-model="paramDto.roomNum" placeholder="" clearable>
            <Option
              v-for="item in roomOptions"
              :key="item.bid"
              :label="item.areaName"
              :value="item.areaName + ',' +item.bid">
            </Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Divider orientation="left">报修内容</Divider>
    <Row>
      <Col :span="12">
        <FormItem label="区域" prop="areaCode">
          <Select v-model="paramDto.areaCode" placeholder="" clearable>
            <Option
              v-for="item in areaOptions"
              :key="item.code"
              :label="item.name"
              :value="item.name + ',' + item.code">
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="大类" prop="categoryCode">
          <Select v-model="paramDto.categoryCode" placeholder="" clearable>
            <Option
              v-for="item in goodsOptions"
              :key="item.typeCode"
              :label="item.typeName"
              :value="item.typeName + ',' + item.typeCode">
            </Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="12">
        <FormItem label="物品" prop="goodsCode">
          <Select v-model="paramDto.goodsCode" placeholder="" clearable>
            <Option
              v-for="item in goodSaveOptions"
              :key="item.goodsCode"
              :label="item.goodsName"
              :value="item.goodsName + ',' + item.goodsCode"
              :disabled="item.disabled">
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="故障描述" prop="failureId">
          <Select v-model="paramDto.failureId" placeholder="" clearable>
            <Option
              v-for="item in faultFlagOptions"
              :key="item.maintainTagId"
              :label="item.maintainTag"
              :value="item.maintainTag + ',' + item.maintainTagId"
              :disabled="item.disabled">
            </Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <FormItem label="备注" prop="remark">
        <Input type="textarea" :rows="2" v-model="paramDto.remark" :maxlength="50"
               placeholder="此处最多输入50个字符"></Input>
      </FormItem>
    </Row>
    <Divider orientation="left">报修人信息</Divider>
    <Row >
      <Col :span="12">
        <FormItem label="报修人">
          <Input v-model="paramDto.repairsMan" placeholder="" :disabled="true"></Input>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="报修人手机">
          <Input v-model="paramDto.repairsMobile" placeholder="" :disabled="true"></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="12">
        <FormItem label="联系人" prop="visitLinkman">
          <Input v-model.trim="paramDto.visitLinkman" placeholder="" clearable></Input>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="联系方式" prop="visitMobile">
          <Input v-model.trim="paramDto.visitMobile" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="12">
        <FormItem label="预约日期" prop="visitDate">
          <DatePicker v-model="paramDto.visitDateValue" type="date" :options="dateOptions" placeholder=""
                      class="full-width" clearable></DatePicker>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="预约时段" prop="visitTime">
          <Select v-model="paramDto.visitTime" placeholder="" clearable>
            <Option value="9:00-13:00" label="9:00-13:00"></Option>
            <Option value="13:00-18:00" label="13:00-18:00"></Option>
            <Option value="18:00-22:00" label="18:00-22:00"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getRooms, getDesc } from '@/api/repair'
import { getDate } from '@/libs/tools'
export default {
  name: 'createRepairForm',
  props: {
    areaOptions: Array,
    goodsOptions: Array
  },
  data () {
    return {
      paramDto: {
        projectBid: '',
        areaType: '',
        roomNum: '',
        areaCode: '',
        categoryCode: '',
        goodsCode: '',
        failureId: '',
        remark: '',
        repairsMan: this.$store.state.user.name,
        repairsMobile: this.$store.state.user.phoneMobile,
        visitLinkman: this.$store.state.user.name,
        visitMobile: this.$store.state.user.phoneMobile,
        visitDateValue: '',
        visitDate: '',
        visitTime: ''
      },
      rules: {
        areaType: [
          { required: true, message: '请选择报修区域', trigger: 'change' }
        ],
        areaCode: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        categoryCode: [
          { required: true, message: '请选择大类', trigger: 'change' }
        ],
        goodsCode: [
          { required: true, message: '请选择物品', trigger: 'change' }
        ],
        failureId: [
          { required: true, message: '请选择故障描述', trigger: 'change' }
        ],
        visitLinkman: [
          { required: true, message: '请输入上门联系人', trigger: 'blur' }
        ],
        visitMobile: [
          { required: true, message: '请输入上门联系方式', trigger: 'blur' }
        ],
        visitDateValue: [
          { required: true, type: 'date', message: '请选择上门日期', trigger: 'change' }
        ],
        visitTime: [
          { required: true, message: '请选择上门时段', trigger: 'change' }
        ],
        roomNum: [
          { required: true, message: '请选择房间号', trigger: 'change' }
        ]
      },
      isRoom: false,
      roomOptions: [],
      faultFlagOptions: [],
      dateOptions: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  computed: {
    goodSaveOptions () {
      if (this.paramDto.categoryCode) {
        return this.goodsOptions.find(item => item.typeCode === this.paramDto.categoryCode.split(',')[1]).goodsList
      } else {
        return []
      }
    }
  },
  methods: {
    getRoomList () {
      getRooms(this.$store.state.user.currentProject.bid).then(res => {
        this.roomOptions = res.body
      })
    },
    getDesc () {
      getDesc(this.paramDto.goodsCode.split(',')[1]).then(res => {
        this.faultFlagOptions = res.body
      })
    },
    validForm () {
      this.$refs['repairSaveForm'].validate((valid) => {
        if (valid) {
          this.paramDto.projectBid = this.$store.state.user.currentProject.bid
          this.$emit('submit', this.paramDto)
        } else {
          this.$emit('error')
        }
      })
    }
  },
  watch: {
    'paramDto.areaType' (val) {
      if (val) {
        this.paramDto.roomNum = ''
        this.isRoom = val === '1'
      } else {
        this.paramDto.roomNum = ''
        this.isRoom = false
      }
    },
    'paramDto.goodsCode' (val) {
      if (val) {
        this.getDesc()
      } else {
        this.paramDto.failureId = ''
        this.faultFlagOptions = []
      }
    },
    'paramDto.visitDateValue' (val) {
      if (val) {
        this.paramDto.visitDate = getDate(val, 'date')
      } else {
        this.paramDto.visitDate = ''
      }
    }
  },
  created () {
    this.getRoomList()
  }
}
</script>
<style lang="less" scoped>
  .full-width {
    width: 100%;
  }
</style>
