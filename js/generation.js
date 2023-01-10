function calculateFitness() {
  let sum = 0;

  for (let i = 0; i < savedBirds.length; i++) {
    sum += savedBirds[i].score;
  }
  for (let i = 0; i < savedBirds.length; i++) {
    savedBirds[i].fitness = savedBirds[i].score / sum;
  }
}

function nextGeneration() {
  console.log("next generation");
  calculateFitness();
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  for (let i = 0; i < TOTAL; i++) {
    savedBirds[i].dispose();
  }
  savedBirds = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];
  let child = new Player(bird.brain);
  child.mutate();
  return child;
}
