// pages/cart/cart.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "购物车_21cake蛋糕",
    cartList: [],
    totil: 0,
    selectCard: false,
    grams: [],
    gram: {},
    index: null,
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.logged) {
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
    }else {
      wx.navigateTo({
        url: '../user/user',
      })
    }
  },

  onShow: function() {
    if (app.globalData.logged) {
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
        // console.log(this.data.cartList)
      }).catch(err => {
        console.log(err)
      })
    }
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

  changeNum(e) {
    let t = e.currentTarget.dataset.t // 用来判断按钮类型
    let i = e.currentTarget.dataset.index // 商品索引
    let id = e.currentTarget.dataset.id // 购物车id

    if (t == 0) {
      db.collection('cart').doc(id).remove().then(res => {
        this.data.cartList.splice(i, 1)
        this.setData({
          cartList: this.data.cartList
        })
        this.getTotil()
      })
    } else {
      if (t == 1) {
        this.setData({
          totil: this.data.totil - Number(this.data.cartList[i].gram.price),
          ['cartList[' + i + '].num']: this.data.cartList[i].num - 1
        })
      } else if (t == 2) {
        this.setData({
          totil: this.data.totil + Number(this.data.cartList[i].gram.price),
          ['cartList[' + i + '].num']: this.data.cartList[i].num + 1
        })
      }
      db.collection('cart').doc(id).update({
        data: {
          num: this.data.cartList[i].num
        }
      }).then(res => {
        console.log(res.errMsg)
      })
    }
  },


  showCard(e) { // 展开选项卡
    let i = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id

    this.setData({
      grams: this.data.cartList[i].cake[0].grams,
      gram: this.data.cartList[i].gram,
      index: i,
      id: id,
      selectCard: true
    })
  },

  cancel() { // 关闭选项卡
    this.setData({
      selectCard: false
    })
  },

  choose(e) { // 选择规格
    let i = e.currentTarget.dataset.index
    this.setData({
      gram: this.data.grams[i],
    })
  },

  confirm() { // 确定
    db.collection('cart').doc(this.data.id).update({
      data: {
        gram: this.data.gram
      }
    }).then(res => {
      this.setData({
        ['cartList[' + this.data.index + '].gram']: this.data.gram,
        selectCard: false
      })
      this.getTotil()
    })
  },

  clearCart() { // 清空购物车
    wx.cloud.callFunction({
      name: "clearCart",
      data: {
        collection: "cart",
        _openid: app.globalData.openid
      }
    }).then(res => {
      this.setData({
        cartList: [],
        totil: 0
      })
    })
  },

  tobuy() {
    wx.navigateTo({
      url: '../order/order',
    })
  }

})