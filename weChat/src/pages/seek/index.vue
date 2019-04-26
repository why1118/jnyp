<template>
  <div class="wrapper">
    <!-- header -->
    <header>
      <div class="search">
          <img src="/static/seek/back.png" alt="" class="back" @touchend='back' >
        <div class="search-bg">
          <img src="/static/seek/search.png" alt="">
          <div class="search-input">
            <input type="text" placeholder="搜索" v-model="productName" @confirm="enters" />
          </div>
        </div>
        <div class="search-text" @touchend='cancel'>
          取消
        </div>
      </div>
    </header>
    <History v-if='isShow.isHistory' :callback='callback' />
    <Without v-if='isShow.isWithout' />
    <Detail v-if='isShow.isDetail' :list='list' />
  </div>
</template>
<script>
import Without from '@/components/seek/without'
import History from '@/components/seek/history'
import Detail from '@/components/seek/detali.vue'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      productName: ''
    }
  },
  watch: {
    productName: function(val){
      if(!val){
        this.updateState({
          isShow: {
            isDetail: false,
            isWithout: false,
            isHistory: true,
          }
        })
      }
    }
  },
  components: {
    History,
    Without,
    Detail
  },
  computed: {
    // vuex中属性
    ...mapState({
      productName: state => state.seek.productName,
      list: state => state.seek.list,
      isShow: state => state.seek.isShow,
    })
  },
  onShow() {
    this.updateState({
      isShow: {
        isDetail: false,
        isWithout: false,
        isHistory: true,
      }
    })
  },
  methods: {
    // vuex中的方法
    ...mapMutations({
      updateState: 'seek/updateState'
    }),
    ...mapActions({
      getSeekList: 'seek/getSeekList'
    }),
    // 回车进行搜索
    async enters() {
      // 输入为空不执行
      if (!this.productName) {
        return
      }

      // 本地存储
      let searchHistory = null;
      if (!wx.getStorageSync('searchHistory').length) {
        searchHistory = []
      } else {
        searchHistory = JSON.parse(wx.getStorageSync('searchHistory'))
      }
      if (searchHistory.indexOf(this.productName) === -1) {
        searchHistory.push(this.productName);
      }
      wx.setStorageSync('searchHistory', JSON.stringify(searchHistory))

      // 获取数据
      let data = await this.getSeekList(this.productName);

      // 判断不同的res_code显示不同的组件
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
      };

      // 存放搜索内容
      this.updateState({
        productName: this.productName
      });
    },

    // 返回上个页面
    back(){
      wx.navigateBack()
    },

    // 取消
    cancel(){
      this.productName = '';
      this.updateState({
        isShow: {
          isDetail: false,
          isWithout: false,
          isHistory: true,
        }
      })
    },
  },
}

</script>


<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  .back{
    height: 18px;
    width: 10px;
    margin-top: 5px;
    margin-left: 10px;
  }
  .wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  header {
    position: fixed;
    top: 0;
    z-index: 666;
    width: 100%;
    background: rgb(249, 249, 249);
    height: 128rpx;
    box-sizing: border-box;
    padding-top: 52rpx;

  }

  .search {
    display: flex;
    font-size: 14px;
    height: 60rpx;
  }

  .search-bg {
    width: 191px;
    height: 28px;
    box-sizing: border-box;
    display: flex;
    background: #EDEDED;
    overflow: hidden;
    border-radius: 5px;
    margin-left: 20px;
    img {
      height: 16px;
      width: 16px;
      margin: 5px;
    }
    .search-input {
      line-height: 30px;
      border: none;
      height: 30px;
      background: rgba(237, 237, 237, 1);
      border-radius: 5px;
    }
  }

  .search-text {
    width: 28px;
    height: 14px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 157, 162, 1);
    line-height: 14px;
    margin-top: 8px;
    margin-left: 16px;
  }
</style>