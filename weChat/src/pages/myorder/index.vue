<template>
  <div class="wrap">
    <div class="head">
      <span :class="active===index?'active':''" @click="changeactive(index)" v-for="(item,index) in navList" :key="index">{{item}}</span>
    </div>
    <div class="main" v-if="showMain">
      <div class="shop">
        <div class="state">
          <span style="font-size:28rpx;color:#323A45">2019-01-17 17:18:50</span>
          <span style="font-size:32rpx;color:#323A45;font-weight:500;">待付款</span>
        </div>
        <dl class="shop-box" @click="goOrderdetails">
          <dd>
            <!-- <img src="/static/images/user.png" alt=""> -->
          </dd>
          <dt>
            <h3>邦宝实录纸尿裤大号38l片超薄透气男女通用婴儿尿片尿不湿</h3>
            <span class="size" style="color:#999DA2;font-size:24rpx;">规格：XL</span>
            <li class="shop-bot">
              <span class="price" style="color:#323A45;font-size:24rpx;">￥52.50</span>
              <span class="num" style="color:#323A45;font-size:24rpx;">×1</span>
            </li>
          </dt>
        </dl>
        <dl class="shop-box" @click="goOrderdetails">
          <dd>
            <!-- <img src="/static/images/user.png" alt=""> -->
          </dd>
          <dt>
            <h3>邦宝实录纸尿裤大号38l片超薄透气男女通用婴儿尿片尿不湿</h3>
            <span class="size" style="color:#999DA2;font-size:24rpx;">规格：XL</span>
            <li class="shop-bot">
              <span class="price" style="color:#323A45;font-size:24rpx;">￥52.50</span>
              <span class="num" style="color:#323A45;font-size:24rpx;">×1</span>
            </li>
          </dt>
        </dl>
        <!-- 结算 -->
        <dl class="balance shop-box">
          <p>共两件商品 合计：￥
            <em>52.50</em>
          </p>
          <div class="box-btn">
            <button style="margin-right:15rpx;background:#fff;" @click="cancelTheOrder">取消订单</button>
            <button class="go-payment" @click="toSettlement">去付款19:02</button>
          </div>
        </dl>
      </div>
      <div class="shop" @click="goOrderdetails">
        <div class="state">
          <span style="font-size:28rpx;color:#323A45">2019-01-17 17:18:50</span>
          <span style="font-size:32rpx;color:#323A45;font-weight:500;">待付款</span>
        </div>
        <dl class="shop-box" @click="goOrderdetails">
          <dd>
            <!-- <img src="/static/images/user.png" alt=""> -->
          </dd>
          <dt>
            <h3>邦宝实录纸尿裤大号38l片超薄透气男女通用婴儿尿片尿不湿</h3>
            <span class="size" style="color:#999DA2;font-size:24rpx;">规格：XL</span>
            <li class="shop-bot">
              <span class="price" style="color:#323A45;font-size:24rpx;">￥52.50</span>
              <span class="num" style="color:#323A45;font-size:24rpx;">×1</span>
            </li>
          </dt>
        </dl>
        <dl class="shop-box" @click="goOrderdetails">
          <dd>
            <!-- <img src="/static/images/user.png" alt=""> -->
          </dd>
          <dt>
            <h3>邦宝实录纸尿裤大号38l片超薄透气男女通用婴儿尿片尿不湿</h3>
            <span class="size" style="color:#999DA2;font-size:24rpx;">规格：XL</span>
            <li class="shop-bot">
              <span class="price" style="color:#323A45;font-size:24rpx;">￥52.50</span>
              <span class="num" style="color:#323A45;font-size:24rpx;">×1</span>
            </li>
          </dt>
        </dl>
        <!-- 结算 -->
        <dl class="balance shop-box">
          <p>共两件商品 合计：￥
            <em>52.50</em>
          </p>
          <div class="box-btn">
            <button style="margin-right:15rpx;background:#fff;" @click="cancelTheOrder">取消订单</button>
            <button class="go-payment">去付款19:02</button>
          </div>
          </dl>
      </div>
    </div>
    <!-- 若没有数据显示 -->
    <div class="elseshow" v-if="showNoData">
      <div class="dont_imgs">
        <img src='/static/images/wudingdan.png' />
        <div>暂时没有订单噢~</div>
      </div>
    </div>
    <!-- 若无网络显示 -->
    <div class="offline" v-if="showOffline">
      <img src="/static/images/offline.png" alt="" />
      <p>网络竟然崩溃了，请刷新重试~</p>
      <button>刷新</button>
    </div>
    <!-- 支付弹窗 -->
    <confirm v-if='false' />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from "vuex";
  import confirm from "@/components/confirm";
  export default {
    data() {
      return {
        navList: ["全部", "待付款", "待发货", "待收货"],
        showMain: true,
        showOffline: false,
        showNoData: false
      };
    },
    computed: {
      ...mapState({
        active: state => state.myorder.active,
        storelist: state => state.myorder.list
      })
    },
    methods: {
      ...mapActions({
        getFindOrderData: "myorder/getFindOrderData"
      }),
      ...mapMutations({
        changeMyOrder: "myorder/changeMyOrder"
      }),
      //tab切换
      changeactive(index) {
        this.getFindOrderData({ pageIndex: 1, orderStatus: index })
      },
      goOrderdetails() {
        wx.navigateTo({
          url: "/pages/orderdetails/main"
        });
      },
      //取消订单
      cancelTheOrder() {
        wx.showModal({
          title: '是否取消订单？',
          content: '',
          showCancel: true,
          cancelText: '否',
          cancelColor: '#000000',
          confirmText: '是',
          confirmColor: '#3CC51F',
          success: (result) => {
            if (result.confirm) {
              console.log(result)
            }
          },
          fail: () => { },
          complete: () => { }
        });
      },
      toSettlement() {
        console.log('跳转')
        wx.navigateTo({ url: '/pages/myorder/settlement/main' })
      }
    },
    components: {
      confirm
    },
    onLoad() {
      //判断网路状态
      wx.getNetworkType({
        success: res => {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          var networkType = res.networkType
          if (networkType == 'none') {
            console.log(networkType);
            this.showOffline = true;
            this.showMain = false;
          }
        }
      })
    }
  }
