const db = require('../db/index')

//暴露相应的处理函数模块
exports.movieinfo = (req, res)=>{
    const sql = `select name, alias from 
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
