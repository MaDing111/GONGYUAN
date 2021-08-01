//app.js
App({
  onLaunch: function () {
      wx.cloud.init({
        env: 'cloud1-0gf5m759066b9527',
      })
  },

})
// const api=require('./api/api')
// api.callfun("login").then(res=>{
//   wx.setStorageSync('userInfo', res.userInfo)
// })



// wx.getSetting({
//   success:(res)=>{
//     //判断，已经授权，就可以直接使用用户信息
//     if(res.authSetting["scope.userInfo"]){
//       wx.getUserInfo({
//         success:(data)=>{
//           let userInfo=wx.getStorageSync('userInfo');
//            if(userInfo.nickName!=data.userInfo.nickName||userInfo.avatarUrl!=data.userInfo.avatarUrl){
//              wx.setStorageSync('userInfo', data.userInfo)
//            }
//         }
//       })
//     }
// console.log("是否授权",res)
//   }
// })