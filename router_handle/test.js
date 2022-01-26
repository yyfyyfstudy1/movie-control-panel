/*
 * @Author: 471826078@qq.com
 * @Date: 2020-05-21 09:48:04
 * @LastEditors: 471826078@qq.com
 * @LastEditTime: 2020-06-12 14:42:17
 */
var express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require('path')
const http = require('http')
const fs = require('fs')

let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, './public/uploads');      //本地
      cb(null, '../public/uploads');  //服务器
    },
    filename: function (req, file, cb) {
      var changedName = new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname;
      cb(null, changedName);
    }
  })
})
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//单个图片文件上传
router.post('/uploadImage', upload.single('file'), (req, res) => {
  if (!req.file) {  //判断一下文件是否存在，也可以在前端代码中进行判断。
    res.json({
      code: 0,
      message: "上传文件不能为空！",
      data: null
    })
    return false
  }
  //返回路径需要转义  否则会返回反斜杠格式数据 导致微信小程序识别不了本地图片 http://localhost:8888//uploads\images\1582511344098-1.jpg
  let filePath = req.file.path;
  let pathResult = filePath.split('\\').join('/');
  res.json({
    code: 1,
    type: 'uploadImage',
    message: "上传成功！",
    data: req.file.path,
    originalname: req.file.originalname,
    path:'线上服务地址' + pathResult
  })
});

//下载文件
router.get('/download',(req, res, next)=>{
  const name = req.body.name;
  console.log(name)
  var path = '../public/download/'+ name;
  var size = fs.statSync(path).size;
  var f = fs.createReadStream(path);
  res.writeHead(200, {
    'Content-Type': 'application/force-download',
    'Content-Disposition': 'attachment; filename=' + name,
    'Content-Length': size
  });
  f.pipe(res);
})
module.exports = router;
