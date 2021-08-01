// pages/myadd/index.js
const api = require('../../api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myList: [],
    oldList: [],
    current: 0,
    lostList: [],
    loveList: [],
    carList: [],
    runList: [],
    playList: [],



  },
  onClick: function (event) {
    var index = event.currentTarget.dataset.id;
    this.setData({
      current: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad() {
    this.getHotlist();
    this.getlostlist();
    this.getlovelist();
    this.getcarlist();
    this.getrunlist();
    this.getplaylist();
  },
  onShow: function () {
    this.getHotlist();
    this.getlostlist();
    this.getlovelist();
    this.getcarlist();
    this.getrunlist();
    this.getplaylist();
  },
  //获取热门商品
  getHotlist() {
    let openidd = wx.getStorageSync('openid')
    api.find("goods", { openid: openidd }).then(res => {
      this.setData({
        myList: res.data,
      })

    })
    api.find("newgoods", { openid: openidd }).then(res => {
      this.setData({
        oldList: res.data,
      })

    })

  },
  getlostlist() {
    let openidd = wx.getStorageSync('openid')
    api.find("lost", { openid: openidd }).then(res => {
      this.setData({
        lostList: res.data,
      })
    })
  },
  getlovelist() {
    let openidd = wx.getStorageSync('openid')
    api.find("love", { openid: openidd }).then(res => {
      this.setData({
        loveList: res.data,
      })
    })
  },
  getcarlist() {
    let openidd = wx.getStorageSync('openid')
    api.find("car", { openid: openidd }).then(res => {
      this.setData({
        carList: res.data,
      })
    })
  },
  getrunlist() {
    let openidd = wx.getStorageSync('openid')
    api.find("run", { openid: openidd }).then(res => {
      this.setData({
        runList: res.data,
      })
    })
  },
  getplaylist() {
    let openidd = wx.getStorageSync('openid')
    api.find("play", { openid: openidd }).then(res => {
      this.setData({
        playList: res.data,
      })
    })
  },
  //去详情页
  details: function (event) {
    let { id, sort, ways } = event.currentTarget.dataset
    console.log("传过去的id和sort", id, sort)
    if (ways == "二手闲置") {

      wx.navigateTo({
        url: `../detailold/index?id=${id}&sort=${sort}`,
      })
      api.find("goods", { _id: id }).then(res => {
        let rmcp = res.data[0].rmcp;
        console.log("浏览量", res.data[0].rmcp)
        rmcp++;
        api.callfun('update', {
          collectionName: "goods",
          where: { _id: id },
          data: {
            rmcp
          }
        })
      })
    } else {
      wx.navigateTo({
        url: `../detail/index?id=${id}&sort=${sort}`,
      })
      api.find("newgoods", { _id: id }).then(res => {
        let rmcp = res.data[0].rmcp;
        console.log("浏览量", res.data[0].rmcp)
        rmcp++;
        api.callfun('update', {
          collectionName: "newgoods",
          where: { _id: id },
          data: {
            rmcp
          }
        })
      })
    }


  },
  removeadd(event) {
    console.log("传过来的id ways", event.currentTarget.dataset)
    let { id, ways } = event.currentTarget.dataset
    api.callfun("remove", {
      collectionName: `${ways == "二手闲置" ? "goods" : "newgoods"}`,
      where: {
        _id: id,
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: "删除成功"
      })

    })
  },
  removelost(event) {
    console.log("传过来的id", event.currentTarget.dataset)
    let {id} = event.currentTarget.dataset
    api.callfun("remove", {
      collectionName: `lost`,
      where: {
        _id: id,
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: "删除成功"
      })

    })
  },
  removelove(event) {
    console.log("传过来的id", event.currentTarget.dataset)
    let {id} = event.currentTarget.dataset
    api.callfun("remove", {
      collectionName: `love`,
      where: {
        _id: id,
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: "删除成功"
      })

    })
  },
  removecar(event) {
    console.log("传过来的id", event.currentTarget.dataset)
    let {id} = event.currentTarget.dataset
    api.callfun("remove", {
      collectionName: `car`,
      where: {
        _id: id,
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: "删除成功"
      })

    })
  },
  removerun(event) {
    console.log("传过来的id", event.currentTarget.dataset)
    let {id} = event.currentTarget.dataset
    api.callfun("remove", {
      collectionName: `run`,
      where: {
        _id: id,
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: "删除成功"
      })

    })
  },
  removeplay(event) {
    console.log("传过来的id", event.currentTarget.dataset)
    let {id} = event.currentTarget.dataset
    api.callfun("remove", {
      collectionName: `play`,
      where: {
        _id: id,
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: "删除成功"
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

  }
})