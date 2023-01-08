class PipePair {
  constructor(firstPipe = true, addPosX = 0) {
    this._minDistFromEdge = 50;
    this._maxDistFromEdge = 500;
    this.gap = 160;
    this.isPassed = false;
    if (firstPipe) {
      this.topHeight = (canvas.height - 30) / 2 - this.gap;
    } else {
      let randomValue = random(this._minDistFromEdge, this._maxDistFromEdge);
      this.topHeight = (canvas.height + randomValue) / 2 - this.gap;
    }
    this.bottomHeight = canvas.height - this.topHeight - this.gap;

    this.bottomPipe = new Pipe(false, this.bottomHeight, addPosX);
    this.topPipe = new Pipe(true, this.topHeight, addPosX);
  }

  update(isMove) {
    let speed = isMove ? 5 : 0;
    this.bottomPipe.update(speed);
    this.topPipe.update(speed);
  }

  isCollisionPlayer(player) {
    return (
      this.bottomPipe.isCollisionPlayer(player) ||
      this.topPipe.isCollisionPlayer(player)
    );
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
