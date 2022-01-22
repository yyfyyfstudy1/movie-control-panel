const db = require('../db/index')
//导入加密包
const bcrypt =require('bcryptjs')
const e = require('express')

//导入生成token的包
const jwt = require('jsonwebtoken')
const { config } = require('../db/index')
const configmi = require('../config')

exports.resuser=(req,res)=>{
    //获取服务端拿到的信息
    const userinfo = req.body
   
    //合法性校验
    // if(!userinfo.username || !userinfo.password){
    //     return res.cc('用户或者密码不合法')
    // }

    //定于sql语句
    const sqlStr = 'select * from user_ev where username=?'
    db.query(sqlStr, userinfo.username, (err, result)=>{
        if(err){
            return res.send({status:1, message: err.message})
        }
        if(result.length>0){
            return res.cc('此用户名已经注册')
        }

        //当用户名可以注册
        //调用加密方法
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        console.log(userinfo)
        //定义sql语句
        const sql = 'insert into user_ev set ?'
        db.query(sql, {username:userinfo.username, password:userinfo.password},(err, result)=>{
            if(err){
                return res.cc(err)
            } 
            if(result.affectedRows !== 1){
                return res.cc("请稍后再进行注册")
            }
            res.cc('注册成功！',0)
        })

    })
    
}

exports.login=(req,res)=>{
     const userinfo =  req.body
     const sql =  'select * from user_ev where username=?'
     db.query(sql, userinfo.username,(err,result)=>{
         if(err) return res.cc(err)

         if(result.length !== 1) return res.cc('登录失败')
        
        const compareResult = bcrypt.compareSync(userinfo.password, result[0].password)
        if(!compareResult){
            res.cc('登录失败')
        }else{
            //清空一些隐私的字符串
            const user = {...result[0], password:'', user_pic:''}
            //生成token的字符串
           const tokenStr = jwt.sign(user, configmi.jwtSecretKey, {expiresIn:'10h'})
           //将token响应回客户端
           res.send({
               status:0,
               message:'登录成功',
               token: 'Bearer '+tokenStr
           })
        }
     })
}