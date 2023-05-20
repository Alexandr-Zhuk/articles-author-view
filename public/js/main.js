const articleData = document.querySelector('.view-article > .container');
const previousArticle = document.querySelector('.previous');
const nextArticle = document.querySelector('.next');

let currentIdArticle;

const renderArticle = (data) => {
    const html = 
        `<div class="name-article">
            ${data.data.artName}
        </div>
        <div class="text-article">
            ${data.data.artText}
        </div>
        <div class="author">
            Автор: <span>${data.data.author}</span>
        </div>`;
    articleData.innerHTML = html;
};

const viewArticle = async () => {
    const data = await axios.get('/articles/view-article/view');
    currentIdArticle = data.data.id;
    console.log(currentIdArticle);
    renderArticle(data);
};

viewArticle();

nextArticle.addEventListener('click', async () => {
    let nextIdArticle = {nextId: currentIdArticle + 1};
    
    const data = await axios.post('/articles/view-article/view', nextIdArticle);
    currentIdArticle = data.data.id;
    renderArticle(data);
});

previousArticle.addEventListener('click', async () => {
    let nextIdArticle = {nextId: currentIdArticle - 1};
    
    const data = await axios.post('/articles/view-article/view', nextIdArticle);
    currentIdArticle = data.data.id;
    renderArticle(data);
});