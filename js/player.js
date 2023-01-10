class Player {
  constructor(brain = null, velX = 8, size = 40) {
    this.x = 100;
    this.y = 200;
    this.velY = 0;
    this.velX = velX;
    this.size = size;
    this.dead = false;
    this.fallRotation = -PI / 6;
    this.score = 0;
    this.fitness = 0;

    this.initBrain(brain);
  }

  draw() {
    push();
    translate(
      this.x - this.size / 2 - 8 + birdSprite.width / 2,
      this.y - this.size / 2 + birdSprite.height / 2
    );
    if (this.velY < 15) {
      rotate(-PI / 6);
      this.fallRotation = -PI / 6;
    } else if (this.velY <= 20) {
      this.fallRotation += PI / 8.0;
      this.fallRotation = constrain(this.fallRotation, -PI / 6, PI / 2);
      rotate(this.fallRotation);
    } else {
      rotate(PI / 2);
    }
    image(birdSprite, -birdSprite.width / 2, -birdSprite.height / 2);
    pop();
  }

  update() {
    this.velY += gravity / 2;
    if (!this.dead) {
      this.velY = constrain(this.velY, -1000, 25);
      this.score++;
    } else {
      this.velY = constrain(this.velY, -1000, 40);
    }
    if (this.y < canvas.height - 50) {
      this.y += this.velY;
    }

    this.draw();
  }

  isCollisionSky() {
    return this.y < 0;
  }

  flap() {
    if (!this.dead) {
      this.velY = -15;
    }
  }

  // Neural Network
  initBrain(brain) {
    if (brain) {
      if (brain instanceof NeuralNetwork) {
        this.brain = brain.copy();
      } else {
        this.brain = new NeuralNetwork(5, 8, 2);
      }
    }
  }

  dispose() {
    this.brain.dispose();
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  _findClosestPipe(pipes = []) {
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = pipes[i].x + pipes[i].width - this.x;
      if (d < closestD && d > 0) {
        closest = pipes[i];
        closestD = d;
      }
    }

    return closest;
  }

  think(pipes) {
    let inputs = [];
    const closest = this._findClosestPipe(pipes);

    inputs[0] = this.y / height;
    inputs[1] = closest.topPipe.bottomY / height;
    inputs[2] = closest.bottomPipe.topY / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velY / 10;

    let output = this.brain.predict(inputs);
    if (output[0] > output[1]) {
      this.flap();
    }
  }
}
