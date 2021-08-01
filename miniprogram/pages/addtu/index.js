// pages/addlun/index.js
const api = require('../../api/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onoff:"",
    imgUrls:[],
    images: [],
    eatList:[],
    drinkList:[],
    srleList:[],
    current: 0,
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
  onLoad: function (options) {
    let iurl ='cloud://cloud1-0gf5m759066b9527.636c-cloud1-0gf5m759066b9527-1306520679/images/photo.png'
    this.setData({
      url: iurl
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
  onShow: function () {
    api.find("onoff").then(res => {
      console.log("状态",res.data[0].onoff)
      this.setData({
        onoff:res.data[0].onoff
      })
    })
    api.find("srle").then(res => {
      console.log("折扣",res.data)
      this.setData({
        srleList:res.data
      })
    })
    api.find("eat").then(res => {
      console.log("吃",res.data)
      this.setData({
        eatList:res.data
      })
    })
    api.find("drink").then(res => {
      console.log("喝",res.data)
      this.setData({
        drinkList:res.data
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
    //点击添加按钮选择图片
    chooseImage: function (e) {
      wx.chooseImage({
        count: 9,
        sizeType: ['compressed'], //可选择原图或压缩后的图片
        sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
        success: res => {
          const images = this.data.images.concat(res.tempFilePaths)
          console.log(images)
          this.setData({
            images: images
          })
        }
      })
  
    },
    // 删除图片
    removeImage(e) {
      const idx = e.target.dataset.idx;
      this.data.images.splice(idx, 1);
      var del_image = this.data.images;
      this.setData({
        images: del_image
      })
    },
    // 查看大图
    handleImagePreview(e) {
      const idx = e.target.dataset.idx
      const images = this.data.images
      wx.previewImage({
        current: images[idx], //当前预览的图片
        urls: images, //所有要预览的图片
      })
    },
    // 折扣
    async srlesubmit() {
      wx.showLoading({
        title:'正在上传中..',
      })
      let images = this.data.images;
      let base64=await api.tobase64(images);
      let fileID=await api.uploadCloud(base64);
      console.log(fileID)
      api.callfun("add",{
        collectionName:"srle",
        data:{
          lun:fileID,
        }
      }).then(res=>{
        wx.showToast({
          title: '上传成功',
        })
      }).catch(err=>{
        wx.showToast({
          title: '商品发布失败',
        })
      })
    
  },
  srledet:function(event){
    console.log("删除的id",event.currentTarget.dataset)
    let idd = event.currentTarget.dataset.id
    api.callfun("remove", {
      collectionName:"srle",
      where: {
        _id: idd,
      }
    }).then(res => {
      wx.showToast({
        title: "删除成功"
      })

    })
  },
      // 折扣
      async eatsubmit() {
        wx.showLoading({
          title:'正在上传中..',
        })
        let images = this.data.images;
        let base64=await api.tobase64(images);
        let fileID=await api.uploadCloud(base64);
        console.log(fileID)
        api.callfun("add",{
          collectionName:"eat",
          data:{
            lun:fileID,
          }
        }).then(res=>{
          wx.showToast({
            title: '上传成功',
          })
        }).catch(err=>{
          wx.showToast({
            title: '商品发布失败',
          })
        })
      
    },
    eatdet:function(event){
      console.log("删除的id",event.currentTarget.dataset)
      let idd = event.currentTarget.dataset.id
      api.callfun("remove", {
        collectionName:"eat",
        where: {
          _id: idd,
        }
      }).then(res => {
        wx.showToast({
          title: "删除成功"
        })
  
      })
    },
        // 喝
        async drinksubmit() {
          wx.showLoading({
            title:'正在上传中..',
          })
          let images = this.data.images;
          let base64=await api.tobase64(images);
          let fileID=await api.uploadCloud(base64);
          console.log(fileID)
          api.callfun("add",{
            collectionName:"drink",
            data:{
              lun:fileID,
            }
          }).then(res=>{
            wx.showToast({
              title: '上传成功',
            })
          }).catch(err=>{
            wx.showToast({
              title: '商品发布失败',
            })
          })
        
      },
      drinkdet:function(event){
        console.log("删除的id",event.currentTarget.dataset)
        let idd = event.currentTarget.dataset.id
        api.callfun("remove", {
          collectionName:"drink",
          where: {
            _id: idd,
          }
        }).then(res => {
          wx.showToast({
            title: "删除成功"
          })
    
        })
      },
})