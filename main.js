const startBtn = document.getElementById('start-btn');
const menu = document.querySelector('.menu');
const hud = document.querySelector('.hud');
const grid = document.querySelector('.grid');
const music = document.getElementById('bg-music');

const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const gameOverEl = document.getElementById('game-over');

let bpm = 120; 
let interval = (60 / bpm) * 1000;
let score = 0;
let time = 210;
let timer;
let beatInterval;


function randomCell() {
  const cells = document.querySelectorAll('.cell');
  
  // limpa qualquer célula ativa anterior
  cells.forEach(cell => {
    cell.classList.remove('active');
    cell.classList.remove('hit');
  });

  // escolhe uma célula aleatória
  const randomIndex = Math.floor(Math.random() * cells.length);
  const targetCell = cells[randomIndex];
  targetCell.classList.add('active');

  // adiciona evento de acerto
  targetCell.onmouseenter = () => {
    score++;
    scoreEl.textContent = score;
    targetCell.classList.remove('active');
    targetCell.classList.add('hit'); // feedback verde
  };
}

// inicia música
function startMusic() {
  music.currentTime = 0; // garante que comece do início
  music.play();
}

// quadrados no ritmo
function startBeat() {
  beatInterval = setInterval(() => {
    randomCell(); // precisa existir no seu código
  }, interval);
}

// timer
function startTimer() {
  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      gameOver();
    }
  }, 1000);
}

function startGame() {
  score = 0;
  time = 210;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  gameOverEl.textContent = '';

  menu.classList.add('hidden');
  hud.classList.remove('hidden');
  grid.classList.remove('hidden');

  startMusic();
  startTimer();
  startBeat();
}

function gameOver() {
  clearInterval(timer);
  clearInterval(beatInterval);
  music.pause();
  music.currentTime = 0; // reseta a música
  gameOverEl.textContent = `Game Over! Final Score: ${score}`;
  
  menu.classList.remove('hidden');
  hud.classList.add('hidden');
  grid.classList.add('hidden');
}

startBtn.addEventListener('click', startGame);
