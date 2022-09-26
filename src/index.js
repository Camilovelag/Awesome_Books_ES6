import { settings, populateSettings } from './modules/navBar.js';
import Book from './modules/book.js';
import { DateTime } from './modules/luxon.js';

const listBooks = document.querySelector('.list-books');
const form = document.querySelector('.form-input');
const [title, author] = form.elements;

const listPage = document.querySelector('.list-page');
const addNewPage = document.querySelector('.add-new-page');
const contactPage = document.querySelector('.contact-page');

const dateBox = document.querySelector('.date');
const dt = DateTime.now();

dateBox.innerHTML = `${dt.monthLong} ${dt.day} ${dt.weekYear}, ${dt.hour}:${dt.minute}:${dt.second}`;

const inputBook = {};
let books = [];

class BookCollection {
  static removeBook(book) {
    const result = books.filter((b) => b !== book);
    books = result;
    this.populateFields();
  }

  static addBook(newBook) {
    books.push(newBook);
    this.populateFields();
    this.displayBooks();
  }

  static populateFields() {
    localStorage.setItem('savedBooks', JSON.stringify(books));
  }

  static displayBooks() {
    listBooks.innerHTML = '';
    books.map((book) => {
      const bookDiv = document.createElement('tr');
      const elementBook = document.createElement('td');
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';

      elementBook.textContent = `"${book.title}" by ${book.author}`;

      bookDiv.classList.add('book-container');
      bookDiv.appendChild(elementBook);
      bookDiv.appendChild(deleteBtn);

      listBooks.appendChild(bookDiv);

      deleteBtn.addEventListener('click', () => {
        this.removeBook(book);
        listBooks.removeChild(bookDiv);
      });
      return listBooks;
    });
  }
}

if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}

title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  BookCollection.addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
});

BookCollection.populateFields();
BookCollection.displayBooks();

listPage.addEventListener('click', () => {
  populateSettings(settings.list);
});

addNewPage.addEventListener('click', () => {
  populateSettings(settings.addNew);
});

contactPage.addEventListener('click', () => {
  populateSettings(settings.contact);
});

populateSettings(settings.addNew);