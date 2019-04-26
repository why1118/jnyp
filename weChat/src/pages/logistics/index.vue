<template>
  <div class="wrap">
    <!-- 头部信息 -->
    <div class="header">
      <dl class="Box">
        <dt class="img"><img src="/static/images/位图@2x.png"/></dt>
        <dd class="cont">
          <h4 class="txt">中通快递</h4>
          <p class="text"><span class="numbers">快递单号：637294820472</span><span class="copy" @tap="copyClick">复制</span></p>
        </dd>
      </dl>
    </div>
    <!-- 下边物流详情信息 -->
    <div class="massage">
      <div class="msgBox">
        <div class="leftTxt">
          <div class="add">收</div>
        </div>
        <div class="rightTxt">
           <div class="rightTxtCont">
              <p>已签收</p>
              <p>签收人：<span class="name">张晓倩</span>感谢中通快递,期待为您服务</p>
           </div>
           <p class="time">2018-10-11 10:23:45</p>
        </div>
      </div>

      <div class="msgBox">
        <div class="leftTxted">
          <div class="added"></div>
        </div>
        <div class="rightTxt">
           <div class="rightTxtCont">
              <!-- <p>已签收</p> -->
              <p class="product">[北京市]北京市【北京垡头分部】，【王志才/朝阳区焦化厂】<span>已收入</span></p>
           </div>
           <p class="timed">2018-10-11 10:23:45</p>
        </div>
      </div>

      <div class="msgBox">
        <div class="leftTxted">
          <div class="added"></div>
        </div>
        <div class="rightTxt">
           <div class="rightTxtCont">
              <!-- <p>已签收</p> -->
              <p class="producted">北京市朝阳区焦化厂 正法网 【北京市发头分部垡头】<span></span></p>
           </div>
           <p class="timed">2018-10-11 10:23:45</p>
        </div>
      </div>

      <div class="msgBox">
        <div class="leftTxted">
          <div class="added"></div>
        </div>
        <div class="rightTxt">
           <div class="rightTxtCont">
              <!-- <p>已签收</p> -->
              <p class="producted">北京市朝阳区焦化厂 正法网 【北京市发头分部垡头】<span></span></p>
           </div>
           <p class="timed">2018-10-11 10:23:45</p>
        </div>
      </div>

      <div class="msgBox">
        <div class="leftTxted">
          <div class="added"></div>
        </div>
        <div class="rightTxt">
           <div class="rightTxtCont">
              <!-- <p>已签收</p> -->
              <p class="producted">北京市朝阳区焦化厂 正法网 【北京市发头分部垡头】<span></span></p>
           </div>
           <p class="timed">2018-10-11 10:23:45</p>
        </div>
      </div>

      <div class="msgBox">
        <div class="leftTxted">
          <div class="added"></div>
        </div>
        <div class="rightTxt">
           <div class="rightTxtCont">
              <!-- <p>已签收</p> -->
              <p class="producted">北京市朝阳区焦化厂 正法网 【北京市发头分部垡头】<span></span></p>
           </div>
           <p class="timed">2018-10-11 10:23:45</p>
        </div>
      </div>

     <div class="msgBox">
        <div class="leftTxted">
          <div class="added"></div>
        </div>
        <div class="rightTxt">
           <div class="rightTxtCont">
              <!-- <p>已签收</p> -->
              <p class="producted">北京市朝阳区焦化厂 正法网 【北京市发头分部垡头】<span></span></p>
           </div>
           <p class="timed">2018-10-11 10:23:45</p>
        </div>
      </div>


      <div class="msgBox">
        <div class="leftTxted">
          <div class="added"></div>
        </div>
        <div class="rightTxt">
           <div class="rightTxtCont">
              <!-- <p>已签收</p> -->
              <p class="producted">北京市朝阳区焦化厂 正法网 【北京市发头分部垡头】<span></span></p>
           </div>
           <p class="timed">2018-10-11 10:23:45</p>
        </div>
      </div>

    </div>
    <div class="line">
      <!-- 左边的线 -->
    </div>
  </div>
</template>

<script>

export default {
  onLoad(){
      wx.setNavigationBarTitle({
        frontColor: '#000',
        title: '物流信息'
      })
    },
  methods:{
    copyClick:function(){
      wx.showToast({
        title: '复制成功',
        icon: 'none',
        duration: 2000
      })
    }
  }

}
</script>

<style scoped>
/* 大盒子 */
.wrap{
  width: 100%;
  height: 100%;
  padding:0 9px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: rgba(243, 247, 247, 1);
}

/* 头部 */
.header{
  width: 100%;
  height: 97px;
  background: #fff;
  margin-top:10px;  
}
.Box{
  display: flex;  
}
.header>dl .img>img{
  width: 61px;
  height: 65px;
  margin-top:19px;
  margin-left:12px;
}
.txt{
  width: 72px;
  height: 25px;
  font-size: 18px;
  color:#323A45;
  margin-top:25px;
  font-weight: bold;

}
.text{
  display: flex;
  margin-top:3px;
}
.numbers{
  width: 169px;
  height: 20px;
  color:#323A45;
  font-size: 14px;
}
.copy{
  display: block;
  width: 38px;
  height: 18px;
  color:#FC5D7B;
  font-size: 11px;
  border:solid 1px #FC5D7B;
  border-radius: 3px;
  margin-left:5px;
  text-align: center;
  line-height: 18px;
}
.cont{
  margin-left:9px;
}
/* 下边物流详情 */
.massage{
  width: 100%;
  flex:1;
  /* background: #ccc; */
  margin-top:10px;
  /* position: relative; */
}
.msgBox{
  width: 100%;
  height: 62px;
  background: #fff;
  padding: 0 29px 0 13px;
  box-sizing: border-box;
  display: flex;
  line-height: 100%;
  padding-top:19px;

  /* margin-top:19px; */
}
.rightTxtCont{
  width: 318px;
  height: auto;
  font-size: 16px;
  color:#323A45;
}
.rightTxtCont>p:nth-child(2){
  font-size: 14px;
}
.product{
  width: 283px;
  height: 40px;
  color:#999DA2;
  font-size: 14px;
  margin-top:24px;
}
.producted{
  width: 332px;
  height: auto;
  color:#999DA2;
  font-size: 14px;
  margin-top:24px;
}
/* .rightTxted{
  height: auto;
} */
.rightTxt{
  display: flex;
  flex-direction: column;
  justify-content:center;
  margin-left:12px;
}
.time{
  /* width: 133px; */
  height: 20px;
  font-size: 14px;
  color:#323A45;
}
.timed{
  color:#999DA2;
  font-size: 14px;
  /* margin-top:-20px; */
}
.name{
  margin-left:3px;
  margin-right:3px;
}
/* 收 */
.leftTxt{
  width:24px;
  height:24px;
  border-radius: 12px;
  background: #31D3F3;
  color:#fff;
  font-size: 12px;
  flex-shrink: 0;
  text-align: center;
  line-height: 24px;
  margin-top:8px;
  z-index: 99;
}
.leftTxted{
  width:8px;
  height:8px;
  border-radius: 4px;
  background: #ccc;
  color:#fff;
  font-size: 12px;
  flex-shrink: 0;
  text-align: center;
  line-height: 24px;
  margin-top:30px;
  margin-left:8px;
  z-index: 99;
}
/* 左边的线 */
.line{
  width:2px;
  height:100%;
  background:rgba(246,246,246,1);
  position: absolute;
  top:150px;
  left:32px;
}
</style>
