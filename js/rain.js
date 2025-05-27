const rainContainer = document.getElementById("rain-container");
const rainDisplay = document.getElementById("rain");

let TERMINAL_WIDTH, TERMINAL_HEIGHT, lines, EMPTY_LINE;
const RAIN_DENSITY = 0.03;

function calculateSize() {
  TERMINAL_WIDTH = Math.floor(rainContainer.clientWidth / 10);
  TERMINAL_HEIGHT = Math.floor(rainContainer.clientHeight / 18);
  EMPTY_LINE = " ".repeat(TERMINAL_WIDTH);
  lines = Array.from({ length: TERMINAL_HEIGHT }, () => EMPTY_LINE);
}

function buildNextLine(source) {
  const next = [];
  for (let i = 0; i < TERMINAL_WIDTH; i++) {
    let char = source[i] === "v" ? "|" : " ";
    if (Math.random() < RAIN_DENSITY) char = "v";
    next.push(char);
  }
  return next.join("");
}

function update() {
  if (!lines || lines.length === 0) return;
  const newRow = buildNextLine(lines[0]);
  lines.unshift(newRow);
  if (lines.length > TERMINAL_HEIGHT) lines.pop();
  rainDisplay.textContent = lines.join("\n");
}

// Initial sizing
calculateSize();
setInterval(update, 50);

// Dynamically resize when container size changes
const resizeObserver = new ResizeObserver(() => {
  calculateSize();
});
resizeObserver.observe(rainContainer);