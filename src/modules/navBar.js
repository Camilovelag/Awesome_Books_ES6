const booksContainer = document.querySelector('.books-wrapper');
const form = document.querySelector('.form-input');
const contact = document.querySelector('.contact');

const listPage = document.querySelector('.list-page');
const addNewPage = document.querySelector('.add-new-page');
const contactPage = document.querySelector('.contact-page');

export const settings = {
  list: {
    display: ['block', 'none', 'none'],
    color: ['#0000ff', '#333', '#333'],
  },
  addNew: {
    display: ['none', 'block', 'none'],
    color: ['#333', '#0000ff', '#333'],
  },
  contact: {
    display: ['none', 'none', 'block'],
    color: ['#333', '#333', '#0000ff'],
  },
};

/* eslint-disable */

export const populateSettings = (i) => {
  booksContainer.style.display = i.display[0];
  form.style.display = i.display[1];
  contact.style.display = i.display[2];

  listPage.style.color = i.color[0];
  addNewPage.style.color = i.color[1];
  contactPage.style.color = i.color[2];
}

/* eslint-enable */