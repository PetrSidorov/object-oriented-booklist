function Book(title, author, amount) {
    this.title = title;
    this.author = author;
    this.amount = amount;
}

function UI() {

}

UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = '<td>' + book.title + '</td>'
                    + '<td>' + book.author + '</td>'
                    + '<td>' + book.amount + '</td>'
                    + '<td><a href="#" class="delete">X</a></td>';
    list.appendChild(row);
}

UI.prototype.showAlert = function(message, className) {
    const div = document.createElement('div');
    div.className = 'alert' + ' ' + className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000 );
}

UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('amount').value = '';
}

document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const amount = document.getElementById('amount').value;

    const book = new Book(title, author, amount);

    const ui = new UI();

    if (title === '' || author === '' || amount === '') {
        ui.showAlert('Please, fill all fields', 'error');
    } else {
        ui.addBookToList(book);
        ui.showAlert('The book was added', 'success');
        ui.clearFields();
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('The book was removed', 'success');
    e.preventDefault();
})