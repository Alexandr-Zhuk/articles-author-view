const authorModel = require('../models/authorModel');

const getAuthorsList = () => {
    return authorModel.getAuthorsList();
};

const getAuthor = (id) => {
    return authorModel.getOneAuthor(id);
};

const addAuthor = (data) => {
    authorModel.addAuthor(data);
};

const updateAuthor = (data) => {
    authorModel.updateAuthor(data);
};

module.exports.getAuthor = getAuthor;
module.exports.getAuthorsList = getAuthorsList;
module.exports.addAuthor = addAuthor;
module.exports.updateAuthor = updateAuthor;