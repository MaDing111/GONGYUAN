const db=wx.cloud.database();
//定义查询的所有操作符
const _=db.command;
//用来查询数据库的数据
//collectionName   集合名称
//where            查询条件
//skip            跳过几条
const find=function(collectionName,where={},skip=0,limit=20,targetType="rmcp"){
  return new Promise((resolve,reject)=>{
    db.collection(collectionName).where(where).skip(skip).limit(limit).orderBy(targetType,'desc').get().then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}




//转码base64
const tobase64 = function (images) {
  return new Promise((resolve, reject) => {
    let base64Arr = [];//装转码后的图片路径
    images = Array.from(images);
    images.forEach(item => {
      wx.getFileSystemManager().readFile({
        filePath: item,  //选择路径
        encoding: "base64", //转码格式
        success: (res) => {
          base64Arr.push(res.data);
          if (base64Arr.length >= images.length) {
            resolve(base64Arr);
          }
        }
      })
    })
  })
}
    //调云函数的方法
    //name 云函数的函数名
    //data 要传递给云函数的数据
    const callfun = function (name, data = {}) {
      return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
          name,
          data
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err);
        })
      })
    }


    //上传文件到云储存
    const uploadCloud = function (base64Arr) {
      return new Promise((resolve, reject) => {
        let fileID = [];//用来装返回的fileID
        base64Arr.forEach(item => {
          callfun("uploadfile", {
            base64Data: item
          })
            .then(res => {
              //res就是上传图片成功后，云函数但回来的fileID
              fileID.push(res.result.fileID);
              if(fileID.length>=base64Arr.length){
                resolve(fileID);
              }
            })
        })
      })
    }

    module.exports = {
      tobase64,
      uploadCloud,
      callfun,
      find,
      _,
    }