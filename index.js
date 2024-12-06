// script.js

const basket = document.getElementById('basket');
const gameArea = document.querySelector('.game-area');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startButton = document.getElementById('startButton');

let score = 0;
let timeLeft = 30;
let gameInterval;
let objectInterval;

// Move basket with mouse
gameArea.addEventListener('mousemove', (e) => {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const basketWidth = basket.offsetWidth;

  let basketX = e.clientX - gameAreaRect.left - basketWidth / 2;
  basketX = Math.max(0, Math.min(basketX, gameAreaRect.width - basketWidth));
  basket.style.left = `${basketX}px`;
});

// Start game
startButton.addEventListener('click', startGame);

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreElement.textContent = score;
  timeElement.textContent = timeLeft;

  startButton.style.display = 'none';

  gameInterval = setInterval(() => {
    timeLeft -= 1;
    timeElement.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(gameInterval);
      clearInterval(objectInterval);
      alert(`Game Over! Your score: ${score}`);
      startButton.style.display = 'block';
    }
  }, 1000);

  objectInterval = setInterval(createFallingObject, 1000);
}

// Create a falling object
function createFallingObject() {
  const fallingObject = document.createElement('div');
  fallingObject.classList.add('falling-object');

  const gameAreaWidth = gameArea.offsetWidth;
  const objectX = Math.random() * (gameAreaWidth - 30);
  fallingObject.style.left = `${objectX}px`;

  gameArea.appendChild(fallingObject);

  // Animate the object
  fallingObject.style.animationDuration = `${2 + Math.random()}s`;

  // Collision detection
  const checkCollision = setInterval(() => {
    const objectRect = fallingObject.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    if (
      objectRect.bottom >= basketRect.top &&
      objectRect.top <= basketRect.bottom &&
      objectRect.right >= basketRect.left &&
      objectRect.left <= basketRect.right
    ) {
      score += 1;
      scoreElement.textContent = score;
      gameArea.removeChild(fallingObject);
      clearInterval(checkCollision);
    }

    // Remove object if it falls out of bounds
    if (objectRect.top > gameArea.offsetHeight) {
      gameArea.removeChild(fallingObject);
      clearInterval(checkCollision);
    }
  }, 10);
}
