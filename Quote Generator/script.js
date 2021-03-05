// getting all required dom objects
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const author = document.getElementById("author-text");
const newQuoteButton = document.getElementsByClassName("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");
const buttonContainer = document.getElementById("button-container");

// defining functions

// loader functions

function load() {
  quoteContainer.hidden = true;
  buttonContainer.hidden = true;
  loader.hidden = false;
}

function complete() {
  if (!loader.hidden) {
    buttonContainer.hidden = false;
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// first we get quote from API using async function
let response, data;
async function getQuote() {
  load();
  let apiUrl =
    "https://type.fit/api/quotes/?method=getQuote&lang=en&format=json";
  if (!response) {
    response = await fetch(apiUrl); // this will fetch api data
    data = await response.json(); // parsing response data
  }
  let index = Math.floor(Math.random() * data.length); // generating a random index
  let quote = data[index];

  // changing font size if quote is long
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = `${quote.text}`;

  // if author is null then show unknown
  if (quote.author == "null") {
    author.textContent = `Unknown`;
  } else {
    author.textContent = `${quote.author}`;
  }
  setTimeout(complete, 200);
}

// twitter function
let tweetQuote = function () {
  console.log("tweeting");
  let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
  // opening this url in new tab
  window.open(tweetUrl, "_blank");
};

// adding event listeners
newQuoteButton[0].addEventListener("click", getQuote);

twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuote();
