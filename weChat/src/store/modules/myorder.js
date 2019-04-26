import {FindOrder} from '@/api/index'
const state = {
    active:0,
    list:[]
}

const mutations = {
    changeMyOrderList(state,payload){
        state.active=payload.active
        state.list = payload.list;
    }
}

const actions = {
    getFindOrderData({commit},payload){
        return new Promise(async(resolve,reject)=>{
            let data = await FindOrder(payload)
            commit('changeMyOrderList',{active:payload.orderStatus,list:data})
            resolve(data);
        })
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}