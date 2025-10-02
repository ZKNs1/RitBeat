const cells = document.querySelectorAll('.cell');
const scoreEl = document.getElementById('score');
let score = 0;

function randomCell() {
  cells.forEach(c => c.classList.remove('active', 'correct'));
  const index = Math.floor(Math.random() * cells.length);
  const target = cells[index];
  target.classList.add('active');

  target.addEventListener('mouseenter', () => {
    if (target.classList.contains('active')) {
      score++;
      scoreEl.textContent = score;
      target.classList.remove('active');
      target.classList.add('correct');
      setTimeout(randomCell, 500);
    }
  }, { once: true });
}

randomCell();
