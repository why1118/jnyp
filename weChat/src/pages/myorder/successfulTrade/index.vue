<template>
  <div class="wrap">
    <div class="suc">
        <img src="/static/images/success.svg" alt="">
        <span>交易成功</span>
    </div>
    <div class="btn">
        <span>返回商城</span>
        <span>立即评价</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
    
  },
  components: {
      
  },
  onLoad() {
    //动态设置标题
    wx.setNavigationBarTitle({
      title: "交易成功"
    });
  }
};
</script>
<style scoped>
  .wrap{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  .suc{
      width: 160rpx;
      height: 204rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 68rpx;
      margin-bottom: 144rpx;
  }
  .suc img{
      width: 120rpx;
      height: 120rpx;
      margin-bottom: 26rpx;
  }
  .btn{
      width: 100%;
      height: 116rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 90rpx;
      padding-right: 90rpx;
      box-sizing: border-box;
  }
  .btn span{
      width: 45%;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      border-radius:14rpx;
      border: none;
  }
  .btn span:nth-child(1){
      border: 1px solid #33D6C5;
      color: #33D6C5;
      background: #fff;
  }
  .btn span:nth-child(2){
      background: #33D6C5;
      color: #fff;
  }
</style>