const api = require("../../api/api")
Page({
  data: {
    onoff:"",
    currentIndex: 0,   //代表当前swiper-item下标
    isLogin: true,
    oldList: [],
    swiperheight: "",
  },
  onLoad: function () {
    wx.showLoading({
      title: '数据加载中',
    })
  },
  onShow: function () {
    api.find("onoff").then(res => {
      console.log("状态",res.data[0].onoff)
      this.setData({
        onoff:res.data[0].onoff
      })
    })
    this.getoldlist();
  },
  getoldlist() {
    api.find("goods").then(res => {
      console.log(res.data)
      let b = res.data.length
      if (b % 2 == 1) {
        b = b + 1
      }
      let a = (b / 2) * 270
      this.setData({
        oldList: res.data,
        swiperheight: a
      })
    
    }),
      api.find("goods",{sort:'数码产品'}).then(res => {
        let b = res.data.length
        if (b % 2 == 1) {
          b = b + 1
        }
        let a = (b / 2) * 270
        this.setData({
          oldList1: res.data,
          swiperheight1: a
        })
      }),
        api.find("goods",{sort:'学习类别'}).then(res => {
          let b = res.data.length
          if (b % 2 == 1) {
            b = b + 1
          }
          let a = (b / 2) * 270
          this.setData({
            oldList2: res.data,
            swiperheight2: a
          })
        }),
          api.find("goods",{sort:'服饰妆品'}).then(res => {
            let b = res.data.length
            if (b % 2 == 1) {
              b = b + 1
            }
            let a = (b / 2) * 270
            this.setData({
              oldList3: res.data,
              swiperheight3: a
            })
          }),
            api.find("goods",{sort:'其他'}).then(res => {
              let b = res.data.length
              if (b % 2 == 1) {
                b = b + 1
              }
              let a = (b / 2) * 270
              this.setData({
                oldList4: res.data,
                swiperheight4: a
              })
            }),
              wx.hideLoading({})

          },
//当swiper切换时触发
swiperChange(event){
  this.setData({
    currentIndex: event.detail.current
  })
},
clickTab(event){
  this.setData({
    currentIndex: event.currentTarget.dataset.current
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
  tosearch:function(){
    wx.navigateTo({
      url: `../searchold/index`,
    })
  },
  toaddcom:function(){
    wx.navigateTo({
      url:'../addcom/index',
    })
  },
})