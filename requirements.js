//requirements for our project

const { publication } = require("./database")

//book Management comapany

// books ISBN, title, publish date, language, num page, author[], category[]

//author id, name, books[]

//publications id, name, books[]


//what are all the APIs that we need

//books     we need an api
// *to get all books(**COMPLETED)
// *to get specific books(**COMPLETED)
// *to get list of books based on category(**COMPLETED)
// *to get list of books based on languages (**COMPLETED)

//POST:
//add new book(**COMPLETED)

//PUT:
//update book title(**COMPLETED)
//update/ADD new autho(**COMPLETED)

//DELETE:
//delete a book(**COMPLETED)
//delete a author(**ERROR)

//--------------------------------------------------------------------------------------------------------------------

//authors   we need an api
//GET:
//*to get all authors(**COMPLETED)
//*to get specific authors(**COMPLETED)
//*to get list of authors based on books(**COMPLETED)

//POST:
//Add new author(**COMPLETED)

//PUT:
//Upadate author name for a book(___________)

//DELETE:
//delete an author(___________)

//---------------------------------------------------------------------------------------------------------------------------------

//publications  we need api
//GET:
//to get all publications(**COMPLETED)
//to get specific publications(**COMPLETED)
//to get list of publication based on book(**COMPLETED)

//POST:
//Add new publications(**COMPLETED)  

//PUT:
//update Publications name(___________)
//update/ add books to publication(**ERROR)

//DELETE:
//delete a book from publication
//delete a publication(______________)