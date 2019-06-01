<template>
  <Form :model="paramDto" ref="repairSaveForm" :rules="rules" :label-width="80">
    <Divider orientation="left">基本信息</Divider>
    <Row>
      <Col :span="12">
        <FormItem label="项目" prop="projectBid">
          <Select v-model="paramDto.projectBid" placeholder="" clearable>
            <Option
              v-for="item in $store.state.user.projectList"
              :key="item.bid"
              :label="item.projectName"
              :value="item.bid">
            </Option>
          </Select>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="报修区域" prop="areaType">
          <Select v-model="paramDto.areaType" placeholder="" clearable>
            <Option value="0" label="公区"></Option>
            <Option value="1" label="房间"></Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row v-if="isRoom">
      <Col :span="12">
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
          <DatePicker v-model="paramDto.visitDate" type="daterange" split-panels placeholder=""
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
export default {
  name: 'createRepairForm',
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
        repairsMan: this.$store.state.user.userName,
        repairsMobile: this.$store.state.user.userName,
        visitLinkman: this.$store.state.user.userName,
        visitMobile: this.$store.state.user.userName,
        visitDate: '',
        visitTime: ''
      },
      rules: {
        projectBid: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
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
        visitDate: [
          { required: true, message: '请选择上门日期', trigger: 'change' }
        ],
        visitTime: [
          { required: true, message: '请选择上门时段', trigger: 'change' }
        ],
        roomNum: [
          { required: true, message: '请选择房间号', trigger: 'change' }
        ]
      },
      isRoom: false,
      areaOptions: [],
      roomOptions: [],
      goodsOptions: [],
      goodSaveOptions: [],
      faultFlagOptions: []
    }
  },
  methods: {
    getRoomList () {
      getRooms(this.paramDto.projectBid).then(res => {
        this.roomOptions = res.data
      })
    },
    getDesc () {
      getDesc(this.paramDto.goodsCode.split(',')[1]).then(res => {
        this.faultFlagOptions = res.faultFlagList
      })
    },
    validForm () {
      this.$refs['repairSaveForm'].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.paramDto)
        } else {
          this.$emit('error')
        }
      })
    }
  },
  watch: {
    'paramDto.projectBid' (val) {
      if (val) {
        this.getRoomList()
        this.paramDto.roomNum = ''
      } else {
        this.roomOptions = []
        this.paramDto.roomNum = ''
      }
    },
    'paramDto.areaType' (val) {
      if (val) {
        this.paramDto.roomNum = ''
        this.isRoom = val === '1'
        this.getRoomList()
      } else {
        this.paramDto.roomNum = ''
        this.isRoom = false
        this.roomOptions = []
      }
    },
    'paramDto.categoryCod' (val) {
      if (val) {
        this.paramDto.goodsCode = ''
        for (let i = 0; i < this.goodsOptions.length; i++) {
          if (this.goodsOptions[i].typeCode === val.split(',')[1]) {
            this.goodSaveOptions = this.goodsOptions[i].goodsList
            break
          }
        }
      } else {
        this.goodSaveOptions = []
        this.paramDto.goodsCode = ''
      }
    },
    'paramDto.categoryCode' (val) {
      if (val) {
        this.getDesc()
      } else {
        this.paramDto.failureId = ''
        this.faultFlagOptions = []
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .full-width {
    width: 100%;
  }
</style>
