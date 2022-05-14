//////////////////// BOOKS ////////////////////
//const books = require("../data/hpcollection/books.json");

function formatBookInfo(bookInfoJson) {
  let bookInfo = [];
  bookInfo[0] = `Author: ${bookInfoJson['author']}`
  bookInfo[1] = `Publication Date (UK): ${bookInfoJson['publish_date'][0]['UK']}`;
  bookInfo[2] = `Publication Date (US): ${bookInfoJson['publish_date'][1]['US']}`;
  bookInfo[3] = `Translations: ${bookInfoJson['translations']}`;
  bookInfo[4] = `Pages: ${bookInfoJson['pages']}`;
  bookInfo[5] = `Sales (approx): ${bookInfoJson['approx_sales']}`;
  return bookInfo;
}

function getBooksInfo(books) {
  let booksInfo = {}
  for (let i = 1; i <= 7; i++) {
    booksInfo[i] = formatBookInfo(books[i-1])
  }
  return booksInfo;
}

//const booksInfo = getBooksInfo(books);
//console.log(booksInfo)

const testData = {
  '1': [
    'Author: J.K. Rowling',
    'Publication Date (UK): 06-26-1997',
    'Publication Date (US): 01-09-1998',
    'Translations: 90',
    'Pages: 309',
    'Sales (approx): 120000000'
  ],
  '2': [
    'Author: J.K. Rowling',
    'Publication Date (UK): 07-02-1998',
    'Publication Date (US): 02-06-1999',
    'Translations: 72',
    'Pages: 341',
    'Sales (approx): 77000000'
  ],
  '3': [
    'Author: J.K. Rowling',
    'Publication Date (UK): 07-08-1999',
    'Publication Date (US): 08-09-1999',
    'Translations: 47',
    'Pages: 435',
    'Sales (approx): 65000000'
  ],
  '4': [
    'Author: J.K. Rowling',
    'Publication Date (UK): 07-08-2000',
    'Publication Date (US): 07-08-2000',
    'Translations: 39',
    'Pages: 734',
    'Sales (approx): 65000000'
  ],
  '5': [
    'Author: J.K. Rowling',
    'Publication Date (UK): 06-21-2003',
    'Publication Date (US): 06-21-2003',
    'Translations: 32',
    'Pages: 870',
    'Sales (approx): 65000000'
  ],
  '6': [
    'Author: J.K. Rowling',
    'Publication Date (UK): 07-16-2005',
    'Publication Date (US): 07-16-2005',
    'Translations: 30',
    'Pages: 652',
    'Sales (approx): 65000000'
  ],
  '7': [
    'Author: J.K. Rowling',
    'Publication Date (UK): 07-21-2007',
    'Publication Date (US): 07-21-2007',
    'Translations: 28',
    'Pages: 759',
    'Sales (approx): 65000000'
  ]
}

function displayBookInfo(i) {
  d3.selectAll(`#book-${i}`)
    .selectAll(".book-details")
    .data(testData[i.toString()])
    .enter()
    .insert("li")
    .text((d) => d);
}

for (let i = 1; i <= 7; i++) {
  displayBookInfo(i);
}

//////////////////// MOVIES ////////////////////
//const movies = require("../data/movies/movies.json");

function formatMovieInfo(movieInfoJson) {
  let movieInfo = [];
  movieInfo[0] = `Release Year: ${movieInfoJson['released_year']}`
  movieInfo[1] = `Running Time: ${movieInfoJson['running_time']}`;
  movieInfo[2] = `Budget: $${movieInfoJson['budget'] / 1000000} million`;
  movieInfo[3] = `Box Office: $${movieInfoJson['box_office'] / 1000000} million`;
  return movieInfo;
}

function getMoviesInfo(movies) {
  let moviesInfo = {}
  for (let i = 0; i < 8; i++) {
    moviesInfo[i + 1] = formatMovieInfo(movies[i])
  }
  return moviesInfo;
}

const moviesData = {
  '1': [
    'Release Year: 2001',
    'Running Time: 152',
    'Budget: $125 million',
    'Box Office: $1002 million'
  ],
  '2': [
    'Release Year: 2002',
    'Running Time: 161',
    'Budget: $100 million',
    'Box Office: $880.3 million'
  ],
  '3': [
    'Release Year: 2004',
    'Running Time: 142',
    'Budget: $130 million',
    'Box Office: $796.7 million'
  ],
  '4': [
    'Release Year: 2005',
    'Running Time: 157',
    'Budget: $150 million',
    'Box Office: $896.4 million'
  ],
  '5': [
    'Release Year: 2007',
    'Running Time: 138',
    'Budget: $150 million',
    'Box Office: $942 million'
  ],
  '6': [
    'Release Year: 2009',
    'Running Time: 153',
    'Budget: $250 million',
    'Box Office: $943.2 million'
  ],
  '7': [
    'Release Year: 2010',
    'Running Time: 146',
    'Budget: $200 million',
    'Box Office: $976.9 million'
  ],
  '8': [
    'Release Year: 2011',
    'Running Time: 130',
    'Budget: $250 million',
    'Box Office: $1342 million'
  ]
}

function displayMoviesInfo(i) {
  d3.selectAll(`#movie-${i}`)
    .selectAll(".book-details")
    .data(moviesData[i.toString()])
    .enter()
    .insert("li")
    .text((d) => d);
}

for (let i = 1; i <= 8; i++) {
  displayMoviesInfo(i);
}
