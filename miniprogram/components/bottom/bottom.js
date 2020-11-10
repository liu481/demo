// components/bottom/bottom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [
      {
        title: '关于我们',
        flag: false,
        contents: ['全站公告 >', '生产资质 >']
      },
      {
        title: '网站运营',
        flag: false,
        contents: [
          '网站注册公司名称: 北京廿一客食品有限公司',
          '网站运营：廿一客（上海）电子商务有限公司',
          '上海廿一客食品有限公司分公司',
          '杭州廿一客食品有限公司',
          '广州廿一客食品有限公司',
          '北京廿一客食品有限公司',
          '深圳廿一客食品有限公司',
          '天津廿一客食品有限公司',
          '广州廿一客食品贸易有限公司',
          '举实（上海）食品有限公司',
        ]
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeOn(e) {
      let i = e.currentTarget.dataset.i
      this.setData({
        ['items['+i+'].flag']: !this.data.items[i].flag
      })
    }
  }
})
