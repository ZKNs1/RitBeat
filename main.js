const cells = document.querySelectorAll('.cell');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const gameOverEl = document.getElementById('game-over');

let score = 0;
let time = 30; // 30 segundos
let gameInterval;
let timerInterval;

// Função que escolhe um quadrado aleatório
function randomCell() {
  if(time <= 0) return; // impede aparecer quadrado depois do fim
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
      setTimeout(randomCell, 300);
    }
  }, { once: true });
}

// Função do cronômetro
function startTimer() {
  timerInterval = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

// Função de fim de jogo
function gameOver() {
  cells.forEach(c => c.classList.remove('active'));
  gameOverEl.textContent = `Fim de jogo! Pontuação final: ${score}`;
}

// Inicia o jogo
function startGame() {
  score = 0;
  time = 30;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  gameOverEl.textContent = '';
  randomCell();
  startTimer();
}

// Começa automaticamente
startGame();
