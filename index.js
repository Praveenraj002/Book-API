const express = require("express");

//database
const database = require("./database");

//initialization
const bookapi = express();
//CONFIGURATION
bookapi.use(express.json());

/*
Route           /
Description     Get all books
Access          Public
Parameter       None
Methods         Get
*/
bookapi.get("/", (req, res) => {
    return res.json({books: database.books});
});


/*
Route           /is
Description     Get Specific book Based on ISBN
Access          Public
Parameter       ISBN
Methods         Get
*/
bookapi.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
        );
    if(getSpecificBook.length === 0){
        return res.json({ error:`No Book found for ISBN of ${req.params.isbn}`,  
        });
    }
        return res.json({book : getSpecificBook});
});
/*
Route           /c
Description     Get Specific book Based on Category
Access          Public
Parameter       Category
Methods         Get
*/
bookapi.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category) 
    );
    if(getSpecificBook.length === 0){
        return res.json({ error:`No Book found for the Category of ${req.params.category}`,  
        });
    }
        return res.json({book : getSpecificBook});
});
/*
Route           /c
Description     Get Specific book Based on Language
Access          Public
Parameter       Category
Methods         Get
*/
bookapi.get("/l/:language", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.language.includes(req.params.language)
    );
    if(getSpecificBook.length === 0){
        return res.json({ error:`No Book found for the Language of ${req.params.language}`,  
        });
    }
        return res.json({book : getSpecificBook});
});
/*
Route           /author
Description     To get all authors
Access          Public
Parameter       None
Methods         Get
*/
bookapi.get("/author", (req , res) => {
    return res.json({ authors: database.author});
});
/*
Route           /author
Description     To get all authors based on Books
Access          Public
Parameter       isbn
Methods         Get
*/
bookapi.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn) 
    );
    if(getSpecificAuthor.length === 0) {
        return res.json({ 
            error:`No Author found for the book of ${req.params.isbn}`,  
        });
    }
    return res.json({author: getSpecificAuthor});
});
/*
Route           /c
Description     Get Specific Author Based on Name
Access          Public
Parameter       name 
Methods         Get
*/
bookapi.get("/author/n/:name", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) => author.name.includes(req.params.name)
    );
    if(getSpecificAuthor.length === 0){
        return res.json({ error:`No author found for the name of ${req.params.name}`,  
        });
    }
        return res.json({author : getSpecificAuthor});
});
/*
Route           /publications
Description     Get all Publications
Access          Public
Parameter       none
Methods         Get
*/
bookapi.get("/publications" , (req, res) => {
    return res.json({ publications: database.publication});
});
/*
Route           /publications
Description     Get specific Publications
Access          Public
Parameter       name
Methods         Get
*/
bookapi.get("/publication/n/:name", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.name.includes(req.params.name)
    );
    if(getSpecificPublication.length === 0){
        return res.json({ error:`No Publication found for the name of ${req.params.name}`,  
        });
    }
        return res.json({publications : getSpecificPublication});
});
/*
Route           /author
Description     To get Publications based on Books
Access          Public
Parameter       books
Methods         Get
*/
bookapi.get("/publication/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.books.includes(req.params.isbn) 
    );
    if(getSpecificPublication.length === 0) {
        return res.json({ 
            error:`No publication found for the book of ${req.params.isbn}`,  
        });
    }
    return res.json({publications: getSpecificPublication});
});
/*
Route           /book/add
Description     To add new book
Access          Public
Parameter       none
Methods         post
*/
bookapi.post("/book/add", (req, res) => {
    const{ newBook } = req.body;
    database.books.push(newBook);
    return res.json({books: database.books});
});
/*
Route           /author/add
Description     To add new ayuthor
Access          Public
Parameter       none
Methods         post
*/
bookapi.post("/author/add", (req, res) => {
    const{ newAuthor } = req.body;
    database.author.push(newAuthor);
    return res.json({authors: database.author});
} );
/*
Route           /publication/add
Description     To add new ayuthor
Access          Public
Parameter       none
Methods         post
*/
bookapi.post("/publication/add", (req, res) => {
    const{ newPublication } = req.body;
    database.publication.push(newPublication);
    return res.json({publications: database.publication});

});
/*
Route           /book/update/title
Description     update book title
Access          Public
Parameter       isbn
Methods         put
*/
bookapi.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
        }
    });
    return res.json({books: database.books});
});
/*
Route           /book/update/author
Description     update new author for a book
Access          Public
Parameter       isbn
Methods         put
*/
bookapi.put("/book/update/author/:isbn/:authorId", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            return book.author.push(parseInt(req.params.authorId))
        }
    });

    database.author.forEach((author) => {
    if(author.id === parseInt(req.params.authorId)) return author.books.push(req.params.isbn);
    });

return res.json({books: database.books, author: database.author});
});
/*
Route           /publication/upate/book
Description     update new book to the publication
Access          Public
Parameter       isbn
Methods         put
*/
bookapi.put("/publication/upate/book/:isbn",(req, res) => {
    //update the Publication database
    database.publications.forEach((publication) => {
        if (publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });
    //update the book  database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });
    return res.json({books: database.books, publications: database.publication});
});
/*
Route           /book/delete
Description     delete  a book
Access          Public
Parameter       isbn
Methods         delete
*/
bookapi.delete("/book/delete/:isbn", (req, res) => {
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
        );
        database.books = updatedBookDatabase;
        return res.json({books: database.books});

});
/*
Route           /book/delete/author
Description     delete  a author from a book
Access          Public
Parameter       isbn, authorId
Methods         delete
*/
bookapi.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    //update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.authors.filter((author) => author !== parseInt(req.params.authorId)
            );
            book.authors = newAuthorList;
            return;
        }
    });
    //update the author database
    database.authors.forEach((author) => {
        if(author.id === parseInt(req.params.authorId)){
            const newBookList = author.books.filter((book) => book !== req.params.isbn
             );
             author.books = newBookList;
             return;
        }
    });
    return res.json({book : databas.books, author: database.authors,});
});
/*
Route           /publication/delete/book
Description     delete  a author from a book
Access          Public
Parameter       isbn, publication Id
Methods         delete
*/
bookapi.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
    //update publications database
    database.publication.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)){
            const newBookList = publication.books.filter((book) => book !== req.params.isbn);
            publication.books = newBookList;
            return;
    }

        
    });
    //uodate book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = 0 //no publication available 
            return;
        }

    })
    return res.json ({books: database.books, publications: database.publications})
});



bookapi.listen(2002, () => console.log("Server is Running!!"));