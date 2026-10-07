let books = [];

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const results = document.getElementById("opac-results");

// Load books
fetch("books.json")
    .then(response => response.json())
    .then(data => {
        books = data;
    })
    .catch(error => {
        console.error("Error loading book data:", error);
    });


// Search books
function searchBooks() {

    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        results.innerHTML = "";
        return;
    }

    const matches = books.filter(book =>
        String(book.accNo || "").toLowerCase().includes(query) ||
        String(book.author || "").toLowerCase().includes(query) ||
        String(book.title || "").toLowerCase().includes(query) ||
        String(book.isbn || "").toLowerCase().includes(query) ||
        String(book.publisher || "").toLowerCase().includes(query) ||
        String(book.year || "").toLowerCase().includes(query) ||
        String(book.class || "").toLowerCase().includes(query) ||
        String(book.edition || "").toLowerCase().includes(query) ||
        String(book.volume || "").toLowerCase().includes(query)
    );

    if (matches.length === 0) {
        results.innerHTML = "<p>No books found.</p>";
        return;
    }

    results.innerHTML = `
        <div class="opac-result-count">
            ${matches.length} book(s) found
        </div>
    ` + matches.map((book, index) => `
        <div class="opac-book-result">

            <h3>${book.title || "Title not available"}</h3>

            <p>
                <strong>Author:</strong>
                ${book.author || "Not available"}
            </p>

            <p>
                <strong>Acc. No.:</strong>
                ${book.accNo || "Not available"}
            </p>

            <p>
                <strong>ISBN:</strong>
                ${book.isbn || "Not available"}
            </p>

            <button
                class="opac-details-button"
                onclick="toggleBookDetails(${index})">
                View Full Details
            </button>

            <div
                class="opac-book-details"
                id="opac-details-${index}">

                <p><strong>Acc. No.:</strong> ${book.accNo || "Not available"}</p>
                <p><strong>Author:</strong> ${book.author || "Not available"}</p>
                <p><strong>Title:</strong> ${book.title || "Not available"}</p>
                <p><strong>Volume:</strong> ${book.volume || "Not available"}</p>
                <p><strong>Edition:</strong> ${book.edition || "Not available"}</p>
                <p><strong>Publisher:</strong> ${book.publisher || "Not available"}</p>
                <p><strong>Year:</strong> ${book.year || "Not available"}</p>
                <p><strong>Pages:</strong> ${book.pages || "Not available"}</p>
                <p><strong>Binding:</strong> ${book.binding || "Not available"}</p>
                <p><strong>Class:</strong> ${book.class || "Not available"}</p>
                <p><strong>Rate / Price:</strong> ${book.rate || "Not available"}</p>
                <p><strong>ISBN:</strong> ${book.isbn || "Not available"}</p>

                <button
                    class="opac-close-button"
                    onclick="toggleBookDetails(${index})">
                    Close Details
                </button>

            </div>

        </div>
    `).join("");
}


// Open / close details
function toggleBookDetails(index) {

    const details =
        document.getElementById(`opac-details-${index}`);

    if (details.style.display === "block") {
        details.style.display = "none";
    } else {
        details.style.display = "block";
    }
}


// Search button
searchButton.addEventListener("click", searchBooks);


// Enter key
searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchBooks();
    }

});
searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchBooks();
    }

});
// Automatic search from Main Portal

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("q");

if (searchQuery) {
    searchInput.value = searchQuery;
    searchBooks();
}
