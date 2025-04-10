const resultsList = document.querySelector(".search-results");
const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("keyup", function(e) {
    if (e.key === "Enter" && searchInput.value.length > 0) {
        // submit search with query
        search(searchInput.value);
    }
});

function search(query) {
    console.log("Searching for query: " + query);

    fetch("../../data/products.json")
    .then(response => response.json())
    .then(data => {
        console.log("Data loaded from file");
        const products = data.products;
        // Clear existing search results
        while (resultsList.firstChild) {
            resultsList.firstChild.remove();
        }
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.toLowerCase().includes(query.toLowerCase())) {
                createSearchResult(products[i]);
            }
        }
    });
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