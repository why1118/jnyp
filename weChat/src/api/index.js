import request from '@/utils/request';

// 登陆接口
export let login = params => {
    return request.post('api/open/user/info/oauth', {
        ...params,
        platform: 4,
    })
}

//匹配邀请码正确的群信息
export let groupName = params => {
    return request.post('/api/open/user/info/getbycode', params);
}
//获取验证码
export let identify = phoneNumber => {
    return request.post('/api/open/user/info/send/code', {
        phoneNumber
    })
}

// 绑定手机号
export let bindPhone = params => {
    return request.post('/api/open/user/info/bind/phone', {
        platform: 4,
        ...params
    })
}
//分类接口
export let fenlei = params => {
    return request.post('/api/open/product/category/query', params)
}
//获取用户收货地址列表
export let getAddressListData = code => {
    return request.post('/api/open/user/address/list', {
        code
    })
}

// 获取用户
export let addAddress = code => {
    return request.post('/api/open/user/address/list', {
        code
    })
}

// 搜索数据
export let getPecommend = params => {
    return request.post('/api/open/search/query/recommend', params) //{title:'kh'}
}
// 修改用户收货地址
export let changeUserAddress = userData => {
  return request.post('/api/open/user/address/editAddress', userData)
}

//添加用户收货地址
export let addNewAddress = params => {
  return request.post('/api/open/user/address/addAddress', params)
}
// 订单查询
export let FindOrder = (params) => {
  return request.post('/api/open/order/query', params)
}

//订单详情
export let getDatail = params => {
    return request.post('/api/open/order/query/detail', params)
}

// 用户身份认证
export let identif = params => {
        return request.post('/api/open/user/auth/identify', params);
    }
    //分享页数据
export let shareDate = params => {
    return request.post('api/open/product/seckill/query', params)
}

export let special = params => {
    return request.post('api/open/sepcial/query', { siid: params })
}

export let Invitelist = ()=>{
  return request.post('/api/open/user/recommender/list')
}

// 获取分类tab数据
export let getSignList = params=>{
  return request.post('/api/open/product/category/query',params);
}
//获取分类下拉列表
export let listings = params => {
  return request.post('/api/open/product/category/productList', params)
}
// 用户身份认证
export let identifyBase = params => {
    return request.post('/api/open/user/auth/identityBase64', {...params });
}

//更新用户实名认证
export let edit = params=>{
  return request.post('/api/open/user/auth/editBase64', params);
}

//优惠券接口
export let getConponList = params => {
  return request.post('/api/open/user/coupon/userCouponInfoList', params);
}

//绑定联系人
export let bindInvite = params =>{
  return request.post('/api/open/user/recommender/bind', params)
}

// 搜索数据排序
export let searchSort = params => {
    return request.post('/api/open/search/query', params)
}
