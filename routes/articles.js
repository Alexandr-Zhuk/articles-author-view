const express = require('express');
const multer  = require('multer');
const path = require('path');

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({ dest: pathUp });

const Ajv = require('ajv');
const router = express.Router();
const ajv = new Ajv();

const articlesList = [
    {
        id: 1,
        artName: 'Article #1', 
        artText: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio repellat et repellendus, impedit ad vel perferendis exercitationem molestias corporis? Enim nisi consectetur accusamus aspernatur quo molestias vero, exercitationem eaque excepturi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio repellat et repellendus, impedit ad vel perferendis exercitationem molestias corporis? Enim nisi consectetur accusamus aspernatur quo molestias vero, exercitationem eaque excepturi.',
        author: 1
    },
    {
        id: 2,
        artName: 'Article #2', 
        artText: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio repellat et repellendus, impedit ad vel perferendis exercitationem molestias corporis? Enim nisi consectetur accusamus aspernatur quo molestias vero, exercitationem eaque excepturi.',
        author: 1
    },
    {
        id: 3,
        artName: 'Article #3', 
        artText: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio repellat et repellendus, impedit ad vel perferendis exercitationem molestias corporis? Enim nisi consectetur accusamus aspernatur quo molestias vero, exercitationem eaque excepturi.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio repellat et repellendus, impedit ad vel perferendis exercitationem molestias corporis? Enim nisi consectetur accusamus aspernatur quo molestias vero, exercitationem eaque excepturi.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio repellat et repellendus, impedit ad vel perferendis exercitationem molestias corporis? Enim nisi consectetur accusamus aspernatur quo molestias vero, exercitationem eaque excepturi.',
        author: 2
    },
];

const authorsList = [
    {id: 1, authorName: 'Taras Shevchenko'},
    {id: 2, authorName: 'Grygoriy Skovoroda'},
    {id: 3, authorName: 'Lesya Ukrainka'},
];

router.get('/add', (req, res) => {
    res.render('add_article');
});

router.post('/add/create', upload.none(), (req, res) => {
    let data = req.body;
    
    data.author = Number(data.author);

    const schema = {
        type: 'object',
        properties: {
            articleName: {
                type: 'string',
                minLength: 2,
                maxLength: 200
            },
            articleText: {
                type: 'string',
                minLength: 10,
            },
            author: {
                type: 'integer'
            },
        },
        required: ['articleName', 'articleText', 'author'],
        additionalProperties: false,
    };

    const validate = ajv.compile(schema);
    const valid = validate(data);
    
    if(valid){
        
        articlesList.push({
            id: articlesList.length + 1,
            artName: data.articleName,
            artText: data.articleText,
            author: data.author,
        });
        res.json('Article added');
    }else{
        res.json(validate.errors[0].message);
    }
});

router.get('/view-article', (req, res) => {
    res.render('view_article');
});

router.get('/view-article/view', (req, res) => {
    const art = articlesList.find(item => item.id === 1);
    
    let authorItem = authorsList.find(item => item.id === art.author);
 
    const artWithAuthor = {
        id: art.id,
        artName: art.artName,
        artText: art.artText,
        author: authorItem.authorName
    };
    
    res.json(artWithAuthor);
});

router.post('/view-article/view', (req, res) => {
    let newId = req.body.nextId;
    if(newId > articlesList.length){
        newId = 1;
    }
    if(newId < 1){
        newId = articlesList.length;
    }

    const art = articlesList.find(item => item.id === newId);
    
    let authorItem = authorsList.find(item => item.id === art.author);
 
    const artWithAuthor = {
        id: art.id,
        artName: art.artName,
        artText: art.artText,
        author: authorItem.authorName
    };
    
    res.json(artWithAuthor);
});

router.get('/authors', (req, res) => {
    res.render('authors');
});

router.get('/authors/list', (req, res) => {
    res.json(authorsList);
});

router.post('/authors/add', upload.none(), (req, res) => {
    let data = req.body;

    const schema = {
        type: 'object',
        properties: {
            authorName: {
                type: 'string',
                minLength: 2,
                maxLength: 20
            }
        },
        additionalProperties: false,
    };

    const validate = ajv.compile(schema);
    const valid = validate(data);
    
    if(valid){
        authorsList.push({id: authorsList.length + 1, authorName: data.authorName});
        res.json(authorsList);
    }else{
        res.json(validate.errors[0].message);
    }
});

router.post('/authors/change', (req, res) => {
    const names = req.body;
    const findName = authorsList.find(item => item.authorName === names.oldName);
    findName.authorName = names.newName;
    console.log(authorsList);
})

router.post('/personal', upload.none(), (req, res) => {

    const schema = {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                minLength: 2,
                maxLength: 20
            },
            surname: {
                type: 'string',
                maxLength: 20
            },
            age: {
                type: 'integer'   
            },
            email: {
                type: 'string',
                pattern: '^[a-z0-9_-]+@[a-z0-9]+\.[a-z]{2,6}$'
            },
            phone: {
                type: 'string',
                pattern: '^\\+380[0-9]{9}$'
            }
        },
        required: ['name', 'email', 'phone'],
        additionalProperties: false,
    };
    let data = req.body;

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid){
        res.json(validate.errors[0].message);
    }else{
        res.json('validated!');
    }

});


module.exports = router;