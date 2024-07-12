const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

const initailSnake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];

let snake: { x: number; y: number }[] = [...initailSnake];

let Food_Cord = generateRandomFoodCord();

let increment: boolean = false;

let IntervalID: number;

let isGameStart: boolean = false;

function gameStart() {
  drawSnake();
  IntervalID = setInterval(advanceSnake, 50);
  isGameStart = true;
}

function generateRandomFoodCord(): { x: number; y: number } {
  let x = Math.floor(Math.random() * 1280);
  let y = Math.floor(Math.random() * 720);
  x = x - (x % 10);
  y = y - (y % 10);
  return { x, y };
}

canvas.style.border = "2px solid black";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

let dir: Direction = "RIGHT";

const varition = {
  UP: { x: 0, y: -10 },
  DOWN: { x: 0, y: 10 },
  LEFT: { x: -10, y: 0 },
  RIGHT: { x: 10, y: 0 },
};

var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

function drawSnakePart(snakePart: { x: number; y: number }) {
  ctx.fillStyle = "lightgreen";
  ctx.strokeStyle = "darkgreen";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
  const head = snake[0];
  ctx.fillStyle = "darkgreen";
  ctx.fillRect(head.x, head.y, 10, 10);
}

function advanceSnake() {
  clearCanvas();
  const head = snake[0];
  const dxdy = varition[dir];
  const newHeadPosition = getNewHeadPosition(head, dxdy);
  snake.unshift(newHeadPosition);
  if (!increment) {
    snake.pop();
  } else {
    increment = false;
  }
  drawFood();
  drawSnake();
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(Food_Cord.x, Food_Cord.y, 10, 10);
}

function getNewHeadPosition(
  head: { x: number; y: number },
  dxdy: { x: number; y: number }
): { x: number; y: number } {
  let newX = head.x + dxdy.x;
  if (newX > canvas.width - 10) {
    newX = 0;
  } else if (newX < 0) {
    newX = canvas.width;
  }

  let newY = head.y + dxdy.y;
  if (newY > canvas.height - 10) {
    newY = 0;
  } else if (newY < 0) {
    newY = canvas.height;
  }
  if (newX === Food_Cord.x && newY === Food_Cord.y) {
    Food_Cord = generateRandomFoodCord();
    increment = true;
  }

  if (snake.some((e) => e.x === newX && e.y === newY)) {
    clearInterval(IntervalID);
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);
  }

  return { x: newX, y: newY };
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("keydown", (e) => {
  const keyCode = e.code;
  const key = keyCode.replace("Arrow", "").toUpperCase();
  switch (key) {
    case "UP":
      if (dir !== "DOWN") {
        dir = "UP";
      }
      break;
    case "DOWN":
      if (dir !== "UP") {
        dir = "DOWN";
      }
      break;
    case "RIGHT":
      if (dir !== "LEFT") {
        dir = "RIGHT";
      }
      break;
    case "LEFT":
      if (dir !== "RIGHT") {
        dir = "LEFT";
      }
      break;
    case "SPACE":
      if (!isGameStart) {
        gameStart();
      }
      break;
    default:
      console.log("invalid key");
  }
  e.preventDefault();
});

function WelcomeScreen() {
  const dinnaImage = document.getElementById("dinna") as HTMLImageElement;
  ctx.font = "75px 'Playwrite BE VLG', cursive";
  ctx.fillStyle = "crimson";
  ctx.fillText(
    "Dinna               Charmer",
    canvas.width / 2 - 450,
    canvas.height / 2
  );
  ctx.drawImage(dinnaImage, canvas.width / 2 - 250, 10);
  ctx.font = "bold 50px 'Montserrat', sans-serif";
  ctx.fillStyle = "#5AB2FF";
  ctx.fillText(
    "Press SPACE to Start",
    canvas.width / 2 - 250,
    canvas.height - 50
  );
}
WelcomeScreen();
