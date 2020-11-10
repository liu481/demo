//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    title: "21cake蛋糕官网_5小时新鲜送达",
    imgUrls: [
      'cloud://mycloud-1g7r6f59151f12e3.6d79-mycloud-1g7r6f59151f12e3-1258806908/yindian.jpg',
      'cloud://mycloud-1g7r6f59151f12e3.6d79-mycloud-1g7r6f59151f12e3-1258806908/wansheng.jpg',
      'cloud://mycloud-1g7r6f59151f12e3.6d79-mycloud-1g7r6f59151f12e3-1258806908/guoqing.jpg',
      'cloud://mycloud-1g7r6f59151f12e3.6d79-mycloud-1g7r6f59151f12e3-1258806908/mianbao.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 6000,
    duration: 500,

    menus: [
      {
        href: '../gallery/gallery?type=0',
        img: 'https://static.21cake.com//upload/images/145995dff6c6458e0738ee2178a1a0df.png',
        name: '蛋糕'
      },
      {
        href: '../gallery/gallery?type=3',
        img: 'https://static.21cake.com//upload/images/561ca3d60f16a63299fd16d3e9e0c3c4.png',
        name: '面包'
      },
      {
        href: '../gallery/gallery?type=2',
        img: 'https://static.21cake.com//upload/images/3b70ed637c61fc696faa7e983726ed7d.png',
        name: '下午茶'
      },
      {
        href: '../gallery/gallery?type=5',
        img: 'https://static.21cake.com//upload/images/760d7a2fe4c5e1bede87389fc843de7f.png',
        name: '礼品'
      }
    ],

    goods: [[],[],[],[]],
    magaizes: []
  },

  onLoad: function() {
    const that = this
    db.collection('home').orderBy('_id', 'asc').get().then(res => {
      res.data.forEach(val => {
        if(val.type == 'new') {
          that.data.goods[0].push(val)
          that.setData({
            goods: that.data.goods
          })
        }else if(val.type == 'popular') {
          that.data.goods[1].push(val)
          that.setData({
            goods: that.data.goods
          })
        }else if(val.type == 'birth') {
          that.data.goods[2].push(val)
          that.setData({
            goods: that.data.goods
          })
        }else if(val.type == 'bread') {
          that.data.goods[3].push(val)
          that.setData({
            goods: that.data.goods
          })
        }
      })
    }).catch(err => {
      console.log(err)
    })
    db.collection('magaize').orderBy('_id', 'asc').get().then(res => {
      that.setData({
        magaizes: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  },

  addCart(e) {
    if(app.globalData.logged) {
      let i = e.currentTarget.dataset.i
      let j = e.currentTarget.dataset.j
      let id = e.currentTarget.dataset.id
      db.collection('cart').add({
        data: {
          cake_id: id,
          gram: this.data.goods[i][j].gram,
          num: 1
        }
      }).then(res => {
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
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }
})
