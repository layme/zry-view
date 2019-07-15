<template>
  <Card>
    <p slot="title">
      {{ date }}
    </p>
    <Table stripe size="small" :columns="getColumn" :data="priceList"></Table>
  </Card>
</template>
<script>
export default {
  name: 'priceCard',
  props: {
    date: String,
    priceList: Array,
    checkedPriceType: Array
  },
  data () {
    return {
      columns: []
    }
  },
  computed: {
    getColumn () {
      let columns = [
        {
          title: '房型',
          key: 'houseName',
          fixed: 'left',
          width: 200
        }
      ]
      this.$store.state.price.priceTypeList.forEach(item => {
        if (this.checkedPriceType.find(x => x === item.code)) {
          columns.push({
            title: `${item.name}/元`,
            key: item.code,
            align: 'center',
            minWidth: 200
          })
        }
      })
      return columns
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
</style>
