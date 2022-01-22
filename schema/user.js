const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required()
// const password = joi.string().pattern(/^[\s]{6,12}$/).required()
const password = joi.string().alphanum().min(1).max(10).required()

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const useremail = joi.string().email().required()

//定义验证注册和登录表单数据规则的对象
exports.reg_login_schema = {
    body:{
        username,
        password,
    },
}

//定义更新用户信息的验证规则
exports.update_userinfo_schema={
    body:{
        nickname,
        email:useremail
    },
}