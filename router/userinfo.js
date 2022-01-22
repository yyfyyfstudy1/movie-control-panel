const express = require('express')
const router = express.Router()
//导入路由处理函数模块
const userinfo_handler = require('../router_handle/userinfo')
//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const{update_userinfo_schema} =require('../schema/user')

router.get('/userinfo', userinfo_handler.getUserInfo)
//更新用户信息的路由
router.post('/userinfo',expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
router.post('/test', userinfo_handler.getUserInfoTest )
module.exports = router