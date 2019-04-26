<template>
  <div class="wrap">
    <!-- 付款成功 -->
    <div class="cash_success" v-if='true'>
      <div class="top">
        <image src='/static/images/success.svg'/>
        <p class="ok">付款成功</p> 
        <p>努力配货中</p>
      </div>
      <ul class="bottom">
        <li>
          <p>订单编号:</p>
          <p>190110507509604</p>
        </li>
        <li>
          <p>交易时间:</p>
          <p>2019-01-05 09：41：20</p>
        </li>
        <li>
          <p>支付方式:</p>
          <p>微信支付</p>
        </li>
        <li>
          <p>支付金额:</p>
          <p>￥78.3</p>
        </li>
      </ul>
    </div>

    <!-- 付款失败 -->
    <div class="cash_fail" v-if='false'>
      <div class="top">
        <image src='/static/images/fail.png'/>
        <p class="ok">付款失败</p> 
        <p>请在<span class="time">29：23</span>内完成付款</p>
      </div>
      <ul class="bottom">
        <li>
          <p>订单总计:</p>
          <p>$83.30</p>
        </li>
        <li>
          <p>满减活动:</p>
          <p>-￥5</p>
        </li>
        <li>
          <p>应付金额（含邮费）:</p>
          <p class="money">￥78.3</p>
        </li>
      </ul>
      <div class="payway">
        <p class="payway_one">
          <image class="payimg" src="/static/images/wx.svg"/>
          <span>微信支付</span>
        </p>
        <radio class="chooseimg" color="#3DD9E1" :checked="true"></radio>
      </div>
      <button class="gopay">去付款</button>
    </div>
    
    <div class="backtostore">返回商城</div>
  </div>
</template>

<script>
export default {

};
</script>
<style scoped>
  .wrap{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background:#f3f7f7;
    font-size: 28rpx;
    color: #999DA2;
  }
  .payway{
    width: 100%;
    height: 100rpx;
    background: #fff;
    margin: 0 auto;
    margin-top: 20rpx;
    display: flex;
    border-top: 20rpx solid #f3f7f7;
  }
  .payway .payway_one{
    width: 90%;
    height: 100%;
    display: flex;
  }
  .payway .payway_one span{
    display: block;
    line-height: 100rpx;
  }
  .payway .payimg{
    width: 40rpx;
    height: 40rpx;
    margin-top: 30rpx;
    margin-left: 30rpx;
    margin-right: 14rpx;
  }
  .chooseimg{
    width: 10%;
    height: auto;
    margin-top: 20rpx;
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
  .time{
    color:#FC5D7B
    }
  .cash_success{
    width: 100%;
    height: 606rpx;
    background: #fff;
  }
  .cash_success .top{
    width: 100%;
    height: auto;
    text-align: center;
    font-family:PingFangSC-Medium;
    color: #000;
  }
  .cash_success .ok{
    font-size:40rpx;
    margin-top: 6rpx;
  }
  .cash_success image{
    width: 120rpx;
    height: 120rpx;
    background: #fff;
    margin-top: 68rpx;
    margin-bottom: 26rpx;
  }
  .cash_success .bottom{
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 0 28rpx;
    box-sizing: border-box;
  }
  .cash_success .bottom li{
    width: 100%;
    height: auto;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
  }
  .cash_success .bottom li:first-child{
    width: 100%;
    height: auto;
    margin-top: 38rpx;
  }
  .backtostore{
    color: #5D9AFC;
    text-decoration-line: underline;
    text-align: center;
    font-size: 36rpx;
    margin-top: 120rpx;
  }
  .cash_fail{
    width: 100%;
    height: 572rpx;
    background: #fff;
  }
  
  .cash_fail .top{
    width: 100%;
    height: auto;
    text-align: center;
    font-family:PingFangSC-Medium;
    color: #000;
  }
  .cash_fail .ok{
    font-size:40rpx;
    margin-top: 6rpx;
  }
  .cash_fail image{
    width: 120rpx;
    height: 120rpx;
    background: #fff;
    margin-top: 68rpx;
    margin-bottom: 26rpx;
  }
  .cash_fail .bottom{
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 0 28rpx;
    box-sizing: border-box;
  }
  .cash_fail .bottom li{
    width: 100%;
    height: auto;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
  }
  .cash_fail .bottom li:first-child{
    width: 100%;
    height: auto;
    margin-top: 38rpx;
  }
  .top p:nth-child(3){
    margin-top: 6rpx;
  }
  .money{
    color:#FC5D7B;
    font-size: 48rpx;
  }
</style>