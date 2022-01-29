const db = require('../db/index')
const { param } = require('../router/moviecateinfo')

//暴露相应的处理函数模块
exports.movieinfo = (req, res)=>{
    const sql = `select id, name, alias from 
    ev_article_cate where is_delete= 0 `+ takeMovieCateId()
    //定义当id为空的时候的function
    function takeMovieCateId(){
        if (req.query.id !== undefined){
            return  `and id = ?`
        }

        return  ''
    }

    db.query(sql, req.query.id,(err,result)=>{
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
            return res.cc('创建电影分类成功',0)
        })
    })

}

//暴露删除电影分类的函数处理模块
exports.delectMovieCate=(req,res)=>{
    const sql = `update ev_article_cate set is_delete = 1 where id = ?`
    db.query(sql, req.query.id, (err, result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows !== 1) return res.cc('数据库异常')
        return res.cc('删除电影分类成功',0)
    })
}

//暴露更新电影分类的函数处理模块
exports.updateMovieCate=(req,res)=>{
    const sql = `update ev_article_cate set name = ? and alias = ? where id = `
}
