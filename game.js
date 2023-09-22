const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const board = [];
const boardSize = 20;
const blockSize = canvas.width / boardSize;

for (let i = 0; i < boardSize; i++) {
  board[i] = [];
  for (let j = 0; j < boardSize; j++) {
    board[i][j] = 0;
  }
}

const snake = {
  body: [[10, 10], [9, 10], [8, 10]],
  direction: "right",
};

function drawBlock(x, y) {
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

function drawBoard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 1) {
        drawBlock(i, j);
      }
    }
  }
}

function drawSnake() {
  ctx.fillStyle = "green";
  snake.body.forEach((block) => {
    drawBlock(block[0], block[1]);
  });
}

function updateSnake() {
  const head = snake.body[0];
  let newHead;

  switch (snake.direction) {
    case "up":
      newHead = [head[0], head[1] - 1];
      break;
    case "down":
      newHead = [head[0], head[1] + 1];
      break;
    case "left":
      newHead = [head[0] - 1, head[1]];
      break;
    case "right":
      newHead = [head[0] + 1, head[1]];
      break;
  }

  snake.body.unshift(newHead);
  snake.body.pop();
}

function handleInput(event) {
  switch (event.keyCode) {
    case 37:
      snake.direction = "left";
      break;
    case 38:
      snake.direction = "up";
      break;
    case 39:
      snake.direction = "right";
      break;
    case 40:
      snake.direction = "down";
      break;
  }
}

function checkCollision() {
    const head = snake.body[0];

    // Check if the head collides with the game board boundaries
    if (head[0] < 0 || head[0] >= boardSize || head[1] < 0 || head[1] >= boardSize) {
        return true;
    }

    // Check if the head collides with the snake's body
    for (let i = 1; i < snake.body.length; i++) {
        if (head[0] === snake.body[i][0] && head[1] === snake.body[i][1]) {
        return true;
        }
    }

    return false;
    }

document.addEventListener("keydown", handleInput);

function gameLoop() {
  updateSnake();
  
  if (checkCollision()) {
    // Handle collision
    console.log("Game over!");
    return;
  }

  drawBoard();
  drawSnake();
}

setInterval(gameLoop, 100);