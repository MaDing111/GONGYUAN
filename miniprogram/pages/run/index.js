// pages/lost/index.js
const api = require('../../api/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    onoff:"",
    lostList: [],
    zaning:"",
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
    api.find("onoff").then(res => {
      console.log("状态",res.data[0].onoff)
      this.setData({
        onoff:res.data[0].onoff
      })
    })
    this.getlostList()
    
  },
  //获取热门商品
  getlostList() {
    api.find("run", {}, 0, 50, "times").then(res => {
      console.log("失物招领", res.data)

      this.setData({
        lostList: res.data,
      })

      wx.hideLoading({})

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
    this.getlostList()
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
      title: '超值折扣这里应有尽有，竟然只要1元..', //自定义转发标题
      path: '/pages/discount/index', //当前页面的路径 ，必须是以 / 开头的完整路径
      imageUrl: that.data.pic//不设置此字段时，默认截取当前页面作为展示的图片
    }
  },
  toaddcom: function () {
    wx.navigateTo({
      url: '../addrun/index',
    })
  },
  todetails: function (event) {
    let {id,me} = event.currentTarget.dataset
    wx.navigateTo({
      url: `../rundetails/index?id=${id}&me=${me}`,
    })
  },
 
})