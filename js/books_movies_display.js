/*const book_path = (id) => `assets/book_cover/hp${id}.jpeg`;
const book_info = {
  1 : book_path(1),
  2 : book_path(2),
  3 : book_path(3),
  4 : book_path(4),
  5 : book_path(5),
  6 : book_path(6),
  7 : book_path(7)
};
function displayBookInfo(book_id){
  console.log(book_id);
  console.log(book_info[book_id]);

  document.getElementById("placeholder").src=book_info[book_id];
  document.getElementById("wake_dumbledore").innerHTML=`Book ${book_id}`;
};*/

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
