<template>
  <div class="swrap">
    <!-- 实名认证介绍 -->
    <div v-if="orderMain.isOverseas" class="toptext flex">
      <div></div>
      <div
        class="flex1"
      >订单中包含海外购商品，海关要求必须提供真实姓名和身份证号进行实名认证，且实名人与支付人必须一致，错误信息可能导致无法清关，平台保证您的信息安全，绝不对外泄露！</div>
    </div>
    <div class="flex adressBox" v-if="orderMain.userAddressVo">
      <div class="flex1">
        <div>
          <span class="mgr5">{{orderMain.userAddressVo.consignee}}</span>
          <span>{{orderMain.userAddressVo.consigneePhone}}</span>
        </div>
        <div>
          <span></span>
          <span class="fs12">{{orderMain.userAddressVo.addressDetail}}</span>
        </div>
      </div>
      <div class="flexcenter">></div>
    </div>
    <div v-else class="btn" @click="goAdd">+ 新增收货地址</div>
    <!-- 实名认证按钮 -->
    <template v-if="orderMain.isOverseas">
      <div v-if="orderMain.userAuthInfoVo"></div>
      <div v-else class="btn" @click="goAdd">+ 新增实名认证信息</div>
    </template>
    <div>
      <!--  货物列表 -->
      <div class="lis" :key="index">
        <p class="times">2019-01-01</p>
        <dl>
          <dt>
            <img :src="orderMain.subOrder['0'].orderItemProductInfos['0'].mainImgUrl" alt>
          </dt>
          <dd>
            <p class="name">{{orderMain.subOrder['0'].orderItemProductInfos['0'].productTitle}}</p>
            <p class="size">规格：{{orderMain.subOrder['0'].orderItemProductInfos['0'].skuName}}</p>
            <p class="pn">
              <span>￥{{orderMain.subOrder['0'].orderItemProductInfos['0'].salesPrice}}</span>
              <span>X{{orderMain.subOrder['0'].orderItemProductInfos['0'].productNumber}}</span>
            </p>
          </dd>
        </dl>
        <div class="types">
          <span>发货方式</span>
          <span>快递（包邮）：0元</span>
        </div>
        <div class="total">
          <span>订单总计</span>
          <span class="price">
            ￥
            <span class="col">{{orderMain.mainOrder.totalAmount}}</span>
          </span>
        </div>
      </div>
    </div>
    <!-- <div class="totals">
      <span>订单总计</span>
      <span class="price">
        - ￥
        <span class="col">5</span>
        <span class="more">></span>
      </span>
    </div>-->
    <div class="imgList">
      <div>
        <span>优惠券</span>
      </div>
      <div>></div>
    </div>
    <div class="imgList">
      <div>
        <img class="wx" src="/static/images/7.png" alt>
        <span>微信支付</span>
      </div>
      <img
        class="yuan"
        @click="changes"
        :src="boo?'/static/images/yuan.png':'/static/images/xzyuan.png'"
        alt
      >
    </div>
    <div class="footer">
      <div>
        <span>
          总计￥
          <span class="price">{{orderMain.mainOrder.totalAmount}}</span>
        </span>
        <span>微信支付</span>
      </div>
      <p @click="goPay">去支付</p>
    </div>
  </div>
