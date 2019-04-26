## 宝贝多多

> A Mpvue project

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### 开发问题
- 没有邀请码可测试
- 没有立即加入点击之后的逻辑

- 分类页面逻辑混乱
- 专题页面传siid获取数据返回不对
- 分享页面逻辑，二维码生成接口

- 需要测试订单id
- 需要测试优惠券信息



- 需要商品详情页面


## 部分流程
- 登陆流程
注册的逻辑是 微信授权 - 没有绑定手机号 -绑定手机号 - 没有上级-到绑定邀请码-绑定邀请码-到首页


## 路由信息
- 邀请人页面 "pages/referrer/main",
- 绑定手机号 "pages/phone/main",
- 分类页面   "pages/classify/main",
- 身份认证   "pages/autonym/main",
- 分享页面   "pages/share/main",
- 首页       "pages/index/main",

    "pages/submission/main",
    "pages/go2detail/main",
    "pages/spike/main",
    "pages/spikeDetail/main",

- 专题页    "pages/special/main",
- 优惠券    "pages/conponlist/main",
- 物流信息  "pages/logistics/main",
- 购买成功  "pages/logistics/success/main",
- 我的订单  "pages/myorder/main",
- 交易成功  "pages/myorder/successfulTrade/main",
- 去付款    "pages/myorder/settlement/main",
- 订单详情  "pages/orderdetails/main",
- 搜索页面  "pages/seek/main",

- 分享详情  "pages/sharedetail/main",
- 收获地址  "pages/shoppingadress/main",
- 修改地址  "pages/shoppingadress/redactAddress/main"
