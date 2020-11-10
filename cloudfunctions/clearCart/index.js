// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'mycloud-1g7r6f59151f12e3'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection(event.collection).where({
      _openid: event._openid
    }).remove()
  } catch (e) {
    console.error(e)
  }
}