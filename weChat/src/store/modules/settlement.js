const state ={
    items: [
        {name: '支付宝支付', img:'/static/images/zfb.svg',checked:true},
        {name: '微信支付', img:'/static/images/wx.svg',checked:false}
    ],
    payway:'支付宝支付'
}

const mutations = {
    updateState(state,payload){
        state.items.forEach((item,index)=>{
            item.checked=false
            if(item.name === payload.val){
                item.checked=true
                state.payway=payload.val
            }
        })
    }
}

const actions = {

}

export default{
   namespaced: true,
   state,
   mutations,
   actions
}