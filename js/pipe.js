class Pipe {
  constructor(isTop, height, addPosX) {
    this.width = 100;
    this.height = height;
    this.isTop = isTop;
    this.posX = canvas.width + addPosX;

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
      image(pipeTopSprite, this.posX, this.topY + this.height - 800);
    } else {
      image(pipeBottomSprite, this.posX, this.topY);
    }
  }

  update(speed = 4) {
    this.posX -= speed;
    this.draw();
  }

  isCollisionPlayer(player) {
    if (
      player.x + player.size / 2 >= this.posX &&
      player.x - player.size / 2 <= this.posX + this.width
    ) {
      if (!this.isTop && player.y + player.size / 2 >= this.topY) {
        return true;
      }
      if (this.isTop && player.y - player.size / 2 <= this.bottomY) {
        return true;
      }
    }
    return false;
  }
}
