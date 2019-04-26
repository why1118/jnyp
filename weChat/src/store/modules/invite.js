import {groupName, Invitelist, bindInvite} from "@/api/index"

const state={
    visitor:{
        imgSrc:"",
        name:""
    }
}

const actions={
    async InviteCode(state, payload){
        console.log("payload.......",payload)
        let data = await groupName(payload);
        return data
    },
    async InviteList(){
        let list = await Invitelist();
        return list
    },
    async InviteBind(state,payload){
        console.log("payload.....3333",payload)
        let list = await bindInvite(payload)
        return list
    }
}

export default {
    namespaced:true,
    state,
    actions
}
