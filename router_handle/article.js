
const { decodeBase64 } = require('bcryptjs')
const db = require('../db/index')
const path = require('path')
const { isExpression } = require('joi')
const fs = require("fs");
exports.addArticle =(req,res)=>{
if(!req.file || req.file.fieldname!=='cover_img') return res.cc('文章封面是必选的!')
  
   var fileNewName = req.file.filename + '.png'
   

 //后续业务逻辑处理
 const articleInfo ={
     //标题，内容，发布状态，所属分类的id
     ...req.body,
     //文章封面的存放路径
     cover_img: path.join('/uploads', fileNewName),
     //文章发布的时间
     pub_date: new Date(),

     //文章作者的id
     author_id: req.user.id,
 }


 const sql = `insert into ev_articles set ?`
 db.query(sql, articleInfo, (err, result)=>{
     if(err)return res.cc(err)
     if(result.affectedRows !==1)return res.cc('发布文章失败！')
     res.cc('发布文章成功', 0)
 })
} 


exports.takeArticleList=(req, res)=>{
    var param = req.body;
    // console.log(param)
    var pageSize = param.pagesize
    var start = (param.pagenum - 1) * pageSize;
   
    const sql = `select * from ev_articles, ev_article_cate  where ev_articles.cate_id = ev_article_cate.id limit ` +start+ `, `+pageSize;
    
    const sql2 = `SELECT COUNT(*) FROM ev_articles`

    db.query(sql2, (err, result)=>{
        if(err) return res.cc(err)
        //计算电影总条数
        var resultNum = result[0]['COUNT(*)']

        //计算总页数
        var allPage = parseInt(resultNum )/pageSize;
        var pageStr = allPage.toString();
        // 不能被整除
        if (pageStr.indexOf('.')>0) {
            allPage = parseInt(pageStr.split('.')[0]+1); 
        }
       
        db.query(sql, (err, result)=>{
            if(err) return res.cc(err)
            res.send({
                status:0,
                data:result,
                total:resultNum,
                pagesize:allPage
               
            }) 
        })
    
    })

  
   
}