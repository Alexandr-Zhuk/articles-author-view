const articleModel = require('../models/articleModel');

const getArticle = (id) => {
    return articleModel.getOneArticle(id);
};

const getQtyArticles = () => {
    return articleModel.getQtyArticles();
}

const addArticle = (data) => {
    articleModel.addArticle(data);
};

module.exports.getArticle = getArticle;
module.exports.getQtyArticles = getQtyArticles;
module.exports.addArticle = addArticle;