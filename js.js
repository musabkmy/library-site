const newBook = "#new-book";
const addBookForm = "#add-book-form";
const addBookDialog = "#add-book-dialog";
const closeButton = "#close-button";
const submitButton = "#submit-button";
const booksList = "#books-list";
const LibraryTable = "#books-table";

const myLibrary = [
  new Book("Knowing", "BB. Ali"),
  new Book("Understanding things", "Mohammed Yahia"),
];

function Book(title, author) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.isRead = false;

  this.toggleRead =  function() {
    this.isRead = !this.isRead;
  }
}

function addBookToLibrary(book) {
  myLibrary.add(book);
  console.log(myLibrary.toString());
}

const dialog = document.querySelector(addBookDialog);
const form = document.querySelector(addBookForm);
const table = document.querySelector(LibraryTable);
const showDialog = document.querySelector(newBook);
const closeDialog = document.querySelector(closeButton);
const submitDialog = document.querySelector(submitButton);

showDialog.addEventListener("click", () => {
  dialog.showModal();
});

closeDialog.addEventListener("click", (e) => {
  dialog.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const entries = Object.fromEntries(formData.entries());

  const title = entries.title;
  const author = entries.author;

  if (title !== undefined && author !== undefined) {
    const book = new Book(title, author);
    const row = generateBookRow(book);
    table.appendChild(row);
  } else {
    console.log(`Title: ${entries.title}, Author: ${entries.author}`);
  }

  dialog.close();
});

function generateTableContent(library) {
  const headerRow = document.createElement("tr");

  // Add table headers
  headerRow.innerHTML = "<th>#</th><th>Title</th><th>Author</th><th>Read</th>";
  table.appendChild(headerRow);

  console.log();
  // Add each book as a row
  library.forEach((book, _) => {
    const row = generateBookRow(book);
    table.appendChild(row);
  });
}

generateTableContent(myLibrary);

function generateBookRow(book) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${book.id}</td><td>${book.title}</td><td>${book.author}</td>`;
  row.appendChild(createReadToggle(book));
  return row;
}

function createReadToggle(book) {
  const toggleCell = document.createElement("td");
  const label = document.createElement("label");
  label.classList.add("switch");

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = `toggle-${book.id}`;
  input.checked = book.isRead;
  input.addEventListener("change", () => {
        book.toggleRead();
    if (input.checked) {
      console.log(`Checkbox must be checked: ${book.isRead}`);    
    } else {
      console.log(`Checkbox must be unchecked: ${book.isRead}`);
    }
  });

  const span = document.createElement("span");
  span.classList.add("slider", "round");

  label.appendChild(input);
  label.appendChild(span);

  toggleCell.appendChild(label);
  return toggleCell;
}
