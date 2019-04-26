<template>
   <div class="container">
     <div class="remind">
       <img src="/static/images/remindIcon.png" alt="" />
       <!-- <p>请在<span>29:21</span>内付款，时间结束后订单将会被取消。</p> -->
       <p>提交订单后<span>30:00</span>内未付款，订单已取消</p>
       
     </div>
     <div class="state">
       <p class="stateText">待付款</p>
       <div  class="orderNumber_Box">
         <p class="orderNumber">订单编号 : <span>1111111111</span></p>
         <p class="copy" @click="copyOrderNumber">复制</p>
      </div>
      <p class="orderNumber">付款时间 : <span>1111111111</span></p>
      <p class="orderNumber">收货时间 : <span>1111111111</span></p>
     </div>
     <div class="message" @click="goShopping">
       <p class="NamePhone"><span>李倩倩</span><span>15278383560</span></p>
       <p class="site">
         <img class="locationIcon" src="/static/images/locationIcon.png" alt="" />
         <span>北京市朝阳区焦奥中心A座902室</span>
       </p>
       <div class="messageBottom">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
       </div>
     </div>
     <div class="merchandiseNews">
       <p class="OrderTime"><span>2019-01-10</span><span>16:07:51</span></p>
       <div class="shop">
          <dl>
            <dt>
              <img src="/static/images/commodity.png" alt="" />
            </dt>
            <dd>
              <p class="txt">帮宝适绿帮纸尿裤大号L164片超薄透气男女通用婴儿尿片尿不湿</p>
              <p class="size">规格:<span>XL</span></p>
              <p class="price">￥<span>52.50</span><span>x1</span></p>
            </dd>
          </dl>
          <div class="refundBtnBox">
            <p>申请退款</p>
          </div>
       </div>
       <div class="shop">
          <dl>
            <dt>
              <img src="/static/images/commodity.png" alt="" />
            </dt>
            <dd>
              <p class="txt">帮宝适绿帮纸尿裤大号L164片超薄透气男女通用婴儿尿片尿不湿</p>
              <p class="size">规格:<span>XL</span></p>
              <p class="price">￥<span>52.50</span><span>x1</span></p>
            </dd>
          </dl>
          <div class="refundBtnBox">
            <p>申请退款</p>
          </div>
       </div>
       <ul>
         <li><p>运费</p><p>￥<span>0</span></p></li>
         <li><p>税</p><p>￥<span>0</span></p></li>
         <li><p>支付方式</p><p><span>支付宝</span>支付</p></li>
         <li><p>优惠金额</p><p>￥<span>0</span></p></li>
         <li><p>订单总计</p><p>￥<span>39</span></p></li>
         <li><p>实付金额</p><p>￥<span>39</span></p></li>
       </ul>
        <div class="service">
            <p class="customer_service">联系客服</p>
            <p class="confirm_receipt">确认收货</p>
            <p class="payment">去付款</p>
        </div>
     </div>
   </div>
</template>
<script>
import {mapState,mapActions} from "vuex"
   export default {
     data() {
       return {
         count:1
       }
     },
     methods:{
      ...mapActions({
          getDatail:"shopDetail/getDatail"
       }),
       //前往地址页面
      goShopping(){
        wx.navigateTo({
          url:'../shoppingadress/main'
        })
      },
      //复制订单编号
      copyOrderNumber(){
      }
     },
     onLoad: function (options) {
      this.getDatail({orderType:0,orderId:20190218143440524194})
      wx.setNavigationBarTitle({
        title: '订单详情'
      })
    },
     computed:{  
      ...mapState({
        detailData:state=>state.shopDetail.detailData
      })
    }
   }
