// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import vuescroll from 'vuescroll'
// import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import BaiduMap from 'vue-baidu-map'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import '@/libs/filters.js'
// 动画效果
import animated from 'animate.css'

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

/**
 * 百度地图
 */
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'ukBW7hhft7HzjgTRaoGyMHmzIKTi3bx3'
})

/**
 * 图片预览
 */
Vue.use(preview)

/**
 * 动画
 */
Vue.use(animated)

/**
 * @description 注册admin内置插件
 */
// installPlugin(Vue)

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/**
 * 全局自定义滚动条
 */
Vue.use(vuescroll, {
  ops: {
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: '#c1c1c1',
      opacity: 0.5,
      hoverStyle: false,
      specifyBorderRadius: false,
      minSize: false,
      size: '6px',
      disable: false
    },
    scrollPanel: {
      initialScrollY: false,
      initialScrollX: false,
      scrollingX: false,
      scrollingY: true,
      speed: 300,
      verticalNativeBarPos: 'right'
    }
  }, // 在这里设置全局默认配置
  name: 'vueScroll' // 在这里自定义组件名字，默认是vueScroll
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
