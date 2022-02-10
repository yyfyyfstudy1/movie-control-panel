const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const article_handler = require('../router_handle/article')

//导入multer和path
const multer = require('multer')
const path = require('path')

//创建multer实例,自定义图片储存的后缀名
let uploads = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        // cb(null, './public/uploads');      //本地
        cb(null, './uploads');  //服务器
      },
      filename: function (req, file, cb) {
        var changedName = new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname+'.png';
        cb(null, changedName);
      }
    })
  })



  //创建multer实例,自定义电影储存的后缀名
let uploadsMovie = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, './public/uploads');      //本地
      cb(null, './uploads');  //服务器
    },
    filename: function (req, file, cb) {
      var changedName = new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname+'.mp4';
      cb(null, changedName);
    }
  })
})

  

//const uploads = multer({dest: path.join(__dirname, '../uploads')})

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const {add_article_schema} = require('../schema/article')


router.post('/add',uploads.single('cover_img')  ,expressJoi(add_article_schema), article_handler.addArticle)

router.post('/list', article_handler.takeArticleList)

//修改电影信息的路由
router.post('/editMovie', article_handler.editMovieInfo)

//获取渲染电影信息的路由
router.get('/takeMovieeditinfo', article_handler.getEditMovieInfo)

router.get('/delete', article_handler.delectArticle)

module.exports = router