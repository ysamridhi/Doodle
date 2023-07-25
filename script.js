const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var theColor = "#000000"; // Default color is black
var lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;

body.style.backgroundColor = "#FFFFFF";
var theInput = document.getElementById("favcolor");

theInput.addEventListener(
  "input",
  function () {
    theColor = theInput.value;
    body.style.backgroundColor = theColor;
    ctx.strokeStyle = theColor; // Set the stroke color when the input color changes
  },
  false
);

const ctx = canvas.getContext("2d");
ctx.lineWidth = lineW;
ctx.strokeStyle = theColor; // Set the initial stroke color to black

document.getElementById("ageInputId").oninput = function () {
  draw = false;
  lineW = document.getElementById("ageInputId").value;
  document.getElementById("ageOutputId").innerHTML = lineW;
  ctx.lineWidth = lineW;
};

let clrs = document.querySelectorAll(".clr");
clrs.forEach((clr) => {
  clr.addEventListener("click", () => {
    theColor = clr.dataset.clr; // Update the stroke color when a color div is clicked
    ctx.strokeStyle = theColor;
  });
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
});

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "sketch.png";
  a.click();
});

window.addEventListener("mousedown", (e) => {
  draw = true;
  prevX = e.clientX;
  prevY = e.clientY;
});

window.addEventListener("mouseup", (e) => {
  draw = false;
  prevX = null;
  prevY = null;
});

window.addEventListener("mousemove", (e) => {
  if (!draw) return;

  let currentX = e.clientX;
  let currentY = e.clientY;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  prevX = currentX;
  prevY = currentY;
});
