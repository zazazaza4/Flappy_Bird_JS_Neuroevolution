class Pipe {
  constructor(isTop, height) {
    this.width = 100;
    this.height = height;
    this.isTop = isTop;
    this.posX = canvas.width;

    if (isTop) {
      this.topY = 0;
      this.bottomY = this.height;
    } else {
      this.topY = canvas.height - this.height;
      this.bottomY = canvas.height;
    }
  }

  draw() {
    fill(0, 204, 0);
    if (this.isTop) {
      rect(this.posX, this.topY + this.height - 800, this.width, this.height);
    } else {
      rect(this.posX, this.topY, this.width, this.height);
    }
  }

  update(speed = 4) {
    this.posX -= speed;
    this.draw();
  }

  isCollisionPlayer(player) {
    if (player.x + player.size / 2 >= this.posX) {
      return true;
    }

    return false;
  }
}