</template>
<script>
export default {
  data: {
    arr: {},
    pid: "",
    num: 1,
    total: "",
    boo: false,
    size: "默认",
    orderMain: ""
  },
  onLoad(options) {
    // console.log(options)
  },
  methods: {
    goPay() {
      let that = this;
      if (!that.orderMain.userAddressVo) {
        wx.showToast({
          title: "请添加收货地址",
          icon: 'none',
          duration: 1000
        });
        return;
      }
      if (that.orderMain.isOverseas && !that.orderMain.userAuthInfoVo) {
        wx.showToast({
          title: "请实名认证",
          icon: 'none',
          duration: 1000
        });
        return;
      }
      let trackId = wx.getStorageSync("trackId");
      wx.request({
        method: "POST",
        url: "http://test.api.jinaup.com/api/open/order/place/order/1", // 仅为示例，并非真实的接口地址
        data: {
          payChannel: "1",
          prepareId: that.orderMain.prepareId,
          platform: "4"
        },
        header: {
          "content-type": "application/x-www-form-urlencoded", // 默认值
          // 'content-type': 'application/json', // 默认值
          trackId: trackId
        },
        success(res) {
          console.log("成", res.data.result);
          wx.requestPayment({
            timeStamp: res.data.result.timeStamp,
            nonceStr: res.data.result.nonceStr,
            package: res.data.result.package,
            paySign: res.data.result.sign,
            signType: res.data.result.signType,
            paySign: res.data.result.sign,
            success(res) {
              console.log("支付成", res);
            },
            fail(res) {
              console.log("支付失败", res);
            }
          });
        },
        error(res) {
          console.log("失败", res);
        }
      });
      // var date = "" + new Date().getTime();
      // console.log("date", date);
      // wx.requestPayment({
      //   timeStamp: date,
      //   nonceStr: "",
      //   package: "",
      //   signType: "MD5",
      //   paySign: "",
      //   success: function(res) {
      //     console.log("res...", res);
      //   },
      //   fail: function(res) {
      //     console.log("res...", res);
      //   }
      // });
    },
    changes() {
      this.boo = !this.boo;
    },
    goAdd() {
      // 去添加地址页面;
      wx.navigateTo({
        url: "/pages/shoppingadress/main"
      });
    }
  },
  onLoad(options) {
    let that = this;
    that.orderMain = wx.getStorageSync("orderMian");
    console.log("orderMain222", that.orderMain);
    //获取商品的基本信息
    // wx.request({
    //   url: "http://test.api.jinaup.com/api/open/product/info/1.0.0",
    //   data: {
    //     pid: that.pid
    //   },
    //   method: "post",
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded" // 默认值
    //   },
    //   success(res) {
    //     that.arr = res.data.result;
    //     console.log("that.arr..", that.arr);
    //     that.total = that.arr.salesPrice * that.num;
    //   }
    // });
    // wx.getStorage({
    //   key: "type",
    //   success: function(res) {
    //     that.size = res.data;
    //     console.log(res.data);
    //   }
    // });
    // wx.getStorage({
    //   key: "numb",
    //   success: function(res) {
    //     that.num = res.data;
    //     console.log(res.data);
    //   }
    // });
  }
};
</script>
<style scoped lang='scss'>
.swrap {
  width: 100%;
  background: #f3f7f7;
  min-height: 100%;
}
.btn {
  width: 96%;
  height: 56px;
  line-height: 56px;
  text-align: center;
  background: #fff;
  color: #fc5d7b;
  font-size: 16px;
  margin: 5px 2%;
}
.lis {
  width: 96%;
  margin: 5px 2%;
  background: #fff;
  margin-bottom: 10px;
  .times {
    font-size: 12px;
    padding: 10px;
    box-sizing: border-box;
  }
  dl {
    display: flex;
    // justify-content: space-between;
    dt {
      img {
        width: 90px;
        height: 90px;
        padding: 8px;
        box-sizing: border-box;
      }
    }
    dd {
      padding: 0 8px;
      box-sizing: border-box;
      font-size: 12px;
      .name {
        font-size: 14px;
      }
      .size {
        color: #999da2;
        line-height: 2;
      }
      .pn {
        display: flex;
        justify-content: space-between;
        line-height: 2;
        color: #323a45;
      }
    }
  }
  .types,
  .total {
    width: 100%;
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .total {
    .price {
      color: #fc5d7b;
      .col {
        font-size: 24px;
      }
    }
  }
}
.totals {
  width: 96%;
  height: 44px;
  font-size: 14px;
  line-height: 44px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  background: #fff;
  box-sizing: border-box;
  margin: 0 2% 5px 2%;

  .price {
    color: #fc5d7b;
  }
  .more {
    color: #999da2;
  }
}
.imgList {
  width: 96%;
  height: 44px;
  font-size: 14px;
  line-height: 44px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  background: #fff;
  margin: 5px 2% 5px 2%;
  div {
    display: flex;
    font-size: 14px;
    .wx {
      width: 20px;
      height: 20px;
      margin: 12px 5px 0 0px;
    }
  }
  .yuan {
    width: 20px;
    height: 20px;
    margin: 12px 10px 0 0;
  }
}
.footer {
  display: flex;
  width: 100%;
  height: 55px;
  line-height: 55px;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ccc;
  div {
    width: 70%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #fc5d7b;
    padding: 0 10px;
    box-sizing: border-box;
    .price {
      font-size: 30px;
    }
    span:nth-child(2) {
      color: #323a45;
    }
  }
  p {
    width: 30%;
    height: 55px;
    line-height: 55px;
    font-size: 18px;
    text-align: center;
    color: #fff;
    background: linear-gradient(
      217deg,
      rgba(248, 99, 103, 1) 0%,
      rgba(251, 37, 121, 1) 100%
    );
  }
}
.adressBox {
  padding: 10px;
}
.adressBox > div {
  background-color: #fff;
  padding: 5px;
}
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
.flexcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fs12 {
  font-size: 12px;
}
.mgr5 {
  margin-right: 5px;
}
.toptext {
  font-size: 12px;
  background: rgba(255, 246, 246, 1);
  padding: 10px;
  color: #484848;
}
</style>
