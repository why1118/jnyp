<template>
  <div class="Couponlist">
    <header>
      <span
        v-for="(item,index) in types"
        :key="index"
        :class="active===index?'active':''"
        @click="tabChange(index)"
      >{{item}}</span>
    </header>
    <ConponList v-if="isShow.isConponList" :list="showList"></ConponList>
    <Null v-if="isShow.isNull"></Null>
  </div>
</template>

<script>
import ConponList from "@/components/conpon/conponList";
import Null from "@/components/conpon/null";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  onLoad() {
    wx.setNavigationBarTitle({ title: "优惠券" });
  },
  data() {
    return {
      types: ["未使用", "已使用", "已过期"]
    };
  },
  components: {
    ConponList,
    Null
  },
  computed: {
    ...mapState({
      active: state => state.coupon.active,
      list: state => state.coupon.list,
      isShow: state => state.coupon.isShow
    }),
    showList(){
      return this.list.filter(item=>item.state == this.active);
    }
  },
  methods: {
    ...mapMutations({
      updateState: "coupon/updateState"
    }),
    ...mapActions({
      getList: "coupon/getList"
    }),
    async tabChange(index) {
      this.updateState({
        active: index
      });
      let data=await this.getList({
        list:this.list,
        active:this.active
      });
      if(index==1){
        this.updateState({
          isShow: {
            isConponList: true,
            isNull: false
          }
        });
      }
      // console.log('jfjhfjhghuhfigh',data);
      if(data.res_code==1){
        this.updateState({
          isShow: {
            isConponList: true,
            isNull: false
          }
        });
      }
    }
  },
  onShow() {
     this.updateState({
          isShow: {
            isConponList: false,
            isNull: true
          }
        });
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.Couponlist {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
header {
  width: 100%;
  height: 84rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #484848;
  line-height: 84rpx;
  font-size: 30rpx;
  box-sizing: border-box;
  span{
    border-bottom: 4rpx solid transparent;
  }
}
header span.active {
  border-bottom: 4rpx solid #33d6c5;
}
</style>
