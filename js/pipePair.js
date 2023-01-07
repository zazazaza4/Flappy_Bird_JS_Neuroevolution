class PipePair {
  constructor() {
    this.gap = 160;

    this.bottomPipe = new Pipe(false);
    this.topPipe = new Pipe(true);
  }

  update() {
    this.bottomPipe.update();
    this.topPipe.update();
  }

  setNewPositionX(x) {
    this.bottomPipe.posX = x;
    this.topPipe.posX = x;
  }
}
