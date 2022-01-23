const joi = require('joi')

//定义验证文章合法性的校验规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布','草稿').required()

exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
    }
}

