// pages/type/type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "21cake蛋糕",
    
    type: null,
    types: [
      {
        type: '新品',
        img: 'https://m.21cake.com/upload/images/7e0b37d9030d72f029b1feb97cdd667f.jpg',
        desc: '新品尝鲜'
      },
      {
        type: '人气',
        img: 'https://m.21cake.com/upload/images/86372db0924d70abad20ff94efef881d.jpg',
        desc: '人气精选'
      },
      {
        type: '生日',
        img: 'https://m.21cake.com/upload/images/5744b541d02a07f54018d09b8e971bcb.jpg',
        desc: '庆祝感甜点，赞叹生日、生命'
      },
      {
        type: '面包',
        img: "https://static.21cake.com/public/images/32/53/be/e10f0267da7024f026923476510063fe.jpg",
        desc: '面包'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.type + '_21cake蛋糕',
      type: options.type
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})