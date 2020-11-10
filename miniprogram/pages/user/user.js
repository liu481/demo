// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "会员中心_21cake蛋糕",
    avatarUrl: 'https://m.21cake.com/wap_themes/21cake/images/icon/ico_member.png',
    userInfo: {},
    logged: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] && app.globalData.logged) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              app.globalData.logged = true
              this.setData({
                logged: app.globalData.logged,
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!app.globalData.logged && e.detail.userInfo) {
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          app.globalData.logged = true
          this.setData({
            logged: app.globalData.logged,
            avatarUrl: e.detail.userInfo.avatarUrl,
            userInfo: e.detail.userInfo
          })
        },
        fail: err => {
          console.error('[login] 调用失败', err)
        }
      })
    }
  },

  exitLogin() {
    app.globalData.openid = null,
    app.globalData.logged = false
    this.setData({
      logged: app.globalData.logged,
      avatarUrl: "https://m.21cake.com/wap_themes/21cake/images/icon/ico_member.png",
      userInfo: {}
    })
  }
})