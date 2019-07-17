<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="200" :collapsed-width="64" v-model="collapsed" class="left-sider">
      <vue-scroll>
        <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
          <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
          <div class="logo-con">
            <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
            <img v-show="collapsed" :src="minLogo" key="min-logo" />
          </div>
        </side-menu>
      </vue-scroll>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="unreadCount" :user-name="userName"/>
          <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
          <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
          <current-project :project-list="$store.state.user.projectList" style="margin-right: 10px;"></current-project>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <vue-scroll>
              <div style="margin-right: 15px;">
                <keep-alive :include="cacheList">
                  <router-view/>
                </keep-alive>
              </div>
            </vue-scroll>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import watermark from '@/libs/watermark'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
import CurrentProject from './components/current-project'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, routeEqual, getWebSocketUrl } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logoko-min.png'
import maxLogo from '@/assets/images/logoko-max.png'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    ErrorStore,
    CurrentProject,
    User,
    ABackTop
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false,
      projectBid: '',
      webSock: null,
      delay: 30000,
      interval: null,
      isTry: false
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userName () {
      return this.$store.state.user.name
    },
    cacheList () {
      return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    },
    unreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag',
      'setMessageCount'
    ]),
    ...mapActions([
      'getUserInfo',
      'getUnreadMessageCount'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    },

    // 初始化webSocket
    initWebSocket () {
      // ws地址
      const server_name = getWebSocketUrl()

      if ('WebSocket' in window) {
        this.webSock = new WebSocket(`ws://${server_name}/webSocket/remind.soc?Authorization=${this.$store.state.user.token}`)
      } else if ('MozWebSocket' in window) {
        this.webSock = new MozWebSocket(`ws://${server_name}/webSocket/remind.soc?Authorization=${this.$store.state.user.token}`)
      } else {
        this.webSock = new SockJS(`http://${server_name}/webSocket/sockJs/remind.soc?Authorization=${this.$store.state.user.token}`)
      }

      this.webSock.onopen = this.webSocketOnOpen

      this.webSock.onerror = this.webSocketOnError

      this.webSock.onmessage = this.webSocketOnMessage

      this.webSock.onclose = this.webSocketClose
    },

    // 连接已建立
    webSocketOnOpen (evt) {
      console.log('连接成功 => ', evt)
      this.heartLink()
    },

    // 错误
    webSocketOnError (e) {
      console.log('连接错误 => ', e)
    },

    // 数据接收
    webSocketOnMessage (evt) {
      console.log('收到消息 => ', evt)
      let json = JSON.parse(evt.data)
      if (json.key === '0x00') {
        this.setMessageCount(parseInt(json.value))
      } else if (json.key === '0x01') {
        this.setMessageCount(this.$store.state.user.unreadCount + 1)
        this.notify(json)
      }
    },

    notify (json) {
      let title = '提醒'
      if (json.type === '1') {
        title = '生日提醒'
      }
      this.$Notice.open({
        title: title,
        desc: `${json.msg} <a @click="toMessage">查看</a>`,
        duration: 0
      })
    },

    toMessage () {
      this.$router.push({
        name: 'messageList'
      })
    },

    // 数据发送
    webSocketSend (agentData) {
      this.webSock.send(agentData)
    },

    // 关闭
    webSocketClose (e) {
      console.log('断开连接 => 代码: ' + e.code + '， 原因: ' + e.reason + '， 正常关闭: ' + e.wasClean)
      clearInterval(this.interval)
      if (e.code !== 1000 && !this.isTry) {
        // 非正常关闭，重连
        this.reConnection()
        this.isTry = true
      }
    },

    // 重连，3次，间隔60s
    reConnection () {
      let timesRun = 0
      let interval = setInterval(() => {
        timesRun += 1
        if (timesRun === 3 || this.webSock.readyState === WebSocket.OPEN) {
          clearInterval(interval)
        }
        this.initWebSocket()
      }, 60000)
    },

    // 心跳检查
    heartLink () {
      this.interval = setInterval(() => {
        this.webSocketSend('HeartBeat')
      }, this.delay)
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    // 获取未读消息条数
    this.getUnreadMessageCount()
    // 设置水印
    watermark.set(this.$store.state.user.name + this.$store.state.user.username)

    // 关闭浏览器窗口的时候断开连接
    window.onbeforeunload = () => {
      this.webSock.close()
    }
  },
  created () {
    // 页面刚进入时开启长连接
    this.initWebSocket()
  },
  destroyed: function () {
    // 页面销毁时关闭长连接
    this.webSock.close()
  }
}
</script>
