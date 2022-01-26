const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const article_handler = require('../router_handle/article')

//导入multer和path
const multer = require('multer')
const path = require('path')

//创建multer实例
const uploads = multer({dest: path.join(__dirname, '../uploads')})

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const {add_article_schema} = require('../schema/article')


router.post('/add',uploads.single('cover_img'),expressJoi(add_article_schema), article_handler.addArticle)

router.post('/list', article_handler.takeArticleList)

module.exports = router