const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// get quote from API
async function GetQuote() {
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

    }catch (error){
        GetQuote();
    }
}

const quote = null;
const author = null;

// Tweet
function TweetQuote() {
    // const quote = quoteText.innerText;
    // const author = quoteAuthor.innerText;

    const twitterUrl = 'https://twitter.com/intent/tweet?text=hello';
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', GetQuote);
twitterBtn.addEventListener('click', TweetQuote);

// on load
GetQuote();