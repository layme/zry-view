<template>
  <div>
    <Form :model="paramDto" :label-width="70">
      <Row :gutter="20">
        <Col span="8">
          <FormItem label="活动项目">
            <Select v-model="paramDto.projectBid" placeholder="">
              <Option
                v-for="item in $store.state.user.projectList"
                :key="item.bid"
                :label="item.projectName"
                :value="item.bid">
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="活动标题">
            <Input v-model.trim="paramDto.title" placeholder="" clearable></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="活动状态">
            <Select v-model="paramDto.isOnline" placeholder="">
              <Option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col span="12">
          <Button type="primary" icon="ios-search" @click="listActivity"> 查 询</Button>
        </Col>
        <Col span="12" style="text-align: right">
          <Button type="primary" icon=""> 新 增</Button>
        </Col>
      </Row>
    </Form>
    <Table stripe :columns="columns" :data="activityList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="isOnline">
        <Tag v-if="row.isOnline === 1" color="success">已上线</Tag>
        <Tag v-else color="default">已下线</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <a v-if="row.isOnline === 1" class="my-btn">下线</a>
        <a v-else class="my-btn">上线</a>
        <a class="my-btn">修改</a>
        <a>删除</a>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import marketingActivityForm from './marketingActivityForm'

export default {
  name: 'marketingActivityList',
  components: {
    marketingActivityForm
  },
  data () {
    return {
      paramDto: {
        projectBid: '',
        title: '',
        isOnline: '',
        page: 1,
        limit: 10
      },
      statusOptions: [
        {
          label: '已上线',
          value: 1
        },
        {
          label: '已下线',
          value: 0
        }
      ],
      loading: false,
      activityList: [
        {
          'id': null,
          'bid': '073c33e4a6434d2fa277b2d0ad036a49',
          'projectBid': '63615afa5a344153a047aca1ea32cc51',
          'projectName': '北京CBD自如驿',
          'title': '自如驿的周年庆，这次我们玩了点不一样的（内有彩蛋）',
          'subTitle': '海洋球大作战',
          'jumpLink': 'http://mp.weixin.qq.com/s/g8hxAqbVOX_6AYTvk6dwNA',
          'imgIndex': 0,
          'imgUrl': 'http://image.ziroom.com/g2/M00/35/5D/ChAFfVlfYOCAOG9iAAHtNkwmxew028.jpg',
          'createId': null,
          'createDate': null,
          'lastModifyDate': null,
          'isDel': 0,
          'isValid': 1,
          'isJump': 1,
          'isOnline': 1,
          'startDate': '2017-07-07',
          'endDate': '2017-07-07'
        },
        {
          'id': null,
          'bid': '49a532c154284722ad2d93fa85e88e9c',
          'projectBid': '63615afa5a344153a047aca1ea32cc51',
          'projectName': '北京CBD自如驿',
          'title': '驿起嗨 | 看！自如驿里有一大波巨婴出没！',
          'subTitle': '0',
          'jumpLink': 'http://mp.weixin.qq.com/s/4c7dOoXcQGmXay64heGWuQ',
          'imgIndex': 1,
          'imgUrl': 'http://image.ziroom.com/g2/M00/1F/20/ChAFD1k6XJeAO1LtAAJfV0qjq3Y398.jpg',
          'createId': null,
          'createDate': null,
          'lastModifyDate': null,
          'isDel': 0,
          'isValid': 1,
          'isJump': 1,
          'isOnline': 0,
          'startDate': '2017-06-27',
          'endDate': '2017-06-28'
        }
      ],
      total: 0,
      columns: [
        {
          title: '项目名称',
          key: 'projectName'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '副标题',
          key: 'subTitle'
        },
        {
          title: '开始日期',
          key: 'startDate'
        },
        {
          title: '结束日期',
          key: 'endDate'
        },
        {
          title: '活动链接',
          key: 'jumpLink'
        },
        {
          title: '状态',
          slot: 'isOnline'
        },
        {
          title: '操作',
          slot: 'action',
          width: 130
        }
      ]
    }
  },
  methods: {
    listActivity (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      console.info('paramDto', this.paramDto)
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
  .my-table {
    margin-top: 20px;
  }

  .my-btn {
    margin-right: 10px;
  }

  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
