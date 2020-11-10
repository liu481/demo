// pages/gallery/gallery.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "网上订购_5小时新鲜送达_21cake蛋糕",
    tabs: [],
    tid: null
  },

  changeTab(e) {
    this.setData({
      tid: e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('type').get().then(res => {
      // console.log(res.data)
      this.setData({
        tabs: res.data,
        tid: parseInt(options.type)
      })
    }).catch(err => {
      console.log(err)
    })
    
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})