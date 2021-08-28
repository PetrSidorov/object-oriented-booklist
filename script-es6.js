class Book {
    constructor(title, author, amount) {
        this.title = title;
        this.author = author;
        this.amount = amount;
        this.id = Book.generateID();
    }

    static generateID(){
        const id = Math.random().toString(16).slice(2);
        return id;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.setAttribute('data-id', book.id);
        row.innerHTML = `<td> ${ book.title } </td>
                        <td> ${ book.author }  </td>
                        <td> ${ book.amount }  </td>
                        <td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${ className }`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000 );
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('amount').value = '';
    }
}

class Store {
    static getBooks() {
        let books;
        (localStorage.getItem('books') != null) ?
            books = JSON.parse(localStorage.getItem('books')) :
            books = [];
        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach( book  => {
            const ui = new UI;
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(id) {
        const books = Store.getBooks();
        books.forEach( (book, index) => {
            if (book.id === id) {
                books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

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
        Store.addBook(book);
        ui.showAlert('The book was added', 'success');
        ui.clearFields();
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.parentElement.getAttribute('data-id'));
    ui.showAlert('The book was removed', 'success');
    e.preventDefault();
})