"use strict";

function upDate(previewPic) {
  // Helpful for debugging (you can remove later)
  console.log("upDate triggered:", previewPic.alt, previewPic.src);

  const preview = document.getElementById("image");

  // Update text
  preview.textContent = previewPic.alt;

  // Update background image
  preview.style.backgroundImage = `url("${previewPic.src}")`;

  // Keep aria-label in sync for screen readers
  preview.setAttribute("aria-label", previewPic.alt);
}

function undo() {
  console.log("undo triggered");

  const preview = document.getElementById("image");
  preview.style.backgroundImage = `url("")`;
  preview.textContent = "Hover over an image below to display here.";
  preview.setAttribute("aria-label", "Hover over an image below to display here.");
}

function addTabFocus() {
  console.log("addTabFocus triggered");

  const figures = document.querySelectorAll(".thumb");
  for (let i = 0; i < figures.length; i++) {
    // Make each figure keyboard-focusable
    figures[i].setAttribute("tabindex", "0");

    // Add keyboard + mouse listeners using the same pattern
    const img = figures[i].querySelector("img");

    figures[i].addEventListener("mouseover", () => upDate(img));
    figures[i].addEventListener("mouseleave", () => undo());

    figures[i].addEventListener("focus", () => upDate(img));
    figures[i].addEventListener("blur", () => undo());

    // Optional: Enter/Space also triggers preview (keyboard-friendly)
    figures[i].addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        upDate(img);
      }
    });
  }
}

// onload listener
window.addEventListener("load", addTabFocus);
