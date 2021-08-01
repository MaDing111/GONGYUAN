// pages/details/index.js
const api = require('../../api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onoff:"",
    id: "",
    lostList: "",
    zanimg:"../../images/like1.png",
    zaning:true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.setData({
      id,
    })
    api.find("run", { _id: id }).then(res => {
      console.log("详情", res.data)
      this.setData({
        lostList: res.data,
      })
      wx.hideLoading({})
    })
    let zaning = wx.getStorageSync('zaning')
    console.log("在本地拿到的点赞状态", zaning)
    if(zaning=='true'){
      this.setData({
       zanimg:"../../images/like1.png",
       zaning:true
      })
    }else{
      this.setData({
        zanimg:"../../images/like2.png",
        zaning:false
       })
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    api.find("onoff").then(res => {
      console.log("状态",res.data[0].onoff)
      this.setData({
        onoff:res.data[0].onoff
      })
    })
  },
  send: function (event) {
    wx.showLoading({
      title: '发布中..',
    })
    let openid = wx.getStorageSync('openid')
    let user = wx.getStorageSync('user')
    let message = event.detail.value
    const db = wx.cloud.database()
    const _ = db.command
    if(!message==""){
    api.callfun('neupdate', {
      collectionName: "run",
      where: { _id: this.data.id },
      openid: openid,
      user: user,
      messages: message,
    }).then(res => {
      wx.hideLoading({
      })
      wx.showToast({
        title: '发布成功',
      })
    }).catch(err => {
      wx.showToast({
        icon: "none",
        title: '发布失败',
      })
    })
  }else{
    wx.showToast({
      icon:"",
      title: '请输入内容',
    })
  }
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
      title: '送东西没时间？来这里..', //自定义转发标题
      path: '/pages/run/index', //当前页面的路径 ，必须是以 / 开头的完整路径
      imageUrl: that.data.pic//不设置此字段时，默认截取当前页面作为展示的图片
    }
  },
  dianzan: function (event) {
    let { id, zan } = event.currentTarget.dataset;

    if (this.data.zaning) {
      api.find("run", { _id: id }).then(res => {

        console.log("点赞数", zan)
        ++zan;

        api.callfun('update', {
          collectionName: "run",
          where: { _id: id },
          data: {
            zan,
          }
        })
      })
      this.setData({
        zaning: false,
        zanimg: "../../images/like2.png"
      })
      let zaning = 'false'
      wx.setStorageSync('zaning', zaning)
      console.log("在本地保存的点赞状态", zaning)
    } else {
      api.find("run", { _id: id }).then(res => {
        console.log("点赞数", zan)
        --zan;
        api.callfun('update', {
          collectionName: "run",
          where: { _id: id },
          data: {
            zan
          }
        })
      })
      this.setData({
        zaning: true,
        zanimg: "../../images/like1.png"
      })
      let zaning = 'true'
      wx.setStorageSync('zaning', zaning)
    }
  }
})