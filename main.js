const grid = document.getElementById("grid");
const scoreDisplay = document.getElementById("score");
let score = 0;

// Criar as 9 células
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");
let targetIndex = -1;

// Função para escolher aleatoriamente o alvo
function newTarget() {
  if (targetIndex >= 0) cells[targetIndex].classList.remove("target");

  targetIndex = Math.floor(Math.random() * 9);
  cells[targetIndex].classList.add("target");
}

// Checar acerto quando mouse passa por cima
cells.forEach((cell, index) => {
  cell.addEventListener("mouseenter", () => {
    if (index === targetIndex) {
      score++;
      scoreDisplay.textContent = score;

      cell.classList.remove("target");
      cell.classList.add("hit");
      setTimeout(() => {
        cell.classList.remove("hit");
        newTarget();
      }, 300);
    }
  });
});

// Começar com um alvo
newTarget();
