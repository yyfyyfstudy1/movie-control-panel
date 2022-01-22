const db = require('../db/index')

//暴露相应的处理函数模块
exports.getUserInfo = (req, res)=>{
    const sql = `select id, username, nickname, email, user_pic from 
    user_ev where id=?`
    // console.log(req.user)
    db.query(sql, req.user.id, (err,result)=>{
        if(err) return res.cc(err)

        if(result.length !==1) return res.cc('获取用户信息失败')

        res.send({
            status:0,
            messqge:'获取信息成功',
            data:result[0]
        })
    })
}

//更新用户基本信息的处理函数
exports.updateUserInfo=(req, res)=>{
    const sql = `update user_ev set  ? where id=?`

    db.query(sql, [req.body, req.user.id], (err, result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows !== 1) return res.cc('更新失败')
        res.send({
            status:0,
            messqge:'更新用户信息成功'
        })
    })
}


//测试模块
exports.getUserInfoTest = (req, res)=>{
    const sql = `select id, username, nickname, email, user_pic from 
    user_ev where id=? or id=2`
    // console.log(req.user)
    db.query(sql, req.user.id, (err,result)=>{
        if(err) return res.cc(err)

        res.send({
            status:0,
            messqge:'获取信息成功',
            data:result
        })
    })
}