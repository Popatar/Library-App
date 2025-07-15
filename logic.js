const myLibrary = [];

function Book(bName, author, pages, bFinished)
{
    const book = 
    {
        bookName: bName,
        nAuthor: author,
        pageCount: pages,
        status: bFinished,
        bookID: crypto.randomUUID(),
    };

    return book;
}

function addBookToLibrary()
{
    screenOverlay();
    generateInput();

}

function pushbook(title, author, pages, status)
{
    const newBook = new Book(title, author, pages, status);
    console.log(newBook);

    const bookCheck = isBookUnique(newBook);

    if(bookCheck === true)
    {
        myLibrary.push(newBook);
        displayBooks();
    }
}

function displayBooks()
{
    deleteBooks();
    for(let i = 0; i < myLibrary.length; i++)
    {
        const bookDisplay = document.createElement('div');
        bookDisplay.classList.add('bookTile');
        bookDisplay.id = "bookDisplay"

        const element = document.getElementsByClassName("right-sidebar")[0];
        element.appendChild(bookDisplay);

        const topElement = document.createElement('div'); 
        const bottomElement = document.createElement('div'); 

        topElement.classList.add('topElement');
        bottomElement.classList.add('bottomElement');

        bookDisplay.appendChild(topElement);
        bookDisplay.appendChild(bottomElement);

        const curBook = myLibrary[i];

        const title = document.createElement("p");
        title.textContent = curBook.bookName;
        topElement.appendChild(title);

        const author = document.createElement("p");
        author.textContent = curBook.nAuthor;
        bottomElement.appendChild(author);

        const pages = document.createElement("p");
        pages.textContent = curBook.pageCount;
        bottomElement.appendChild(pages);

        const status = document.createElement("p");
        if(curBook.status == "on")
        {
            status.textContent = "Finished";
        }
        else
        {
            status.textContent = "Not Finished";
        }
    
        bottomElement.appendChild(status);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Book";

        deleteButton.addEventListener('click', function () 
        {
            myLibrary.splice(i, 1);
            displayBooks();
        });

        bottomElement.appendChild(deleteButton);
    }
}

function isBookUnique(newBook)
{
    var val = false;

    for(let i = 0; i < myLibrary.length; i++)
    {
        if(newBook.bookName === myLibrary[i].bookName)
        {
            return val;
        }
        if(newBook.bookID === myLibrary[i].bookID)
        {
            return val;
        }
    }

    val = true;
    return val;
}

function deleteBooks()
{
    document.querySelectorAll(".right-sidebar .bookTile").forEach(div => div.remove());
}

function screenOverlay()
{
    const overlay = document.createElement("div");
    overlay.classList.add('overlay');
    const body = document.body;
    body.appendChild(overlay);
}

function deleteOverlay()
{
    document.querySelector('.inputTile').remove(); 
    document.querySelector('.overlay').remove(); 
}

function generateInput()
{
    const inputTile = document.createElement('div');
    inputTile.classList.add('inputTile');

    const element = document.getElementsByClassName("right-sidebar")[0];
    element.appendChild(inputTile);

    const bookNameDiv = document.createElement('div');
    inputTile.appendChild(bookNameDiv);

    const bookName = document.createElement('input');
    bookName.type = "text";
    bookName.name = "bookTitle";
    bookName.id = "book-title";
    bookName.classList.add('bookTitle');
    bookName.placeholder = "Book Title";

    const blankLine = document.createElement('br');

    bookNameDiv.appendChild(bookName);
    bookNameDiv.appendChild(blankLine);

    const authorNameDiv = document.createElement('div');
    inputTile.appendChild(authorNameDiv);

   const authorLabel = document.createElement("label");
    authorLabel.htmlFor = "author-name";
    authorLabel.textContent = "Author Name: ";

    const authorName = document.createElement('input');
    authorName.type = "text";
    authorName.name = "authorName";
    authorName.id = "author-name";
    authorName.placeholder = "Enter Author Name here";

    authorNameDiv.appendChild(authorLabel);
    authorNameDiv.appendChild(authorName);
    authorNameDiv.appendChild(blankLine);

    const pagesDiv = document.createElement('div');
    inputTile.appendChild(pagesDiv);

    const pageLabel = document.createElement("label");
    pageLabel.htmlFor = "page-label";
    pageLabel.textContent = "Pages: ";

    const pageAmount = document.createElement('input');
    pageAmount.type = "text";
    pageAmount.name = "pageAmount";
    pageAmount.id = "page-amount";
    pageAmount.placeholder = "Enter amount of pages here";

    pagesDiv.appendChild(pageLabel);
    pagesDiv.appendChild(pageAmount);
    pagesDiv.appendChild(blankLine);
    
    const bookStatusLabel = document.createElement('div');
    inputTile.appendChild(bookStatusLabel);

    const statusLabel = document.createElement("label");
    statusLabel.htmlFor = "book-status";
    statusLabel.textContent = "Have you finished the book?: ";

    const statusButton = document.createElement('input');
    statusButton.type = "checkbox";
    statusButton.name = "statusButton";
    statusButton.id = "status-amount";

    bookStatusLabel.appendChild(statusLabel);
    bookStatusLabel.appendChild(statusButton);
    bookStatusLabel.appendChild(blankLine);

    const submitDiv = document.createElement('div');
    inputTile.appendChild(submitDiv);

    const submitButton = document.createElement('button');
    submitButton.name = "submitButton";
    submitButton.textContent = "Add Book";

    submitButton.addEventListener('click', function () 
    {
        const title = document.getElementById("book-title").value;
        const author = document.getElementById("author-name").value;
        const pages = document.getElementById("page-amount").value;
        const status = document.getElementById("status-amount").value;

        pushbook(title, author, pages, status);
        deleteOverlay();
    });

    submitDiv.appendChild(submitButton);
}

