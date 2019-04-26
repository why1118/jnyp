<template>
  <div class="wrap">
    <image src="/static/images/man_2.jpg" mode="widthFix" alt=""></image>
    <div class="refer">
      <input type="text" v-model="value" focus placeholder="请输入邀请码">
      <button :class="status?'able':''" @click="submit">提交</button>
    </div>
    <div class="visitor" :id="showGroup?'':'show'">
        <dl @click="jionGroup(group)">
          <dd>
            <image :src="group.headUrl" mode="widthFix"></image>
          </dd>
          <dt>
            <h3>{{group.nickName}}</h3>
            <p>邀请您加入积纳有品</p>
          </dt>
        </dl>
    </div>
    <div class="hint">- 无邀请码可选择以下团队加入 -</div>
    <ul class="list">
      <li v-for="(item,index) in listInvite" :key="index">
        <image :src="item.headUrl" mode="widthFix" alt=""></image>
        <div class="content">
          <p class="name">{{item.nickName}}</p>
          <p class="group">团队人数: {{item.updateTime}}</p>
        </div>
        <span @click="jionGroup(item)">立即加入</span>
      </li>
    </ul>
    <!-- <div :class="{mask:tag,masks:!tag}">
        <button class="btn" open-type="getUserInfo" type="primary" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">用户登录</button>
    </div> -->
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from "vuex";
  export default {
    data() {
      return {
        showGroup:false,//邀请码正确
        value:"",//text文本框的值
        tag : true,//控制遮罩显示隐藏,
        listInvite:[],
        group:{},//返回正确的群信息
      }
    },

    components: {
    },
    methods: {
      ...mapActions({
          bindPhone: "phone/bindPhone",
          Invite:"invite/InviteCode",
          list:"invite/InviteList",
          bind:"invite/InviteBind"
      }),
      //提交邀请码
      async submit(){
        if(!this.value){
          wx.showToast({
            title: "请输入邀请码",
            icon: "none",
            duration: 1000
          });
          return false
        }
        let value = this.value;
        let data = await this.Invite({inviteCode:value})
        console.log("datata.......",data)
        if(data.data.res_code==1004){
          wx.showToast({
            title: "没有查询到群",
            icon: "none",
            duration: 1000
            });
        }
        if(data.data.res_code==1){
          this.showGroup=true;
          this.group=data.data.result;
        }
        console.log(this.value)
        this.value=""
      },

      //绑定联系人
      async jionGroup(data){
        console.log(data)
        var uid=data.uid,
            nickName=data.nickName;
        let dataResult = await this.bind({
          uid,
          nickName
        })
        wx.showToast({
          title: dataResult.data.message,
          icon: "none",
          duration: 1000
        });
        if(dataResult.data.res_code==1){
          wx.showModal({
            title: '绑定成功',
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url:"/pages/index/main"
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }

        console.log("绑定结果",dataResult)
      }
    },
    async onLoad() {
      let data = await this.list()
      this.listInvite = data.data.result;
      console.log("data..........",this.listInvite)
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    image {
      width: 100%;
    }

    .refer {
      width: 100%;
      display: flex;
      margin-top: 20px;
      margin-bottom: 10px;

      input {
        width: 299px;
        height: 50px;
        background: rgba(243, 247, 247, 1);
        border-radius: 8px 0px 0px 8px;
        text-align: center;
        line-height: 50px;
        margin-left: 17px;
      }

      button {
        width: 81px;
        height: 50px;
        background: rgba(51, 214, 197, 1);
        border-radius: 0px 8px 8px 0px;
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
        margin-right: 17px;
      }

      .able {
        background: rgba(147, 230, 222, 1);
      }
    }

    .visitor {
      width: 340px;
      height: 84px;
      margin-left: 17px;
      margin-right: 17px;
      border-radius: 8px;
      display: flex;
      justify-content: space-around;
      border: 1px solid rgb(180, 159, 159);
      dl{
        width:60%;
        height:100%;
        display: flex;
        align-items: center;
      }
      dl>dd>image{
        width:60px;
      }
      dl>dt{
        margin-left:10px;
      }
      dl>dt>p{
        font-size: 12px;
        color: #ccc;
      }
    }
    #show {
      display: none;
    }
    .hint {
      width: 220px;
      height: 20px;
      font-size: 12px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(153, 157, 162, 1);
      padding: 28px 94px 22px 94px;
    }
    .list {
      width: 100%;
      overflow: scroll;

      li {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;

        image {
          width: 75px;
          margin-top: 13px;
          margin-left: 20px;
        }

        .content {
          flex: 1;
          box-sizing: border-box;
          padding-left: 25px;

          .name {
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(50, 58, 69, 1);
            line-height: 22px;
          }

          .group {
            font-size: 14px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(153, 157, 162, 1);
            line-height: 20px;
          }
        }

        span {
          width: 81px;
          height: 30px;
          background: rgba(51, 214, 197, 1);
          border-radius: 7px;
          text-align: center;
          line-height: 30px;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin-right: 14px;
        }
      }
    }
    .mask {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: rgba(145, 110, 110, 0.3);
      z-index: 99;
    }
    .btn {
      width: 80%;
      margin-left: 10%;
      margin-top: 50%;
      background: skyblue;
    }
    .masks{
      display: none;
    }
  }

</style>

