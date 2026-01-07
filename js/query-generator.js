// -----------------------------
// DATA
// -----------------------------

const firstNames = ["Jack", "Emily", "Sophia", "Liam"];
const lastNames = ["Smith", "Johnson", "Williams"];
const nouns = ["artist", "painter", "sculptor"];
const verbs = ["creates", "explores", "designs"];
const adjectives = ["modern", "abstract", "surreal"];
const adverbs = ["boldly", "quietly"];
const places = ["New York", "Paris", "Berlin"];

// -----------------------------
// HELPERS
// -----------------------------

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// -----------------------------
// PLACEHOLDER MAP
// -----------------------------

const PLACEHOLDER_MAP = {
  first_name: () => randomItem(firstNames),
  last_name: () => randomItem(lastNames),
  noun: () => randomItem(nouns),
  verb: () => randomItem(verbs),
  adjective: () => randomItem(adjectives),
  adverb: () => randomItem(adverbs),
  place: () => randomItem(places),
};

// -----------------------------
// INSERT AT CURSOR
// -----------------------------

function insertAtCursor(input, text) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;

  input.value =
    input.value.slice(0, start) +
    text +
    input.value.slice(end);

  input.focus();
  input.setSelectionRange(start + text.length, start + text.length);
}

// -----------------------------
// QUERY EXPANSION
// -----------------------------

function expandQuery(template) {
  return template.replace(/\[(\w+)\]/g, (_, key) => {
    return PLACEHOLDER_MAP[key]
      ? PLACEHOLDER_MAP[key]()
      : `[${key}]`;
  });
}

function generateQueries(template) {
  const results = new Set();
  while (results.size < 5) {
    results.add(expandQuery(template));
  }
  return [...results];
}

// -----------------------------
// DOM WIRING (CRITICAL)
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("templateInput");
  const resultsEl = document.getElementById("results");
  const generateBtn = document.getElementById("generateBtn");

  // Placeholder buttons
  document
    .querySelectorAll(".placeholder-buttons button")
    .forEach(btn => {
      btn.addEventListener("click", () => {
        insertAtCursor(input, btn.dataset.token);
      });
    });

  // Generate button
  generateBtn.addEventListener("click", () => {
    resultsEl.innerHTML = "";

    if (!input.value.trim()) {
      alert("Build a query using the buttons first.");
      return;
    }

    generateQueries(input.value).forEach(q => {
      const li = document.createElement("li");
      li.textContent = q;
      resultsEl.appendChild(li);
    });
  });
});