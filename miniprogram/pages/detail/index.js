// pages/detail/index.js
const api = require("../../api/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onoff:"",
    logining:true,
    id:"",
    detailList:[],
    likeList:[],
    images:[],
  },
  //获取传来的数据

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user')
    if (user) {
      this.setData({
        logining:false
      })
    }
    wx.showLoading({title: '数据加载中'})
    console.log("传的id",options.id)
    api.find("newgoods",{_id:options.id}).then(res=>{
      console.log("获取到了商品",res.data[0])
      this.setData({
        detailList:res.data[0],
        id:options.id,
        images:res.data[0].images
      }) 
    })
    console.log("传的sort",options.sort)
    api.find("newgoods",{sort:options.sort}).then(res=>{
      console.log("获取喜欢商品",res.data)
      this.setData({
        likeList:res.data
      }) 
      wx.hideLoading({})
    })
    
  },
  onShow:function(){
    api.find("onoff").then(res => {
      console.log("状态",res.data[0].onoff)
      this.setData({
        onoff:res.data[0].onoff
      })
    })
  },
    //去往详情页面
  details:function(event){
    let {id}=event.currentTarget.dataset
    wx.navigateTo({
      url: `../detail/index?id=${id}`,
    })
    
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
      title: '快来看这个东西卖的好便宜啊..', //自定义转发标题
      path: '/pages/discount/index', //当前页面的路径 ，必须是以 / 开头的完整路径
      imageUrl: that.data.pic//不设置此字段时，默认截取当前页面作为展示的图片
    }
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
      collectionName: "newgoods",
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
})