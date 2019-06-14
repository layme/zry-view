import store from '@/store'

export const isHave = (actionName) => {
  let actionList = store.state.user.access
  let have = false
  if (actionList.indexOf(actionName) !== -1) {
    have = true
  }
  return have
}

export const cacheUrl = (url) => {
  store.commit('setBaseUrl', url)
}
