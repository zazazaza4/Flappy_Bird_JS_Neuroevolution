class NeuralNetwork {
  constructor(a, b, c, d) {
    if (a instanceof tf.Sequential) {
      this.model = a;
      this.inputs_nodes = b;
      this.hidden_nodes = c;
      this.output_nodes = d;
    } else {
      this.inputs_nodes = a;
      this.hidden_nodes = b;
      this.output_nodes = c;
      this.model = this.createModel();
    }
  }

  dispose() {
    this.model.dispose();
  }

  copy() {
    return tf.tidy(() => {
      const modelCopy = this.createModel();
      const weights = this.model.getWeights();
      const weightsCopies = [];
      for (let i = 0; i < weights.length; i++) {
        weightsCopies[i] = weights[i].clone();
      }
      modelCopy.setWeights(weightsCopies);
      return new NeuralNetwork(
        modelCopy,
        this.inputs_nodes,
        this.hidden_nodes,
        this.output_nodes
      );
    });
  }

  mutate(rate) {
    tf.tidy(() => {
      const weights = this.model.getWeights();
      const mutateWeights = [];
      for (let i = 0; i < weights.length; i++) {
        let tensor = weights[i];
        let shape = weights[i].shape;
        let values = tensor.dataSync().slice();
        for (let j = 0; j < values.length; j++) {
          if (random(1) < rate) {
            let w = values[j];
            values[j] = w + randomGaussian();
          }
        }
        let newTensor = tf.tensor(values, shape);
        mutateWeights[i] = newTensor;
      }
      this.model.setWeights(mutateWeights);
    });
  }

  predict(inputs) {
    return tf.tidy(() => {
      const xs = tf.tensor2d([inputs]);
      const ys = this.model.predict(xs);
      const outputs = ys.dataSync();
      return outputs;
    });
  }

  createModel() {
    const model = tf.sequential();
    const hidden = tf.layers.dense({
      units: this.hidden_nodes,
      inputShape: [this.inputs_nodes],
      activation: "sigmoid",
    });
    model.add(hidden);
    const output = tf.layers.dense({
      units: this.output_nodes,
      activation: "softmax",
    });
    model.add(output);
    return model;
  }
}
