// getting all required dom objects
const quoteText = document.getElementById("quote-text");
const author = document.getElementById("author-text");
const newQuoteButton = document.getElementsByClassName("new-quote");
// first we get quote from API using async function
let response, data;
async function getQuote() {
  //   let proxyUrl = "https://cors-anywhere.herokuapp.com/";
  //   let apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  let apiUrl =
    "https://type.fit/api/quotes/?method=getQuote&lang=en&format=json";
  if (!response) {
    response = await fetch(apiUrl); // this will fetch api data
    data = await response.json(); // parsing response data
  }
  let index = Math.floor(Math.random() * data.length); // generating a random index
  let quote = data[index];
  quoteText.textContent = `${quote.text}`;
  author.textContent = `${quote.author}`;
}

getQuote();

newQuoteButton[0].addEventListener("click", function () {
  getQuote();
});
