<template>
    <div class="wrap">
        <ul class="list">
            <li>
                <label for>手机号</label>
                <input type="number" v-model="userphone" placeholder="请输入新手机号">
            </li>
            <li>
                <label for>验证码</label>
                <input type="number" v-model="identifyCode" placeholder="请输入验证码">
                <button
                    class="yzm"
                    :class="identifyBtn?'yzmdis':''"
                    :disabled="identifyBtn"
                    @click="getIdentify">{{cont}}</button>
            </li>
        </ul>
        <button
            :class="disabledFn?'':'disable'"
            :disabled="!disabledFn"
            @click="save" id="btn">验证后绑定新手机</button>
        <!-- <button @click='autonym'>实名</button> -->
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    data() {
        return {
        cont: "获取验证码",
        userphone: "", //手机号
        identifyCode: "", //验证码
        num: 59,
        identifyBtn: false
        };
    },
    computed: {
        ...mapState({
          wxOauthJson: state=>state.user.wxOauthJson
        }),
        //是否禁用绑定按钮
        disabledFn() {
            let reg = /^1[34578]\d{9}$/;
            if (!this.userphone.trim()) {
                return false;
            }
            if (!reg.test(this.userphone)) {
                return false;
            }
            if (!this.identifyCode.trim()) {
                return false;
            }
            return true;
        }
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: "绑定手机号"
        });
    },
    methods: {
        ...mapActions({
            etIdentify: "phone/etIdentify",
            bindPhone: "phone/bindPhone"
        }),

        ...mapMutations({
            updateState: "user/updateState",
        }),

        //获取验证码
        async getIdentify(ev) {
            //判断手机号
            let reg = /^1[34578]\d{9}$/;
            if (this.userphone == "") {
                wx.showToast({
                title: "手机号不能为空",
                icon: "none",
                duration: 1000
                });
                return false;
            } else if (!reg.test(this.userphone)) {
                wx.wx.showToast({
                title: "请输入正确的手机号",
                icon: "none",
                duration: 1000
                });
                return false;
            } else {
                //请求获取验证码
                let result = await this.etIdentify({ userphone: this.userphone });
                console.log("getcode", result);
                let that = this;
                that.num = 59;
                let timer = setInterval(() => {
                    that.identifyBtn = true;
                    that.cont = that.num-- + "s重新发送";
                    if (this.num < 0) {
                        clearInterval(timer);
                        this.cont = "获取验证码";
                        that.identifyBtn = false;
                    }
                }, 1000);
            }
        },

        //绑定手机号
        async save() {
            let userphone = this.userphone;
            let phoneCode = this.identifyCode;
            let result = await this.bindPhone({
              userphone: userphone,
              phoneCode: phoneCode,
              wxOauthJson: this.wxOauthJson
            });
            this.updateState({tranckid: result.result.trackId})
        }

        // autonym(){
        //   wx.navigateTo({
        //     url: '../autonym/main'
        //   })
        // }
    }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(243, 247, 247, 1);
}
.list {
  width: 100%;
  height: 180rpx;
  display: flex;
  flex-direction: column;
  padding: 0 24rpx;
  box-sizing: border-box;
  background: #fff;
  li {
    width: 100%;
    height: 90rpx;
    display: flex;
    align-items: center;
    position: relative;
    button {
      width: 100px;
      height: 30px;
      padding: 0;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(252, 93, 123, 1);
      line-height: 30px;
      background: #fff;
      border-radius: 15px;
      border: 1px solid rgba(252, 93, 123, 1);
      position: absolute;
      right: 0;
    }
    button.yzmdis {
      color: rgba(153, 157, 162, 1);
    }
  }
  label {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(50, 58, 69, 1);
    line-height: 20px;
    padding-left: 10rpx;
    box-sizing: border-box;
    margin-right: 88rpx;
  }
  input {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 157, 162, 1);
  }
  li:first-child {
    border-bottom: 2rpx solid rgba(243, 247, 247, 1);
    box-sizing: border-box;
  }
}
.wrap > button {
  width: 92%;
  height: 50px;
  margin: 60px auto;
  background: rgba(51, 214, 197, 1);
  border-radius: 7px;
  font-size: 18px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 50px;
  text-align: center;
}
.disable {
  background: rgba(51, 214, 197, 1);
  opacity: 0.5;
}
</style>
