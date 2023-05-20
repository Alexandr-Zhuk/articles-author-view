const authorList = document.querySelector('.author-list-list');
const addForm = document.querySelector('.add-author-form');

const renderAuthors = (data) => {
    let html = '';
    
    data.data.forEach(item => {
        html += `<li>${item.authorName}</li>`;
    });
    authorList.innerHTML = html;
};

const viewAuthors = async () => {
    const data = await axios.get('/articles/authors/list');
    renderAuthors(data);
};

const addAuthor = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const data = await axios.post('/articles/authors/add', formData);
    renderAuthors(data);
};

viewAuthors();

addForm.addEventListener('submit', addAuthor);