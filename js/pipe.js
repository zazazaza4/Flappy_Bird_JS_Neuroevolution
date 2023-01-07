class Pipe {
  constructor(isTop, heigth) {
    this.width = 100;
    this.heigth = heigth;
    this.isTop = isTop;
    this.posX = canvas.width;

    if (isTop) {
      this.topY = 0;
      this.bottomY = this.heigth;
    } else {
      this.topY = canvas.heigth - this.heigth;
      this.bottomY = canvas.heigth;
    }
  }

  update(speed = 8) {
    this.posX -= speed * 5;
  }

  isCollisionPlayer(player) {
    if (player.x + player.size / 2 >= this.posX) {
      return true;
    }

    return false;
  }
}
