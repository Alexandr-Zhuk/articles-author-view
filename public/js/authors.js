const authorList = document.querySelector('.author-list-list');
const addForm = document.querySelector('.add-author-form');

const renderAuthors = (data) => {
    let html = '';
    
    data.data.forEach(item => {
        html += `<li class="author-item"><div class="author-name">${item.authorName}</div><div class="change-author">ред.</div></li>`;
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

authorList.addEventListener('click', (ev) => {
    if(ev.target.classList.contains('change-author')){
        const author =  ev.target.parentNode.querySelector('.author-name');
        const oldName = author.innerHTML;
        author.innerHTML = `<input type="text" name="author" value="${author.innerHTML}">`;
        const authorInput = document.querySelector('input[name="author"]');
        authorInput.focus();
        const changeName = () => {
            author.innerHTML = document.querySelector('input[name="author"]').value;
            const newName = author.innerHTML;
            if(newName !== oldName){
                const changeAuthor = async () => {
                    const names = {oldName: oldName, newName: newName};
                    const data = await axios.post('/articles/authors/change', names)
                }
                changeAuthor();
            }
            author.removeEventListener('focusout', changeName);
        }
        author.addEventListener('focusout', changeName);
        
    }
    
});