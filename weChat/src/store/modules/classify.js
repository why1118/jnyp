import {getSignList,listings} from '@/api/index';
const state={
    list:[],
    props:[],
    page:1,
    pageSize:8
}
const mutations={
    updateState(state, payload){
        state.list=payload
    },
    appuserState(state,payload){
        state.props=payload
    }
}
const actions={
    async getList({commit},payload){
      let result=await getSignList(payload);
      commit('updateState',result.data.result)
    },
   async getProps({commit, state},payload){
    let result=await listings(payload);
    if (result.data.result && result.data.result.length){
      if (payload.pageIndex === 1){
        commit('appuserState', result.data.result)
      }else{
        commit('appuserState', [...state.props, ...result.data.result])
      }
    }
  }
}
export default {
    namespaced:true,
    state,
    actions,
    mutations
}
