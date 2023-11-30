const form = document.querySelector(".controls");

form.addEventListener("change", onChangeForm);

// Assign the form data values to cell data container
function onChangeForm() {
  const datas = {
    fontFamily: form.fontFamily.value,
    fontSize: form.fontSize.value,
    isBold: form.isBold.checked,
    italic: form.italic.checked,
    isUnderline: form.isUnderline.checked,
    align: form.align.value, //left, center, right,
    txtColor: form.txtColor.value,
    bgColor: form.bgColor.value,
  };
  applyStyles(datas);
}

const defaultStyles = {
  fontFamily: "poppins",
  fontSize: 16,
  isBold: false,
  italic: false,
  isUnderline: false,
  align: "left",
  txtColor: "#000000",
  bgColor: "#ffffff",
};

// get the cells text
function onChangeCellText(event) {
  let chagedText = event.target.innerText;
  if (state[activeCellId]) {
    state[activeCellId].text = chagedText;
  } else {
    state[activeCellId] = { ...defaultStyles, text: event.target.innerText };
  }
}

function applyStyles(styles) {
  if (!activeCellId) {
    form.reset();
    alert("Please select cell");
    return;
  }
  const activeCell = document.getElementById(activeCellId);
  activeCell.style.color = styles.txtColor;
  activeCell.style.backgroundColor = styles.bgColor;
  activeCell.style.textAlign = styles.align;
  activeCell.style.fontWeight = styles.isBold ? "600" : "400";
  activeCell.style.fontFamily = styles.fontFamily;
  activeCell.style.fontSize = styles.fontSize + "px";
  activeCell.style.textDecoration = styles.isUnderline ? "underline" : "none";
  activeCell.style.fontStyle = styles.italic ? "italic" : "normal";
  state[activeCellId] = { ...styles, text: activeCell.innerText };
}

function restFrom(styles) {
  // reset the form for touch the new cell
  console.log(styles);
  form.fontFamily.value = styles.fontFamily;
  form.fontSize.value = styles.fontSize;
  form.isBold.checked = styles.isBold;
  form.isUnderline.checked = styles.isUnderline;
  form.italic.checked = styles.italic;
  form.align.value = styles.align;
  form.txtColor.value = styles.txtColor;
  form.bgColor.value = styles.bgColor;
}

function exportData() {
  // export the excel data to local machine
  const excelData = JSON.stringify(state);
  const blob = new Blob([excelData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "Sample.json";
  link.href = url;
  link.click();
}
