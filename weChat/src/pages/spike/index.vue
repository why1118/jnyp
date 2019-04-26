<template>
  <div class="wrap">
    <div class="top">
      <img src="/static/images/32.png" alt>
      <div class :class="reachbottom?'tabs posi':'tabs'">
        <ul class="list">
          <li :class="idx==1?'size active':'size'" @click="changes(1)">正在疯抢</li>
          <li :class="idx==2?'size active':'size'" @click="changes(2)">明日11：00</li>
        </ul>
        <div class="lowTimes">
          <span></span>
          <span>本场还剩{{times}}</span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="bot">
      <SpikeCom :arr="arr"/>
    </div>
    <p class="alls">全部加载完毕</p>
  </div>
</template>
<script>
import SpikeCom from "../../components/spikeCom";
export default {
  data: {
    idx: 1,
    reachbottom: false,
    arr: "",
    times: ""
  },
  components: {
    SpikeCom
  },
  onPageScroll: function(res) {
    if (res.scrollTop > 200) {
      this.reachbottom = true;
    } else {
      this.reachbottom = false;
    }
  },
  onShow() {
    var that = this;
    wx.request({
      url: "http://test.api.jinaup.com/api/open/product/seckill/query/1",
      data: {
        pageIndex: 1,
        dayType: 1
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        that.arr = res.data.result.spike;
      }
    });
  },
  // 清楚本地存储数据
  onShow() {
    wx.clearStorage();
  },
  mounted() {
    var that = this;

    setInterval(() => {
      var date = new Date();
      var nowDate = date.getTime(); // 当前时间
      // console.log('nowDate', nowDate)
      var str = "2019/4/3 00:00:00"; //后一天
      var nextDate = new Date(str);
      var leftTime = nextDate - nowDate;
      // console.log('leftTime', leftTime)
      var d, h, m, s;
      if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        m = Math.floor((leftTime / 1000 / 60) % 60);
        s = Math.floor((leftTime / 1000) % 60);
      }
      // console.log(d, h, m, s)
      if (h < 10) {
        h = "0" + h;
      } else if (m < 10) {
        m = "0" + m;
      } else if (s < 10) {
        s = "0" + s;
      }
      that.times = h + ":" + m + ":" + s;
      // console.log(that.times)
    }, 1000);
  },
  methods: {
    changes(val) {
      var that = this;
      if (val == 1) {
        that.idx = val;
        wx.request({
          url: "http://test.api.jinaup.com/api/open/product/seckill/query/1",
          data: {
            pageIndex: 1,
            dayType: that.idx
          },
          method: "post",
          header: {
            "content-type": "application/x-www-form-urlencoded" // 默认值
          },
          success(res) {
            that.arr = res.data.result.spike;
            // console.log(that.arr);
          }
        });
      } else if (val == 2) {
        that.idx = val;
        wx.request({
          url: "http://test.api.jinaup.com/api/open/product/seckill/query/1",
          data: {
            pageIndex: 1,
            dayType: that.idx
          },
          method: "post",
          header: {
            "content-type": "application/x-www-form-urlencoded" // 默认值
          },
          success(res) {
            if (res.data.result == null) {
              that.arr = null;
            } else {
              that.arr = res.data.result.spike;
            }
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: #f3f7f7;
}
.top {
  width: 100%;
}
.posi {
  position: fixed;
  top: 0;
  width: 100%;
}
.top img {
  width: 100%;
  height: 208px;
  display: block;
}
.top .list {
  display: flex;
}
.top .list .size {
  flex: 1;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 20px;
  color: #fff;
  background: #e2be98;
}
.top .list .active {
  background: #323a45;
}
.top .lowTimes {
  background: #fff;
  display: flex;
  justify-content: space-around;
  height: 54px;
  line-height: 54px;
}
.top span:nth-child(1),
.top span:nth-child(3) {
  display: inline-block;
  width: 81px;
  height: 1px;
  margin-top: 26px;
  background: #999da2;
}
.bot {
  margin-top: 10px;
  background: #fff;
  overflow-y: auto;
}
.kh-list dl {
  display: flex;
  width: 100%;
}
.kh-list dl dt {
  width: 30%;
}
.kh-list dl dt img {
  width: 100%;
  height: 131px;
  padding: 20px 10px;
  box-sizing: border-box;
}
.kh-list dl dd {
  width: 70%;
}
.kh-list dl dd .over-h {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 300;
  font-size: 16px;
  line-height: 2;
  margin-top: 10px;
}
.kh-list dl dd .present {
  display: flex;
  justify-content: space-between;
  font-weight: 300;
  font-size: 16px;
  line-height: 2;
  color: #999da2;
}
.kh-list dl dd .present progress {
  margin-top: 15px;
  width: 100px;
  height: 4px;
}
.kh-list dl dd .present span {
  padding-right: 15px;
}
.kh-list dl dd .price {
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  float: bottom;
  margin-top: 10px;
}
.kh-list dl dd .price .nprice {
  font-size: 22px;
  color: #fc5d7b;
}
.kh-list dl dd .price .oprice {
  text-decoration: line-through;
  line-height: 2;
  margin-top: 7px;
  font-size: 12px;
}
.kh-list dl dd .price .btn {
  width: 80px;
  height: 33px;
  margin-top: 4px;
  margin-right: 10px;
}
.alls {
  background: #f3f7f7;
  line-height: 3;
  text-align: center;
  color: #999da2;
}
</style>

