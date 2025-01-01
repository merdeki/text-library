document.addEventListener("DOMContentLoaded", () => {
  const worksList = document.getElementById("works-list");
  const textContent = document.getElementById("text-content");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const fontSizeControl = document.getElementById("font-size");

  // Fetch and display works on Browse Page
  if (worksList) {
    fetch("books.json")
      .then((response) => response.json())
      .then((works) => {
        worksList.innerHTML = ""; // Clear placeholders
        works.forEach((work) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>${work.title}</strong> by ${work.author}<br />
            <em>${work.description}</em><br />
            <a href="read.html?file=${encodeURIComponent(work.file)}">Read</a>
          `;
          worksList.appendChild(listItem);
        });
      })
      .catch(() => {
        worksList.innerHTML = "<li class='placeholder'>Failed to load works. ❌</li>";
      });
  }

  // Load and display the selected work
  if (textContent) {
    const params = new URLSearchParams(window.location.search);
    const filePath = params.get("file");

    if (filePath) {
      fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
          textContent.textContent = text;
        })
        .catch(() => {
          textContent.innerHTML = "<p class='placeholder'>Failed to load work. ❌</p>";
        });
    } else {
      textContent.innerHTML = "<p class='placeholder'>No work selected. 📖</p>";
    }
  }

  // Dark Mode Toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // Font Size Adjuster
  if (fontSizeControl && textContent) {
    fontSizeControl.addEventListener("input", () => {
      textContent.style.fontSize = `${fontSizeControl.value}px`;
    });
  }
});
