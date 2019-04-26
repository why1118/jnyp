function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}

/**
 * 通用授权逻辑
 * @export
 * @param {*} scope 权限信息
 * @param {*} callback 授权成功回调
 */
export function getAuth(scope, callback, showTip=true) {
  wx.getSetting({
    success: res => {
      // 如果已授权
      if (res.authSetting[scope]) {
        callback();
      } else {
        showTip && wx.authorize({
          scope,
          success: callback,
          fail: () => {
            wx.showModal({
              title: '亲爱的用户', //提示的标题,
              content: '同意我们的授权，让我们为你提供更加优质的服务', //提示的内容,
              showCancel: false, //是否显示取消按钮,
              confirmText: '去设置', //确定按钮的文字，默认为取消，最多 4 个字符,
              confirmColor: '#3CC51F',   //确定按钮的文字颜色
              success: res => {
                wx.openSetting()
              }
            })
          }
        })
      }
    }
  })
}
export default {
    formatNumber,
    formatTime
}
