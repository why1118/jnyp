<template>
  <div class="box">
    <div class="header">
      <div class="banner">
        <img :id="scal === true ? 'actives':'banners'" :src="banner" alt="" mode="widthFix" @click='scals'>
      </div>
      <scroll-view class="nav" scroll-x="true">
        <span v-for="(item,index) in list" :key="index" :class="index==ind ? 'active' : ''" @click="changeind(index,item)">{{item.anchorDesc}}</span>
      </scroll-view>
    </div>
    <scroll-view scroll-y='true' :scroll-into-view="toView" style="height: 416px;">
      <div class="content">
        <div>
          <div class="list" v-if="!list[2]"></div>
          <div class="list" :id="'a'+0" v-else>
            <h3><span></span><span>◆</span><span>爆款专区 惊喜特卖</span><span>◆</span><span></span></h3>
            <div class="hot">
              <dl v-for='(item,index) in list[2].products' :key='index' @click='detail(item.pid)'>
                <dt><img :src="item.mainImgUrl" mode="widthFix" /></dt>
                <dd>
                  <h4>{{item.title}}</h4>
                  <h3><span>¥</span><span>22</span><span>.90</span><span>¥216</span></h3>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div>
          <div class="infant" v-if="!list[1]"></div>
          <div class="infant" :id="'a'+1" v-else>
            <h3><span></span><span>◆</span><span>爆款专区 惊喜特卖</span><span>◆</span><span></span></h3>
            <div class="hot1">
              <dl v-for='(item,index) in list[1].products' :key='index' @click='detail(item.pid)'>
                <dt><img :src="item.mainImgUrl"></dt>
                <dd>
                  <h4>{{item.title}}</h4>
                  <h3><span>¥</span><span>{{item.supplyPrice}}</span><span>¥{{item.marketPrice}}</span></h3>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="!list[0]"></div>
        <div v-else>
          <div class="cake" :id="'a'+2">
            <div class="cake_left">
              <i class="left_line"></i>
              <i class="left_dot"></i>
            </div>
            <p><span>爆款专区</span><span>惊喜特卖</span></p>
            <div class="cake_right">
              <i class="right_dot"></i>
              <i class="right_line"></i>
            </div>
          </div>
          <div class="detail">
            <ul class="d_list">
              <li @click='detail(item.pid)' v-for='(item,index) in list[0].products' :key='index'>
                <img :src="item.mainImgUrl">
                <p class="contents">{{item.title}}</p>
                <div class="money">
                  <span>￥</span>
                  <b>{{item.memberDiscountPrice}}</b>
                  <!-- <span>.</span>
                <sub>90</sub> -->
                </div>
                <p>￥{{item.marketPrice}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    data() {
      return {
        ind: 0,
        toView: null,
        scal:false
      }
    },

    components: {
    },
    computed: {
      ...mapState({
        list: state => state.special.list,
        banner: state => state.special.banner,
        title: state => state.special.title,
      })
    },
    async onShow() {
      await this.specialList({
        siid: this.siid
      })
      wx.setNavigationBarTitle({title:this.title});
    },
    onLoad(options) {
      this.siid = options.sild;
    },
    methods: {
      scals(){
        console.log(1)
        this.scal = !this.scal;
      },
      changeind(index, item) {
        console.log(this.banner)
        this.ind = index;
        this.toView = 'a' + index;
      },
      detail(id) {
        wx.navigateTo({
          url: '/pages/go2detail/main?id=' + id
        })
      },
      ...mapMutations({
        updata: 'special/upstate'
      }),
      ...mapActions({
        specialList: 'special/getList'
      }),

    },
  }
</script>

