<template>
  <div class="swrap">
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper indicator-dots="true" autoplay="true" interval="2000" duration="1000" circular="true">
        <block v-for="(item,index) in swriperData" v-bind:key="index">
          <swiper-item>
            <img :src="item.imgUrl" class="slide-image" @click="hhh(item)" alt>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 每日特推 -->
    <!-- <div class="chart">
      <dl>
        <dt>
          <img src="/static/images/d1.png" alt>
        </dt>
        <dd>
          <span>每日特推</span>
        </dd>
      </dl>
      <dl>
        <dt>
          <img src="/static/images/d2.png" alt>
        </dt>
        <dd>
          <span>限时抢购</span>
        </dd>
      </dl>
      <dl>
        <dt>
          <img src="/static/images/d3.png" alt>
        </dt>
        <dd>
          <span>品牌特卖</span>
        </dd>
      </dl>
      <dl>
        <dt>
          <img src="/static/images/d4.png" alt>
        </dt>
        <dd>
          <span>超值团购</span>
        </dd>
      </dl>
      <dl>
        <dt>
          <img src="/static/images/d5.png" alt>
        </dt>
        <dd>
          <span>新人专享</span>
        </dd>
      </dl>
    </div>-->
    <!-- 全球购好物 -->
    <div class="swipers">
      <img src="/static/images/qq.png" alt>
    </div>
    <!-- <div>
      <div class="good-thing">
        <img class="cimg" :src="arrr1[0].pictUrl" alt @click="goZT(arrr1[0])">
        <swiper display-multiple-items="3">
          <block v-for="(item,index) in arrr3[0]" :key="index">
            <swiper-item @click="goToDet(item)">

              <img :src="item.imgUrl" alt>
              <p class="texts">{{item.title}}</p>
              <span class="price">￥{{item.salesPrice}}</span>
            </swiper-item>
          </block>
        </swiper>
      </div>
    </div> -->
    <!-- 3  这是三张图片 -->
    <div class="milk">
      <div class="bot">
        <div class="bot-left">
          <img :src="threeArr[0].imgUrl" alt @tap="go2ZT(threeArr[0])">
        </div>
        <div class="bot-right">
          <img :src="threeArr[1].imgUrl" @tap="go2ZT(threeArr[2])">
          <img :src="threeArr[2].imgUrl" @tap="go2ZT(threeArr[3])">
        </div>
      </div>
    </div>
    <!-- 四块 -->
    <div>
      <!-- <img v-for="(item,index) in arrr1" :key="index" src="" alt=""> -->
    </div>
    <!-- 今日秒杀 -->
    <div class="today-list">
      <div class="today" @click.stop="goTospike">
        <p>
          <span class="today1">今日秒杀</span>
          <span class="today2">先下单那得</span>
        </p>
        <img src="/static/images/Group 2@2x.png" class="more" alt>
      </div>
      <!-- 秒杀列表 -->
      <div class="kh-list">
        <dl v-for="(item,index) in spikeArr" v-bind:key="index" @click="getId(item)">
          <dt>
            <img :src="item.mainImgUrl" alt>
          </dt>
          <dd>
            <p class="over-h">{{item.title}}</p>
            <div class="present">
              <progress activeColor="#FC5D7B" color="#f3f7f7" :percent="item.salesStore" show-info/>
              <span>{{item.salesStore==0?'已售完':''}}</span>
            </div>
            <div class="price">
              <p class="nprice">￥{{item.earnMoney}}</p>
              <s class="oprice">￥{{item.salesPrice}}</s>
              <img src="/static/images/马上抢@2x.png" class="btn" alt>
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 精品好物 -->
    <!-- <div class="today">
          <p>
            <span class="today1">精选好物</span>
            <span class="today2">等你来抢</span>
          </p>
          <img src="/static/images/Group 2@2x.png" class="more" alt>
    </div>-->
    <div>
      <div class="good-thing" v-for="(items,indexs) in arrr3[0].length" :key="indexs">
        <img class="cimg" :src="arrr1[indexs].pictUrl" alt @click="goZT(arrr1[indexs])">
        <swiper display-multiple-items="3"  indicator-dots="true">
          <block v-for="(item,index) in arrr3[indexs]" :key="index">
            <swiper-item @click="goToDet(item)">
              <!-- -->
              <img :src="item.imgUrl" alt>
              <p class="texts">{{item.title}}</p>
              <span class="price">￥{{item.salesPrice}}</span>
            </swiper-item>
          </block>
        </swiper>
      </div>
    </div>
    <!-- 为你精选 -->
    <div class="choose">
      <div class="today">
        <p>
          <span class="today1">为你精选</span>
          <span class="today2">等你来抢</span>
        </p>
      </div>
      <div class="milks">
        <div>
          <dl
            v-for="(item,index) in carouselProductData"
            v-bind:key="index"
            @click="goToDetail(item.pid)"
          >
            <dt>
              <img :src="item.mainImgUrl" alt>
            </dt>
            <dd>
              <p>{{item.title}}</p>
              <div class="discount">
                <span>包邮</span>
              </div>
              <div class="milkProce">
                <span class="ft14">￥</span>
                <span class="ft22">{{item.salesPrice}}</span>
                <span class="fcg">￥{{item.vipPrice}}</span>
                <img src="/static/images/黑卡@2x.png" alt>
                <span class="ft10">赚￥{{item.earnMoney}}</span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    swriperData: "", //轮播图数据
    threeArr: "", // 品 图
    spikeArr: "", // 秒杀数据
    arrr3: "", //小轮播图
    arrr1: "", //小轮播图的背景图
    carouselProductData: "" //最下面的优选数据
  },
  methods: {
    //秒杀列表
    goTospike() {
      console.log("去秒杀列表");
      wx.navigateTo({
        url: "/pages/spike/main"
      });
    },
    // 小轮播图的背景图跳专题
    goZT(val) {
      //
      var sild = val.jumpUrl.split("&")[1].split("=")[1];
      var uiType = val.jumpUrl.split("&")[2].split("=")[1];
      wx.navigateTo({
        url: "/pages/special/main?sild=" + sild + "&uiType=" + uiType
      });
    },
    go2ZT(item){
      var sild = item.jumpUrl.split("&")[1].split("=")[1];
      var uiType = item.jumpUrl.split("&")[2].split("=")[1];
      wx.navigateTo({
        url: "/pages/special/main?sild=" + sild + "&uiType=" + uiType
      });
    },
    // 小轮播图去详情
    goToDetail(id) {
      wx.navigateTo({
        url: "/pages/go2detail/main?id=" + id
      });
    },
    goToDet(item) {
      var id = item.jumpUrl.split("&")[1].split("=")[1];
      console.log("idddddd", id);
      wx.navigateTo({
        url: "/pages/go2detail/main?id=" + id
      });
    },
    getId(val) {
      //  秒杀详情
      var name = val.title;
      var id = val.jumpUrl.split("&")[1].split("=")[1];
      var uiTyep = val.jumpUrl.split("&")[2].split("=")[1];
      wx.navigateTo({
        url: "/pages/spikeDetail/main?id=" + id + "&name=" + name
      });
    },
    hhh(val) {
      var sild = val.jumpUrl.split("&")[1].split("=")[1];
      var uiType = val.jumpUrl.split("&")[2].split("=")[1];
      wx.navigateTo({
        url: "/pages/special/main?sild=" + sild + "&uiType=" + uiType
      });
      // console.log("sild,uiType", sild, uiType);
    }
  }
};
</script>
<style lang='scss' scoped>
.swrap {
  width: 100%;
  height: 100%;
}

