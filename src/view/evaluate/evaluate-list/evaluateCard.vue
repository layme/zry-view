<template>
  <Card>
    <div v-if="row.evaluateStatus === 0" class="discard">
      <div class="discard-logo">已屏蔽</div>
    </div>
    <Row>
      <Col :span="10">
        <a @click="link">{{ row.businessCode }}</a>
        <Tag v-if="row.lowEvaluateManagerFeedbackStatus" style="margin-left: 30px" color="volcano">已回复</Tag>
        <Tag v-else style="margin-left: 30px" color="volcano">未回复</Tag>
      </Col>
      <Col :span="14" :style="{ textAlign: 'right' }">
        <a class="my-btn" @click="reply">回复</a>
        <a @click="shield">{{ row.evaluateStatus === 1 ? '屏蔽' : '展示' }}</a>
      </Col>
    </Row>
    <Row class="evaluate-list">
      <Col :span="3">
        <span>总体评星</span>
        <span class="my-score">{{ row.customerAvgStarLevel }}</span>
      </Col>
      <Col :span="3" v-for="(item, i) in row.starList" :key="i">
        <span>{{ item.questionContent }}</span>
        <span class="my-score">{{ item.answerContent }}</span>
      </Col>
    </Row>
    <Row class="evaluate-list my-content">
      {{ row.customerSuggestion ? row.customerSuggestion : '用户没有给出评价文字' }}
    </Row>
    <Row class="evaluate-list">
      <Tag style="margin-right: 10px" v-for="(item,i) in row.labelList" :key="i" color="blue">
        {{ item.answerContent }}
      </Tag>
    </Row>
    <Row class="evaluate-list" :gutter="20">
      <Col :span="3" v-for="(item, i) in row.urlList" :key="i">
        <Tooltip effect="dark" content="点击查看大图" placement="bottom">
          <div class="grid-content cover">
            <img :src="item.answerContent" class="img-class" :preview="index" alt="评价附图">
          </div>
        </Tooltip>
      </Col>
    </Row>
    <Row class="evaluate-list">
      <span style="color: #909399">发表于&nbsp;&nbsp;{{ row.evaluateTime | dateTimeFilter }}</span>
    </Row>
  </Card>
</template>
<script>
export default {
  name: 'evaluateCard',
  props: {
    row: Object,
    index: Number
  },
  methods: {
    link () {
      this.$emit('link', this.row.businessCode)
    },
    reply () {
      this.$emit('reply', this.row)
    },
    shield () {
      this.$emit('shield', this.row)
    }
  },
  filters: {
    // 状态转文字
    statusFilter (val) {
      if (val === 1) {
        return '已回复'
      } else {
        return '未回复'
      }
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
    border: 1px solid #dcdee2;

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
  .discard {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #e8eaec;
    border-radius: 4px;
    opacity: 0.7;
  }

  .discard-logo {
    opacity: 1;
    border: 3px solid #ed4014;
    border-radius: 6px;
    width: 150px;
    line-height: 50px;
    text-align: center;
    font-size: 32px;
    color: #ed4014;
    top: 30%;
    right: 20%;
    position: absolute;
    -moz-transform: rotate(25deg);
    -webkit-transform: rotate(25deg);
    -o-transform: rotate(25deg);
    -ms-transform: rotate(25deg);
    transform: rotate(25deg);
  }
</style>
