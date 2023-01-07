class PipePair {
  constructor(firstPipe) {
    this.gap = 160;
    this.isPassed = false;

    this.topHeight = (canvas.height - 30) / 1.5;
    this.bottomHeight = canvas.height - this.topHeight / 2 - this.gap;
    this.bottomPipe = new Pipe(false, this.bottomHeight);
    this.topPipe = new Pipe(true, this.topHeight);
  }

  update() {
    this.bottomPipe.update();
    this.topPipe.update();
  }

  playerPassed(playerX) {
    if (
      !this.isPassed &&
      playerX > this.bottomPipe.posX + this.bottomPipe.width
    ) {
      this.isPassed = true;
      return true;
    }

    return false;
  }

  offScreen() {
    if (this.bottomPipe.posX + this.bottomPipe.width < 0) {
      return true;
    }
    return false;
  }

  setNewPositionX(x) {
    this.bottomPipe.posX = x;
    this.topPipe.posX = x;
  }
}