.swiper {
  width: 100%;
  height: 154px;
  margin-top: 5px;
  img {
    width: 96%;
    height: 100%;
    margin: 0 2%;
    border-radius: 15px;
  }
}
.chart {
  display: flex;
  dl {
    width: 20%;
    box-sizing: border-box;
    text-align: center;
    margin: 0 0 10px 0;
    dt {
      width: 100%;
      img {
        width: 57px;
        height: 57px;
      }
    }
    dd {
      width: 100%;
      font-size: 12px;
      line-height: 2;
    }
  }
}

.swipers {
  width: 100%;
  height: 104px;
  img {
    width: 96%;
    height: 100%;
    margin: 0 2%;
    border-radius: 15px;
  }
}
.spike {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
  dl {
    width: 46%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    background: #fff3f4;
    margin: 5px 2%;
    dd {
      img {
        width: 65px;
        height: 70px;
        margin-top: 5px;
      }
    }
    dt {
      h3 {
        font-size: 18px;
        color: #323a45;
        padding-top: 4px;
      }
      p {
        font-weight: 300;
        font-size: 13px;
        line-height: 2;
        color: #757575;
      }
      span {
        display: block;
        font-size: 12px;
        width: 40px;
        margin: 0 auto;
        border-radius: 5px;
        color: #fff;
        text-align: center;
        background: linear-gradient(
          180deg,
          rgba(255, 135, 140, 1) 0%,
          rgba(255, 99, 107, 1) 100%
        );
      }
    }
  }
}
.spike dl:nth-child(2) {
  background: #fffcf2;
}
.spike dl:nth-child(3) {
  background: #f8f3ff;
}
.spike dl:nth-child(4) {
  background: #f1f9fd;
}

.spike dl:nth-child(2) dt span {
  background: linear-gradient(
    180deg,
    rgba(255, 220, 122, 1) 0%,
    rgba(255, 198, 71, 1) 100%
  );
}
.spike dl:nth-child(3) dt span {
  background: linear-gradient(
    180deg,
    rgba(130, 200, 255, 1) 0%,
    rgba(75, 177, 255, 1) 100%
  );
}
.spike dl:nth-child(4) dt span {
  background: linear-gradient(
    180deg,
    rgba(255, 161, 204, 1) 0%,
    rgba(255, 107, 174, 1) 100%
  );
}
.today {
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  padding: 0 10px;
  margin: 3px 0;
  line-height: 3;
  .today1 {
    font-size: 20px;
    padding-right: 10px;
  }
  .today2 {
    border-left: 2px solid #ccc;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .more {
    width: 36px;
    height: 16px;
    margin-top: 22px;
  }
}

