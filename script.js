document.addEventListener("DOMContentLoaded", () => {
  const textContent = document.getElementById("text-content");
  const tocList = document.getElementById("toc-list");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const fontSizeControl = document.getElementById("font-size");
  const fontFamilyControl = document.getElementById("font-family");
  const toggleTOCButton = document.getElementById("toggle-toc");

  // Load and display the selected work with TOC generation
  if (textContent && tocList) {
    const params = new URLSearchParams(window.location.search);
    const filePath = params.get("file");

    if (filePath) {
      fetch(filePath)
        .then((response) => response.text())
        .then((text) => {
          const lines = text.split("\n");
          let html = "";
          let headingCounter = 0;

          lines.forEach((line) => {
            if (line.startsWith("#")) {
              headingCounter++;
              const headingText = line.replace(/^#+\s*/, "");
              const headingId = `heading-${headingCounter}`;
              html += `<h2 id="${headingId}">${headingText}</h2>`;
              tocList.innerHTML += `<li><a href="#${headingId}" class="toc-link">${headingText}</a></li>`;
            } else {
              html += `<p>${line}</p>`;
            }
          });

          textContent.innerHTML = html;

          if (headingCounter === 0) {
            tocList.innerHTML = "<li class='placeholder'>No table of contents available.</li>";
          }
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

  // Font Family Selector
  if (fontFamilyControl && textContent) {
    fontFamilyControl.addEventListener("change", () => {
      textContent.style.fontFamily = fontFamilyControl.value;
    });
  }

  // TOC Toggle
  if (toggleTOCButton && tocList) {
    toggleTOCButton.addEventListener("click", () => {
      tocList.classList.toggle("hidden");
    });
  }
});
