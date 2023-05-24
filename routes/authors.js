const express = require('express');
const multer  = require('multer');
const path = require('path');
const schemas = require('../validationSchemas/schemas');

const authorController = require('../controllers/authorController');

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({ dest: pathUp });

const Ajv = require('ajv');
const router = express.Router();
const ajv = new Ajv();

router.get('/', (req, res) => {
    res.render('authors');
});

router.get('/list', (req, res) => {
    const authorsList = authorController.getAuthorsList();
    res.json(authorsList);
});

router.post('/add', upload.none(), (req, res) => {
    let data = req.body;

    const validate = ajv.compile(schemas.schemaAddAuthor);
    const valid = validate(data);
    
    if(valid){
        authorController.addAuthor(data);
        const authorsList = authorController.getAuthorsList();
        res.json(authorsList);
    }else{
        res.json(validate.errors[0].message);
    }
});

router.post('/change', (req, res) => {
    const names = req.body;
    names.id = Number(names.id);
    authorController.updateAuthor(names);
})

module.exports = router;