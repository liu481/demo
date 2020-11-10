// pages/magaiz/magaiz.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "21cake蛋糕",
    magaize: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('magaize').doc(options.id)
      .get().then(res => {
        res.data.content = res.data.content.replace(/\<img/gi, '<img style="display: block; width: 100%;"')
        let a = res.data.head
        this.setData({
          title: a + "_21cake蛋糕",
          magaize: res.data
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