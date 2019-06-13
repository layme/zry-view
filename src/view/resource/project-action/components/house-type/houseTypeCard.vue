<template>
  <div>
    <card dis-hover>
      <Form ref="houseTypeForm" :model="houseTypeDto" :rules="houseTypeRules" :label-width="90">
        <Row :gutter="10">
          <Col :span="12">
            <FormItem label="房型分类" prop="houseTypeParentBid">
              <Select v-model="houseTypeDto.houseTypeParentBid" placeholder="请选择"
                      clearable>
                <Option v-for="item in houseTypeParentBidOptions" :key="item.bid"
                        :label="item.houseName"
                        :value="item.bid"></Option>
              </Select>
            </FormItem>
          </Col>
          <template v-if="houseTypeDto.bid">
            <Col :span="6">
              <FormItem label="当前状态">
                <Tag v-if="houseTypeDto.isShow" type="success">在App端展示</Tag>
                <Tag v-else type="info">在App端隐藏</Tag>
              </FormItem>
            </Col>
            <Col :span="6" style="text-align: right">
              <Tooltip v-if="houseTypeDto.isShow" class="my-tip" effect="dark" content="在App上隐藏" placement="top">
                <Button type="primary" shape="circle" icon="ios-appstore-outline"
                        @click="show(0)"></Button>
              </Tooltip>
              <Tooltip v-else class="my-tip" effect="dark" content="在App上展示" placement="top">
                <Button type="primary" shape="circle" icon="ios-appstore"
                        @click="show(1)"></Button>
              </Tooltip>
              <Button type="error" shape="circle" icon="md-trash" @click="remove"></Button>
            </Col>
          </template>
          <template v-else>
            <Col :span="12" style="text-align: right">
              <Button type="error" shape="circle" icon="md-trash" @click="remove"></Button>
            </Col>
          </template>
        </Row>
        <Row :gutter="10">
          <Col :span="24">
            <Row :gutter="10">
              <Col :span="12">
                <FormItem label="房型名称" prop="houseName">
                  <Input type="text" v-model.trim="houseTypeDto.houseName"
                         clearable></Input>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="面积" prop="houseArea">
                  <Input type="text" v-model.trim="houseTypeDto.houseArea" clearable>
                    <template slot="append">㎡</template>
                  </Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="10">
              <Col :span="12">
                <FormItem label="卫生间类型" prop="isBathroom">
                  <Select v-model="houseTypeDto.isBathroom" placeholder="请选择" clearable>
                    <Option v-for="item in bathroomOptions" :key="item.value" :label="item.label"
                            :value="item.value"></Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="洗浴间类型" prop="isBath">
                  <Select v-model="houseTypeDto.isBath" placeholder="请选择" clearable>
                    <Option v-for="item in bathOptions" :key="item.value" :label="item.label"
                            :value="item.value"></Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="10">
              <Col :span="24">
                <FormItem label="房型描述" prop="introduction">
                  <Input type="textarea" v-model.trim="houseTypeDto.introduction" :rows="5" :maxlength="200"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row v-for="(bed,i) in houseTypeDto.bedList" :key="'bed'+ i" :gutter="10">
              <Col :span="10">
                <FormItem label="床位号"
                          :prop="'bedList.' + i + '.bedCode'">
                  <Input type="text" v-model.trim="bed.bedCode" disabled
                         clearable></Input>
                </FormItem>
              </Col>
              <Col :span="10">
                <FormItem label="床位类型"
                          :prop="'bedList.' + i + '.bedTypeBid'"
                          :rules="[{required: true, message: '请选择床位类型', trigger: 'change'}]">
                  <Select v-model="bed.bedTypeBid" placeholder="请选择" clearable>
                    <Option v-for="i in bedTypeList" :key="i.bid" :label="i.bedName" :value="i.bid"></Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="1">
                <Button type="text" class="del-btn" @click="removeBed(i)">删除</Button>
              </Col>
            </Row>
            <Row :gutter="10">
              <Col :span="12">
                <FormItem>
                  <a @click="addBed">+ 添加床位</a>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col :span="24">
            <Row :gutter="10">
              <Col :span="8">
                <FormItem label="原价" prop="originalPrice">
                  <Input type="text" v-model.trim="houseTypeDto.originalPrice"
                         placeholder="" clearable>
                    <template slot="prepend">¥</template>
                  </Input>
                </FormItem>
              </Col>
              <Col :span="8">
                <FormItem label="平时价" prop="usualPrice">
                  <Input type="text" v-model.trim="houseTypeDto.usualPrice" placeholder="" clearable>
                    <template slot="prepend">¥</template>
                  </Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="10" v-for="(price, i) in houseTypeDto.priceList" :key="'price' + i">
              <Col :span="8">
                <FormItem :label="'特殊价格 ' + (i + 1)"
                          :prop="'priceList.' + i + '.specialPrice'"
                          :rules="[{required: true, message: '请输入特殊价格', trigger: 'blur'},
                                                      { pattern: /^\d{1,4}(\.\d{0,2})?$/, message: '请输入1万以内的两位小数或整数', trigger: 'blur' }]">
                  <Input type="text" v-model.trim="price.specialPrice" placeholder=""
                         clearable>
                    <template slot="prepend">¥</template>
                  </Input>
                </FormItem>
              </Col>
              <Col :span="12">
                <FormItem label="时段"
                          :prop="'priceList.' + i + '.dateRange'"
                          :rules="[{ required: true, type: 'array',
                                      fields: {
                                        0: { type: 'date', required: true, message: '请选择优惠券有效期' },
                                        1: { type: 'date', required: true, message: '请选择优惠券有效期' }
                                      }, trigger: 'change' }]">
                  <DatePicker
                    style="width: 100%"
                    v-model="price.dateRange"
                    type="daterange"
                    split-panels
                    :options="pickerOptions">
                  </DatePicker>
                </FormItem>
              </Col>
              <Col :span="2">
                <Button type="text" class="del-btn" @click="removePrice(i)">删除</Button>
              </Col>
            </Row>
            <Row :gutter="10">
              <Col :span="12">
                <FormItem>
                  <a @click="addPrice">+ 添加特殊价格</a>
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
        <FormItem style="margin-top: 20px">
          <Button v-if="houseTypeDto.bid" type="warning" @click="validateForm('houseTypeForm')">修 改</Button>
          <Button v-else type="primary" @click="validateForm('houseTypeForm')">保 存</Button>
          <Button class="my-btn" @click="resetForm('houseTypeForm')">重 置</Button>
        </FormItem>
      </Form>
    </card>
  </div>
