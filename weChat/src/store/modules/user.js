import {
  login,
  identifyBase,
  edit
} from '@/api/index'

const state = {
  code: '',
  userInfo: {},
  wxOauthJson: {},
  trackId: ''
}

const mutations = {
  updateState(state, payload) {
    for (let key in payload) {
      state[key] = payload[key];
    }
  }
}

const actions = {
  async identify({commit}, payload) {
    console.log('payload...', payload);
    let result = await identifyBase(payload);
    return result;
  },
  async edit({commit,state}, payload) {
    console.log('payload...', payload);
    let result = await edit(payload);
    return result;
  },
  async login({commit,state}, payload) {
    console.log('payload...', payload);
    payload = {
      ...payload,
      code: state.code
    }
    let result = await login(payload);
    commit('updateState', {
      trackId: result.data.result.trackId,
      userInfo: result.data.result.userInfo,
      wxOauthJson: result.data.result.wxOauthJson
    })
    return result.data;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
