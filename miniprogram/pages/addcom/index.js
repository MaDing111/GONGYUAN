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
    array: ['数码产品', '学习类别', '服饰妆品', '其他'],
    objectArray: [
      {
        id: 0,
        name: '数码产品'
      },
      {
        id: 1,
        name: '学习类别'
      },
      {
        id: 2,
        name: '服饰妆品'
      },
      {
        id: 3,
        name: '其他'
      }
    ],
  },
  checkboxChange(e) {
    console.log(e.detail.value.length)
    let check=e.detail.value.length
    this.setData({
      check,
    })
  },

  //用户须知
  xuzhi: function () {
    wx.navigateTo({
      url: '../userxuzhi/index',
    });
  },
  //分类选择
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
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
    
    if(event.detail.value.title==""){
      wx.showToast({
        icon:"none",
        title: '请输入标题',
      })
    }else if(event.detail.value.describe==""){
      wx.showToast({
        icon:"none",
        title: '请输入商品的描述',
      })
    }else if(event.detail.value.sort==null){
      wx.showToast({
        icon:"none",
        title: '请选择分类',
      })
    }else if(event.detail.value.way==""){
      wx.showToast({
        icon:"none",
        title: '请选择方式',
      })
    }else if(event.detail.value.place==""){
      wx.showToast({
        icon:"none",
        title: '请输入发布地',
      })
    }else if(event.detail.value.oldprice==""){
      wx.showToast({
        icon:"none",
        title: '请输入商品原价',
      })
    }else if(event.detail.value.price==""){
      wx.showToast({
        icon:"none",
        title: '请输入想卖的价',
      })
    }else if(event.detail.value.ways==""){
      wx.showToast({
        icon:"none",
        title: '请选择商品性质',
      })
    }else if(event.detail.value.wechat==""){
      wx.showToast({
        icon:"none",
        title: '请输入微信号',
      })
    }else if(event.detail.value.phonenumber==""){
      wx.showToast({
        icon:"none",
        title: '请输入手机号',
      })
    }else if(this.data.check=="0"){
      wx.showToast({
        icon:"none",
        title: '阅读并同意《发布须知后才可发布商品》',
      })
    }else if(this.data.images.length=="0"){
      wx.showToast({
        icon:"none",
        title: '请选择照片',
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
    let{describe,oldprice,phonenumber,place,price,sort,title,way,wechat,ways}=event.detail.value;
    let userinfo=wx.getStorageSync('userinfo');
    let openid=wx.getStorageSync('openid');
    let userInfo=wx.getStorageSync('user');
    api.callfun("add",{
      collectionName:`${event.detail.value.ways=="二手闲置"?"goods":"newgoods"}`,
      data:{
        userinfo,
        openid,
        userInfo,
        describe,
        images:fileID,
        oldprice,
        phonenumber,
        place,
        price,
        sort,
        title,
        way,
        wechat,
        ways,
        rmcp:0,
        message:[],
      }
    }).then(res=>{
      this.setData({
        isOK:false
      })
      wx.hideLoading({
      })
      wx.showToast({
        title: '上传成功',
      })
    }).catch(err=>{
      wx.showToast({
        title: '商品发布失败',
      })
    })
  }
},

 onShareAppMessage:function(res){
  wx.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
  return { //自定义转发内容
    title: '哇，这不仅仅是个二手市场，竟然还有..', //自定义转发标题
    path: '/pages/home/index', //当前页面的路径 ，必须是以 / 开头的完整路径
    imageUrl: that.data.pic//不设置此字段时，默认截取当前页面作为展示的图片
  }
 }
})

