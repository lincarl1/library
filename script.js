// Initialize Variables
const library = [];
let bookId = 1;

// Important Document Query Selectors
const bookLibrary = document.querySelector(".books");
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector(".addBook");
const closeFormBtn = document.querySelector(".closeBtn");
const submitFormBtn = document.querySelector(".submit");
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
function addBookToLibrary(userInput) {
    let newBook = new Book(...userInput, bookId);
    library.push(newBook)

    // Create New Book Element Here
    let bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');
    bookCard.setAttribute('bookID', bookId);

    let title = document.createElement('p');
    title.classList.add('title');
    title.textContent = `Title: ${userInput[0]}`;

    let author = document.createElement('p');
    author.classList.add('author');
    author.textContent = `Author: ${userInput[1]}`;

    let pages = document.createElement('p');
    pages.classList.add('pages');
    pages.textContent = `Number of Pages: ${userInput[2]}`;

    // let beenReadBtn = document.createElement('button');
    // beenReadBtn.classList.add('readStatus');
    // if (userInput[3] === true) {
    //     beenReadBtn.textContent = 'Read';
    //     beenReadBtn.classList.add('read');
    // }
    // else beenReadBtn.textContent = 'Not read';
    // //Event Toggler for Been Read Button
    // beenReadBtn.addEventListener("click", () => {
    //     let result = beenReadBtn.classList.toggle('read');
    //     beenReadBtn.textContent = result ? 'Read' : 'Not Read';
    // });

    // let deleteBtn = document.createdElement('button');
    // deleteBtn.classList.add('remove');
    // deleteBtn.textContent = 'Delete';
    // deleteBtn.addEventListener('click', (e) => {
    //     console.log(e);
    // });

    // let cardButtons = document.createdElement('div');
    // cardButtons.classList.add('cardButtons');
    // cardButtons.append(beenReadBtn, deleteBtn);

    // bookCard.append(title, author, pages, cardButtons);
    bookCard.append(title, author, pages);
    bookLibrary.append(bookCard);
    bookId++;
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

submitFormBtn.addEventListener("click", (e) => {
    let inputArray = Array.from(inputList);
    let validArray = inputArray.map((userInput) => userInput.validity.valid);

    console.log(inputList);

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

showLibrary();

let book1 = new Book('Dragon', 'Harry Potter', 'TOO MANY', false, 1);
let book2 = new Book('Soccer', 'Lionel Messi', 'TOO MANY', true, 2);
// library.push(book1);
// library.push(book2);

// Generate HTML for Library Stats
// document.getElementById('totalBooks').innerHTML = `Total Books: ${getBookCount()}`;
// document.getElementById('readCount').innerHTML = `Books Read: ${getReadCount()}`;
// document.getElementById('notReadCount').innerHTML = `Books Not Yet Read: ${getUnreadCount()}`;