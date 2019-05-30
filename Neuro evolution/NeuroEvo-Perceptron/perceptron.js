class Perceptron {
  constructor(n, mutationChance) {
    if (n instanceof Array) {
      this.weights = n;
    } else {
      // Start with random weights
      this.weights = [];
      for (let i = 0; i < n; i++) {
        this.weights[i] = random(-1, 1);
      }
    }
    this.mutationChance = mutationChance;
  }

  // Function to train the Perceptron
  // Weights are adjusted based on "desired" answer


  // Guess -1 or 1 based on input values
  feedforward(inputs) {
    // Sum all values
    let sum = 0;
    for (let i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    // Result is sign of the sum, -1 or 1
    return this.activate(sum);
  }

  activate(sum) {
    return (sum > 0) ? 1 : -1;
  }

  // Return weights
  getWeights() {
    return this.weights;
  }
}

Perceptron.crossover = function(p1, p2) {
  const newWeights = [];
  for (let i = 0; i < p1.weights.length; i++) {
    newWeights.push((random() > 0.5)? p1.getWeights()[i] : p2.getWeights()[i]);
  }
  return new Perceptron(newWeights, (p1.mutationChance + p2.mutationChance) / 2);
}

Perceptron.mutate = function(p) {
  for (let i = 0; i < p.weights.length; i++) {
    if (random() > p.mutationChance) p.weights[i] = random(-1, 1);
  }
  return p;
}