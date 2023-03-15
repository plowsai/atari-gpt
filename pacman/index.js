const gridSize = 20;
const gameContainer = document.getElementById('game-container');
let gameGrid = [];

function createGrid() {
  for (let row = 0; row < gridSize; row++) {
    gameGrid[row] = [];
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      gameContainer.appendChild(cell);
      gameGrid[row][col] = cell;
    }
  }
}

createGrid();

const pacmanInitialPosition = { x: 9, y: 9 };
let pacmanPosition = { ...pacmanInitialPosition };

function placePacman() {
  gameGrid[pacmanPosition.y][pacmanPosition.x].classList.add('pacman');
}

function placeFood() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (row !== pacmanPosition.y || col !== pacmanPosition.x) {
        gameGrid[row][col].classList.add('food');
      }
    }
  }
}

placePacman();
placeFood();

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  let direction = null;

  switch (event.key) {
    case 'ArrowUp':
      direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      direction = { x: 1, y: 0 };
      break;
  }

  if (direction) {
    movePacman(direction);
  }
}

function movePacman(direction) {
    const newPosition = {
      x: pacmanPosition.x + direction.x,
      y: pacmanPosition.y + direction.y
    };
  
    if (isValidMove(newPosition)) {
      gameGrid[pacmanPosition.y][pacmanPosition.x].classList.remove('pacman');
      pacmanPosition = newPosition;
      gameGrid[pacmanPosition.y][pacmanPosition.x].classList.add('pacman');
      gameGrid[pacmanPosition.y][pacmanPosition.x].classList.remove('food');
    }
  }
  
  function isValidMove(position, isPacman = true) {
    if (
      position.x < 0 ||
      position.x >= gridSize ||
      position.y < 0 ||
      position.y >= gridSize
    ) {
      return false;
    }
  
    const cell = gameGrid[position.y][position.x];
    if (isPacman && cell.classList.contains('ghost')) {
      // Add code to eat the ghost and update the game state
      const ghostId = cell.dataset.ghostId;
      eatGhost(ghostId);
      return true;
    }
  
    return true;
  }
  
  function eatGhost(ghostId) {
    // Find the ghost object by its id
    const ghostIndex = ghosts.findIndex(ghost => ghost.id === parseInt(ghostId));
  
    if (ghostIndex > -1) {
      // Remove the ghost from the array and the grid
      const ghost = ghosts[ghostIndex];
      gameGrid[ghost.position.y][ghost.position.x].classList.remove('ghost');
      delete gameGrid[ghost.position.y][ghost.position.x].dataset.ghostId;
      ghosts.splice(ghostIndex, 1);
    }
  }
  
  const ghosts = [
    { id: 0, initialPosition: { x: 7, y: 7 }, position: { x: 7, y: 7 }, direction: { x: 1, y: 0 } },
    { id: 1, initialPosition: { x: 12, y: 7 }, position: { x: 12, y: 7 }, direction: { x: -1, y: 0 } },
    // Add more ghosts if desired
  ];
  
  function placeGhosts() {
    ghosts.forEach(ghost => {
      const { x, y } = ghost.position;
      gameGrid[y][x].classList.add('ghost');
      gameGrid[y][x].dataset.ghostId = ghost.id;
    });
  }
  
  placeGhosts();
  
  function moveGhosts() {
    ghosts.forEach(ghost => {
      const newPosition = {
        x: ghost.position.x + ghost.direction.x,
        y: ghost.position.y + ghost.direction.y
      };
  
      if (isValidMove(newPosition)) {
        gameGrid[ghost.position.y][ghost.position.x].classList.remove('ghost');
        delete gameGrid[ghost.position.y][ghost.position.x].dataset.ghostId;
  
        ghost.position = newPosition;
        gameGrid[newPosition.y][newPosition.x].classList.add('ghost');
        gameGrid[newPosition.y][newPosition.x].dataset.ghostId = ghost.id;
  
        if (newPosition.x === pacmanPosition.x && newPosition.y === pacmanPosition.y) {
          gameOver();
        }
      } else {
        ghost.direction = getRandomDirection();
      }
    });
  }
  
  function getRandomDirection() {
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ];
  
    return directions[Math.floor(Math.random() * directions.length)];
  }
  
  function gameOver() {
    console.log('Game over');
    // Implement game over logic, such as resetting the game or displaying a game over message
  }
  
  const gameSpeed = 250; // Adjust this value to control the game speed

function gameLoop() {
  moveGhosts();
  setTimeout(gameLoop, gameSpeed);
}

gameLoop();

function isValidMove(position, isPacman = true) {
  if (
    position.x < 0 ||
    position.x >= gridSize ||
    position.y < 0 ||
    position.y >= gridSize
  ) {
    return false;
  }

  const cell = gameGrid[position.y][position.x];
  if (isPacman && cell.classList.contains('ghost')) {
    return false;
  }

  return true;
}

function updatePacmanRotation(direction) {
  const rotationMap = {
    '0,-1': 0,
    '0,1': 180,
    '-1,0': 270,
    '1,0': 90,
  };
  const rotation = rotationMap[`${direction.x},${direction.y}`];
  gameGrid[pacmanPosition.y][pacmanPosition.x].style.transform = `rotate(${rotation}deg)`;
}

// Call this function whenever Ms. Pac-Man moves
updatePacmanRotation({ x: 0, y: -1 });


function placeGhosts() {
  ghosts.forEach(ghost => {
    const { x, y } = ghost.position;
    const ghostElement = gameGrid[y][x];
    ghostElement.classList.add('ghost');
    ghostElement.dataset.ghostId = ghost.id;
  });
}

placeGhosts();

function handleKeyPress(event) {
  let direction = null;

  switch (event.key) {
    case 'ArrowUp':
      direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      direction = { x: 1, y: 0 };
      break;
  }

  if (direction) {
    movePacman(direction);
    updatePacmanRotation(direction); // Add this line
  }
}


