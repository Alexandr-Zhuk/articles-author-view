const express = require('express');
const multer  = require('multer');
const path = require('path');
const articleController = require('../controllers/articleController');
const authorController = require('../controllers/authorController');
const schemas = require('../validationSchemas/schemas');

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({ dest: pathUp });

const Ajv = require('ajv');
const router = express.Router();
const ajv = new Ajv();

router.get('/add', (req, res) => {
    res.render('add_article');
});

router.post('/add/create', upload.none(), (req, res) => {
    let data = req.body;
    data.author = Number(data.author);

    const validate = ajv.compile(schemas.schemaAddArticle);
    const valid = validate(data);
    
    if(valid){  
        articleController.addArticle(data);
        res.json('Article added');
    }else{
        res.json(validate.errors[0].message);
    }
});

router.get('/view-article', (req, res) => {
    res.render('view_article');
});

router.get('/view-article/view', (req, res) => {
    const id = 1;
    const art = articleController.getArticle(id);
    const authorId = art.author;
    const author = authorController.getAuthor(authorId);

    const artWithAuthor = {
        id: art.id,
        artName: art.artName,
        artText: art.artText,
        author: author.authorName
    };
    
    res.json(artWithAuthor);
});

router.post('/view-article/view', (req, res) => {
    let newId = req.body.nextId;
    const qtyArticles = articleController.getQtyArticles();
    
    if(newId > qtyArticles){
        newId = 1;
    }
    if(newId < 1){
        newId = qtyArticles;
    }

    const art = articleController.getArticle(newId);
    const authorId = art.author;
    const author = authorController.getAuthor(authorId);
 
    const artWithAuthor = {
        id: art.id,
        artName: art.artName,
        artText: art.artText,
        author: author.authorName
    };
    
    res.json(artWithAuthor);
});

module.exports = router;