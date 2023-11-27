// Declare constants and variables
const projectName = 'random-quote-machine';
let quotesData;

// Color types
let colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

// Variables to store the current quote and author
let currentQuote = '',
    currentAuthor = '';

// Function to fetch quotes from a JSON file
function getQuotes() {
    const apiEndpoints = [
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', 'https://dummyjson.com/quotes' /*, 'https://zenquotes.io/api/quotes', 'https://type.fit/api/quotes'*/
    ];

    const requests = apiEndpoints.map(endpoint => {
        return $.ajax({
            headers: {
                Accept: 'application/json'
            },

            // API endpoint containing quotes in JSON format
            url: endpoint,
            success: function (jsonQuotes) {
                if (typeof jsonQuotes === 'string') {
                    // Parse the JSON string into an object
                    quotesData = JSON.parse(jsonQuotes);
                    console.log('quotesData');
                    console.log(quotesData);
                }
            }
        });
    });

    // Return a promise that resolves when all requests are complete
    return Promise.all(requests);
}

// Function to get a random quote from the quotesData array
function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

// Function to update the displayed quote
function getQuote() {
    // Get a random quote
    let randomQuote = getRandomQuote();

    // Update current quote and author variables
    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    // Update share links with the current quote and author
    // Assuming currentQuote and currentAuthor are the quote and author values
    $('#fb').attr(
        'href',
        'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(window.location.href) +
        '&quote=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    $('#tweet').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=Jawsafe&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    // $('#insta').attr(
    //     'href',
    //     'https://www.instagram.com/?utm_source=ig_web_copy_link&quote=' +
    //     encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    // );

    $('#tumblr').attr(
        'href',
        'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,Jawsafe&caption=' +
        encodeURIComponent(currentAuthor) +
        '&content=' +
        encodeURIComponent(currentQuote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    );

    // Animate the quote text and author
    $('.quote-text').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#text').text(randomQuote.quote);
    });

    $('.quote-author').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#author').html(randomQuote.author);
    });

    // Randomly select a color from the colors array and animate the background
    var color = Math.floor(Math.random() * colors.length);
    $('html body').animate(
        {
            backgroundColor: colors[color],
            color: colors[color]
        },
        1000
    );

    // Animate the button background color
    $('.button').animate(
        {
            backgroundColor: colors[color]
        },
        1000
    );
}

// Document ready event listener
$(document).ready(function () {
    // Fetch quotes and then get the initial quote
    getQuotes().then(() => {
        getQuote();
    });

    // Event listener for the "Get Quote" button
    $('#rand-quote').on('click', getQuote);
});
