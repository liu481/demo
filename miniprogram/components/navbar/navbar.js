// components/navbar/navbar.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight + 'px',
    navigationBarHeight: (app.globalData.statusBarHeight + 88) + 'px',
    menuShow: false,
    cityShow: false,
    citys: ['上海','北京','天津','杭州','无锡','苏州','广州','深圳'],
    city: "上海",
    txt: '上海'
  },

  ready() {
    this.setData({
      city: app.globalData.city,
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    menuShow() {
      this.setData({
        menuShow: !this.data.menuShow
      })
    },
    toggleCity() {
      this.setData({
        cityShow: !this.data.cityShow,
        txt: this.data.city
      })
    },
    switchCity(e) {
      this.setData({
        txt: e.currentTarget.dataset.city
      })
    },
    sure() {
      app.globalData.city = this.data.txt,
      this.setData({
        city: this.data.txt,
        cityShow: false
      })
      
    }
  }
})
