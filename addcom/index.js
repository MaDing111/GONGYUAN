const api = require('../../api/api')
Page({
  /**
 * 页面的初始数据
 */
  data: {
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
    let iurl = 'cloud://cloud1-0gf5m759066b9527.636c-cloud1-0gf5m759066b9527-1306520679/images/photo.png'
    this.setData({
      url: iurl
    })
  },

  async submit(event) {
    console.log(event.detail.value)
    let images = this.data.images;
    let base64=await api.tobase64(images);
    let fileID=await api.uploadCloud(base64);
    console.log(fileID)
    // let{describe,images,oldprice,phonenumber,place,price,sort,title,way,wechat}=event.detail.value;
    // let userinfo=wx.getStorageSync('userinfo');
    // let openid=wx.getStorageSync('openid');
  },

})

