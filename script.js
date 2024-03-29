const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function Loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function CompleteLoading() {
    if(!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }

}

// get quote from API
async function GetQuote() {
    Loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {      
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // if the author is bland add unknown
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        
        // reduce font size for long quotes
        if (data.quoteText.length > 120) { 
            quoteText.classList.add('long-quote')
        }
        else {
            quoteText.classList.remove('long-quote')
        }

        authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;

        CompleteLoading();

    }catch (error){
        GetQuote();
    }
}

const quote = null;
const author = null;

// Tweet
function TweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}%20-%20${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', GetQuote);
twitterBtn.addEventListener('click', TweetQuote);

// on load
GetQuote();