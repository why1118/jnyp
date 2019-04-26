<template>
    <div class="wrap">
      <!-- 提示文字+图片 -->
      <div class="succ">
        <div>
          <img src="/static/images/交易成功.jpg" alt=""/>
        </div>

        <span class="sucBtn">交易成功</span>
      </div>
      <!-- 两个按钮 -->
      <div class="btn">
        <button @click="toLogistics">返回商城</button>
        <button @click="appraise">立即评价</button>
      </div>
    </div>
</template>

<script>
export default {
  data () {
  },
  onLoad(){
    wx.setNavigationBarTitle({
      frontColor: '#000',
      title: '交易成功'
    })
  },
  components: {
  },

  methods: {
    toLogistics() {
        // wx.navigateBack({
        //   delta: 1
        // })
        console.log(11111)
      },
    appraise(){
      console.log(2222)
    }
  },
}
</script>

<style scoped>
.wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.succ{
  width:100%;
  margin-top:34px;
  /* text-align: center; */
  display: flex;
  flex-direction:column ;
  align-items: center;
  justify-content:center;
}
.succ>div{
  width: 60px;
  height: 61px;
  background: #f00;
  /* margin-left:177px; */
  text-align: center;
}
.succ>div>img{
  width: 60px;
  height: 61px;
}
.sucBtn{
  width:80px;
  height:28px;
  font-size:20px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(50,58,69,1);
  line-height:28px;
  margin-top:13px;
}
.btn{
  display: flex;
}
.btn>button{
  width:144px;
  height:50px;
  border-radius:7px;
  border:1px solid rgba(51,214,197,1);
  margin-top:72px;
}
.btn>button:nth-child(1){
  font-size:18px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(51,214,197,1);
  line-height:50px;
  background: #fff;
  margin-left:25px;
}
.btn>button:nth-child(2){
  font-size:18px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#fff;
  line-height:50px;
  background:rgba(51,214,197,1);
  border:0;
  margin-right:24px;
}
</style>
