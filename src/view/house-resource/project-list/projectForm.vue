<template>
  <Form :model="paramDto" :label-width="70">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="城市">
          <Select v-model="paramDto.cityCode" placeholder="" clearable>
            <Option v-for="city in cityOptions" :key="city.cityCode" :label="city.cityName"
                    :value="city.cityCode"></Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="区域">
          <Select v-model="paramDto.areaCode" placeholder="区域" clearable
                  no-data-text="请先选择城市">
            <Option v-for="area in areaOptions" :key="area.areaCode" :label="area.areaName"
                    :value="area.areaCode"></Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="状态">
          <Select v-model="paramDto.isValid" placeholder="" clearable>
            <Option v-for="x in isValidOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="类型">
          <Select v-model="paramDto.projectType" placeholder="" clearable>
            <Option v-for="x in typeOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="8">
        <FormItem label="名称">
          <Input v-model.trim="paramDto.projectName" placeholder="" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <Button type="primary" icon="ios-search" @click="submit"> 查 询</Button>
      </Col>
      <Col span="12" style="text-align: right">
        <Button type="primary" @click="create"> 新增项目</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { getCityList, getAreaList } from '@/api/common'

export default {
  name: 'projectForm',
  data () {
    return {
      paramDto: {
        cityCode: '',
        areaCode: '',
        isValid: '',
        projectType: '',
        projectName: ''
      },
      cityOptions: [],
      areaOptions: [],
      isValidOptions: [
        {
          label: '启用',
          value: 1
        },
        {
          label: '停用',
          value: 0
        }
      ],
      typeOptions: [
        {
          label: '直营',
          value: 1
        },
        {
          label: '托管',
          value: 2
        }
      ]
    }
  },
  methods: {
    getCity () {
      getCityList().then(res => {
        this.cityOptions = res.body
      })
    },
    getAreaList () {
      getAreaList(this.paramDto.cityCode).then(res => {
        this.areaOptions = res.data.list
      })
    },
    submit () {
      this.$emit('search', this.paramDto)
    },
    create () {
      this.$emit('create')
    }
  },
  watch: {
    'paramDto.cityCode' (val) {
      this.paramDto.areaCode = ''
      if (val) {
        this.getAreaList()
      } else {
        this.areaOptions = []
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
