<template>
  <div>
    <Row>
      <span>
        <Icon type="ios-list-box-outline" />
        {{ evaluate.businessCode }}
      </span>
      <span style="margin-left: 30px">
        <Icon type="ios-phone-portrait" />
        {{ evaluate.evaluatePersonPhone }}
      </span>
      <Tag style="margin-left: 30px" color="volcano">{{ evaluate.followUpStatus | statusFilter }}</Tag>
    </Row>
    <Row class="evaluate-list">
      <Col :span="3">
        <span>总体评星</span>
        <span class="my-score">{{ evaluate.customerAvgStarLevel }}</span>
      </Col>
      <Col :span="3" v-for="(item, i) in evaluate.starList" :key="i">
        <span>{{ item.questionContent }}</span>
        <span class="my-score">{{ item.answerScore }}</span>
      </Col>
    </Row>
    <Row class="evaluate-list my-content">
      {{ evaluate.customerSuggestion ? evaluate.customerSuggestion : '用户没有给出评价文字' }}
    </Row>
    <Row class="evaluate-list" v-if="evaluate.labelList.length">
      <Tag style="margin-right: 10px" v-for="(item,i) in evaluate.labelList" :key="i" color="blue">
        {{ item.answerContent }}
      </Tag>
    </Row>
    <Row class="evaluate-list">
      <span style="color: #909399">发表于&nbsp;&nbsp;{{ evaluate.evaluateTime | dateFilter }}</span>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'infoCard',
  props: {
    evaluate: Object
  },
  filters: {
    // 状态转文字
    statusFilter (val) {
      if (val === 1) {
        return '低评已提醒'
      } else if (val === 2) {
        return '低评跟进中'
      } else {
        return '低评已完结'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .evaluate-list {
    margin-top: 10px;
  }
  .my-score {
    color: #5cadff;
    margin-left: 7px;
    font-weight: bold;
  }
  .my-content {
    color: #17233d;
  }
</style>
