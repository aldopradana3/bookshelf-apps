let bookItems = [];
const formBook = document.getElementById("inputBook");
const inputTitle = document.getElementById("inputBookTitle");
const inputAuthor = document.getElementById("inputBookAuthor");
const inputYear = document.getElementById("inputBookYear");
const isCheckComplete = document.getElementById("inputBookIsComplete");

// content loaded & submit form
document.addEventListener("DOMContentLoaded", function () {
  formBook.addEventListener("submit", function () {
    addNewBook();
  });

  loadStorage();
});

// add book to bookshelf
function addNewBook() {
  const id = +new Date();
  const bookTitle = inputTitle.value;
  const bookAuthor = inputAuthor.value;
  const bookYear = inputYear.value;
  const isCompleted = isCheckComplete.checked;

  const newBook = {
    id: id,
    title: bookTitle,
    author: bookAuthor,
    year: bookYear,
    isCompleted: isCompleted,
  };

  bookItems.unshift(newBook);
  renderBook(bookItems);
  saveStorage();

  alert("List buku baru berhasil ditambahkan!");
}

// find book index using book id
function findIndex(idBook) {
  for (const index in bookItems) {
    if (bookItems[index].id == idBook) {
      return index;
    }
  }
  return null;
}

// function remove book
function removeBook(idBook) {
  const targetBook = findIndex(idBook);
  if (confirm("List bacaan akan dihapus?\nTidak bisa mengembalikan list yang telah terhapus!")) {
    bookItems.splice(targetBook, 1);
    renderBook(bookItems);
    saveStorage();
    alert("List buku berhasil dihapus!");
  } else {
    alert("List buku tidak berhasil dihapus!");
  }
}

//change status book (read or unread) / click the button
function changeStatus(idBook) {
  const indexBook = findIndex(idBook);
  for (const index in bookItems) {
    if (index === indexBook) {
      if (bookItems[index].isCompleted === true) {
        bookItems[index].isCompleted = false;
        alert("List buku berhasil dipindahkan ke rak belum dibaca!");
      } else {
        bookItems[index].isCompleted = true;
        alert("List buku berhasil dipindahkan ke rak sudah dibaca!");
      }
    }
  }

  renderBook(bookItems);
  saveStorage();
}

// function save data to local storage
function saveStorage() {
  const parsed = JSON.stringify(bookItems);
  localStorage.setItem("Book-shelf-aldo", parsed);

  renderBook(bookItems);
}

// load data from storage
function loadStorage() {
  const serializedData = localStorage.getItem("Book-shelf-aldo");
  let data = JSON.parse(serializedData);

  if (data !== null) {
    data.forEach((book) => {
      bookItems.unshift(book);
    });
  }
  renderBook(bookItems);
  return bookItems;
}

// show data
function renderBook(bookItems = []) {
  const incompleteBookShelfList = document.getElementById("incompleteBookshelfList");
  const completeBookShelfList = document.getElementById("completeBookshelfList");

  incompleteBookShelfList.innerHTML = "";
  completeBookShelfList.innerHTML = "";

  bookItems.forEach((book) => {
    const bookElement = document.createElement("article");
    bookElement.classList.add("book_item");
    bookElement.innerHTML = `
               <h3>${book.title}</h3>
               <p>Penulis : ${book.author}</p>
               <p>Tahun Terbit : ${book.year}</p>

               <div class="action">
                  <button class="btn-green" onclick="changeStatus(${book.id})">Pindah Status</button>
                  <button class="btn-red" onclick="removeBook(${book.id})">Hapus</button>
               </div>

            `;

    if (book.isCompleted == false) {
      incompleteBookShelfList.append(bookElement);
    } else {
      completeBookShelfList.append(bookElement);
    }
  });
}
