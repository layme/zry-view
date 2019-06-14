export default {
  state: {
    step: 1,
    activeName: '1'
  },
  mutations: {
    upStep (state, step) {
      if (state.step < step) {
        state.step = step
      }
    },
    upActiveName (state, activeName) {
      state.activeName = activeName
    }
  }
}