</template>

<script>
import { saveHouseType, updateHouseType } from '@/api/houseType'

export default {
  name: 'houseTypeCard',
  props: {
    projectBid: String,
    houseType: Object,
    index: Number,
    houseTypeParentBidOptions: Array,
    bedTypeList: Array
  },
  data () {
    return {
      houseTypeDto: {
        projectBid: this.projectBid,
        houseTypeParentBid: '',
        houseName: '',
        houseArea: '',
        checkInLimit: '',
        isBathroom: '',
        isBath: '',
        introduction: '',
        bedList: [{
          bedCode: 1,
          bedTypeBid: ''
        }],
        originalPrice: '',
        usualPrice: '',
        priceList: []
      },
      houseTypeRules: {
        houseTypeParentBid: [
          { required: true, message: '请选择房型分类名称', trigger: 'change' }
        ],
        houseName: [
          { required: true, message: '请输入房型名称', trigger: 'blur' },
          { max: 200, message: '不能超过200个字符', trigger: 'blur' }
        ],
        houseArea: [
          { required: true, message: '请输入面积', trigger: 'blur' },
          { pattern: /^\d{1,4}(\.\d{0,2})?$/, message: '请输入1万以内的两位小数或整数', trigger: 'blur' }
        ],
        isBathroom: [
          { required: true, message: '请选择卫生间类型', trigger: 'change' }
        ],
        isBath: [
          { required: true, message: '请选择洗浴间类型', trigger: 'change' }
        ],
        introduction: [
          { required: true, message: '请输入房型描述', trigger: 'blur' },
          { max: 200, message: '不能超过200个字符', trigger: 'blur' }
        ],
        originalPrice: [
          { required: true, message: '请输入原价', trigger: 'blur' },
          { pattern: /^\d{1,4}(\.\d{0,2})?$/, message: '请输入1万以内的两位小数或整数', trigger: 'blur' }
        ],
        usualPrice: [
          { required: true, message: '请输入平时价', trigger: 'blur' },
          { pattern: /^\d{1,4}(\.\d{0,2})?$/, message: '请输入1万以内的两位小数或整数', trigger: 'blur' }
        ]
      },
      bathroomOptions: [
        {
          label: '公共卫生间',
          value: 0
        },
        {
          label: '独立卫生间',
          value: 1
        }
      ],
      bathOptions: [
        {
          label: '公共洗浴间',
          value: 0
        },
        {
          label: '独立洗浴间',
          value: 1
        }
      ],
      bedTypeOptions: [
        {
          label: '上铺',
          value: 1
        },
        {
          label: '下铺',
          value: 2
        },
        {
          label: '上床下桌',
          value: 3
        },
        {
          label: '大床',
          value: 4
        },
        {
          label: '单人床',
          value: 5
        }
      ],
      loading: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      }
    }
  },
  methods: {
    validateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveOrUpHouseType()
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.houseTypeDto.bedList = []
      this.houseTypeDto.priceList = []
    },
    remove () {
      this.$emit('remove', this.index)
    },
    saveOrUpHouseType () {
      this.houseTypeDto.priceList.forEach((item) => {
        item.startDate = item.dateRange[0]
        item.endDate = item.dateRange[1]
      })
      if (this.houseTypeDto.bid) {
        this.updateHouseType()
      } else {
        this.saveHouseType()
      }
    },
    saveHouseType () {
      this.loading = true
      saveHouseType(this.houseTypeDto).then(res => {
        if (res.code === 200) {
          this.Message.success('保存成功')
          this.$store.commit('upStep', 5)
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    updateHouseType () {
      this.loading = true
      updateHouseType(this.houseTypeDto).then(res => {
        if (res.code === 200) {
          this.Message.success('保存成功')
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    addBed () {
      this.houseTypeDto.bedList.push(
        {
          bedCode: '',
          bedTypeBid: ''
        }
      )
      this.flushBedCode()
    },
    removeBed (i) {
      this.houseTypeDto.bedList.splice(i, 1)
      this.flushBedCode()
    },
    flushBedCode () {
      this.houseTypeDto.bedList.forEach((item, index) => {
        item.bedCode = index + 1
      })
    },
    addPrice () {
      this.houseTypeDto.priceList.push(
        {
          specialPrice: '',
          startDate: '',
          endDate: '',
          dateRange: []
        }
      )
    },
    removePrice (i) {
      this.houseTypeDto.priceList.splice(i, 1)
    },
    show (val) {
      this.$emit('show', this.houseTypeDto.bid, val)
    },
    syncData () {
      if (Object.keys(this.houseType).length) {
        this.houseTypeDto.projectBid = this.projectBid
        this.houseTypeDto.bid = this.houseType.bid
        this.houseTypeDto.houseTypeParentBid = this.houseType.houseTypeParentBid
        this.houseTypeDto.houseName = this.houseType.houseName
        this.houseTypeDto.houseArea = this.houseType.houseArea
        this.houseTypeDto.isShow = this.houseType.isShow
        this.houseTypeDto.checkInLimit = this.houseType.checkInLimit
        this.houseTypeDto.isBathroom = this.houseType.isBathroom
        this.houseTypeDto.isBath = this.houseType.isBath
        this.houseTypeDto.introduction = this.houseType.introduction
        this.houseTypeDto.bedList = this.houseType.bedList
        this.houseTypeDto.originalPrice = this.houseType.originalPrice
        this.houseTypeDto.usualPrice = this.houseType.usualPrice
        this.houseTypeDto.priceList = JSON.parse(JSON.stringify(this.houseType.priceList))
        this.houseTypeDto.priceList.forEach((item) => {
          this.$set(item, 'dateRange', [])
          item.dateRange.push(item.startDate)
          item.dateRange.push(item.endDate)
        })
      }
    }
  },
  watch: {
    houseType (newVal) {
      this.syncData()
    }
  },
  mounted () {
    this.syncData()
  }
}
</script>

<style scoped>
  .my-btn {
    margin-left: 20px;
  }

  .del-btn {
    color: #2db7f5;
  }
  .my-tip {
    margin: 4px;
  }
</style>
