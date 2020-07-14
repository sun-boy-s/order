//app.js
var util = require('utils/util.js');
App({
  onLaunch: function() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.user.name = res.userInfo.nickName
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId
        var code = res.code;
        wx.request({
          url: util.urlPath+'/order1.0/basic/login',
          method: 'post',
          header: {
            'context-type': 'application/json'
          },
          data: {
            code: code
          },
          success: res => {
            wx.setStorageSync("user", res.data)
            // 由于 wx.request 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if(this.userInfoReadyCallback){
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    })
  }
})