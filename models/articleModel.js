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

const getOneArticle = (id) => {
    return articlesList.find(item => item.id === id);
};

const getQtyArticles = () => {
    return articlesList.length;
}

const addArticle = (data) => {
    articlesList.push({
        id: articlesList.length + 1,
        artName: data.articleName,
        artText: data.articleText,
        author: data.author,
    });
}

module.exports.getOneArticle = getOneArticle;
module.exports.getQtyArticles = getQtyArticles;
module.exports.addArticle = addArticle;

