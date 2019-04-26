<!-- 优惠券列表 -->
<template>
  <section>
    <ul>
      <div class="pick" v-for="(item,index) in list" :key="index">
        <div class="lefb"></div>
        <div class="rigb"></div>
        <div class="line"></div>
        <li>
          <div class="pink">
            <div class="left">
              <div class="money">
                <p>￥</p>
                <p>180</p>
              </div>
              <span>满￥1000使用</span>
            </div>
            <div class="center">
              <span class="newPerson">新人礼满 1000减180</span>
              <span class="Expire">{{item.endTime}}到期</span>
            </div>
            <div class="right">
              <button>立即使用</button>
            </div>
            <div class="warehouse">
              <span>{{item.description}}</span>
            </div>
          </div>
        </li>
      </div>
    </ul>
  </section>
</template>

<script>
  export default {
    props: ['list']
  };
</script>

<style scoped>
  section {
    width: 100%;
    display: flex;
    flex: 1;
    overflow-y: scroll;
    background: #f3f7f7;
  }
  .pick {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 184rpx;
    border: 1px solid #ccc;
    margin: 0 auto;
    margin: 50rpx 20rpx 32rpx 20rpx;
    background: linear-gradient( 236deg, rgba(253, 158, 163, 1) 0%, rgba(254, 122, 173, 1) 100%);
    border: 1px solid rgba(252, 93, 123, 1);
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
    box-sizing: border-box;
  }
  .lefb,
  .rigb {
    width: 12px;
    height: 24px;
    background-color: #f3f7f7;
  }
  .lefb {
    position: absolute;
    bottom: -34rpx;
    left: -1rpx;
    border-radius: 0 50px 50px 0;
  }
  .rigb {
    position: absolute;
    bottom: -34rpx;
    right: -1rpx;
    border-radius: 50px 0 0 50px;
  }
  .line {
    position: absolute;
    height: 182rpx;
    left: 0;
    border: 2rpx dashed #ffffff;
    margin-left: 254rpx;
  }
  .pink {
    display: flex;
  }
  .left {
    display: flex;
    flex-direction: column;
    color: #ffffff;
  }
  .money {
    display: flex;
    align-items: flex-end;
  }
  .money p:nth-child(1) {
    font-size: 30rpx;
    margin: 56rpx 0 14rpx 50rpx;
  }
  .money p:nth-child(2) {
    font-size: 72rpx;
    margin: 12rpx 12rpx 0 6rpx;
  }
  .left span {
    font-size: 24rpx;
    margin: 0 54rpx 46rpx 50rpx;
  }
  .center {
    display: flex;
    flex-direction: column;
    color: #ffffff;
  }
  .newPerson {
    font-size: 28rpx;
    margin: 38rpx 0 22rpx 24rpx;
  }
  .Expire {
    font-size: 24rpx;
    margin: 0 0 50rpx 24rpx;
  }
  .right button {
    width: 140rpx;
    height: 56rpx;
    background: #ffffff;
    font-size: 20rpx;
    text-align: center;
    line-height: 56rpx;
    margin: 76rpx 0 50rpx 30rpx;
    color: #fc5d7b;
  }
  .warehouse {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -60rpx;
    height: 60rpx;
    margin-right: 20rpx;
    background: #ffffff;
    font-size: 24rpx;
    line-height: 60rpx;
  }
  .warehouse span {
    margin-left: 30rpx;
  }
</style>
