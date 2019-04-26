<template>
    <div class="left">
        <dl>
          <dt>
            <image src="/static/images/1.png" />
          </dt>
          <dd>
            <span><b>默默许愿…</b>分享给你一个商品</span>
            <span>邀请码：C5JQD7O</span>
          </dd>
        </dl>
        <div class="bigImg">
          <image src="/static/images/2.png"/>
        </div>
        <div class="text">雅诗兰黛口红420倾慕唇膏 保湿滋润玫瑰豆沙 色顺丰免邮</div>
        <div class="foot">
          <div class="footLeft">
            <p>
              <span>
                <i>￥</i><b>168</b>
              </span>
              <span>￥499</span>
            </p>
            <p>长按识别二维码访问</p>
          </div>
          <div class="footRight">
            <image src="/static/images/3.png"/>
          </div>
        </div>
      </div>

</template>

<script>
export default {
  data () {
  },

  components: {
  },

  methods: {

  },
}
</script>

<style scoped>
.left {
  width: 100%;

  padding: 0 30rpx;
  box-sizing: border-box;
}

.left dl {
  width: 100%;
  display: flex;
  height: 100rpx;
  display: flex;
  align-items: center;
}
.left dl dt {
  width: 18%;
  text-align: center;

}
.left dl dt image {
  width: 87rpx;
  height: 87rpx;
}

.left dl dd {
  font-size: 30rpx;
  flex: 1;
  line-height: 33rpx;
  display: flex;
  flex-direction: column;
}
.left dl dd span{
  margin-bottom: 10rpx;
  display: flex;
}
.left dl dd span b{
  color: #5D9AFC;
}
.bigImg {
  width: 100%;

}
.bigImg image {
  width: 100%;
  margin-top: 100rpx;

}

.text {
  width: 100%;
  margin-top: 30rpx;
}

.foot {
  height: 195rpx;
  display: flex;
  justify-content: space-between;
  margin-top: 25rpx;
  padding: 0 15rpx;
  box-sizing: border-box;
}
.footLeft p:first-child {
  display: flex;
  margin-top:60rpx;
  height: 50rpx;
  align-items: center;

}
.footLeft p:first-child span {
  font-size:28rpx;
  display: flex;
}
.footLeft p:first-child span i {
  margin-top: 20rpx;
  color: #FC5D7B;
}
.footLeft p:first-child span b {
  color: #FC5D7B;
  font-size:50rpx;
  font-weight:600;
}

.footLeft p:first-child span:last-child {
  color: #999DA2;
  margin-top: 5rpx;
  margin-left: 15rpx;
  text-decoration: line-through;
}

.footLeft p:last-child {
   margin-top: 20rpx;
   color: #999DA2;
}

.footRight image {
  width: 180rpx;
  height: 180rpx;
  margin-top: 10rpx;
}

</style>
