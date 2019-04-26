import {addAddress} from '@/api/index'

const state ={

}
const actions = {
    submit({commit},payload){
      return new Promise(async (resolve,reject)=>{
         let data =await addAddress(payload);
         resolve(data)
      })
    }
}

export default{
   namespaced: true,
   state,
   actions
}