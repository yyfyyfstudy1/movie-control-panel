
const { decodeBase64 } = require('bcryptjs')
const db = require('../db/index')
const path = require('path')
const { isExpression } = require('joi')
exports.addArticle =(req,res)=>{
if(!req.file || req.file.fieldname!=='cover_img') return res.cc('文章封面是必选的!')

 //后续业务逻辑处理
 const articleInfo ={
     //标题，内容，发布状态，所属分类的id
     ...req.body,
     //文章封面的存放路径
     cover_img: path.join('/uploads', req.file.filename),
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
    const sql = `select * from ev_articles, ev_article_cate where ev_articles.cate_id = ev_article_cate.id`
    db.query(sql, (err, result)=>{
        if(err) return res.cc(err)
        res.send({
            status:0,
            data:result
        }) 
    })
}