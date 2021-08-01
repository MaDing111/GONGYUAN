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
    this.getlostList()
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
    api.find("play", {}, 0, 50, "times").then(res => {
      console.log("玩点", res.data)

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

  },
  toaddcom: function () {
    wx.navigateTo({
      url: '../addplay/index',
    })
  },
  todetails: function (event) {
    let {id,me} = event.currentTarget.dataset
    wx.navigateTo({
      url: `../playdetails/index?id=${id}&me=${me}`,
    })
  },
 
})