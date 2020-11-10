// components/goods/goods.js
const app = getApp()
const db = wx.cloud.database()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Number | String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goods: [],
    selectCard: false,
    grams: [],
    gram: {},
    index: null,
    id: null,
  },

  observers: {
    'type': function(type) {
      this.getData(type)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData(val) {
      if(typeof val == 'number') {
        db.collection('cake').where({
          'type_id': val + 1
        }).get().then(res => {
          this.setData({
            goods: res.data
          })
        }).catch(err => {
          console.log(err)
        })
      }else if(typeof val == 'string') {
        const _ = db.command
        db.collection('cake').where({
          'tags': _.in([val])
        }).get().then(res => {
          this.setData({
            goods: res.data
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },

    showCard(e) { // 展开选项卡
      let i = e.currentTarget.dataset.index
      let id = e.currentTarget.dataset.id
  
      this.setData({
        grams: this.data.goods[i].grams,
        gram: this.data.goods[i].grams[0],
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
      if(app.globalData.logged) {
        db.collection('cart').add({
          data: {
            cake_id: this.data.id,
            gram: this.data.gram,
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
    },

  }
})
