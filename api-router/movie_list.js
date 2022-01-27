const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const article_handler = require('../api-router-handle/movie_list')

//暴露供前端所有用户访问的获取电影列表的接口
router.get('/movielist', article_handler.takeArticleList)

module.exports = router
