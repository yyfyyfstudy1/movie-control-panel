const express = require('express')

const router =  express.Router()
//导入用户路由处理函数对应的模块
const user_handler = require('../router_handle/movieinfo.js')

//获取电影分类
router.get('/article/cates',user_handler.movieinfo)

module.exports = router