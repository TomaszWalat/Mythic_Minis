const resultsList = document.querySelector(".search-results");
const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("keyup", function(e) {
    search(searchInput.value);
});
const resultsCount = document.querySelector(".results-count");
const moreResultsButton = document.querySelector(".more-results-button--hidden");
moreResultsButton.addEventListener("click", function(e) {
    showMoreResults();
});
let results = [];
let visibleResults = 6;

function clearExistingResults() {
    // Clear existing search results
    while (resultsList.firstChild) {
        resultsList.firstChild.remove();
    }
}

function clearSearch() {
    clearExistingResults();
    results = [];
    updateResultsCount();
    visibleResults = 6;
}

function updateResultsCount() {
    resultsCount.textContent = results.length + " products found";
}

function showMoreResults() {
    visibleResults += 3;
    console.log("Increasing visible results to: " + visibleResults);
    updateMoreResultsButton();
    createResultsList(results);
}

function updateMoreResultsButton() {
    if (results.length > visibleResults) {
        // show more results button
        moreResultsButton.classList.remove("more-results-button--hidden");
        moreResultsButton.classList.add("more-results-button--visible");
    } else {
        // hide more results button
        moreResultsButton.classList.remove("more-results-button--visible");
        moreResultsButton.classList.add("more-results-button--hidden");
    }
}

function search(query) {
    console.log("Searching for query: " + query);
    clearSearch();
    if (query.length > 0) {
        fetch("../../data/products.json")
        .then(response => response.json())
        .then(data => {
            console.log("Data loaded from file");
            const products = data.products;
            // Clear existing search results
            while (resultsList.firstChild) {
                resultsList.firstChild.remove();
            }
            // Get search results
            results = [];
            for (let i = 0; i < products.length; i++) {
                if (products[i].name.toLowerCase().includes(query.toLowerCase())) {
                    results.push(products[i]);
                }
            }

            if (results.length < visibleResults) {
                visibleResults = results.length;
            }

            updateMoreResultsButton();
            createResultsList(results);
        });
    }
}

function createResultsList(results) {
    clearExistingResults();
    for (let i = 0; i < visibleResults; i++) {
        createSearchResult(results[i]);
    }
    updateResultsCount();
}

function createSearchResult(product) {
    console.log("Processing result for product: " + product.name);
    // Create search result container
    const searchResult = document.createElement("div");
    searchResult.classList.add("result");
    // Create image element and add it to result
    const resultImage = document.createElement("img");
    resultImage.src = product.image;
    resultImage.classList.add("result__image");
    searchResult.appendChild(resultImage);
    // Create container for result text and add it to result
    const resultTextContent = document.createElement("div");
    resultTextContent.classList.add("result__description");
    searchResult.appendChild(resultTextContent);
    // Create result title and add it to the text container
    const resultTitle = document.createElement("h3");
    resultTitle.textContent = product.name;
    resultTitle.classList.add("heading-3-desktop");
    resultTextContent.appendChild(resultTitle);
    // Create description and add it to the text container
    const resultDescription = document.createElement("p");
    resultDescription.classList.add("text-body");
    const resultDescriptionText = document.createElement("em");
    resultDescriptionText.textContent = product.description;
    resultDescription.appendChild(resultDescriptionText);
    resultTextContent.appendChild(resultDescription);
    // Create rating and add it to the text container
    const resultRating = document.createElement("div");
    resultRating.classList.add("result__rating");
    resultTextContent.appendChild(resultRating);
    for (let i = 0; i < 5; i++) {
        const star = document.createElement("img");
        if (i < product.rating) {
            star.src = "../../images/starFull.png";
        } else {
            star.src = "../../images/starEmpty.png";
        }
        star.classList.add("star");
        resultRating.appendChild(star);
    }
    // Create price and add it to the text container
    const resultPrice = document.createElement("p");
    resultPrice.classList.add("text-body");
    const resultPriceText = document.createElement("strong");
    resultPriceText.textContent = product.price;
    resultPrice.appendChild(resultPriceText);
    resultTextContent.appendChild(resultPrice);
    // add result to the results list
    resultsList.appendChild(searchResult);
}