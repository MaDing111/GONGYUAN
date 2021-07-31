// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: 'cloud1-0gf5m759066b9527'
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let { collectionName, where, openid, user, messages } = event;
  return new Promise((resolve,reject)=>{
    db.collection(collectionName).where(where).update({
      data: {
        message: _.push({ openid, user, messages })
      }
    }).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
  
}