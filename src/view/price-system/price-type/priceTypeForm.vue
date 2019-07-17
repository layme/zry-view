<template>
  <Form ref="priceForm" :model="paramDto" :rules="rules" :label-width="80">
    <FormItem label="名称" prop="channelCode">
      <Select v-model="paramDto.channelCode" :disabled="Object.keys(price).length">
        <Option
          v-for="item in $store.state.price.priceTypeNames"
          :key="item.name"
          :label="item.name"
          :value="item.code"
          :disabled="item.code === 'msj'">
        </Option>
      </Select>
    </FormItem>
    <FormItem label="房价代码" prop="typeCode">
      <Input v-model="paramDto.typeCode" clearable></Input>
    </FormItem>
    <Row v-if="paramDto.channelCode !== 'msj'">
      <Col :span="12">
        <FormItem label="绑定门市价" prop="isBindCounterPrice">
          <RadioGroup v-model="paramDto.isBindCounterPrice">
            <Radio v-for="item in yesOrNoOptions" :key="item.value" :label="item.value">{{ item.label }}</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="绑定比率" prop="bindRate" v-if="paramDto.isBindCounterPrice === 1">
          <Input v-model="paramDto.bindRate">
            <span slot="append">%</span>
          </Input>
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="12">
        <FormItem label="隐藏房价" prop="isHideHousePrice">
          <RadioGroup v-model="paramDto.isHideHousePrice">
            <Radio v-for="item in yesOrNoOptions" :key="item.value" :label="item.value">{{ item.label }}</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
      <Col :span="12" v-if="paramDto.channelCode !== 'msj'">
        <FormItem label="保留整数" prop="isKeepInt">
          <RadioGroup v-model="paramDto.isKeepInt">
            <Radio v-for="item in yesOrNoOptions" :key="item.value" :label="item.value">{{ item.label }}</Radio>
          </RadioGroup>
        </FormItem>
      </Col>
    </Row>
    <FormItem label="状态" prop="status">
      <RadioGroup v-model="paramDto.status">
        <Radio v-for="item in priceTypeStatus" :key="item.value" :label="item.value">{{ item.label }}</Radio>
      </RadioGroup>
    </FormItem>
  </Form>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'priceTypeForm',
  props: {
    price: Object
  },
  data () {
    return {
      paramDto: {
        fid: '',
        name: '',
        channelCode: '',
        typeCode: '',
        isBindCounterPrice: 0,
        isHideHousePrice: 0,
        isKeepInt: 0,
        bindRate: '',
        status: 1
      },
      rules: {
        channelCode: [
          { required: true, message: '请选择价格类型名称', trigger: 'change' }
        ],
        typeCode: [
          { required: true, message: '请输入代码', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{6}$/, message: '请输入6位（字母或数字）', trigger: 'blur' }
        ],
        bindRate: [
          { required: true, message: '请输入绑定比率', trigger: 'blur' },
          { pattern: /^[0-9]$|^[0-9]{2}$|^[1,2][0-9]{2}$|^[3][0][0]$/, message: '请输入1-300正整数', trigger: 'blur' }
        ]
      },
      yesOrNoOptions: [
        {
          label: '是',
          value: 1
        }, {
          label: '否',
          value: 0
        }
      ],
      priceTypeStatus: [
        {
          label: '有效',
          value: 1
        }, {
          label: '无效',
          value: 0
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'getPriceTypeNames'
    ]),
    init () {
      if (Object.keys(this.price).length) {
        this.paramDto = JSON.parse(JSON.stringify(this.price))
      }
    },
    validForm () {
      this.$refs.priceForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.paramDto)
        } else {
          this.$emit('error')
        }
      })
    }
  },
  created () {
    this.getPriceTypeNames()
    this.init()
  }
}
</script>
