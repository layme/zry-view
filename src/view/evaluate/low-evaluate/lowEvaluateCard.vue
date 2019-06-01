<template>
  <Card>
    <Row>
      <Col :span="10">
        <a @click="link">{{ row.businessCode }}</a>
        <Tag style="margin-left: 30px" color="volcano">{{ row.followUpStatus | statusFilter }}</Tag>
      </Col>
      <Col :span="14" :style="{ textAlign: 'right' }">
        <a @click="follow">{{ row.followUpStatus === 3 ? '处理结果' : '跟进处理' }}</a>
      </Col>
    </Row>
    <Row class="evaluate-list">
      <Col :span="3">
        <span>总体评星</span>
        <span class="my-score">{{ row.customerAvgStarLevel }}</span>
      </Col>
      <Col :span="3" v-for="(item, i) in row.starList" :key="i">
        <span>{{ item.questionContent }}</span>
        <span class="my-score">{{ item.answerScore }}</span>
      </Col>
    </Row>
    <Row class="evaluate-list my-content">
      {{ row.customerSuggestion ? row.customerSuggestion : '用户没有给出评价文字' }}
    </Row>
    <Row class="evaluate-list" v-if="row.labelList.length">
      <Tag style="margin-right: 10px" v-for="(item,i) in row.labelList" :key="i" color="blue">
        {{ item.answerContent }}
      </Tag>
    </Row>
    <Row class="evaluate-list" :gutter="20" v-if="row.urlList.length">
      <Col :span="3" v-for="(item, i) in row.urlList" :key="i">
        <Tooltip effect="dark" content="点击查看大图" placement="bottom">
          <div class="grid-content cover">
            <img :src="item.answerContent" class="img-class" :preview="index" alt="评价附图">
          </div>
        </Tooltip>
      </Col>
    </Row>
    <Row class="evaluate-list">
      <span style="color: #909399">发表于&nbsp;&nbsp;{{ row.evaluateTime | dateFilter }}</span>
    </Row>
  </Card>
</template>
<script>
import { getDate } from '@/libs/tools'
export default {
  name: 'lowEvaluateCard',
  props: {
    row: Object,
    index: Number
  },
  methods: {
    link () {
      this.$emit('link', this.row.businessCode)
    },
    follow () {
      this.$emit('follow', this.row.businessCode)
    }
  },
  filters: {
    // 状态转文字
    statusFilter (val) {
      if (val === 1) {
        return '已提醒'
      } else if (val === 2) {
        return '跟进中'
      } else {
        return '已完结'
      }
    },
    dateFilter (val) {
      return getDate(val, 'all')
    }
  }
}
</script>
<style lang="less" scoped>
  .my-btn {
    margin-right: 20px;
  }
  .evaluate-list {
    margin-top: 10px;
  }
  .grid-content {
    text-align: center;
  }
  .cover {
    height: 100px;
    overflow: hidden;
  }
  .img-class {
    width: 100%;
    min-height: 100px;
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
