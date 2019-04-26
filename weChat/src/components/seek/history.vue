<template>
  <div>
    <div class="history">
      <p>历史搜索</p>
      <img src="/static/seek/del.png" alt="" @touchend='clear'>
    </div>
    <div class="choice">
      <span v-for='(item,index) in history' :key="index" data-text="item" @click='historySearch(item)'>
        {{item}}
      </span>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  export default {
    props: ["callback"],
    data() {
      return {
        history: [],
       
      }
    },
    created() {
      if (!wx.getStorageSync('searchHistory').length) {
        this.history = [];
      } else {
        this.history = JSON.parse(wx.getStorageSync('searchHistory'))
      }
    },
    methods: {
      ...mapMutations({
        updateState: 'seek/updateState'
      }),
      ...mapActions({
        getSeekList: 'seek/getSeekList'
      }),
      clear() {
        wx.removeStorageSync('searchHistory');
        this.history = []
      },
      async historySearch(item) {
        // console.log(this.callback)
        // this.callback(item)
        this.updateState({productName:item})
        let data = await this.getSeekList(item);
        if (data.res_code == 1004) {
          this.updateState({
            isShow: {
              isDetail: false,
              isWithout: true,
              isHistory: false,
            }
          })
        } else if (data.res_code == 1) {
          this.updateState({
            isShow: {
              isDetail: true,
              isWithout: false,
              isHistory: false,
            }
          })
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .history {
    box-sizing: border-box;
    padding-top: 128rpx;
    display: flex;
    justify-content: space-between;
    p {
      width: 56px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
      margin-top: 15px;
      margin-left: 20px;
      margin-bottom: 15px;
    }
    img {
      height: 14px;
      width: 14px;
      margin-top: 15px;
      margin-right: 20px;
    }
  }

  .choice {
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    box-sizing: border-box;
  }

  span {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    padding: 5px 19px 5px 17px;
    background: rgba(245, 245, 244, 1);
    border-radius: 6px;
    margin-bottom: 15px;
    margin-right: 14px;
  }
</style>