</script>
<style scoped>
    .container{
      width: 100%;
      background: #F3F7F7;
    }
    .refundBtnBox,.service{
      width: 100%;
      padding-bottom: 22rpx;
      display: flex;
      justify-content: flex-end;
    }
    .refundBtnBox p{
      margin-right: 24rpx;
      width: 160rpx;
      height: 60rpx;
      font-size:28rpx;
      text-align: center;
      color:rgba(50,58,69,1);
      line-height:60rpx;
      background:rgba(255,255,255,1);
      border-radius:8rpx;
      border:1px solid rgba(187,187,187,1);
    }
    .customer_service{
      margin-right: 24rpx;
      width: 160rpx;
      height: 60rpx;
      font-size:28rpx;
      text-align: center;
      color:rgba(50,58,69,1);
      line-height:60rpx;
      background:rgba(255,255,255,1);
      border-radius:8rpx;
      border:1px solid rgba(187,187,187,1);
    }
    .confirm_receipt{
      margin-right: 24rpx;
      width: 160rpx;
      height: 60rpx;
      font-size:28rpx;
      text-align: center;
      line-height:60rpx;
      border-radius:8rpx;
      border: 1px solid #FC5D7B;
      color: #FC5D7B;
    }
    .payment{
      margin-right: 24rpx;
      width: 160rpx;
      height: 60rpx;
      font-size:28rpx;
      text-align: center;
      line-height:60rpx;
      border-radius:8rpx;
      border: 1px solid #FC5D7B;
      color: #FC5D7B;
    }
    .remind{
      width: 100%;
      height: 74rpx;
      background: #FFF6F6;
      display: flex;
    }
    .remind img{
      width: 28rpx;
      height: 30rpx;
      padding: 22rpx 0 0 34rpx;
    }
    .remind p{
      font-size:24rpx;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(72,72,72,1);
      line-height:74rpx;
      margin-left: 10rpx;
    }
    .remind p span{
      color: #FC5D7B;
    }
    .state{
      width:719rpx;
      margin-left: 18rpx;
      margin-top: 20rpx;
      background:rgba(255,255,255,1);
      border-radius:6px;
      padding-bottom: 26rpx;
    }
    .stateText{
      width:108px;
      height:50rpx;
      font-size:36rpx;
      font-family:PingFangSC-Medium;
      font-weight:bolder;
      color:rgba(50,58,69,1);
      line-height:50rpx;
      padding: 22rpx 0 0 30rpx;
    }
    .orderNumber_Box{
      width: 100%;
      display: flex;
    }
    .orderNumber{
      height:34rpx;
      font-size:24rpx;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(50,58,69,1);
      line-height:34rpx;
      padding: 18rpx 0 0 30rpx;
    }
    .copy{
      width:74rpx;
      height:34rpx;
      background:rgba(255,255,255,1);
      border-radius:6rpx;
      border:1px solid rgba(252,93,123,1);
      font-size:22rpx;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(252,93,123,1);
      line-height:34rpx;
      text-align: center;
      margin: 18rpx 0 0 30rpx;
    }
    .message{
      width:719rpx;
      height: 168rpx;
      margin-left: 18rpx;
      margin-top: 20rpx;
      background:rgba(255,255,255,1);
      border-radius:6px;
      position: relative;
    }
    .messageBottom{
      position: absolute;
      overflow: hidden;
      left:-21rpx;
      bottom: 2rpx;
      width:719rpx;
      margin-left: 18rpx;
    }
    .messageBottom ul{
      display: flex;
    }
    .messageBottom ul li{
      margin-left: 15rpx;
    }
    .messageBottom ul li:nth-child(odd){
      display: inline-block;
      padding: 0 10rpx;
      background: #FC5D7B;
      border: 4rpx solid #FC5D7B;
      color: #333;
      transform: skew(-50deg);
    }
    .messageBottom ul li:nth-child(even){
      display: inline-block;
      padding: 0 10rpx;
      background: #5D9AFC;
      border: 4rpx solid #5D9AFC;
      color: #333;
      transform: skew(-50deg);
    }
    .NamePhone span:nth-child(1){
      display: inline-block;
      width:96rpx;
      height:44rpx;
      font-size:32rpx;
      font-family:PingFangSC-Medium;
      font-weight:bolder;
      color:rgba(50,58,69,1);
      line-height:44rpx;
      padding: 22rpx 0 0 30rpx;
    }
    .NamePhone span:nth-child(2){
      display: inline-block;
      width:102px;
      height:22px;
      font-size:16px;
      font-family:PingFangSC-Medium;
      font-weight:bolder;
      color:rgba(50,58,69,1);
      line-height:22px;
      padding: 22rpx 0 0 22rpx;
    }
    .site{
      height:20px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(50,58,69,1);
      line-height:20px;
      padding: 22rpx 0 0 30rpx;
    }
    .locationIcon{
      width: 28rpx;
      height: 28rpx;
      padding-right: 8rpx;
      margin-top: 5rpx;
    }

    .merchandiseNews{
      width:719rpx;
      margin-left: 18rpx;
      margin-top: 20rpx;
      border-radius:6px;
      padding-bottom: 34rpx;
      background:#fff;
    }
    .OrderTime{
      width:300px;
      font-size:30rpx;
      font-family:PingFangSC-Medium;
      font-weight:bolder;
      color:rgba(50,58,69,1);
      line-height:42rpx;
      padding: 38rpx 0 38rpx 30rpx;
    }
    .OrderTime span{
      display: inline-block;
      padding-right: 10rpx;
      font-size:30rpx;
      font-family:PingFangSC-Medium;
      font-weight:bolder;
      color:rgba(50,58,69,1);
      line-height:42rpx;
    }
    .shop dl{
      display: flex;
    }
    .shop dl dt{
      width: 220rpx;
      height: 100%;
    }
    .shop dl dd{
      flex: 1;
    }
    .shop dl dt img{
      width: 180rpx;
      height: 180rpx;
      padding: 16rpx 20rpx;
    }
    .txt{
      height:68rpx;
      font-size:28rpx;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(72,72,72,1);
      line-height:34rpx;
      padding: 12rpx 24rpx 0 0;
    }
    .size{
      width:110rpx;
      height:28rpx;
      font-size:24rpx;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(153,157,162,1);
      line-height:28rpx;
      padding: 25rpx 0 0 0;
    }
    .price{
      height:34rpx;
      font-size:24rpx;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(50,58,69,1);
      line-height:34rpx;
      padding: 25rpx 9rpx 0 0;
    }
    .price span:nth-child(2){
      float: right;
      padding-right: 18rpx;
    }
    .merchandiseNews ul{
      width: 100%;
    }
    .merchandiseNews ul li{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 76rpx;
      font-size:28rpx;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(50,58,69,1);
      line-height:76rpx;

    }
    .merchandiseNews ul li p:nth-child(1){
      padding: 0 24rpx;
    }

    .merchandiseNews ul li p:nth-child(2){
      padding-right: 24rpx;
    }
</style>
