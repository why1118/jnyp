import { identify, bindPhone } from '@/api'
const state = {
    phoneData: {
        userphone: '',
        phoneCode: ''
    }
}
const mutations = {
    updateState(state, payload) {
        for (let key in payload) {
            state.phoneData[key] = payload[key]
        }
    }
}

const actions = {
    //获取验证码
    async etIdentify({ commit }, payload) {
        return new Promise(async(resolve, reject) => {

            //version,phoneNumber
            let data = await identify(payload.userphone);
            commit('updateState', { userphone: data.phoneNumber });
            resolve(data);
        })
    },

    //绑定手机号
    async bindPhone({ commit }, payload) {
      let result = await bindPhone({
        phoneNumber: payload.userphone,
        verificationCode : payload.phoneCode,
        wxOauthJson: JSON.stringify(payload.wxOauthJson)
      });
      const trackId = 'F649B34989975F268D3E917EBD51B81C7D08F94FA6DDF11851787716A558794DC6291F956DE6188AC10DAC62D9392D3B3674D93872E445F199F0CD733106E3F6BDCEDB846A3B42A62830075BE7A4132959767C70BBCC4FD2504723625057EDC2925C8248A015E8F1';
      // commit('uaer/updateState', {tranckid: result.result.trackId})
      return result;
      commit('user/updateState', {tranckid: trackId})

    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
