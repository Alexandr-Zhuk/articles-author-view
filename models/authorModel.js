const authorsList = [
    {id: 1, authorName: 'Taras Shevchenko'},
    {id: 2, authorName: 'Grygoriy Skovoroda'},
    {id: 3, authorName: 'Lesya Ukrainka'},
];

const getAuthorsList = () => {
    return authorsList;
};

const getOneAuthor = (id) => {
    return authorsList.find(item => item.id === id);
};

const addAuthor = (data) => {
    authorsList.push({id: authorsList.length + 1, authorName: data.authorName});
    getAuthorsList();
}

const updateAuthor = (data) => {
    const findElem = authorsList.find(item => item.id === data.id);
    findElem.authorName = data.newName;
};

module.exports.getOneAuthor = getOneAuthor;
module.exports.getAuthorsList = getAuthorsList;
module.exports.addAuthor = addAuthor;
module.exports.updateAuthor = updateAuthor;