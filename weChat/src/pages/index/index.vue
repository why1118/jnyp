<template>
 <div class="wrap">
    <scroll-view class="headers" scroll-x>
      <div class="recommend" @click="activeClass(100)">今日推荐</div>
      <ul class="ulList">
        <li v-for="(item,index) in typeList" :key="index" @click="actives(index,item)" :index="index">{{item.cname}}</li>
      </ul>
    </scroll-view>
    <Login/>
    <div>
      <Daily
        :swriperData="swriperData"
        :threeArr="threeArr"
        :spikeArr="spikeArr"
        :arrr3="arrr3"
        :arrr1="arrr1"
        :carouselProductData="carouselProductData"
        v-if="ind==100"
      />
      <ListType v-if="ind!=100" :ind="ind"/>
    </div>
  </div>
</template>
<script>
import Daily from "../../components/daily";
import ListType from "../../components/listType";
import Login from "../../components/user/login";
export default {
  data: {
    ind: 100, //显示每日推荐
    typeList: [], //顶头横滚数据
    swriperData: [], //轮播图的数据
    arrr1: [], //单个数据的数组
    arrr3: [], //三个数据的数组
    spikeArr: [], //秒杀好物数据
    threeArr: [], //三张图片
    carouselProductData: [], //最下面的数据
    obj: {} //遍历的次数
  },
  components: {
    Daily,
    ListType,
    Login
  },
  methods: {
    activeClass(index) {
      this.ind = index;
      console.log("顶部列表下标this.ind", this.ind);
    },
    actives(index,item) {
      // this.ind = index;
      // console.log('xxxxxxxx',item.cid)
      wx.navigateTo({
        url: "/pages/classify/main?cid="+item.cid
      });
    }
  },
  onShow() {
    // wx.clearStorage();
  },
  created() {
    var that = this;
    var str = "http://test.api.jinaup.com";
    //分类列表的数据   顶部滚动条数据  (yyy)
    wx.request({
      url: str + "/api/open/product/category/sub/1",
      data: {
        parentId: 0
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        // console.log("ressssss.", res); 
        that.typeList = res.data.result;
      }
    });
    // 最下面的数据
    wx.request({
      url: str + "/api/open/page/home/products/1.0.0",
      data: {
        pageIndex: 1
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        res.data.result.map((item, index) => {
          that.carouselProductData.push(item.productVo);
        });
      }
    });
    //(swiper)    轮播图   (yyyyy)
    wx.request({
      url: str + "/api/open/page/home/list/1.0.0",
      data: {},
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        // console.log("item.type", res.data.result);
        res.data.result.map((item, index) => {
          if (item.type == "carouselImg") {
            //轮播图
            that.swriperData = item.items;
          } else if (item.type == "spikeProduct") {
            //秒杀
            that.spikeArr = item.spike;
          } else if (item.type == "carouselProduct") {
            //一拖三的一
            //一拖三的三
            that.arrr1.push(item);
            that.arrr3.push(item.items);
          } else if (item.type == "adThree") {
            that.threeArr = item.items;
          }
        });
      }
    });
  }
};
</script>
<style lang='scss' scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.headers {
  display: flex;
  height: 44px;
  line-height: 44px;
  .recommend {
    position: absolute;
    left: 0;
    text-align: center;
    width: 20%;
    font-size: 16px;
    display: block;
    background: #fff;
    z-index: 999;
  }
  .active::after {
    content: "";
    width: 20px;
    height: 3px;
    background: #56d2bf;
    position: absolute;
    bottom: 0;
    left: 40%;
    font-weight: 600;
    color: #323a45;
  }
  .ulList {
    position: relative;
    width: 80%;
    display: flex;
    margin-left: 20%;
    white-space: nowrap;
    li {
      margin: 0 5px;
      font-size: 16px;
    }
    .active::after {
      content: "";
      width: 20px;
      height: 3px;
      background: #56d2bf;
      position: absolute;
      bottom: 0;
      left: 10%;
      font-weight: 600;
      color: #323a45;
    }
  }
}
</style>
