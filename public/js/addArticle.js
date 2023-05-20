const articleForm = document.querySelector('.add-article-form');
const authorsListSelect = document.querySelector('.author-list-select');

const getAuthorsList = async () => {
    const data = await axios.get('/articles/authors/list');
    let html = '';
    data.data.forEach((item) => {
        html += `<option value="${item.id}">${item.authorName}</option>`;
    });
    authorsListSelect.innerHTML = html;

};

getAuthorsList();

const addArticle = async (ev) => {
    
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const data = await axios.post('/articles/add/create', formData);
    console.log(data.data)
};

articleForm.addEventListener('submit', addArticle)