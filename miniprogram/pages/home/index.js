const api = require("../../api/api")
Page({

  data: {
    onoff:"",
    isFlag: false,//是否去过详情
    hotList: [],
    peng: true,
    goods: "",
    current: 0,  //当前所在页面的 index
    indicatorDots: true,
    autoplay: true, //是否自动切换
    interval: 2000, //自动切换时间间隔
    duration: 800, //滑动动画时长
    circular: true, //是否采用衔接滑动
    inputShowed: false,
    inputVal: "",
    intoimage: [
      'cloud://cloud1-0gf5m759066b9527.636c-cloud1-0gf5m759066b9527-1306520679/images/ershou.png',
      'cloud://cloud1-0gf5m759066b9527.636c-cloud1-0gf5m759066b9527-1306520679/images/quanxin.png'
    ],
    imgUrls: [],
    //轮播图的切换事件
    swiperChange: function (e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    },

  },
  //跳转到二手闲置
  intoold: function () {
    wx.navigateTo({
      url: '../old/index',
    });
  },
  //跳转到全新商品
  intonew: function () {
    wx.navigateTo({
      url: '../new/index',
    });
  },
  //搜索框
  tabChange(e) {
    console.log('tab change', e)
  },

  search: function (value) {
    return new Promise((resolve, reject) => {
    })
  },
  //搜索结果
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  onLoad() {
    wx.showLoading({
      title: '数据正在加载..',
    })
  },
  onShow: function () {
    api.find("onoff").then(res => {
      console.log("状态",res.data[0].onoff)
      this.setData({
        onoff:res.data[0].onoff
      })
    })
    api.find("lun").then(res => {
      console.log("轮播图",res.data)
      this.setData({
        imgUrls:res.data
      })
    }),
    this.getHotlist();
    
  },
  //获取热门商品
  getHotlist() {
    api.find("newgoods", {}, 0, 8).then(res => {
      this.setData({
        hotList: res.data
      })

      wx.hideLoading({})

    })
  },
  //去详情页
  details: function (event) {
    let { id, sort } = event.currentTarget.dataset
    wx.navigateTo({
      url: `../detail/index?id=${id}&sort=${sort}`,
    })
    api.find("newgoods", { _id:id }).then(res => {
      let rmcp = res.data[0].rmcp;
      console.log("浏览量", res.data[0].rmcp)
      rmcp++;
      api.callfun('update', {
        collectionName: "newgoods",
        where: { _id:id  },
        data: {
          rmcp
        }
      })
    })
  },
  toaddcom:function(){
    wx.navigateTo({
      url:'../addcom/index',
    })
  },
  onShareAppMessage: function () {
    let that = this
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return { //自定义转发内容
      title: '天哪，工院市场开业了，这东西只要1元？！...', //自定义转发标题
      path: '/pages/home/index', //当前页面的路径 ，必须是以 / 开头的完整路径
      imageUrl: that.data.pic//不设置此字段时，默认截取当前页面作为展示的图片
    }
  },
  });