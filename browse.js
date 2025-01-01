document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const yearRange = document.getElementById("year-range");
  const yearRangeLabel = document.getElementById("year-range-label");
  const genreSelect = document.getElementById("genre-select");
  const booksContainer = document.getElementById("books-container");

  // Placeholder library data
  const library = [
    { title: "Meditations", author: "Marcus Aurelius", year: 180, genre: "philosophy", file: "meditations.txt" },
    { title: "The Art of War", author: "Sun Tzu", year: -500, genre: "history", file: "art-of-war.txt" },
    { title: "On the Origin of Species", author: "Charles Darwin", year: 1859, genre: "science", file: "origin-of-species.txt" },
    { title: "1984", author: "George Orwell", year: 1949, genre: "fiction", file: "1984.txt" },
  ];

  const displayBooks = (filteredBooks) => {
    booksContainer.innerHTML = "";

    if (filteredBooks.length === 0) {
      booksContainer.innerHTML = "<li class='placeholder'>No books match your criteria. 📖</li>";
      return;
    }

    filteredBooks.forEach((book) => {
      const listItem = document.createElement("li");
      listItem.className = "book-item";

      listItem.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Year:</strong> ${book.year}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <a href="read.html?file=${encodeURIComponent(book.file)}" class="read-link">Read 📖</a>
      `;

      booksContainer.appendChild(listItem);
    });
  };

  // Initial render
  displayBooks(library);

  // Search functionality
  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const filteredBooks = library.filter((book) => 
      book.title.toLowerCase().includes(query) || 
      book.author.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
  });

  // Year filter
  yearRange.addEventListener("input", () => {
    const maxYear = parseInt(yearRange.value, 10);
    yearRangeLabel.textContent = maxYear === 2025 ? "All" : `≤ ${maxYear}`;

    const filteredBooks = library.filter((book) =>
      maxYear === 2025 || book.year <= maxYear
    );
    displayBooks(filteredBooks);
  });

  // Genre filter
  genreSelect.addEventListener("change", () => {
    const genre = genreSelect.value;
    const filteredBooks = library.filter((book) => 
      genre === "all" || book.genre === genre
    );
    displayBooks(filteredBooks);
  });
});
