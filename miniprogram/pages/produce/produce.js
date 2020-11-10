// pages/produce/produce.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "21cake蛋糕",
    goods: {
      imgurl: []
    },
    grams: {
      price: 0
    },
    gid: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 6000,
    duration: 500,
    selectCard: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    db.collection('cake').doc(options.id).get().then(res => {
      res.data.detail = res.data.detail.replace(/\<img/gi, '<img style="display: block; width: 100%;"')
      let a = res.data.title
      this.setData({
        title: a + "_21cake蛋糕",
        goods: res.data,
        grams: res.data.grams[0]
      })
      // console.log(this.data.goods)
    }).catch(err => {
      console.log(err)
    })
  },

  toggleCard() {
    this.setData({
      selectCard: !this.data.selectCard
    })
  },

  changeGram(e) {
    this.setData({
      gid: e.currentTarget.dataset.index,
      grams: this.data.goods.grams[e.currentTarget.dataset.index]
    })
  },

  addCart() {
    if(app.globalData.logged) {
      db.collection('cart').add({
        data: {
          cake_id: this.data.goods._id,
          gram: this.data.grams,
          num: 1
        }
      }).then(res => {
        this.setData({
          selectCard: false
        })
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          duration: 1500
        })
      })
    }else {
      wx.navigateTo({
        url: '../user/user',
      })
    }
  }

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})