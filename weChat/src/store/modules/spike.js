import { shareDate } from '@/api/index'
  
const state = {
  shareCont: []
}

const mutations = {
  shareText(state, payload) {
    state.shareCont = {...state.shareCont,...payload}
  }
}

const actions = {
  async shareList({
    commit,
    state
  }, payload) {
    return new Promise(async (resolve, reject) => {
      let result = await shareDate(payload)
      commit('shareText', result.data.result)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
