const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const article_handler = require('../api-router-handle/movie_carousel')

//暴露供前端所有用户访问的获取电影轮播图的接口
router.get('/movieCarousel', article_handler.takeArticleList)

module.exports = router
