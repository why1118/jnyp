import {getAddressListData, changeUserAddress, addNewAddress} from '@/api/index'

// 异步改变
const actions = {
    addressList({state}, payload){
      return new Promise(async (resolve, reject)=>{
        let listData = await getAddressListData(payload);
        resolve(listData);
      })
    },
    changeUserAddress({state}, payload){
      return new Promise(async (resolve, reject)=>{
        let getCode = await changeUserAddress(payload);
        resolve(getCode);
      })
    },
    addNewAddress({state}, payload) {
      return new Promise(async (resolve, reject)=>{
        let addAddress = await addNewAddress(payload);
        resolve(addAddress);
      })
    }
};

export default {
    // 命名空间
    namespaced: true,
    actions
}
  