<template>
  <Form :model="searchData" :label-width="70">
    <Row :gutter="20">
      <Col span="8">
        <FormItem label="项目名称">
          <Input v-model.trim="searchData.projectName" placeholder="" @keyup.enter.native="submit" clearable></Input>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col span="12">
        <Button type="primary" icon="ios-search" @click="submit"> 查 询</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>

export default {
  data () {
    return {
      searchData: {
        projectName: ''
      }
    }
  },
  methods: {
    submit () {
      this.$emit('search', this.searchData)
    }
  },
  created () {
    this.submit()
  }
}
</script>
<style lang="less" scoped>
</style>
