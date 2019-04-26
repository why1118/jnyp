<template>
  <div class="wrap">
    <from @submit="submit" report-submit>
      <ul class="sm_input">
        <li class="line">
          <lable for>真实姓名</lable>
          <input type="text" placeholder="请输入身份证姓名" focus v-model="idName">
        </li>
        <li>
          <lable for>身份证号</lable>
          <input type="number" placeholder="请输入身份证号" focus v-model="idNumber">
        </li>
      </ul>
      <div class="sm_img" >
        <h1>
          上传身份证照片
          <span>(图片png、jpg,大小不超过5M)</span>
        </h1>
        <div>
          <div class="img_left" @click="takePic('front')">
            <img v-if="front.path" :src="front.path" alt mode="aspectFill">
            <div v-else class="bagroung">
              <div class="backg">
                <img class="pic" src="/static/images/creame.png" alt mode="widthFix">
              </div>
              <p>正面照片</p>
            </div>
          </div>
          <div class="img_right" @click="takePic('back')">
            <img v-if="back.path" :src="back.path" alt mode="aspectFill">
            <div v-else class="bagroung">
              <div class="backg">
                <img class="pic" src="/static/images/creame.png" alt mode="widthFix">
              </div>
              <p>反面照片</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="sm_h2">为什么需要实名认证?</h2>
        <ol class="sm_list">
          <li><b>●</b>根据海关规定,购买跨境商品需要办理清关手续,请您配合进行实名认证,以确保您购买分的商品顺利通过·海关检查。(积纳有品海购承诺所传身份证明只用于办理跨境商品的清关手续,不做他途使用,其他任何人均法查看)</li>
          <li><b>●</b>实名认证的规则:购买跨境商品需填写积纳账号注册·人的真实姓名、身份证号码及与实名一致的手机号,部分商品下单时需提供收货人的实名信息(含身份证照片)，具体请以下单时的提示为准。</li>
        </ol>
      </div>
      <button form-type="submit" class="save" @click="submit">保存</button>
    </from>
  </div>
</template>
<script>

