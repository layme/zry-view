<template>
  <Form :model="priceDto" :label-width="50">
    <Row>
      <FormItem>
        <Button type="primary" icon="ios-search" @click="priceDto.pageNum=1;getPriceList()"> 查 询</Button>
      </FormItem>
    </Row>
  </Form>
</template>
<script>
export default {
  name: 'priceEdit'
}
</script>
<style lang="less" scoped>
</style>
