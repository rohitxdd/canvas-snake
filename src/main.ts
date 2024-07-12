const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement
let snake = [{ x: 150, y: 150 }, { x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 },];

canvas.style.border = '2px solid black'

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

let dir: Direction = "RIGHT"

const varition  = {
  "UP": { x: 0, y: -10 },
  "DOWN": { x: 0, y: 10 },
  "LEFT": { x: -10, y: 0 },
  "RIGHT": { x: 10, y: 0 }
}

var ctx = canvas.getContext("2d") as CanvasRenderingContext2D

function drawSnakePart(snakePart: { x: number, y: number }) {
  ctx.fillStyle = 'lightgreen';
  ctx.strokeStyle = 'darkgreen';
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
  const head = snake[0]
  ctx.fillStyle = 'darkgreen';
  ctx.fillRect(head.x, head.y, 10, 10);
}

function advanceSnake() {
  const head = snake[0]
  const dxdy = varition[dir]
  const newHeadPosition = getNewHeadPosition(head, dxdy)
  snake.unshift(newHeadPosition)
  snake.pop()
  clearCanvas()
  drawSnake()
}


function getNewHeadPosition(head : {x:number, y :number}, dxdy : {x : number, y: number}) : {x :number, y : number} {
  let newX = head.x + dxdy.x
  if(newX > canvas.width){
    newX = 0
  }else if (newX < 0){
    newX = canvas.width
  }

  let newY = head.y + dxdy.y
  if(newY > canvas.height){
    newY = 0
  }else if (newY < 0){
    newY = canvas.height
  }
  return {x : newX, y : newY}
}

function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height)
}

drawSnake()
setInterval(advanceSnake, 100)


let keyDir = document.addEventListener("keydown", (e) => {
  const keyCode = e.code;
  const key = keyCode.replace("Arrow", "").toUpperCase();

  switch(key){
    case "UP":
      dir = "UP"
      break;
    case "DOWN":
      dir = "DOWN";
      break;
    case "RIGHT":
      dir = "RIGHT"
      break;
    case "LEFT":
      dir = "LEFT";
      break
    default:
      console.log("invalid key")
    
  }

  e.preventDefault()
})
