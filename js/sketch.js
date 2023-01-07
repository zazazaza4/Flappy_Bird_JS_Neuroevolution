const panSpeed = 8;
const gravity = 3;
let score = 0;

let player;
let pipe1;
let pipe2;
let ground;

let birdSprite;
let bg;

function preload() {
  birdSprite = loadImage("../assets/images/bird.png");
  bg = loadImage("../assets/images/background.png");
}

function setup() {
  window.canvas = createCanvas(600, 800);
  pipe1 = new PipePair();
  pipe2 = new PipePair();
  ground = new Ground();
  player = new Player();
}

function draw() {
  background(bg);
  player.update(pipe1, pipe2, ground);
  pipe1.update();
  pipe2.update();

  if (pipe1.offScreen()) {
    pipe1 = new PipePair();
  }
  if (pipe2.offScreen()) {
    pipe2 = new PipePair();
  }
}

function keyPressed() {
  switch (key) {
    case "w":
    case " ":
    case "ArrowUp":
      player.flap();
      break;

    default:
      break;
  }
}
