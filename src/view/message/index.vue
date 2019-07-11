<template>
  <Card shadow>
    <div>
      <div class="message-page-con message-category-con">
        <Menu width="auto" active-name="birth" @on-select="handleSelect">
          <MenuItem name="birth">
            <span class="category-title">生日提醒</span>
            <Badge style="margin-left: 10px" :count="$store.state.user.unreadCount"></Badge>
          </MenuItem>
        </Menu>
      </div>
      <div class="message-page-con message-list-con">
        <Menu
          width="auto"
          :active-name="0"
          @on-select="handleView"
        >
          <MenuItem v-for="item in messageType" :name="item.value" :key="`msg_${item.value}`">
            <div>
              <p class="msg-title">{{ item.label }}</p>
            </div>
          </MenuItem>
        </Menu>
      </div>
      <div class="message-page-con message-view-con">
        <Spin fix v-if="contentLoading" size="large"></Spin>
        <vue-scroll>
          <div v-if="birthList.length" style="margin-right: 15px">
            <birth-card v-for="(item, index) in birthList" :key="index" :birth="item" class="my-card"
                        @refresh="getRemindList"></birth-card>
            <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageIndex"
                  :page-size="paramDto.pageSize" @on-change="getRemindList"/>
          </div>
          <div v-else class="no-data">暂无数据</div>
        </vue-scroll>
      </div>
    </div>
  </Card>
</template>

<script>
import { getRemindList } from '@/api/remind'
import birthCard from './birthCard'

export default {
  name: 'message_page',
  components: {
    birthCard
  },
  data () {
    return {
      contentLoading: false,
      currentMessageType: 'birth',
      paramDto: {
        isConfirm: 0,
        taskType: 1,
        pageIndex: 1,
        pageSize: 6
      },
      messageType: [
        {
          label: '未处理',
          value: 0
        },
        {
          label: '已处理',
          value: 1
        },
        {
          label: '已过期',
          value: 2
        }
      ],
      birthList: [],
      total: 0
    }
  },
  methods: {
    handleSelect (name) {
      this.currentMessageType = name
    },
    handleView (type) {
      this.paramDto.isConfirm = type
      this.paramDto.pageIndex = 1
      this.getRemindList()
    },
    getRemindList () {
      this.contentLoading = true
      getRemindList(this.paramDto).then(res => {
        this.birthList = res.body.rows
        this.total = res.body.total
        this.contentLoading = false
      }).catch(() => {
        this.contentLoading = false
      })
    }
  },
  created () {
    this.getRemindList()
  }
}
</script>

<style lang="less">
  .message-page {
    &-con {
      height: ~"calc(100vh - 210px)";
      display: inline-block;
      vertical-align: top;
      position: relative;

      &.message-category-con {
        border-right: 1px solid #e6e6e6;
        width: 200px;
      }

      &.message-list-con {
        border-right: 1px solid #e6e6e6;
        width: 230px;
      }

      &.message-view-con {
        position: absolute;
        left: 446px;
        top: 16px;
        right: 16px;
        bottom: 16px;
        overflow: hidden;
        padding: 12px 20px 0;

        .message-view-header {
          margin-bottom: 20px;

          .message-view-title {
            display: inline-block;
          }

          .message-view-time {
            margin-left: 20px;
          }
        }
      }

      .category-title {
        display: inline-block;
        width: 65px;
      }

      .gray-dadge {
        background: gainsboro;
      }

      .not-unread-list {
        .msg-title {
          color: rgb(170, 169, 169);
        }

        .ivu-menu-item {
          .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only {
            display: none;
          }

          &:hover {
            .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only {
              display: inline-block;
            }
          }
        }
      }
    }
  }

  .no-data {
    height: 40px;
    text-align: center;
    padding-top: 10px;
    color: #909399;
  }

  .my-card {
    margin-bottom: 20px;
    -webkit-box-shadow: #dcdee2 0 1px 6px;
    -moz-box-shadow: #dcdee2 0 1px 6px;
    box-shadow: #dcdee2 0 1px 6px;
  }

  .my-page {
    text-align: right;
  }
</style>
