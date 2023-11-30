const header = document.getElementById("header");
const snoContainer = document.getElementById("sno");
const bodyContainer = document.getElementById("body-container");
const activeElement = document.getElementById("active-cell");
let state = {};
const columns = 26,
  rows = 1000;
let activeCellId = null;

// creating header columns A, B, C, .....
for (let i = 0; i <= columns; i++) {
  const headCell = document.createElement("div");
  headCell.className = "head-cell";
  if (i != 0) {
    headCell.innerText = String.fromCharCode(64 + i);
  }
  header.appendChild(headCell);
}

// createting header row 1,2,3,4, .....
for (let i = 1; i <= rows; i++) {
  const snoCell = document.createElement("div");
  snoCell.className = "sno-cell";
  snoCell.innerText = i;
  snoContainer.appendChild(snoCell);
}

// creating cells
for (let row = 1; row <= rows; row++) {
  const rowElement = document.createElement("div");
  rowElement.className = "row";
  for (let col = 1; col <= columns; col++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.contentEditable = "true";
    cell.id = `${String.fromCharCode(64 + col)}${row}`;
    rowElement.appendChild(cell);
    cell.addEventListener("focus", onFocusCell);
    cell.addEventListener("input", onChangeCellText);
  }
  bodyContainer.appendChild(rowElement);
}

function onFocusCell(event) {
  activeCellId = event.target.id;
  activeElement.innerText = activeCellId;
  if (state[activeCellId]) {
    // already touched cell
    restFrom(state[activeCellId]);
  } else {
    // new cell
    restFrom(defaultStyles);
  }
}
