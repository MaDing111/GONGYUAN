// pages/mine/index.js
const api=require('../../api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onoff:"",
    switch1Checked:"",
    switch1Style: '',
    myself:false,
    userInfo:null,
    canIUseGetUserProfile: false,
  },
  switch1Change:function(e){
   console.log("开关",e.detail.value)
   let onoff=e.detail.value
   api.callfun('update', {
    collectionName: "onoff",
    where: {},
    data: {
      onoff:onoff
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getUserProfile()
    let user = wx.getStorageSync('user')
    console.log("获取本地用户信息",user)
    if (user) {
      this.setData({
        canIUseGetUserProfile: true,
        userInfo: user,
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("用户登录", res.userInfo)
        let user = res.userInfo
        wx.setStorageSync('user', user)
        this.setData({
          userInfo: user,
          canIUseGetUserProfile: true
        })
      }
    })
    api.callfun('login').then(res=>{
      if(res.result.appid){
        console.log("获取的id",res.result.appid)
        wx.setStorageSync('appid', res.result.appid);
        wx.setStorageSync('openid', res.result.openid);
        wx.login({});
      }
    })
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
  let openid = wx.getStorageSync('openid')
  if(openid=='oNgcv4zegUvCxAjfayCc_R7cQbsI'){
    this.setData({
      myself:true
    })
  }
  api.find("onoff").then(res => {
    console.log("状态",res.data[0].onoff)
    this.setData({
      onoff:res.data[0].onoff
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

  },
 tomyadd:function(event){
    wx.navigateTo({
      url: `../myadd/index`,
    })
  },
  tomywrite:function(event){
    wx.navigateTo({
      url: `../mywrite/index`,
    })
  },
  addlun:function(){
    wx.navigateTo({
      url:"../addlun/index"
    })
  },
  tokefu:function(){
    wx.navigateTo({
      url:"../kefu/index"
    })
  },
  addsclun:function(){
    wx.navigateTo({
      url:"../addsclun/index"
    })
  },
  addtu:function(){
    wx.navigateTo({
      url:"../addtu/index"
    })
  },
})