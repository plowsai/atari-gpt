const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

class GameObject {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Player extends GameObject {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    this.speed = 100; // Increase the speed value
  }

  // (previous code)
  moveLeft() {
    if (this.x > 0) {
      this.x -= this.speed;
    }
  }

  moveRight() {
    if (this.x + this.width < canvas.width) {
      this.x += this.speed;
    }
  }
}

class Invader extends GameObject {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
  }
}

class Bullet extends GameObject {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
    this.speed = 8;
  }

  moveUp() {
    this.y -= this.speed;
  }
}

const player = new Player(canvas.width / 2 - 25, canvas.height - 60, 50, 20, 'white');
const invaders = [];
const bullets = [];
let score = 0;
let invadersDirection = 1;

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 11; j++) {
    invaders.push(new Invader(50 + j * 70, 30 + i * 60, 40, 20, 'white'));
  }
}

function drawGameObjects() {
  player.draw();
  invaders.forEach((invader) => invader.draw());
  bullets.forEach((bullet) => bullet.draw());
}

function moveInvaders() {
  const moveDistance = 2; // Decrease the move distance value
  let moveDown = false;

  for (let invader of invaders) {
    if (invader.x + invader.width >= canvas.width || invader.x <= 0) {
      invadersDirection = -invadersDirection;
      moveDown = true;
      break;
    }
  }

  for (let invader of invaders) {
    invader.x += moveDistance * invadersDirection;
    if (moveDown) {
      invader.y += moveDistance;
    }
  }
}

function moveBullets() {
  for (let bullet of bullets) {
    bullet.moveUp();
  }
}

let highScore = 0;

function displayHighScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`High Score: ${highScore}`, canvas.width - 180, 30);
}

function detectCollisions() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = invaders.length - 1; j >= 0; j--) {
      const bullet = bullets[i];
      const invader = invaders[j];

      if (
        bullet.x < invader.x + invader.width &&
        bullet.x + bullet.width > invader.x &&
        bullet.y < invader.y + invader.height &&
        bullet.y + bullet.height > invader.y
      ) {
        score += 100;
        bullets.splice(i, 1);
        invaders.splice(j, 1);
        break;
      }
    }
  }
}

function checkGameOver() {
  if (detectCollisions()) {
    if (score > highScore) {
      highScore = score;
    }
    // Reset game state
    score = 0;
    player.x = canvas.width / 2 - player.width / 2;
    bullets = [];
    invaders = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 11; j++) {
        invaders.push(new Invader(50 + j * 70, 30 + i * 60, 40, 20, 'white'));
      }
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveInvaders();
  moveBullets();
  removeOffscreenBullets();
  detectCollisions();
  displayScore();
  displayHighScore();
  drawGameObjects();
  checkGameOver();
  requestAnimationFrame(gameLoop);
}
// (previous code)

function displayScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 20, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  moveInvaders();
  moveBullets();
  removeOffscreenBullets();
  detectCollisions();
  displayScore();
  drawGameObjects();
  requestAnimationFrame(gameLoop);
}

// (previous code)

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    player.moveLeft();
  } else if (event.key === 'ArrowRight') {
    player.moveRight();
  } else if (event.key === ' ') { // Use ' ' (a space) instead of 'Space'
    event.preventDefault(); // Prevent the default behavior of the spacebar
    if (bullets.length === 0) {
      bullets.push(new Bullet(player.x + player.width / 2 - 2.5, player.y, 5, 10, 'white'));
    }
  }
});

// (previous code)


function removeOffscreenBullets() {
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].y + bullets[i].height <= 0) {
      bullets.splice(i, 1);
      i--; // Decrement index to account for removed bullet
    }
  }
}

gameLoop();
