const { decodeBase64 } = require('bcryptjs')
const db = require('../db/index')
const path = require('path')
const { isExpression } = require('joi')
const fs = require("fs");

exports.takeArticleList =(req,res)=>{
let param = req.query
console.log(param)
//判断调用接口时候是否携带必选参数
if(!param.cate_name) return res.cc('电影分类是必选参数！')

//用户调用获取电影接口的后续处理
const  cateName = param.cate_name
const sql = `select * from ev_article_cate, ev_articles where ev_article_cate.id = ev_articles.cate_id and ev_article_cate.name = ?`
db.query(sql, cateName, (err, result)=>{
    if(err)return res.cc(err)
    res.send({
        status:0,
        data:result
    })
})

}