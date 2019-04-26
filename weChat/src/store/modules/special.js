import {special} from '../../api/index'
const state = {
    list:[],
    banner:null,
    title:null
}

const mutations = {
    upstate(state,payload){
        state.list = {...payload.list.data.result.anchors};
        state.banner = payload.list.data.result.specialImg;
        state.title = payload.list.data.result.specialName;
    }
}

const actions = {
    getList({commit},payload){
        return new Promise(async(resolve, reject)=>{
            let result = await special(payload.siid);
            console.log('result',result)
            commit('upstate',{list:result})
            resolve(result);
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
