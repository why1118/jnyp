<!--  -->
<template>
  <section>
      <div class="null">
      <div class="infos">
        <image class="zanwu" src="/static/images/暂无.png" />
        <p class="kong">暂时没有可用优惠券哦～</p>
      </div>
    </div>
  </section>
</template>

<style lang='scss' scoped>
section {
  width: 100%;
  display: flex;
  flex: 1;
  overflow-y: scroll;
  background: #f3f7f7;
}
.null {
  flex: 1;
  display: flex;
  padding-top: 169px;
  justify-content: center;
  background: rgba(243, 247, 247, 1);
}
.kong {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 157, 162, 1);
  margin-top: 37px;
}
.zanwu {
  width: 119px;
  height: 104px;
  display: block;
  margin: 0 auto;
}
</style>
