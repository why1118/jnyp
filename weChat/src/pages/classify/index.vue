<template>
  <div class="wrap">
    <scroll-view scroll-x="true" class="chun">
      <li @click="btn">今日推荐</li>
      <li @click="clickType(index, item.cid)" v-for="(item, index) in list" :key="index" :class="active===index?'active':''">
        {{item.cname}}
      </li>
    </scroll-view>
    <div class="main">
      <div v-for="(items, indexs) in lists" :key="indexs" class="center" @click="clickSubType(items.cid)">
        <img :src="items.imgUrl" class="tu">
        <span class="txt">{{items.cname}}</span>
      </div>
      <!-- <div>
        没有该数据
      </div> -->
    </div>
    <ul class="tbar">
      <li @click="clickSortType(1)">综合</li>
      <li @click="clickSortType(2)">最新</li>
      <li class="prices">
         <b @click="clickSortType(3)">价格</b>
         <span :class="isShow===true?'addActive1':'pri-top'" >△</span>
         <span :class="isShow===false?'addActive2':'pri-bottom'">▽</span>
      </li> 
    </ul>
   
    <div class="dls">
          <dl v-for='(item,index) in props' :key="index" class="dl-re" @click="clickItem(item.pid)">
            <dt>
              <span>
                <img :src="item.mainImgUrl" alt="">
              </span>
            </dt>
            <dd>
              <h3>{{item.title}}</h3>
              <div class="coupon">
                <span v-if="item.isFreeTax===1">包税</span>
              </div>
              <div class="price">
                <div>
                  <b>￥</b>
                  <b>{{item.salesPrice}}</b>
                </div>
                <span class="left">￥{{item.supplyPrice}}</span>
              </div>
            </dd>
          </dl>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions
} from "vuex"
export default {
  data() {
    return {
      page: 1,
      cid: '',
      sortType: 1,
      // hasMore: true,
      active: 0,
      listProps: [],
      datas: [],
      isShow:true
    }
},
  computed: {
    ...mapState({
      list: state => state.classify.list,
      props: state => state.classify.props
    }),
    // 子分类
    lists(){
      if (this.list && this.list.length){
        return this.list[this.active].childs;
      }
      return [];
    },
    // 判断是否还有更多
    hasMore(){
      return this.page*20 === this.props.length
    }
  },
  methods: {
    ...mapMutations({
        appuserState:'classify/appuserState'
    }),
    ...mapActions({
      getList: 'classify/getList',
      getProps: 'classify/getProps'
    }),
    // 获取数据接口
    async fetchData(){
      wx.showLoading({
        title: '数据加载中...', //提示的内容,
        mask: true, //显示透明蒙层，防止触摸穿透,
      });
      let result = await this.getProps({
        pageIndex: this.page,
        cid: this.cid,
        sortType: this.sortType
      });
        wx.hideLoading();
    },
    // 点击跳转详情
    clickItem(id) {
      wx.navigateTo({
        url: "/pages/go2detail/main?id="+id
      })
    },
    // 一级分类点击
    clickType(ind, cid) {
      this.active = ind
      this.cid = cid;
      this.page = 1;
      // 重新请求数据
      this.fetchData();
    },
    // 二级分类点击
    clickSubType(cid){
      this.cid = cid;
      this.page = 1;
      // 重新请求数据
      this.fetchData();
    },
    // 分类条件点击
    clickSortType(sort){
    this.sortType = sort;
    this.page = 1;
    // 重新请求数据
    // this.fetchData();
    this.isShow = !this.isShow;
    //排序
    if(this.isShow === true){
        this.props.sort((a, b) => {
          return  b.salesPrice - a.salesPrice
        }) 
        this.appuserState(this.props)
      }else{
      this.props.sort((a, b) => {
        return a.salesPrice-b.salesPrice
      })
      this.appuserState(this.props)
      } 
    }
 },
  onReachBottom(){
    if (this.hasMore){
      this.page++;
      this.fetchData();
    }
  },
  onLoad(options) {
    this.active = options.index || 0;
  },
  async onShow(){
    let data = await this.getList();
    this.cid = this.list[this.active].cid;
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>

  .wrap {
    width: 100%;
    background: #F6F6F6;
    .chun {
      width: 100%;
      display: flex;
      white-space: nowrap;
      height: 100rpx;
      background: #fff;
      li {
        font-size: 32rpx;
        display: inline-block;
        height: 100rpx;
        text-align: center;
        color: #484848;
        box-sizing: border-box;
        margin: 0 20rpx;
      }
      li.active {
        border-bottom: solid #56D2BF 6rpx;
        line-height: 94rpx;
        font-weight: 500;
        color: red;
      }
    }
    .main {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      .center {
        width: 25%;
        display: inline-block;
        padding: 20rpx;
        box-sizing: border-box;
        text-align: center;
        .tu {
          width: 100rpx;
          height: 100rpx;

        }
        .txt {
          font-size:24rpx;
          display: block;
           padding:12rpx 0;
          box-sizing: border-box;
        }
      }
    }
    .tbar {
      width: 100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background: #ffffff;
      margin-top: 10rpx;
      li {
        font-size: 13px;
        font-weight: 400;
      }
    }
    .dls{
      flex: 1;
      width: 100%;
      height: 100%;
      background: #F3F7F7;
      padding:9px 5px 0 5px;
      box-sizing: border-box;
      display: flex;
      flex-wrap:wrap;
      justify-content: space-between;
      dl{
        width: 363rpx;
        height: 536rpx;
        background: #fff;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        margin-top:4px;
        padding:0 15px;
        box-sizing: border-box;
        dt{
          padding:30px 23px 15px 14px;
          box-sizing: border-box;
          span{
            display: block;
            width:295rpx;
            height: 277rpx;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        dd{
          width: 100%;
          flex:1;
          h3{
            font-size:12px;
            padding-left:5px;
            color:#323A45;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }
          .coupon{
            width: 100%;
            display: flex;
            padding-left:6px;
            padding-top:10px;
            box-sizing: border-box;
            >span{
              display: block;
              padding:0 5px;
              box-sizing: border-box;
              color: #FC5D7B;
              border:1px solid #FC5D7B;
              border-radius: 3px;
              font-size:10px;
            }
          }
          .price{
            width: 100%;
            display: flex;
            align-items: flex-end;
            padding:10px 0;
            div{
              display: flex;
              align-items: flex-end;
              padding-left:3px;
                b{
                  color:#FC5D7B;
                  &:nth-child(1){
                    font-size:14px;
                  }
                  &:nth-child(2){
                    font-size:18px;
                  }
                  &:nth-child(3){
                    font-size:14px;
                  }
                }
            }
            span{
              font-size:11px;
              color:#A87831;
              padding:5rpx 5rpx;
              box-sizing: border-box;
            }
          }
        }
      }
    }
     .prices{
        position: relative;
      }
     .pri-top{
      position: absolute;
      top:19rpx;
      right:-25rpx;
      overflow:hidden;
      font-size:0;
      line-height:0;
      border-width:5px;
      border-style:solid dashed dashed dashed;
      border-color:  transparent transparent #D8D8D8 transparent;
    }
 .pri-bottom{
    position: absolute;
    top:49rpx;
    right:-25rpx;
    overflow:hidden;
    font-size:0;
    line-height:0;
    border-width:5px;
    border-style:solid dashed dashed dashed;  
    border-color: #D8D8D8 transparent transparent transparent;
 }
 .addActive1{
    position: absolute;
    top:19rpx;
    right:-25rpx;
    overflow:hidden;
    font-size:0;
    line-height:0;
    border-width:5px;
    border-style:solid dashed dashed dashed;
    border-color:  transparent transparent #FC5D7B transparent;
 }
 .addActive2{
    position: absolute;
    top:49rpx;
    right:-25rpx;
    overflow:hidden;
    font-size:0;
    line-height:0;
    border-width:5px;
    border-style:solid dashed dashed dashed;  
    border-color: #FC5D7B transparent transparent transparent;
  }
}

</style>
