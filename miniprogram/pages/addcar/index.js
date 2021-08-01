const api = require('../../api/api')
Page({
  /**
 * 页面的初始数据
 */
  data: {
    onoff:"",
    dadada:false,
    logining:true,
    isOK:false,
    check:"1",
    imgFiles: "",
    images: [],
    url: '',

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

  onLoad() {
    let user = wx.getStorageSync('user')
    if (user) {
      this.setData({
        logining:false
      })
    }
    let iurl = 'cloud://cloud1-0gf5m759066b9527.636c-cloud1-0gf5m759066b9527-1306520679/images/photo.png'
    this.setData({
      url: iurl
    })
    
  },
  onShow:function(){
    api.find("onoff").then(res => {
      console.log("状态",res.data[0].onoff)
      this.setData({
        onoff:res.data[0].onoff
      })
    })
    let user = wx.getStorageSync('user')
    if (user) {
      this.setData({
        logining:false
      })
    }
  },
  async submit(event) {
    wx.showLoading({
      title:'正在上传中..',
    })
    
if(event.detail.value.describe==""){
      wx.showToast({
        icon:"none",
        title: '请输入描述',
      })
    }else{
      //优化用户体验
    this.setData({
      isOK:true
    })
    let images = this.data.images;
    let base64=await api.tobase64(images);
    let fileID=await api.uploadCloud(base64);
    console.log(fileID)
    let{describe}=event.detail.value;
    let userinfo=wx.getStorageSync('userinfo');
    let openid=wx.getStorageSync('openid');
    let userInfo=wx.getStorageSync('user');
    let time=api.times(new Date())
    api.callfun("add",{
      collectionName:'car',
      data:{
        userinfo,
        openid,
        userInfo,
        describe,
        images:fileID,
        zan:0,
        time:time,
        times:new Date().getTime(),
        zaning:true,
        message:[],
      }
    }).then(res=>{
      this.setData({
        isOK:false
      })
      wx.hideLoading({
      })
      wx.showToast({
        title: '发布成功',
      })
    }).catch(err=>{
      wx.showToast({
        icon:"none",
        title: '发布失败',
      })
    })
  }
},

})

