<template>
  <div class="wrap">
    <div class="top">
      <image class="img" src='/static/images/ding.svg' />
      <div class="top_djs">
        <p>请在</p>
        <p class="heicolor">
          <span id="minute">{{minute}}</span>:<span id="second">{{second}}</span>
        </p>
        <p>内付款，时间结束后订单将会被取消</p>
      </div>
    </div>
    <div class="money">
      <div class="paymoney">订单应付金额<span>（含邮）</span></div>
      <div class="payprice">78.30</div>
      <div class="paydescribe">订单总计:<span>￥83.30</span></div>
      <div class="paydescribe">满减活动:<span>-￥5</span></div>
    </div>
    <!-- <div class="payway">
      <radio-group @change="radioChange">
        <div class="zfb" v-for="(item,index) in items" :key="index">
          <image class="payimg" :src="item.img"/>
          <p>{{item.name}}</p>
            <radio class="chooseimg" color="#3DD9E1" :value="item.name" :checked="item.checked"></radio>
        </div>
      </radio-group>
    </div> -->
    <button class="gopay" @click="gopay">去付款</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
        minute:29,
        second:59,
    }
  },
  computed: {
    ...mapState({
      items:state => state.settlement.items,
      payway:state => state.settlement.payway
    })
  },
  methods: {
    ...mapMutations({
      updateState: 'settlement/updateState'
    }),
    radioChange(e){
      this.updateState({val:e.target.value})
    },
    gopay(){
      wx.navigateTo({
        url:'/pages/myorder/cashDetails/main'
      })
    }
  },
  onLoad(){
    let that = this
    let timer = null;
    timer = setInterval(function(){
      that.second--;
      if(that.second == 0 && that.minute == 0){
        that.minute="结"
        that.second="束"
        clearInterval(timer);
      }
      if(that.second == 0){
        that.second = 59;
        that.minute--
      }
      if(that.second < 10) that.second = "0" + that.second;
      that.minute = that.minute;
      that.second = that.second;
    },1000)
  }
};
</script>
<style scoped>
.wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background:#f3f7f7;
}
.top{
  width: 100%;
  height: 72rpx;
  display: flex;
  font-size: 24rpx;
  background: #FFF6F6;
  color: #484848;
}
.top_djs{
  display: flex;
}
.top_djs p:first-child{
  width: 10%;
}
.top_djs p:nth-child(2){
  width: 13%;
}
.top_djs p:nth-child(3){
  width: 77%;
}
.top .img{
  width: 10%;
  width: 28rpx;
  height: 30rpx;
  margin-top: 20rpx;
  margin-left: 34rpx;
  margin-right: 6rpx;
}
.top .heicolor{
  color: #FC5D7B;
}
.top p{
  width: 90%;
  line-height: 72rpx;
}
.money{
  width: 94%;
  height: 320rpx;
  background: #fff;
  border-radius: 12rpx;
  margin: 0 auto;
  text-align: center;
  margin-top: 22rpx;
}
.money .paymoney{
  width:420rpx;
  height:44rpx;
  font-size: 32rpx;
  color: #323A45;
  line-height:44rpx;
  margin: 0 auto;
  margin-top: 38rpx;
}
.money .payprice{
  width:122rpx;
  height:64rpx;
  font-size: 56rpx;
  color: #FC5D7B;
  font-weight: bold;
  line-height:64rpx;
  margin: 0 auto;
  margin-top: 26rpx;
  margin-bottom: 34rpx;
}
.money .paydescribe{
  width:208rpx;
  height:34rpx;
  font-size: 24rpx;
  margin: 0 auto;
  color: #484848;
  margin-top: 10rpx;
}
.payway{
  width: 94%;
  height: 203rpx;
  background: #fff;
  margin: 0 auto;
  margin-top: 20rpx;
}
.payway div{
  width: 100%;
  height: 100rpx;
  box-shadow:0px 1px 0px 0px rgba(246,246,246,1);
}
.zfb{
  width: 100%;
  height: 100rpx;
  display: flex
}
.zfb image{
  width: 10%;
  height: 100%;
}
.zfb .payimg{
  width: 44rpx;
  height: 44rpx;
  display: flex;
  margin-top: 28rpx;
  margin-left: 8rpx;
}
.zfb .chooseimg{
  width: 40rpx;
  height: 40rpx;
  margin-top: 20rpx;
  margin-right: 48rpx;
}
.zfb p{
  width: 80%;
  height: 100%;
  font-size: 28rpx;
  line-height: 40rpx;
  margin-top: 30rpx;
  margin-left: 10rpx;
}
.gopay{
  position: fixed;
  left: 0;
  bottom: 0;
  width:100%;
  height:110rpx;
  color: #fff;
  border-radius: 0;
  line-height: 110rpx;
  background:linear-gradient(217deg,rgba(248,99,103,1) 0%,rgba(251,37,121,1) 100%);
}
</style>