export const state = () => ({
  list: []
})

export const getters = {
  get: state => state.list
}

export const mutations = {
  new(state, obj) {
    state.list.push(obj)
  },
  removeByIndex(state, p) {
    state.list.splice(p.index, 1)
  }
}
