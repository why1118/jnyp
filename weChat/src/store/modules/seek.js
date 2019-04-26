import { getPecommend, searchSort } from '@/api/index.js'

const state = {
    productName: '',
    // detail的数据存放
    list: [],
    // 控制组件显示
    isShow: {
        isDetail: false,
        isWithout: false,
        isHistory: false
    },
    priceSort: ['价格从高到低', '价格从低到高']
}
const mutations = {
    updateState(state, payload) {
        for (let key in payload) { //list 
            state[key] = payload[key]
        }
    }
}
const actions = {
    // 获取搜索内容
    async getSeekList({ commit }, payload) {
        console.log(payload)
        return new Promise(async(resolve, reject) => {
            let result = await getPecommend({ title: payload });
            commit('updateState', { list: result.data.result })
            resolve(result.data)
        })
    },

    // 数据排序
    async getSeekSort({ commit, state }, payload) {
        console.log('payload....', payload)
        return new Promise(async(resolve, reject) => {
            let data = await searchSort(payload)
            commit('updateState', { list: data.data.result })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}