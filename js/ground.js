class Ground {
  constructor() {
    this.height = 30;
    this.topPixelCoord = canvas.height - this.height;
    this.pixelOffset = 0;
  }

  draw() {
    fill(0);
    rect(0, this.topPixelCoord, canvas.width, this.height);
    for (var i = this.pixelOffset; i < canvas.width; i += groundSprite.width) {
      image(groundSprite, i, this.topPixelCoord);
    }
  }

  update(isMove, speedGround = 3) {
    let speed = isMove ? speedGround : 0;
    this.pixelOffset -= speed;
    if (this.pixelOffset <= -groundSprite.width) {
      this.pixelOffset += groundSprite.width;
    }
    this.draw(isMove);
  }

  isCollisionPlayer(player) {
    return player.y + player.size / 2 >= this.topPixelCoord;
  }
}
