const panSpeed = 8;
const gravity = 3;

let player;
let pipes;
let pipes2;
let ground;
var birdSprite;

function preload() {
  birdSprite = loadImage("../assets/images/bird.png");
}

function setup() {
  createCanvas(600, 800);
  pipes = new PipePair();
  pipes2 = new PipePair();
  ground = new Ground();
  player = new Player();
}

function draw() {
  background(220);
  player.update(pipes, pipes2, ground);
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
