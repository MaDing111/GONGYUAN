// pages/searchold/index.js
const api = require("../../api/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  searchList:[],
  searchvalue:"",
  },
search:function(event){
  
  console.log(event.detail.value)
  this.setData({
    searchvalue:event.detail.value
  })

  this.getHotlist();
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){

  },
  //获取热门商品
  getHotlist(){
    let searchvalue=this.data.searchvalue
  api.find("goods",{title:{$regex:`${searchvalue}`}}).then(res=>{
    console.log(res.data)
      this.setData({
        searchList:res.data
      })
        
      wx.hideLoading({})

    })
  },
  details:function(event){
    let {id,sort}=event.currentTarget.dataset
    wx.navigateTo({
      url: `../detailold/index?id=${id}&sort=${sort}`,
    })
    api.find("goods", { _id:id }).then(res => {
      let rmcp = res.data[0].rmcp;
      console.log("浏览量", res.data[0].rmcp)
      rmcp++;
      api.callfun('update', {
        collectionName: "goods",
        where: { _id:id  },
        data: {
          rmcp
        }
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