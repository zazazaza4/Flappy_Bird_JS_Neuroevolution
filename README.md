# Flappy Bird Clone JavaScript with Neural Network

This is a Flappy Bird clone built with JavaScript and incorporating a neural network for the bird's movement. The game is modeled after the popular mobile game Flappy Bird, where the player controls a bird and must navigate it through a series of pipes without hitting them.

## How to Play

To play the game, simply open the `index.html` file in your browser. The game will start automatically, and you can control the bird's movement by clicking the space button. The goal is to navigate the bird through the gaps in the pipes without hitting them. Each successful gap pass adds to your score, and hitting a pipe ends the game.

## Neural Network

The game incorporates a neural network to control the bird's movement. The network takes in input from the game state, including the bird's position, velocity, and the positions of the pipes. Based on this input, the network outputs a decision on whether to flap or not. The weights of the network are trained using a genetic algorithm to optimize the bird's performance in the game.

The neural network is built using the TensorFlow library, which provides a powerful and flexible framework for creating and training machine learning models.

## Library

This project uses the following libraries:

- TensorFlow: a machine learning library for creating and training neural networks
- p5.js: a JavaScript library for creating interactive graphics and animations

## Future Improvements

Some potential improvements to the game could include:

- Adding sound effects and background music
- Implementing different difficulty levels
- Adding more obstacles and challenges to the game
- Improving the graphics and user interface
