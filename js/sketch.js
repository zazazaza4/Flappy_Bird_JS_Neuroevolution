const panSpeed = 8;
const gravity = 3;
let score = 0;
let WhoIsPlaying = "Player"; // Player || NeuralNetwork
const WhoIsPlayingEl = document.getElementById("choose-player");
let player;
let pipe1;
let pipe2;
let ground;
let isMove = true;

const TOTAL = 100;
let birds = [];
let birdsAreDead = 0;
let savedBirds = [];

let birdSprite;
let bg;
let groundSprite;
let pipeBottomSprite;
let pipeTopSprite;

let font;

function preload() {
  birdSprite = loadImage("../assets/images/bird.png");
  groundSprite = loadImage("../assets/images/ground-piece.png");
  bg = loadImage("../assets/images/background.png");
  pipeBottomSprite = loadImage("../assets/images/pipe-bottom.png");
  pipeTopSprite = loadImage("../assets/images/pipe-top.png");

  font = loadFont("../assets/font2.otf");
}

function init(isNextGenerate) {
  pipe1 = new PipePair(true);
  pipe2 = new PipePair(false, (canvas.width + 100) / 2);
  ground = new Ground();
  isMove = true;
  birdsAreDead = 0;

  if (WhoIsPlaying === "Player") {
    player = new Player();
  } else {
    if (!isNextGenerate) {
      for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Player(true);
      }
    } else {
      nextGeneration();
    }
  }
  score = 0;
}

function setup() {
  window.canvas = createCanvas(600, 800);
  tf.setBackend("cpu");
  textSize(width / 6);
  textAlign(CENTER, CENTER);
  textFont(font);

  init();
}

function draw() {
  background(bg);

  pipe1.update(isMove);
  pipe2.update(isMove);
  ground.update(isMove);

  if (WhoIsPlaying === "Player") {
    playHuman();
  } else {
    playNeuralNetwork();
    const isAllBirdAraDead = TOTAL > birdsAreDead;
    isMove = isAllBirdAraDead;
    if (!isAllBirdAraDead) {
      init(true);
    }
  }

  if (pipe1.offScreen()) {
    pipe1 = new PipePair(false);
  }
  if (pipe2.offScreen()) {
    pipe2 = new PipePair(false);
  }
  fill(250);
  text(score, 60, 40);
}

function playNeuralNetwork() {
  for (let i = 0; i < birds.length; i++) {
    if (
      pipe1.isCollisionPlayer(birds[i]) ||
      pipe2.isCollisionPlayer(birds[i]) ||
      ground.isCollisionPlayer(birds[i]) ||
      birds[i].isCollisionSky()
    ) {
      birds[i].dead = true;
      const bird = birds.splice(i, 1)[0];
      savedBirds.push(bird);
      birdsAreDead++;
    } else {
      birds[i].think([pipe1, pipe2]);
      birds[i].update();

      if (pipe1.playerPassed(birds[i].x)) {
        score++;
      }

      if (pipe2.playerPassed(birds[i].x)) {
        score++;
      }
    }
  }
}

function playHuman() {
  if (
    pipe1.isCollisionPlayer(player) ||
    pipe2.isCollisionPlayer(player) ||
    ground.isCollisionPlayer(player)
  ) {
    player.dead = true;
    isMove = false;
  }
  player.update();

  if (pipe1.playerPassed(player.x)) {
    score++;
  }

  if (pipe2.playerPassed(player.x)) {
    score++;
  }
}

function keyPressed() {
  switch (key) {
    case "w":
    case " ":
    case "ArrowUp":
      if (player && !player.dead) {
        player.flap();
      }
      break;
    case "s":
      let bird = birds[0];
      if (bird) {
        saveJSON(bird.brain, "brain.json");
      }
      break;
    case "Shift":
    case "p":
      init(true);
      break;
  }
}

WhoIsPlayingEl.addEventListener("change", (e) => {
  WhoIsPlaying = e.target.value;
  init();
});
