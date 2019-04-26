<template>
  <div class="pay-modal">
    <div class="pay-box">
      <view class='input_main'>
          <view class='input_title'>
              <view class='input_back' @click='hidePayLayer'><text></text></view>
              <text>输入支付密码</text>
          </view>
          <view class='input_row' @click='getFocus'>
              <view class='pwd_item' v-for='item in sixlen' :key='item' >
                  <text v-if='pwdVal.length>i'></text>
              </view>
          </view>
          <view class='forget_pwd' @click='hidePayLayer'>忘记密码</view>
          <input class='input_control' password type='number' focus='payFocus' @input='inputPwd' maxlength='6'/>
      </view>
    </div>
  </div>
</template>

<script>
import {getAuth} from '@/utils/index'
import {mapActions} from 'vuex'

export default {
  data(){
    return {
      showPayPwdInput: true,  //是否展示密码输入层
      pwdVal: '',  //输入的密码
      payFocus: true, //文本框焦点
      sixlen: 6
    }
  },
  mounted() {
    
  },
  methods: {
    /**
   * 显示支付密码输入层
   */
  showInputLayer: function(){
    this.showPayPwdInput = true, 
    this.payFocus = true
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function(){
      var val = this.data.pwdVal;
      this.showPayPwdInput = true,
      this.payFocus = true, 
      this.pwdVal = '',
      wx.showToast({
        title: val,
      })
    },
    /* 获取焦点 */
    getFocus: function(){
      console.log(1);
      
      this.payFocus = true ;
    },
    /**
     * 输入密码监听
     */
    inputPwd: function(e){
        this.pwdVal = e.detail.value;
        if (e.detail.value.length >= 6){
          this.hidePayLayer();
        }
    }
  }
}
</script>

<style lang="scss" scoped>
  .pay-modal{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba(0, 0, 0, .6)
  }
  .pay-box{
    width: 100%;
    height: 75%;
    position: fixed;
    bottom: 0;
    background: #fff;
  }
  
  .btn_pay{
    margin: 100rpx auto; width: 600rpx; height: 100rpx; line-height: 100rpx; border-radius: 100rpx;
    background-color: #d3a95a; color: #fff; font-size: 36rpx; text-align: center; 
  }
  /* 支付密码css start */
  .bg_layer{
    position: fixed; left: 0; top: 0; bottom: 0; right: 0;
    background-color: rgba(0, 0, 0, 0.6); z-index: 9998;
  }
  .input_main{
      position: fixed; left: 0; bottom: 500rpx; width: 100%; height: 394rpx;
      background-color: #fff; z-index: 9999;
  }
  .input_title{
      width: 100%; height: 90rpx; line-height: 90rpx; text-align: center; 
      font-size: 32rpx;
  }
  .input_back{
      position: absolute; left: 0; top: 0;
      width: 80rpx; height: 90rpx; display: flex; justify-content: center; align-items: center;
  }
  .input_back text{
    width: 20rpx;
    height: 20rpx;
    background-color: white;
    border: 1rpx solid #aaa;
    border-width: 5rpx 0 0 5rpx;
    transform: rotate(-45deg);
  }

  .input_tip{  margin: 30rpx; font-size: 24rpx; color: #888; }

  /* 密码掩码模拟 */
  .input_row{
    width: 690rpx; margin: 0 auto; height: 98rpx; position: relative;
    display: flex; align-items: center; border: 1rpx solid #e2e2e2; border-radius: 20rpx;
  }
  .input_row .pwd_item{
    flex: 1; display: flex; align-items: center; justify-content: center; 
    height: 100%; border-right: 1rpx solid #e2e2e2; position: relative;
  }
  .pwd_item:nth-last-of-type(1) { border-right: 0; } 
  .pwd_item text { 
    width: 30rpx; height: 30rpx; border-radius: 30rpx; background-color: #555;
  }


  .forget_pwd{ 
    float: right; margin: 30rpx; width: 100rpx; text-align: right; font-size: 24rpx; color: #ff7800;
  }

  /* 文本输入框位置: 设置到左边隐藏 */
  .input_control { 
    position: relative; left: -300rpx; bottom: 0; width: 100rpx; height: 100rpx;
  }

</style>