import Login from "@/components/user/login.vue";
import { getAuth } from "@/utils/index";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      src: [],
      front: {},
      back: {},
      idNumber: "",
      idName: ""
    };
  },
  components: {
    Login
  },
  computed: {

  },
  methods: {
    ...mapActions({
      identify: "user/identify",
      edit: "user/edit"
    }),
    takePic(type) {
      // this.right = true
      wx.chooseImage({
        count: "1", //最多可以选择的图片张数,
        success: res => {
          console.log("res...", res);
          this[type] = res.tempFiles[0];
        } //返回图片的本地文件路径列表 tempFilePaths,
      });
    },
    async submit() {
      if (!this.idName) {
        wx.showToast({
          title: "请输入身份证姓名", //提示的内容,
          icon: "none" //图标,
        });
        return;
      }

      if (
        !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
          this.idNumber
        )
      ) {
        wx.showToast({
          title: "请输入真实身份证号码", //提示的内容,
          icon: "none" //图标,
        });
        return;
      }

      if (!this.front.path) {
        wx.showToast({
          title: "请上传身份证正面照片", //提示的内容,
          icon: "none" //图标,
        });
        return;
      }

      if (!this.back.path) {
        wx.showToast({
          title: "请上传身份证反面照片", //提示的内容,
          icon: "none" //图标,
        });
        return;
      }
      // 读取本地图片
      let manager = wx.getFileSystemManager();
      let id_img_positive = "data:image/jpg;base64," + manager.readFileSync(this.front.path, "base64");
      let id_img_opposite = "data:image/jpg;base64," + manager.readFileSync(this.back.path, "base64");
      let result = await this.identify({
        id_img_positive,
        id_img_opposite,
        trueName: this.idName,
        idNumber: this.idNumber
      });
      wx.showToast({
        title: result.data.message,
        icon: 'none'
      });
      if (result.data.message == "数据已存在") {
        //更新身份认证
        console.log("更新身份认证");
        let upResult = await this.edit({
          id_img_positive,
          id_img_opposite,
          trueName: this.idName,
          idNumber: this.idNumber
        });
        console.log("upResult...", upResult.data.message);
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.show {
  display: block !important;
}
page,from,.wrap{
  width: 100%;
  height: 100%;
}
.wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f3f7f7;
  height: 100%;
  position: relative;
}
.line {
  border-bottom: 2rpx solid #f6f6f6;
}
.sm_input {
  border-bottom: 1rpx solid #eee;
  background: #fff;
  li {
    width: 100%;
    height: 100rpx;
    align-items: center;
    display: flex;
    lable {
      width: 150rpx;
      margin-left: 26rpx;
      font-size: 32rpx;
      font-weight: bold;
    }
    input {
      height: 100rpx;
      flex: 1;
      padding-left: 20rpx;
      font-size: 32rpx;
    }
  }
}
.sm_img {
  width: 100%;
  height: 340rpx;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 15rpx;
  h1 {
    font-size: 32rpx;
    padding: 28rpx 30rpx;
    box-sizing: border-box;
    span {
    font-size: 30rpx;
      margin-left: 30rpx;
      display: inline-block;
      color: #999da2;
    }
  }
  div {
    display: flex;
    .img_left {
      width: 330rpx;
      height: 220rpx;
      border-radius: 10rpx;
      border: 1rpx dashed #64e1d3;
      margin-left: 34rpx;
      position: relative;
      .bagroung{
        display: flex;
        flex-direction:column;
      }
      .backg{
        width:90rpx;
        height:90rpx;
        margin: 40rpx auto 0;
        background: #64e1d3;
        box-sizing: border-box;
        border-radius: 50%;
      }
      img {
        height: 100%;
        width: 100%;
        border-radius: 10rpx;
      }
      .pic{
        height: 70rpx;;
        width: 70rpx;
        margin:10rpx auto;
        border-radius: 50%;
      }
      > button {
        border-radius: 50%;
        width: 92rpx;
        height: 92rpx;
        display: inline-block;
        border-radius: 50%;
        background: #64e1d3;
        overflow: hidden;
        img {
          width: 39rpx;
          height: 39rpx;
          display: inline-block;
          margin-right: 30rpx;
        }
      }
    }
    .img_right {
      width: 330rpx;
      height: 220rpx;
      border-radius: 10rpx;
      position: relative;
      border: 1rpx dashed #64e1d3;
      margin-left: 34rpx;
      > button {
        border-radius: 50%;
        background: #64e1d3;
        width: 92rpx;
        height: 92rpx;
        display: inline-block;
        border: 50%;
        border-radius: 50%;
        margin: 20% auto;
        overflow: hidden;
        img {
          width: 39rpx;
          height: 39rpx;
          display: inline-block;
          margin-right: 30rpx;
          margin-bottom: 10rpx;
        }
      }
      .bagroung{
        display: flex;
        flex-direction:column;
      }
      .backg{
        width:90rpx;
        height:90rpx;
        margin: 40rpx auto 0;
        background: #64e1d3;
        box-sizing: border-box;
        border-radius: 50%;
      }
      img {
        height: 100%;
        width: 100%;
        border-radius: 10rpx;
      }
      .pic{
        height: 70rpx;;
        width: 70rpx;
        margin:10rpx auto;
        border-radius: 50%;
      }
    }
  }
}
.sm_h2 {
  margin: 20rpx 200rpx;
  font-size: 32rpx;
}
.sm_list {
  display: flex;
  flex-direction: column;

  li {
    width:80%;
    font-size: 28rpx;
    color: #999da2;
    line-height: 44rpx;
    margin: 10rpx 10%;
    b{
      padding: 0 10rpx;
      display: inline;
    }
  }
}
.camera {
  width: 100%;
  height: 1000rpx;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.take {
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  top: 1020rpx;
  left: 300rpx;
  border-radius: 50%;
  background: #ccc;
  p {
    width: 94rpx;
    height: 94rpx;
    background: #fff;
    border-radius: 50%;
    margin: 2rpx 0 2rpx -30rpx;
  }
}
.mask{
  width:100%;
  height:100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  z-index: 1;
  display: none;
}
.imgove {
  width: 90%;
  position: absolute;
  top: 100rpx;
  left: 5rpx;
  background: #fff;
  border-radius: 20rpx;
  z-index: 2;
  display: none;
  image {
    width: 100%;
  }
}
.upfile {
  position: absolute;
  display: none;
  background: #0f0;
  color: #fff;
  z-index: 2;
  top: 840rpx;
  left: 4%;
  width: 84%;
}
.save {
  height: 80rpx;
  width:90%;
  background: #64e1d3;
  color: #fff;
  font-size: 36rpx;
  line-height: 80rpx;
  border-radius: 17rpx;
  margin:0 5%;
}
.img_left,
.img_right {
  overflow: hidden;
  p {
    width: 330rpx;
    text-align: center;
    padding-top: 20rpx;
    box-sizing: border-box;
    font-size: 33rpx;
    color: #323A45;
  }
}

</style>
