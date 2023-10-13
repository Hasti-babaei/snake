let Score = document.querySelector("#score");
let gameCanvas = document.querySelector(".gameCanvas");
let startButton = document.querySelector("#start");
let ctx = gameCanvas.getContext("2d");

let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

let foodX;
let foodY;

let dx = 10;
let dy = 0;

let score = 0;
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changeDirection) return;

  changeDirection = true;
  const keyPressed = event.keyCode;
  if (keyPressed === LEFT_KEY && dx !== 10) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === RIGHT_KEY && dx !== -10) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && dy !== 10) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === DOWN_KEY && dy !== -10) {
    dx = 0;
    dy = 10;
  }
}

function main() {
  if (didGameEnd()) return;
  setTimeout(() => {
    changeDirection = false;
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    displayStartButton();
    main();
  }, 100);
}

function didGameEnd() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
    1;
  }
  const leftWall = snake[0].x < 0;
  const rightWall = snake[0].x > gameCanvas.width - 10;
  const topWall = snake[0].y < 0;
  const bottomWall = snake[0].y > gameCanvas.height - 10;
  return leftWall || topWall || rightWall || bottomWall;
}

let clearCanvas = () => {
  ctx.fillStyle = "#fbdbeb";
  ctx.fillRect(0, 0, 300, 300);
};

let randomNumber = (max, min) =>
  Math.round((Math.random() * (max - min) + min) / 10) * 10;
let createFood = () => {
  foodX = randomNumber(0, gameCanvas.width - 10);
  foodY = randomNumber(0, gameCanvas.height - 10);
  snake.forEach((snakePart) => {
    if (snakePart.x === foodX && snakePart.y === foodY) {
      createFood();
    }
  });
};

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === foodX && head.y === foodY) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
}

let drawSnake = () => snake.forEach(drowSnakePart);
let drowSnakePart = (snakePart) => {
  ctx.fillStyle = "rgb(253 227 196)";
  ctx.strokeStyle = "black";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
};

let drawFood = () => {
  ctx.fillStyle = "rgb(239 142 247)";
  ctx.strokeStyle = "black";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
};

snake.forEach((snakePart) => {
  ctx.fillStyle = "rgb(253 227 196)";
  ctx.strokeStyle = "black";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
});

createFood();
main();

let displayStartButton = () => {
  if (didGameEnd()) {
    startButton.style.display = "block";
  }
};

function newSnake() {
  snake = [
    { x: 150, y: 150 },
    { x: 140, y: 150 },
    { x: 130, y: 150 },
    { x: 120, y: 150 },
    { x: 110, y: 150 },
  ];
}

startButton.addEventListener("click", function () {
  createFood();
  newSnake();
  moveSnake();
  updateScore();
  start();
});

function start() {
  if (didGameEnd()) return;
  setTimeout(() => {
    changeDirection = false;
    clearCanvas();
    drawFood();
    drawSnake();
    moveSnake();
    displayStartButton();
    main();
  }, 100);
  startButton.style.display = "none";
}

function updateScore() {
  Score.textContent = 0;
}
