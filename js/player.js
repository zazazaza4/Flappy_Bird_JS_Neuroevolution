class Player {
  constructor(velX = 8, size = 40) {
    console.log(canvas.height);
    this.x = 100;
    this.y = 200;
    this.velY = 0;
    this.velX = velX;
    this.size = size;
    this.dead = false;
    this.fallRotation = -PI / 6;
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

  update(pipes1, pipes2, ground) {
    this.velY += gravity / 2;
    if (!this.dead) {
      this.velY = constrain(this.velY, -1000, 25);
    } else {
      this.velY = constrain(this.velY, -1000, 40);
    }
    this.y += this.velY;
    this.checkCollisions();
    this.draw();
  }

  checkCollisions(pipes1, pipes2, ground) {
    if (!this.dead) {
    }
    // if (this.pipes1.isCollisionPlayer(this)) {
    //   this.dead = true;
    // }
    // if (this.pipes2.isCollisionPlayer(this)) {
    //   this.dead = true;
    // }
    // if (this.ground.isCollisionPlayer(this)) {
    //   this.dead = true;
    // }
  }

  flap() {
    if (!this.dead) {
      this.velY = -15;
    }
  }
}