.kh-list dl {
  display: flex;
  width: 100%;
  dt {
    width: 30%;
    img {
      width: 100%;
      height: 131px;
      padding: 20px 10px;
      box-sizing: border-box;
    }
  }
  dd {
    width: 70%;
    .over-h {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 300;
      font-size: 16px;
      line-height: 2;
      margin-top: 10px;
    }
    .present {
      display: flex;
      justify-content: space-between;
      font-weight: 300;
      font-size: 16px;
      line-height: 2;
      color: #999da2;
      progress {
        margin-top: 15px;
        width: 100px;
        height: 4px;
      }
      span {
        padding-right: 15px;
      }
    }
    .price {
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      float: bottom;
      margin-top: 10px;
      .nprice {
        font-size: 22px;
        color: #fc5d7b;
      }
      .oprice {
        text-decoration: line-through;
        line-height: 2;
        margin-top: 7px;
        font-size: 12px;
      }
      .btn {
        width: 80px;
        height: 33px;
        margin-top: 4px;
        margin-right: 10px;
      }
    }
  }
}

.good-thing {
  position: relative;
  margin-bottom: 20px;
  .cimg {
    width: 100%;
    height: 350px;
    display: block;
    padding: 6px 10px;
    box-sizing: border-box;
    border-radius: 4px;
  }
  swiper {
    width: 90%;
    margin: -195px 5% 30px 5%;
    text-align: center;
    img {
      width: 100%;
      height: 105px;
      padding: 2px;
      box-sizing: border-box;
    }
    .texts {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-size: 13px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .price {
      font-size: 13px;
      color: #fc5d7b;
    }
  }
  .indicator-dots{
    margin-top: 50px;
  }
  // .six {
  //   width: 90%;
  //   margin: 0 5%;
  //   position: absolute;
  //   background: red;
  //   top: 140px;
  //   clear: both;
  //   display: flex;
  //   flex-wrap: wrap;
  //   dl {
  //     width: 30%;
  //     margin: 1.5%;
  //     dt img {
  //       width: 123px;
  //       height: 123px;
  //     }
  //     dd {
  //       .texts {
  //         display: -webkit-box;
  //         -webkit-box-orient: vertical;
  //         -webkit-line-clamp: 1;
  //         font-size: 13px;
  //         text-overflow: ellipsis;
  //         overflow: hidden;
  //       }
  //       .price {
  //         color: #ff527f;
  //         font-size: 14px;
  //       }
  //     }
  //   }
  // }
}

/* 奶粉 */
.milk {
  width: 100%;
  .bigImg {
    width: 96%;
    height: 154px;
    margin: 0 2%;
    border-radius: 15px;
  }
  .bot {
    display: flex;
    margin-top: 20px;
    padding: 0 2%;
    height: 188px;
    box-sizing: border-box;
    .bot-left {
      width: 40%;
      img {
        width: 100%;
        height: 100%;
        padding-right: 2px;
        box-sizing: border-box;
      }
    }
    .bot-right {
      width: 60%;
      img {
        width: 100%;
        height: 50%;
        display: block;
      }
    }
  }
}

.milk .bot .bot-right img:nth-child(1) {
  padding-bottom: 2px;
  box-sizing: border-box;
}
.milk .bot .bot-right img:nth-child(2) {
  padding-top: 2px;
  box-sizing: border-box;
}
/* 为你精选 */
.choose {
  width: 100%;
  .milks {
    width: 100%;
    dl {
      display: flex;
      padding-right: 10px;
      box-sizing: border-box;
      margin: 10px 0;
      dt img {
        width: 100px;
        height: 108px;
        margin: 0 10px 0 10px;
      }
      dd {
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 14px;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-bottom: 10px;
          line-height: 2;
        }
        .discount {
          margin-bottom: 5px;
          span {
            border: 1px solid #fc5d7b;
            color: #fc5d7b;
            font-size: 10px;
            padding: 1px 3px;
            box-sizing: border-box;
            margin: 0 5px;
          }
        }
        .milkProce {
          color: #fc5d7b;
          line-height: 2;
          img {
            width: 21px;
            height: 10px;
            margin: 0 3px;
          }
          .ft14 {
            font-size: 14px;
          }
          .ft22 {
            font-size: 22px;
          }
          .ft16 {
            font-size: 16px;
          }
          .fcg {
            margin-left: 5px;
            color: #a87831;
            font-size: 10px;
          }
          .ft10 {
            font-size: 10px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(252, 93, 123, 1);
            line-height: 12px;
            background: #ffe8ed;
            margin-left: 5px;
            padding: 2px 0;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}

.footer {
  width: 100%;
  img {
    width: 100%;
    height: 154px;
    padding: 6px 10px;
    box-sizing: border-box;
    border-radius: 4px;
  }
}
/* #A87831 */
</style>
