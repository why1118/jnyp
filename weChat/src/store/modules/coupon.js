//优惠券页面
import { getConponList } from '@/api/index';
const moment = require('moment');
const state = {
    active: 0,
    list: [], //优惠券列表
    isShow: {
        isConponList: false,
        isNull: false
    }
}

const mutations = {
    updateState(state, payload) {
        for (let key in payload) {
            state[key] = payload[key]
        }
    }
}

const actions = {
    //获取优惠券列表
    getList({ commit, state }, payload) {
        return new Promise(async(resolve, reject) => {
            let params = {};
            if (payload.active) {
                params.state = payload.active;
            }
            if (payload.active == 0) {
                params.state = 0;
            }
            let data = await getConponList(params);
            //console.log('data...', data.data);
            data.data.result.forEach(item => {
                item.startTime = formatTime(item.startTime);
                item.endTime = formatTime(item.endTime);
                item.updateTime = formatTime(item.updateTime);
            })
            commit('updateState', {
                list: data.data.result
            });
            // console.log('hfgdhsfgvdgvhgv', data.data)
            resolve(data.data)
        })
    }
}

function formatTime(start_time) {
    return moment(start_time).format('YYYY-MM-DD HH:mm');
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
