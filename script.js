// Initialize Variables
const library = [];
let bookId = 1;

// Important Document Query Selectors
const bookLibrary = document.querySelector(".books");
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector(".addBook");
const closeFormBtn = document.querySelector(".closeBtn");
const submitFormBtn = document.querySelector(".submitBtn");
const inputList = document.querySelectorAll("dialog form input");
const bookCount = document.querySelector("#totalsBooksSpan");
const readCount = document.querySelector("#readCountSpan");
const unreadCount = document.querySelector("#notReadCountSpan");

// Book Object //
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
// End Book Object //

// Functions //

//Add Book to Library
function addBookToLibrary(userInput) {
    let newBook = new Book(...userInput, bookId);
    library.push(newBook)
    bookId++;
    showLibrary();
}

// Set Stats Content
function showLibraryStats() {
    bookCount.textContent = getBookCount();
    readCount.textContent = getReadCount();
    unreadCount.textContent = getUnreadCount();
}

// Function for Displaying Library
function showLibrary() {
    // Reset the element since we are utilizing a for each to create each book
    bookLibrary.innerHTML = '';
    // Set Local Storage of Books Equal to Library
    localStorage.setItem('books', JSON.stringify(library));
    showLibraryStats();
    for(let i = 0; i < library.length; i++)
    {
        // Create New Book Element Here
        let bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
        bookCard.setAttribute('bookID', library[i].id);

        let title = document.createElement('p');
        title.classList.add('title');
        title.textContent = `Title: ${library[i].title}`;

        let author = document.createElement('p');
        author.classList.add('author');
        author.textContent = `Author: ${library[i].author}`;

        let pages = document.createElement('p');
        pages.classList.add('pages');
        pages.textContent = `Number of Pages: ${library[i].pages}`;

        let beenReadBtn = document.createElement('button');
        beenReadBtn.classList.add('readStatus');
        if (library[i].read === true) {
            beenReadBtn.textContent = 'Read';
            beenReadBtn.classList.add('read');
        }
        else beenReadBtn.textContent = 'Not read';
        //Event Toggler for Been Read Button
        beenReadBtn.addEventListener("click", (e) => {
            // Toggle Between Read and Unread
            let result = beenReadBtn.classList.toggle('read');
            beenReadBtn.textContent = result ? 'Read' : 'Not Read';

            // Get Book Index and Update Read Status
            let bookId = e.target.parentNode.parentNode.getAttribute("bookID");
            let libraryIndex = library.findIndex((book) => book.id === +bookId);
            library[libraryIndex].read = result;
            showLibraryStats(); //Refresh the Library Stats

        });

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('remove');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            let bookId = e.target.parentNode.parentNode.getAttribute("bookID");
            let libraryIndex = library.findIndex((book) => book.id === +bookId);
            library.splice(libraryIndex, 1);
            // Remove from DOM
            e.target.parentNode.parentNode.remove();
            showLibrary();
        });

        let bookInfo = document.createElement('div');
        bookInfo.classList.add('bookInfo');
        bookInfo.append(title, author, pages);

        let cardButtons = document.createElement('div');
        cardButtons.classList.add('cardButtons');
        cardButtons.append(beenReadBtn, deleteBtn);

        bookCard.append(bookInfo, cardButtons);
        bookLibrary.append(bookCard);
    }
}

// Get Book Count
function getBookCount() {
    return library.length;
}

// Get Read Count
function getReadCount() {
    return library.filter(x => x.read === true).length
}

// Get Unread Count
function getUnreadCount() {
    return library.filter(x => x.read === false).length
}

// Clear Input Form
function clearInput() {
    for(var i = 0; i < 4; i++)
    {
        if(i === 3)
        {
            inputList[i].checked = false;
        }
        else {
            inputList[i].value = '';
        }
    }
}

// Event Listeners //
// Button to open form and add new book
addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

// Button to close the form
closeFormBtn.addEventListener("click", () => {
    clearInput();
    dialog.close();
});

// Button on submit form
submitFormBtn.addEventListener("click", (e) => {
    let inputArray = Array.from(inputList);
    let validArray = inputArray.map((userInput) => userInput.validity.valid);

    if(!validArray.includes(false))
    {
        let inputValues = inputArray.map((userInput) => userInput.value);
        inputValues[3] = inputArray[3].checked;
        addBookToLibrary(inputValues);

        e.preventDefault();
        clearInput();
        dialog.close();
    }
});

// showLibraryStats();

let book1 = new Book('Dragon', 'Harry Potter', '500', false, -1);
let book2 = new Book('Soccer', 'Lionel Messi', '600', true, 0);
library.push(book1);
library.push(book2);

showLibrary();