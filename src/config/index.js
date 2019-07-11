export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '自如驿',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description 本地开发api请求基础路径
   */
  // devUrl: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
  devUrl: 'http://127.0.0.1:8081',
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'workbench',
  /**
   * 密码重置跳转链接
   */
  resetPassword: 'http://cas.ziroom.com/CAS/api/password/forgetPwd/one',
  /**
   * @description 需要加载的插件
   */
  plugin: {}
}
