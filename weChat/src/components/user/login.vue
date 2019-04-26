<template>
  <button v-if="showDialog" open-type="getUserInfo" @getuserinfo="e=>getUserInfo(e.target)"></button>
</template>

<script>
import { getAuth } from "@/utils/index";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      showDialog: true
    };
  },
  mounted() {
    getAuth(
      "scope.userInfo",
      res => {
        this.showDialog = false;
        wx.getUserInfo({
          withCredentials: true,
          success: res => {
            this.getUserInfo(res);
          }
        });
      },
      false
    );
  },
  methods: {
    ...mapActions({
      login: "user/login"
    }),
    async getUserInfo(res) {
      console.log("res...", res);
      // console.log('res')
      // 存储个人信息
      wx.setStorage({
        key: "user",
        data: res
      });
      let result = await this.login({
        encryptedData: res.encryptedData,
        iv: res.iv
      });
      wx.setStorage({
        key: "trackId",
        data: result.result.trackId
      });
      // 存储邀请码
      // var yqms = result.result.userInfo.inviteCode;
      // console.log("res.daadadada", result.result.userInfo.inviteCode);
      // wx.setStorage({
      //   key: "yqm",
      //   data: yqms
      // });
      // wx.setStorage({
      //   key: "inviteCode",
      //   data: result.result.userInfo.inviteCode
      // });
      if (!result.result.isBindPhone) {
        wx.navigateTo({ url: "/pages/phone/main" });
      }
      if (!result.result.userInfo.parentId) {
        wx.navigateTo({ url: "/pages/referrer/main" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}
</style>
