import store from '@/store'

export default {
  inserted: function (el, binding) {
    let actionList = store.state.user.access
    if (actionList.indexOf(binding.value) === -1) {
      el.parentNode.removeChild(el)
    }
  }
}
