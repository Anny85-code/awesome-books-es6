import { DateTime } from './node_modules/luxon/src/luxon.js';
import {
  form,
  navs,
  title,
  author,
  todayDate,
} from './modules/pageElements.js';
import { findHight } from './modules/manupulateDom.js';
import Books from './modules/Books.js';

(() => {
  Books.load();
  findHight();
  todayDate.textContent = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (title.value !== '' && author.value !== '') {
      const BookObj = new Books(title.value, author.value);
      Books.addBook(BookObj);
      title.value = '';
      author.value = '';
    } else {
      Books.showAlert('Please fill all the fields', 'danger');
    }
  });

  document.querySelectorAll('.removeBook').forEach((deleteBook) => {
    deleteBook.addEventListener('click', () => Books.removeBook(deleteBook));
  });

  navs.forEach((nav) => {
    nav.addEventListener('click', (e) => {
      document
        .querySelectorAll('.nav')
        .forEach((nav2) => nav2.classList.remove('activelink'));
      e.preventDefault();
      document
        .querySelectorAll('.tab')
        .forEach((tab) => tab.classList.remove('active'));
      e.target.classList.add('activelink');
      document
        .querySelector(e.target.getAttribute('href'))
        .classList.add('active');
      findHight();
    });
  });
})();
