const joi = require('joi')
//定义验证电影分类合法性的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
//定义验证文章合法性的校验规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布','草稿').required()

//暴露验证电影分类的对象
exports.add_cate_schema ={
    body:{
        name,
        alias
    }
}

exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
    }
}

