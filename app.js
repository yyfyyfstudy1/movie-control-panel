const express = require("express")
const joi = require('joi')
const app = express()
//配置跨域中间件
const cors = require('cors')
app.use(cors())
//这个中间件只能解析x-www-form的表单数据
app.use(express.urlencoded({extended:false}))

//托管静态资源
app.use('/my/uploads', express.static('./uploads'))

//在路由前封装res.cc函数
app.use((req, res, next)=>{
    res.cc = function(err, status=1){
        res.send({
            status,
            message:err instanceof Error ? err.message : err
        })
    }

    next()
})
//一定要在路由之前配置解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))

//导入并使用user路由
const userRouter = require('./router/user')
const res = require("express/lib/response")
app.use('/api', userRouter)


//导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

//导入获取电影分类的路由模块
const movieInfo = require('./router/movieinfo')
app.use('/my', movieInfo)


//导入发布文章，获取文章列表路由模块
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)

//导入电影轮播图api接口，不需要权限访问
const movieCarouselRouter = require('./api-router/movie_carousel')
app.use('/api', movieCarouselRouter)


//定义错误级别中间件
app.use((err, req, res, next)=>{
    if(err instanceof joi.ValidationError){
        return res.cc(err)
    }
    if(err.name ==='UnauthorizedError'){
        return res.cc('身份认证失败！')
    }
    else{
        res.cc(err)
    }
})

app.listen(8080, ()=>{
    console.log('http://127.0.0.1:8080/')
}) 