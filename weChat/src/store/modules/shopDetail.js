import {getDatail} from "@/api/index"
const state={
    detailData:[]
}
const mutations={
    updata(state,payload){
        state.detailData=payload.data
    }
}
const actions={
    async getDatail({commit},payload){
        let result=await getDatail(payload);
        commit(updata,{data:result})
        return result
    }
}
const getters={
}
export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations

}
