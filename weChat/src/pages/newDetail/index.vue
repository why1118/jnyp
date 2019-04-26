<template>
  <div>
    <div class="wop-swiper">
      <img class="bigImg" :src="arr.mainImgUrl" alt>
      <span class="page">{{idx}}/{{lenth}}</span>
    </div>
    <div class="tit">
      <div class="ones">
        <p>￥</p>
        <p class="price">{{arr.salesPrice}}</p>
        <!-- <s class="num">{{arr.marketPrice}}</s> -->
      </div>
      <p class="times">距结束 11:23:24</p>
    </div>
    <div class="title">
      <div class="names">{{arr.title}}</div>
      <p>
        <span>快递包邮</span>
        <span>仅剩{{arr.totalStock}}件</span>
      </p>
    </div>
    <ModalFrame v-if="show" :skuData="skuData" :pid="pid"/>
    <div class="footer">
      <div class="lefts" @click="changes">
        <img :src="boo?'/static/images/hxin.png':'/static/images/xin.png'" alt>
        <p :class="boo?'':'colos'" class>收藏</p>
      </div>
      <button>立即购买</button>
    </div>
  </div>
</template>
<script>
import ModalFrame from "../../components/modalFrame";
export default {
  data: {
    idx: 1,
    lenth: 1,
    boo: true,
    pid: "",
    arr: {}, //商品的信息
    asd: {}, //是否包邮
    skuData: [], //商品的sku
    show: false
  },
  components: {
    ModalFrame
  },
  onLoad(options) {
    var that = this;
    that.pid = options.id;
    //获取商品的基本信息
    wx.request({
      url: "http://test.api.jinaup.com/api/open/product/info/1.0.0",
      data: {
        pid: that.pid
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        // warehouseVo   这个判断是不是海外的
        that.arr = res.data.result;
        console.log("that.arr..", that.arr);
      }
    });
    // 获取sku
    wx.request({
      url: "http://test.api.jinaup.com/api/open/product/sku/attrs/1.0.0",
      data: {
        pid: that.pid
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        that.skuData.push(res.data.result);
        // console.log("that.skuData..", that.skuData);
      }
    });
  },
  methods: {
    getVal(e) {
      this.idx = e.target.current + 1;
    },
    changes() {
      this.boo = !this.boo;
    },
    // 控制模态框的限时隐藏
    toShow() {
      this.show = true;
      // console.log(this.show);
    }
  }
};
</script>
<style scoped>
page {
  width: 100%;
  height: 100%;
}
.wop-swiper {
  width: 100%;
  height: 250px;
}
.wop-swiper .bigImg {
  width: 100%;
  height: 100%;
}
.wop-swiper .page {
  position: absolute;
  right: 10px;
  top: 220px;
  color: #fff;
  font-size: 12px;
  background: rgba(0, 0, 0, 1);
  border-radius: 8px;
  opacity: 0.5;
  padding: 2px 4px;
  box-sizing: border-box;
}
.tit {
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  box-sizing: border-box;
  height: 54px;
  line-height: 54px;
  background: linear-gradient(
    217deg,
    rgba(248, 99, 103, 1) 0%,
    rgba(251, 37, 121, 1) 100%
  );
  color: #fff;
}
.tit .ones {
  display: flex;
}
.tit .ones p {
  font-size: 16px;
}
.tit .ones p:nth-child(1) {
  font-size: 15px;
  height: 54px;
  line-height: 54px;
}
.tit .ones .price {
  font-size: 30px;
  margin-right: 10px;
}
.tit .ones .num {
  height: 54px;
  line-height: 54px;
}
.tit .times {
  float: right;
  font-size: 16px;
}
.title {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.title .names {
  font-size: 18px;
  color: #323a45;
}
.title p {
  display: flex;
  justify-content: space-between;
  line-height: 3;
  font-size: 12px;
  color: #999da2;
}
.list {
  width: 100%;
  padding: 0 2%;
  box-sizing: border-box;
}
.list .lis {
  display: flex;
  font-size: 13px;
  height: 40px;
  line-height: 40px;
}
.list .lis span {
  color: #676767;
}
.list .lis .rights {
  flex: 1;
  color: #323a45;
  display: flex;
  padding: 0 5px;
  box-sizing: border-box;
  justify-content: space-between;
}
.list .lis .rights img {
  width: 10px;
  height: 10px;
  margin-top: 10px;
}
.list .lis .to2color {
  color: #fc5d7b;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  text-align: center;
  display: flex;
}
.footer .lefts {
  width: 30%;
}
.footer .lefts img {
  width: 14px;
  height: 12px;
}
.footer .lefts p {
  font-size: 12px;
}
.colos {
  color: #fc5d7b;
}
.footer button {
  width: 70%;
  background: linear-gradient(
    217deg,
    rgba(248, 99, 103, 1) 0%,
    rgba(251, 37, 121, 1) 100%
  );
  font-size: 18px;
  color: #fff;
}
</style>
