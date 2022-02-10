
const { decodeBase64 } = require('bcryptjs')
const db = require('../db/index')
const path = require('path')
const { isExpression } = require('joi')
const fs = require("fs");
exports.addArticle =(req,res)=>{
    // console.log(req)
    // console.log('1111')
    if(!req.file || req.file.fieldname!=='cover_img') return res.cc('文章封面是必选的!')

    let filePath = req.file.path;
    let pathResult = filePath.split('\\').join('/');
    //后续业务逻辑处理
    const articleInfo ={
        //标题，内容，发布状态，所属分类的id
        ...req.body,
        //文章封面的存放路径
        cover_img:  pathResult,
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
    // console.log(param.cate_id+param.state)
    var pageSize = param.pagesize
    var start = (param.pagenum - 1) * pageSize;
    var post1Use = `limit `+ start + `, `+pageSize 
    // console.log('---------------------------')
    // console.log(param)
    // console.log(param.cate_id)
    // console.log(param.state)
    // console.log('---------------------------')
    const sql = `select * from ev_articles, ev_article_cate  
    where ev_articles.cate_id = ev_article_cate.cate_id ` +  takeSql();

    //定义筛选数据的函数
    function takeSql(){


            if(param.cate_id.length!==0 && param.state.length !==0){
                return  ` and ev_article_cate.cate_id = ? and ev_articles.state = ?`+post1Use
             }
             if(param.state.length !==0){
               return ` and ev_articles.state = ?` + post1Use
             }
             if(param.cate_id.length!==0){
                return ` and ev_article_cate.cate_id = ?` +post1Use
              }
             return post1Use

        

       
    }

    const sql2 = `SELECT COUNT(*) FROM ev_articles`

    //判断拿到的分类以及电影状态信息是否为空

    // console.log(sql)
    db.query(sql2,(err, result)=>{
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
       

        db.query(sql,[param.cate_id, param.state], (err, result)=>{
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


exports.delectArticle=(req, res)=>{
    // console.log(req.query.id)

    const sql = `delete from ev_articles where id = ?`
    db.query(sql, req.query.id, (err, result)=>{
        if(err) return res.cc(err)
        res.cc('删除成功',0)
    })
}

exports.editMovieInfo=(req, res)=>{
    console.log(req.body)
    const sql =`update ev_articles set title = ?, content= ?, state= ? where id = ?`
    db.query(sql, [req.body.title, req.body.content,req.body.state, req.body.id],(err, result)=>{
        if(err) return res.cc(err)
        res.cc('更新文章成功',0)
    })

}

exports.getEditMovieInfo=(req, res)=>{
    const sql = `select * from ev_articles where id = ?`
    db.query(sql, req.query.id, (err, result)=>{
        if(err) return res.cc(err)
        res.send({
            status:0,
            data:result,
           
        }) 
    })
}