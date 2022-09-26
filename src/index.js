import { settings, populateSettings } from "../src/modules/navBar.js";
// import Book from "../src/modules/book.js";

const listBooks = document.querySelector('.list-books');
const booksContainer = document.querySelector('.books-wrapper');
const form = document.querySelector('.form-input');
const contact = document.querySelector('.contact');
const [title, author] = form.elements;

const listPage = document.querySelector('.list-page');
const addNewPage = document.querySelector('.add-new-page');
const contactPage = document.querySelector('.contact-page');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const inputBook = {};
let books = new Array([]);

if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}


title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

class BookCollection{

  static removeBook(book) {
    const result = books.filter((b) => b !== book);
    books = result;
    this.populateFields();
  }

  static addBook = (newBook) => {
    books.push(newBook);
    this.populateFields();
    this.displayBooks();
  };

  static populateFields = () => {
    localStorage.setItem('savedBooks', JSON.stringify(books));
  };

  static displayBooks = () => {
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
  };
};

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