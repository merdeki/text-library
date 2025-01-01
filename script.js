document.addEventListener("DOMContentLoaded", () => {
  const worksList = document.getElementById("works-list");

  if (worksList) {
    // Fetch metadata from books.json
    fetch("books.json")
      .then((response) => response.json())
      .then((works) => {
        works.forEach((work) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>${work.title}</strong> by ${work.author} <br />
            <em>${work.description}</em> <br />
            <a href="read.html?file=${encodeURIComponent(work.file)}">Read</a>
          `;
          worksList.appendChild(listItem);
        });
      })
      .catch((err) => console.error("Error loading works:", err));
  }

  // For the Read Page
  const textContent = document.getElementById("text-content");
  if (textContent) {
    const params = new URLSearchParams(window.location.search);
    const filePath = params.get("file");

    if (filePath) {
      fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
          textContent.textContent = text;
        })
        .catch((err) => {
          textContent.textContent = "Error loading text.";
          console.error("Error:", err);
        });
    } else {
      textContent.textContent = "No work selected.";
    }
  }
});
