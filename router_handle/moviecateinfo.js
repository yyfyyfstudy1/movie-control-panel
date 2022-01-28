const db = require('../db/index')

//暴露相应的处理函数模块
exports.movieinfo = (req, res)=>{
    const sql = `select id, name, alias from 
    ev_article_cate where is_delete= 0`
    // console.log(req.user)
    db.query(sql, (err,result)=>{
        if(err) return res.cc(err)

        if(result.length ===0) return res.cc('没有获取到电影分类信息')

        res.send({
            status:0,
            messqge:'获取信息成功',
            data:result
        })
    })
}

//暴露增加电影分类的函数处理模块
exports.addMovieCate=(req, res)=>{
    let params = req.body
    const sql = `select * from ev_article_cate where name = ? or alias = ?`
    const sql2 = `insert into ev_article_cate (name, alias) values (?,?)`
    
    db.query(sql, [params.name, params.alias],(err,result)=>{
        if(err) return res.cc(err)
        if(result.length !== 0){
            return res.cc('此电影分类已经存在')
        }
        db.query(sql2, [params.name, params.alias], (err, result)=>{
            if(err) return res.cc(err)
            return res.cc(0,'创建电影分类成功')
        })
    })

}
