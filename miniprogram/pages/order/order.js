// pages/order/order.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "订单确认_21cake蛋糕",
    cartList: [],
    totil: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "cartList",
      data: {
        collection: "cart",
        from: "cake",
        localField: "cake_id",
        foreignField: "_id",
        as: "cake",
        match: {
          _openid: app.globalData.openid
        }
      }
    }).then(res => {
      this.setData({
        cartList: res.result.list,
      })
      this.getTotil()
      console.log(this.data.cartList)
    }).catch(err => {
      console.log(err)
    })
  },

  getTotil() {
    let totil = 0
    this.data.cartList.forEach((val) => {
      totil += Number(val.gram.price) * val.num
    })
    this.setData({
      totil: totil
    })
  },

})