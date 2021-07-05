const books = [{
    ISBN: "ABC123",
    title: " Getting started with MERN",
    pubDate: "2021-07-07",
    language:"english",
    numPage:250,
    author:[1, 2],
    publication:[1],
    category:["tech", "programming", "thriller", "education"]
},
{
    ISBN: "ABC456",
    title: " Getting started with Python",
    pubDate: "2021-07-07",
    language:"english",
    numPage:250,
    author:[1, 2],
    publication:[1],
    category:["tech", "programming", "thriller", "education"]
},
];

const author = [{
    id:1,
    name:"Praveen",
    books:["ABC123", "DEF"],
},
{ id:2, name: "Steve Jobs", books:["ABC123"]},
];

const publication = [{
    id:1,
    name:"next Publications",
    books:["ABC123"],

},
{
id:2,
name:"Microsoft Publications",
books:[],

},
];

module.exports={books, author, publication};