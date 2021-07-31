// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-0gf5m759066b9527',
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
let {data,collectionName}=event;
return new Promise((resolve,reject)=>{
  db.collection(collectionName).add({
    data
  }).then(res=>{
    resolve(res)
  }).catch(err=>{
    reject(err)
  })
})
}