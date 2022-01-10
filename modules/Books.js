import {
  myStorage, listbooks, alertDiv,
} from './pageElements.js';
import { findHight } from './manupulateDom.js';

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static db = () => ((myStorage.getItem('books') !== null) ? JSON.parse(myStorage.getItem('books')) : [])

  static removeBook = (button) => {
    const result = this.db().filter((word) => word.title !== button.getAttribute('data-book-name'));
    button.parentElement.remove();
    myStorage.setItem('books', JSON.stringify(result));
    this.showAlert('Book deleted ', 'success');
    findHight();
  }

  static load = () => {
    this.db().forEach((data) => {
      listbooks.innerHTML += `
                  <li>
                      <p><q>${data.title}</q> by ${data.author}</p>
                      <button class='removeBook' data-book-name="${data.title}" >remove</button>
                  </li>
              `;
    });
  }

  static addBook = (book) => {
    const result = this.db().filter((word) => word.title === book.title);
    if (result.length === 0) {
      const data = this.db();
      data.push(book);
      myStorage.setItem('books', JSON.stringify(data));
      this.createListElement(book);
      this.showAlert('Book added ', 'success');
      findHight();
      setTimeout(() => {
        document.querySelector('[href="#list-tab"]').click();
      }, 1000);
    } else {
      this.showAlert('Book already exists ', 'danger');
    }
  }

  static showAlert = (message, className) => {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    alertDiv.appendChild(div);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static createListElement = (book) => {
    const dltBtn = document.createElement('button');
    dltBtn.innerText = 'Remove';
    dltBtn.setAttribute('data-book-name', `${book.title}`);
    dltBtn.setAttribute('type', 'button');
    dltBtn.addEventListener('click', () => Books.removeBook(dltBtn));
    const p = document.createElement('p');
    p.innerHTML = `<q>${book.title}</q> by ${book.author}`;
    const liEl = document.createElement('li');
    liEl.appendChild(p);
    liEl.appendChild(dltBtn);
    listbooks.appendChild(liEl);
  }
}
export default Books;