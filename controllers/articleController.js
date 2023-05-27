const articleModel = require('../models/articleModel');
const authorController = require('../controllers/authorController');

const getArticle = (id) => {
    const art = articleModel.getOneArticle(id)
    const authorId = art.author;
    const author = authorController.getAuthor(authorId);

    const artWithAuthor = {
        id: art.id,
        artName: art.artName,
        artText: art.artText,
        author: author.authorName
    };
    return artWithAuthor;
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