<style scoped>
  .box {
    width: 100%;
    background: rgba(243, 247, 247, 1);
  }

  .content {
    width: 100%;
    height: auto;
    background: #F3F7F7;
  }

  .none {
    display: none;
  }

  .list {
    width: 100%;
    box-sizing: border-box;

  }

  .list h3 {
    width: 100%;
    height: 150rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .list h3 span:nth-child(1) {
    width: 34px;
    height: 1px;
    background: rgba(72, 72, 72, 1);
  }

  .list h3 span:nth-child(2) {
    margin-right: 12px;
    margin-left: 10rpx;
  }

  .list h3 span:nth-child(3) {
    width: 150px;
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: rgba(72, 72, 72, 1);
    line-height: 25px;
  }

  .list h3 span:nth-child(4) {
    margin-left: 12px;
    margin-right: 10rpx;
  }

  .list h3 span:nth-child(5) {
    width: 34px;
    height: 1px;
    background: rgba(72, 72, 72, 1);
  }

  .hot {
    display: flex;
    flex-wrap: wrap;
  }

  .list dl {
    width: 49%;
    height: 568rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 10rpx;
    margin-top: 8rpx;
    margin-left: 3px;
  }

  .list dt img {
    width: 360rpx;
    height: 360rpx;
  }

  .list dl dd h4 {
    width: 360rpx;
    height: 68rpx;
    font-size: 24rpx;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(50, 58, 69, 1);
    line-height: 34rpx;
    margin-left: 10rpx;
    overflow: hidden;
  }

  .list dl dd h3 {
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .list dl dd h3 span:nth-child(1) {
    width: 18rpx;
    height: 32rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(252, 93, 123, 1);
    line-height: 32rpx;
    margin-left: 10rpx;
    background: #fff;

  }

  .list dl dd h3 span:nth-child(2) {
    width: 38rpx;
    height: 64rpx;
    font-size: 36rpx;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(252, 93, 123, 1);
    line-height: 62rpx;
    margin-right: 0px;
  }

  .list dl dd h3 span:nth-child(3) {
    width: 30rpx;
    height: 64rpx;
    font-size: 14px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(252, 93, 123, 1);
    line-height: 62rpx;
    margin-left: 10rpx;
  }

  .list dl dd h3 span:nth-child(4) {
    width: 50rpx;
    height: 24rpx;
    font-size: 11px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 157, 162, 1);
    line-height: 24rpx;
    margin-left: 20rpx;
    text-decoration: line-through;
  }

  .infant {
    width: 100%;
  }

  .infant h3 {
    width: 100%;
    height: 130rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25rpx;
  }

  .infant h3 span:nth-child(1) {
    width: 34px;
    height: 1px;
    background: rgba(72, 72, 72, 1);
  }

  .infant h3 span:nth-child(2) {
    margin-right: 12px;
    margin-left: 10rpx;
  }

  .infant h3 span:nth-child(3) {
    width: 150px;
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: rgba(72, 72, 72, 1);
    line-height: 25px;
  }

  .infant h3 span:nth-child(4) {
    margin-left: 12px;
    margin-right: 10rpx;
  }

  .infant h3 span:nth-child(5) {
    width: 34px;
    height: 1px;
    background: rgba(72, 72, 72, 1);
  }

  .hot1 {
    width: 100%;
  }

  .hot1 dl {
    display: flex;
    width: 406px;
    height: 141px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    margin-top: 20rpx;
  }

  .hot1 dt {
    width: 124px;
    height: 124px;
    border-radius: 4px;
  }

  .hot1 dt img {
    width: 124px;
    height: 124px;

  }

  .hot1 dl dd {
    margin-left: 32rpx;
  }

  .hot1 dl dd h4 {
    width: 250px;
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(50, 58, 69, 1);
    line-height: 20px;
    margin-right: 6px;
    margin-top: 20rpx;

  }

  .hot1 dl dd h3 {
    display: flex;
    justify-content: flex-start;
    margin-top: 59px;
  }

  .hot1 dl dd h3 span:nth-child(1) {
    width: 9px;
    height: 16px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(252, 93, 123, 1);
    line-height: 16px;
    background: #fff;
  }

  .hot1 dl dd h3 span:nth-child(2) {
    width: 34px;
    height: 32px;
    font-size: 22px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(252, 93, 123, 1);
    line-height: 31px;
  }

  .hot1 dl dd h3 span:nth-child(3) {
    width: 27px;
    height: 12px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 157, 162, 1);
    line-height: 12px;
    margin-left: 19px;
    text-decoration: line-through;
  }

  .header {
    width: 100%;
  }
  .banner{
    width: 100%;
  }
  #actives {
    width: 100%;
    height: 648px;
  }
  #banners {
    width: 100%;
    height: 150px;
  }

  .nav {
    width: 100%;
    height: 46px;
    line-height: 46px;
    display: flex;
    white-space: nowrap;
    border-bottom: 1px solid rgb(236, 236, 236);
    justify-content: space-between
  }

  .nav span {
    height: 46px;
    margin: 0 10px;
    flex: 1;
    display: inline-block;
  }

  .active {
    color: #f00;
    border-bottom: 2px solid #f00;
  }

  .cake {
    width: 100%;
    display: flex;
    height: 75px;
    box-sizing: border-box;
    padding: 0 75px;
    justify-content: space-between;
  }

  .cake_left {
    display: flex;
  }

  .cake_left .left_line,
  .cake_right .right_line {
    width: 34px;
    height: 1px;
    background: rgba(72, 72, 72, 1);
    margin: 36px 0 0 0;
  }

  .cake .cake_left>.left_dot {
    margin-left: 4px;
  }

  .cake .cake_right>.right_dot {
    margin-right: 4px;
  }

  .cake_left .left_dot,
  .cake_right .right_dot {
    width: 7px;
    height: 7px;
    background: rgba(72, 72, 72, 1);
    margin: 33px 0 0 0;
    transform: rotate(45deg);
  }

  .cake p {
    width: 150px;
    height: 25px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(72, 72, 72, 1);
    line-height: 25px;
    text-align: center;
    margin-top: 25px;
    box-sizing: border-box;
  }

  .cake p span:nth-child(1) {
    margin-right: 4px;
  }

  .cake_right {
    display: flex;
  }

  .detail {
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
  }

  .d_list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .d_list li {
    width: 118px;
    height: 242px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    overflow: hidden;
    margin: 5px 0 0 4px;
    box-sizing: border-box;
  }

  .d_list li img {
    width: 100%;
    height: 132px;
  }

  .d_list li .contents {
    box-sizing: border-box;
    padding: 5px;
    width: 127px;
    height: 40px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(50, 58, 69, 1);
    line-height: 17px;
    overflow: hidden;
  }

  .money {
    width: 100%;
    display: flex;
    margin-top: 5px;
  }

  .money span:nth-child(1) {
    width: 9px;
    height: 16px;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(252, 93, 123, 1);
    line-height: 16px;
    margin-top: 10px;
  }

  .money b {
    width: 19px;
    height: 32px;
    font-size: 18px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(252, 93, 123, 1);
    line-height: 31px;
    margin-top: 1px;
    margin-left: 4px;
  }

  .money span:nth-child(3) {
    width: 4px;
    height: 32px;
    font-size: 18px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(252, 93, 123, 1);
    line-height: 31px;
    margin-top: 1px;
    margin-left: 2px;
  }

  .money sub {
    width: 15px;
    height: 32px;
    font-size: 14px;
    font-family: DINAlternate-Bold;
    font-weight: bold;
    color: rgba(252, 93, 123, 1);
    line-height: 31px;
    margin-top: 2px;
  }

  .d_list li p:nth-child(4) {
    width: 25px;
    height: 12px;
    font-size: 11px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 157, 162, 1);
    line-height: 12px;
    text-decoration: line-through;
    /* margin-top: 5px; */
  }
</style>