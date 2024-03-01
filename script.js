// Initialize Variables
const library = [];
let bookId = 1;

// Important Document Query Selectors
const form = document.querySelector("form");
const addBookBtn = document.querySelector("#addBookDiv");
const closeFormBtn = document.querySelector(".closeBtn");

// Book Object
class Book {
    constructor (title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }
}

Book.prototype.info = function() {
    let isBookRead = '';
    if (this.read) {
        isBookRead = 'Read'
    }
    else {
        isBookRead = 'Not Read Yet'
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${isBookRead}`;
}
// End Book Object

function addBookToLibrary(userInput) {
    let newBook = new Book(...userInput, bookId);
    library.push(newBook)

    // Create New Book Element Here
}

// Button to open form and add new book
addBookBtn.addEventListener("click", () => {
    form.showModal();
});

// Button to close the form
closeFormBtn.addEventListener("click", () => {
    form.close();
});

