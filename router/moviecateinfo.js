const express = require('express')

const router =  express.Router()
//导入用户路由处理函数对应的模块
const movie_handler = require('../router_handle/moviecateinfo.js')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

//导入需要的验证对象
const {add_cate_schema} = require('../schema/article')

//获取电影分类
router.get('/article/cates',movie_handler.movieinfo)

//新增电影分类
router.post('/article/addcates',expressJoi(add_cate_schema),movie_handler.addMovieCate)

//删除电影分类
router.get('/article/deletecate', movie_handler.delectMovieCate)

module.exports = router