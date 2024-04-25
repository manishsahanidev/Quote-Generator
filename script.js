const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
   loader.hidden = false;
   quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
   quoteContainer.hidden = false;
   loader.hidden = true;
}

// Show New Quote
function newQuote() {
   showLoadingSpinner();
   // Pick Random Quote
   const quote = apiQuotes.content;
   const author = apiQuotes.author;

   // Checking if author is Null
   if(!author) {
      authorText.textContent = 'Unknown';
   } else {
      authorText.textContent = author;
   }

   // Check Quote length to determine styling
   if(quote.length > 100) {
      quoteText.classList.add('long-quote');
   } else {
      quoteText.classList.remove('long-quote');
   }
   // Set Quote, Hide Loader
   quoteText.textContent = quote;
   removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
   showLoadingSpinner();
   const apiUrl = 'https://api.quotable.io/random';
   try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
   } catch (error) {
      console.log('Error fetching data: ', error);
  }
}

// Tweet Quote
function tweetQuote() {
   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
   window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();


