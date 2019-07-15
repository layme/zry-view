<template>
  <div>
  <Form :model="priceTypeDto" :label-width="50" inline>
    <FormItem label="名称">
      <Input v-model="priceTypeDto.name" clearable></Input>
    </FormItem>
    <FormItem label="状态">
      <Select v-model="priceTypeDto.status" placeholder="全部" clearable>
        <Option value="1">有效</Option>
        <Option value="0">无效</Option>
      </Select>
    </FormItem>
    <FormItem>
      <Button icon="ios-search" type="primary" @click="searchPriceTypeEvent">查询</Button>
    </FormItem>
    <FormItem>
      <Button icon="md-add-circle" type="primary" style="margin-left:8px" @click="addPriceType">添加价格类型</Button>
    </FormItem>
  </Form>
  <div>
    <Table ref="searchPriceType"/>
  </div>
  <Modal
    v-model="detailVisible"
    title="修改房价类型"
    @on-ok="addOrUpdatePriceTypeEvent">
    <addPriceType v-if="detailVisible" :priceTypeSaveOrUpdateDto="priceTypeSaveOrUpdateDto" ref="addPriceType" @success="handleSuccess"></addPriceType>
  </Modal>
  </div>
</template>
<script>
import addPriceType from './addPriceType'
import Table from './priceTable'
import { addOrUpdatePriceType } from '@/api/priceType'
export default {
  name: '',
  components: {
    Table,
    addPriceType
  },
  data () {
    return {
      detailVisible: false,
      priceTypeDto: {
        page: 1,
        limit: 10,
        name: '',
        status: ''
      },
      priceTypeSaveOrUpdateDto: {}
    }
  },
  methods: {
    addPriceType () {
      this.detailVisible = true
    },
    addOrUpdatePriceTypeEvent () {
      this.$refs.addPriceType.add()
    },
    handleSuccess (dto) {
      this.addOrUpdatePriceType(dto)
    },
    addOrUpdatePriceType (dto) {
      console.log(dto)
      addOrUpdatePriceType(dto).then(() => {
        this.$Message.success('添加成功')
        this.$refs.searchPriceType.getPriceTypeList()
      })
    },
    searchPriceTypeEvent () {
      this.$refs.searchPriceType.getPriceTypeList(this.priceTypeDto)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