</script>
<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f3f7f7;
  }

  .dont_imgs {
    width: 100%;
    height: 100%;
    margin-top: 100rpx;
    margin: 0 auto;
    text-align: center;
    font-size: 32rpx;
    color: #999;
  }

  .dont_imgs img {
    width: 276rpx;
    height: 276rpx;
    border-radius: 50%;
    margin-top: 300rpx;
  }

  .elseshow {
    width: 100%;
    height: 100%;
    background: #f3f7f7;
  }

  .head {
    width: 100%;
    height: 80rpx;
    background: #fff;
    line-height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    position: fixed;
    top: 0;
    left: 0;
  }

  .head span {
    width: 16%;
    height: 90%;
    color: #484848;
    text-align: center;
    border-bottom: 6rpx solid #fff;
  }

  .active {
    border-bottom: 6rpx solid #33D6C5 !important;
  }

  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 18rpx;
    box-sizing: border-box;
    margin-top: 80rpx;
  }

  .shop {
    width: 100%;
    background: #fff;
    margin-top: 24rpx;
    border-radius: 12rpx;
  }

  .state {
    width: 100%;
    height: 74rpx;
    line-height: 74rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 24rpx;
  }

  .shop-box {
    width: 100%;
    height: 208rpx;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 12rpx 24rpx;
    border-bottom: 1px solid #eee;
  }

  .shop-box dd {
    width: 25%;
    height: 100%;
    background: #eee;
  }

  .shop-box dd img {
    width: 100%;
    height: 100%;
  }

  .shop-box dt {
    width: 70%;
    height: 100%;
    font-size: 28rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .shop-bot {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .balance {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
  }

  .balance p {
    display: flex;
    font-size: 26rpx;
    color: #484848;
  }

  .box-btn {
    height: 60rpx;
    display: flex;
  }

  .box-btn button {
    font-size: 28rpx;
    line-height: 60rpx;
    padding: 0 5px;
  }

  .go-payment {
    background: #FC5D7B;
    color: #fff;
  }

  .offline {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80rpx;
  }

  .offline img {
    width: 276rpx;
    height: 218rpx;
    margin-top: 344rpx;
  }

  .offline p {
    margin-top: 76rpx;
    font-size: 32rpx;
    color: #999DA2;
  }

  .offline button {
    width: 220rpx;
    height: 64rpx;
    margin-top: 52rpx;
    color: #33D6C5;
    border: 2rpx solid #33D6C5;
    line-height: 64rpx;
    font-size: 32rpx;
  }
</style>
