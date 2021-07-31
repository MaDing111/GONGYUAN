// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-0gf5m759066b9527',
})

// 云函数入口函数
exports.main = async (event, context) => {
   //拿到前端传过来的base64
 let {base64Data}=event;
 //因为fileCount只支持buffer格式或者文件流
 return await cloud.uploadFile({
   cloudPath:'commodity images/'+Date.now()+'.png',
   fileContent:Buffer.from(base64Data,"base64"),
 })
}