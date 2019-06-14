<template>
  <Card dis-hover>
    <Form ref="buildingForm" :model="buildingDto" :rules="buildingRules" :label-width="80" class="my-top full-top">
      <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
      <Row :gutter="10">
        <Col :span="8">
          <FormItem label="楼栋名称" prop="buildingName">
            <Input type="text" v-model.trim="buildingDto.buildingName" placeholder="" clearable></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="建成年代" prop="buildingFinishYear">
            <DatePicker v-model="buildingDto.buildingFinishYear" type="year" :editable="false"
                        value-format="yyyy"
                        :options="pickerOptions"
                        clearable style="width: 100%">
            </DatePicker>
          </FormItem>
        </Col>
        <Col :span="8" style="text-align: right">
          <Button type="error" shape="circle" icon="md-trash" @click="remove"></Button>
        </Col>
      </Row>
      <Row :gutter="10">
        <Col :span="8">
          <FormItem label="建筑面积" prop="buildingArea">
            <Input type="text" v-model.trim="buildingDto.buildingArea" placeholder=""
                      clearable>
              <template slot="append">㎡</template>
            </Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="外墙面积" prop="buildingOutsidearea">
            <Input type="text" v-model.trim="buildingDto.buildingOutsidearea" placeholder=""
                      clearable>
              <template slot="append">㎡</template>
            </Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="电梯数" prop="buildingElevatornumber">
            <Input type="text" v-model.trim="buildingDto.buildingElevatornumber" placeholder=""
                   clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="10">
        <Col :span="8">
          <FormItem label="楼梯数" prop="buildingStairnumber">
            <Input type="text" v-model.trim="buildingDto.buildingStairnumber" placeholder=""
                      clearable></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="楼层数" prop="buildingFloornumber">
            <Input type="text" v-model="buildingDto.buildingFloornumber" placeholder="" :maxlength="3" clearable></Input>
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="最低楼层" prop="lowestFloor">
            <Input type="text" v-model="buildingDto.lowestFloor" placeholder="" :maxlength="3" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="10">
        <Col :span="24">
          <FormItem label="出租楼层" prop="rentableFloor">
            <CheckboxGroup v-model="buildingDto.rentableFloor">
              <Checkbox v-for="(x, i) in floorOptions" :key="i" :label="x">{{ x + '层'}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button v-if="buildingDto.fid" type="warning" @click="validateForm('buildingForm')">修 改</Button>
        <Button v-else type="primary" @click="validateForm('buildingForm')">保 存</Button>
        <Button class="my-btn" @click="resetForm('buildingForm')">重 置</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { saveBuilding, updateBuilding } from '@/api/building'
import { getDate } from '@/libs/tools'
export default {
  name: 'buildingCard',
  props: {
    projectBid: String,
    building: Object,
    index: Number
  },
  data () {
    return {
      buildingDto: {
        projectFid: this.projectBid,
        buildingName: '',
        buildingFinishYear: '',
        buildingArea: '',
        buildingOutsidearea: '',
        buildingElevatornumber: '',
        buildingStairnumber: '',
        buildingFloornumber: '',
        lowestFloor: '',
        buildingRentablefloor: '',
        rentableFloor: []
      },
      buildingRules: {
        buildingName: [
          { required: true, message: '请输入楼栋名称', trigger: 'blur' },
          { max: 15, message: '不能超过15个字符', trigger: 'blur' }
        ],
        buildingFinishYear: [
          { required: true, type: 'date', message: '请选择建成年代', trigger: 'change' }
        ],
        buildingArea: [
          { required: true, message: '请输入建筑面积', trigger: 'blur' },
          { pattern: /^\d{1,5}(\.\d{0,2})?$/, message: '请输入10万以内的两位小数或整数', trigger: 'blur' }
        ],
        buildingOutsidearea: [
          { required: true, message: '请输入外墙面积', trigger: 'blur' },
          { pattern: /^\d{1,5}(\.\d{0,2})?$/, message: '请输入10万以内的两位小数或整数', trigger: 'blur' }
        ],
        buildingElevatornumber: [
          { required: true, message: '请输入电梯数', trigger: 'blur' },
          { pattern: /^\d{1,2}?$/, message: '请输入1百以内的整数', trigger: 'blur' }
        ],
        buildingStairnumber: [
          { required: true, message: '请输入楼梯数', trigger: 'blur' },
          { pattern: /^\d{1,2}?$/, message: '请输入1百以内的整数', trigger: 'blur' }
        ],
        buildingFloornumber: [
          { required: true, message: '请输入楼层数', trigger: 'blur' },
          { pattern: /^([1-9][0-9]?|100)$/, message: '请输入1～100的整数', trigger: 'blur' }
        ],
        lowestFloor: [
          { required: true, message: '请输入最低楼层', trigger: 'blur' },
          { pattern: /^((-(20|1\d|[1-9]))|1[0-4]\d|100|[1-9]\d|\d)$/, message: '请输入-20～100的整数', trigger: 'blur' }
        ],
        rentableFloor: [
          { type: 'array', required: true, message: '请选择出租楼层', trigger: 'change' }
        ]
      },
      loading: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getFullYear() > new Date().getFullYear()
        }
      }
    }
  },
  methods: {
    validateForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveOrUpBuilding()
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    remove () {
      this.$emit('remove', this.index)
    },
    saveOrUpBuilding () {
      if (this.buildingDto.fid) {
        this.updateBuilding()
      } else {
        this.saveBuilding()
      }
    },
    saveBuilding () {
      this.loading = true
      this.buildingDto.rentableFloor.sort((a, b) => {
        return a - b
      })
      this.buildingDto.buildingRentablefloor = this.buildingDto.rentableFloor.join(',')
      this.buildingDto.buildingFinishYear = getDate(this.buildingDto.buildingFinishYear, 'year')
      saveBuilding(this.buildingDto).then(res => {
        if (res.code === 200) {
          this.buildingDto.fid = res.body
          this.$Message.success('保存成功')
          this.$store.commit('upStep', 3)
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    updateBuilding () {
      this.loading = true
      this.buildingDto.rentableFloor.sort((a, b) => {
        return a - b
      })
      this.buildingDto.buildingRentablefloor = this.buildingDto.rentableFloor.join(',')
      this.buildingDto.buildingFinishYear = getDate(this.buildingDto.buildingFinishYear, 'year')
      updateBuilding(this.buildingDto).then(res => {
        if (res.code === 200) {
          this.$Message.success('修改成功')
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    syncData () {
      if (Object.keys(this.building).length) {
        this.buildingDto.projectFid = this.projectBid
        this.buildingDto.fid = this.building.fid
        this.buildingDto.buildingName = this.building.buildingName
        this.buildingDto.buildingFinishYear = this.building.buildingFinishYear.toString()
        this.buildingDto.buildingArea = this.building.buildingArea.toString()
        this.buildingDto.buildingOutsidearea = this.building.buildingOutsidearea.toString()
        this.buildingDto.buildingElevatornumber = this.building.buildingElevatornumber.toString()
        this.buildingDto.buildingStairnumber = this.building.buildingStairnumber.toString()
        this.buildingDto.buildingFloornumber = this.building.buildingFloornumber.toString()
        this.buildingDto.lowestFloor = this.building.lowestFloor.toString()
        this.buildingDto.buildingRentablefloor = this.building.buildingRentablefloor
        this.buildingDto.rentableFloor = this.building.buildingRentablefloor ? this.building.buildingRentablefloor.split(',') : []
      }
    }
  },
  computed: {
    floorOptions: function () {
      let floorCount = parseInt(this.buildingDto.buildingFloornumber)
      let lowestFloor = parseInt(this.buildingDto.lowestFloor)
      let options = []
      for (let i = lowestFloor; i <= floorCount; i++) {
        if (i !== 0) {
          options.push(i.toString())
        }
      }
      return options
    }
  },
  watch: {
    building: function (newVal, oldVal) {
      this.syncData()
    }
  },
  mounted () {
    this.syncData()
  }
}
</script>
<style scoped>
  .my-top {
    position: relative;
  }
  .my-btn {
    margin-left: 20px;
  }

  .full-top {
    position: relative;
    height: 100%;
  }

  .full-spin {
    height: 100%;
  }
</style>
