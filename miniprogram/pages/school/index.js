// pages/school/index.js
const api = require("../../api/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true, //是否自动切换
    interval: 2000, //自动切换时间间隔
    duration: 800, //滑动动画时长
    circular: true, //是否采用衔接滑动
    imgUrls:[],
    icon1:[],
    icon2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    api.find("slun").then(res => {
      console.log("轮播图",res.data)
      this.setData({
        imgUrls:res.data
      })
    })
        api.find("diyihang").then(res => {
      console.log("第一行",res.data)
      this.setData({
        icon1:res.data
      })
    })
    api.find("dierhang").then(res => {
      console.log("第二行",res.data)
      this.setData({
        icon2:res.data
      })
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let that = this
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    return { //自定义转发内容
      title: '哇，这不仅仅是个二手市场，竟然还有..', //自定义转发标题
      path: '/pages/home/index', //当前页面的路径 ，必须是以 / 开头的完整路径
      imageUrl: that.data.pic//不设置此字段时，默认截取当前页面作为展示的图片
    }
  },
  tolost: function () {
    wx.navigateTo({
      url: '../lost/index',
    });
  },  toeat: function () {
    wx.navigateTo({
      url: '../eat/index',
    });
  },  tolove: function () {
    wx.navigateTo({
      url: '../love/index',
    });
  },  toplay: function () {
    wx.navigateTo({
      url: '../play/index',
    });
  },  tocar: function () {
    wx.navigateTo({
      url: '../car/index',
    });
  },  todrink: function () {
    wx.navigateTo({
      url: '../drink/index',
    });
  },
})