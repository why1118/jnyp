<template>
  <div class="bigbox">
    <div class='addbigbox' v-for="(v,i) in arr" :key='i' @click="selectAddress(v)">
      <div class="addressbox">
        <div class="addlittle">
          <p class='char name'>{{v.cityName}}</p>
          <p class='char phone'>{{v.consigneePhone}}</p>
          <div class="addlebox">
            <div class='addimgbox' v-if="v.state===0">
              <img class='addimg' src="/static/images/defaultadderss.png" alt="">
            </div>
            <p class='char addresstag' v-for="(x,y) in num" :key='y' v-if="v.addressTag==x.id">[{{x.str}}]</p>
            <p class='char address'>{{v.addressDetail}}</p>
          </div>
        </div>
        <div class="addribox">
          <span class="borders"></span>
          <p @click="readactAddress(v.uaid)" class='char redact'>编辑</p>
        </div>
      </div>
    </div>
    <button class='addbtn' @click="goAddress">新增收货地址</button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data: {
      list: {},
      arr:{},
      num:[{
        id:1,
        str:'家'
      },{
        id:2,
        str:'公司'
      },{
        id:3,
        str:'学校'
      },{
        id:4,
        str:'其他'
      }]
    },
    methods:{
      ...mapActions({
        submit:'newadd/submit'
      }),
      readactAddress(id){
        if (!this.fromOrder){
          wx.navigateTo({url: './redactAddress/main?id='+id})
        }
      },
      goAddress(){
        wx.navigateTo({url: './redactAddress/main'})
      },
      selectAddress(item){
        if (this.fromOrder){
          wx.setStorageSync('onAdressInfo',item);
          wx.redirectTo({url: '/pages/submission/main'});
        }
      }
    },
    async onShow(){
      this.list = await this.submit();
      this.arr= this.list.data.result;
    },
    async onLoad(options){
      this.fromOrder = options.fromOrder;
    }
  }
</script>

<style scoped>
  .bigbox {
    width: 100%;
    height: 100%;
    background: rgba(243, 247, 247, 1);
    border: 1px solid transparent;
    box-sizing: border-box;
    overflow-y: scroll;
  }

  .addbigbox {
    width: 100%;
    background: #fff;
  }

  .addressbox {
    width: 351px;
    height: 86px;
    border-bottom: 1rpx solid #F6F6F6;
    position: relative;
    margin: 0 12px;
  }

  .char {
    font-size: 13px;
    color: #323A45;
    font-weight: 400;
  }

  .name {
    padding: 9px 0 6px 5px;
  }

  .phone {
    padding: 0 0 0 5px;
  }

  .addresstag {
    color: #FC5D7B;
  }

  .addimgbox {
    width: 26px;
    height: 13px;
    border: 1rpx dashed #323A45;
    margin: 0 2px 0 0;
    display: flex;
    align-items: center;
  }

  .addimg {
    width: 26px;
    height: 13px;
  }

  .addlebox {
    width: 296px;
    height: 18px;
    margin: 5px;
    display: flex;
    align-items: flex-end;
  }

  .borders {
    width: 1px;
    height: 30px;
    position: absolute;
    top: 28px;
    right: 48px;
    background: #F3F7F7;
  }

  .redact {
    color: #999DA2;
    position: absolute;
    top: 34px;
    right: 8px;
  }

  .addbtn {
    margin: 0 auto;
    border: none;
    margin-top: 60px;
    margin-bottom: 60px;
    background: #33D6C5;
    color: #fff;
    font-size: 18px;
    width: 351px;
    border-radius: 7px;
    height: 50px;
  }
</style>
