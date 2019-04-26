<template>
  <div class="mwrap">
    <div class="cen">
      <p class="colSize">
        <span>颜色/规格</span>
        <span @click="toShow">X</span>
      </p>
      <dl>
        <dt>
          <img :src="arr.mainImgUrl" alt>
        </dt>
        <dd>
          <p>￥{{arr.salesPrice}}</p>
          <!-- <p>库存：{{skuData[0].attributeValueRelationVoList[skuIndex].store}}</p> -->
        </dd>
      </dl>
      <div class="colors" v-for="(item,index) in skuData[index]" :key="index">
        <p class="aname">{{item.aname}}</p>
        <ul>
          <li
            v-for="(itm,idx) in item.attributeValueRelationVoList"
            :key="idx"
            @click="btn(idx,item)"
            :class="{bg:idx==indexs?true:false}"
          >{{itm.vname}}</li>
        </ul>
      </div>
      <div class="numbox">
        <span class="sl">数量</span>
        <div class="num">
          <span @click="changeNum1">-</span>
          <span>{{numb}}</span>
          <span @click="changeNum2">+</span>
        </div>
      </div>
      <button class="btn" @click="toShow">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  data: {
    pid: "",
    arr: {},
    boo: false,
    show: false,
  },
  props: {
    skuData: "", //sku
    arr: "", //商品详情
    numb: "", //商品数量
    xg: "", //最多可以买的数量
    indexs: ""
  },
  methods: {
    btn(val, item) {
      item.attributeValueRelationVoList.map((v, i) => {
        wx.setStorage({
          key: "type",
          data: v.vname
        });
      });
      this.indexs = val;
      console.log(item[this.indexs]);
    },
    // 商品数量---
    changeNum1() {
      if (this.numb <= 0) {
        return;
      }
      this.numb--;
      wx.setStorage({
        key: "numb",
        data: this.numb
      });
    },
    // 商品数量+++
    changeNum2() {
      if (this.numb >= this.xg) {
        return;
      }
      this.numb++;
      wx.setStorage({
        key: "numb",
        data: this.numb
      });
    },
    toShow: function() {
      this.$emit("toParent", false, this.numb);
    }
  }
};
</script>
<style lang='scss' scoped>
.mwrap {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  .cen {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;

    .colSize {
      display: flex;
      justify-content: space-between;
      padding: 0 2%;
      box-sizing: border-box;
      span:nth-child(1) {
        font-size: 15px;
      }
    }
    dl {
      display: flex;
      padding: 0 2%;
      box-sizing: border-box;
      dt img {
        width: 80px;
        height: 80px;
      }
      dd {
        p:nth-child(1) {
          font-size: 15px;
          color: #323a45;
          line-height: 2;
        }
        p:nth-child(2) {
          font-size: 15px;
          color: #999da2;
          line-height: 2;
        }
      }
    }
    .colors {
      padding: 0 2%;
      box-sizing: border-box;
      margin-top: 15px;
      .aname {
        color: #999da2;
        font-size: 15px;
        line-height: 2;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          border: 1px solid #ccc;
          padding: 3px 5px;
          box-sizing: border-box;
          margin: 5px 10px;
          font-size: 12px;
          border-radius: 13px;
        }
        .bg {
          background: #33d6c5;
          color: #fff;
        }
      }
    }
    .numbox {
      padding: 0 2%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      margin-bottom: 3px;
      .sl {
        font-size: 15px;
        color: #999da2;
        line-height: 2;
      }
      .num {
        display: flex;
        span {
          display: block;
          line-height: 2;
          font-size: 14px;
          text-align: center;
          padding: 0px 10px;
          box-sizing: border-box;
          border: 1px solid #ccc;
        }
      }
    }
    .btn {
      width: 100%;
      height: 55px;
      line-height: 55px;
      text-align: center;
      color: #fff;
      background: linear-gradient(
        217deg,
        rgba(248, 99, 103, 1) 0%,
        rgba(251, 37, 121, 1) 100%
      );
    }
  }
}
</style>
