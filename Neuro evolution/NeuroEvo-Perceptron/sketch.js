let training = new Array(1000);
// A Perceptron object
let ptrons = [];
const populationCount = 500;

// We will train the perceptron with one "Point" object at a time
let count = 0;
let best;

// Coordinate space
let xmin = -1;
let ymin = -1;
let xmax = 1;
let ymax = 1;

let m = 1,
    q = 0;

// The function to describe a line
function f(x) {
    let y = m * x + q;
    return y;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(120);
    m = random(-10, 10);
    q = random(-2, 2);

    // The perceptron has 3 inputs -- x, y, and bias
    for (let i = 0; i < populationCount; i++) {
        ptrons.push(new Perceptron(3, random(0, 0.5)));
    }

    // Create a random set of training points and calculate the "known" answer
    for (let i = 0; i < training.length; i++) {
        let x = random(xmin, xmax);
        let y = random(ymin, ymax);
        let answer = (y < f(x)) ? -1 : 1;
        training[i] = {
            input: [x, y, 1],
            output: answer
        };
    }
}


function draw() {
    background(0);

    // Draw the line
    strokeWeight(1);
    stroke(255, 50);
    let x1 = map(xmin, xmin, xmax, 0, width);
    let y1 = map(f(xmin), ymin, ymax, height, 0);
    let x2 = map(xmax, xmin, xmax, 0, width);
    let y2 = map(f(xmax), ymin, ymax, height, 0);
    line(x1, y1, x2, y2);

    let matingPool = [];

    // Draw all the points based on what the Perceptron would "guess"
    // Does not use the "known" correct answer
    for (let i = 0; i < training.length; i++) {
        strokeWeight(1);

        ptrons.forEach(ptron => {
            let guess = ptron.feedforward(training[i].input);
            if (guess == training[i].output) {
                ptron.right = (!ptron.right) ? 1 : ptron.right + 1;
                matingPool.push(ptron);
            }
        });
    }

    ptrons.forEach(ptron => {
        ptron.fitness = (ptron.right / training.length * 100) + "%";
        if (!best || ptron.right > best.right) best = ptron;
    });

    // Draw the line based on the current weights
    // Formula is weights[0]*x + weights[1]*y + weights[2] = 0
    strokeWeight(2);
    stroke(255, 50);
    let weights = best.getWeights();
    x1 = xmin;
    y1 = (-weights[2] - weights[0] * x1) / weights[1];
    x2 = xmax;
    y2 = (-weights[2] - weights[0] * x2) / weights[1];
    line(map(x1, xmin, xmax, 0, width), map(y1, ymin, ymax, height, 0), map(x2, xmin, xmax, 0, width), map(y2, ymin, ymax, height, 0));

    for (let i = 0; i < training.length; i++) {
        let guess = best.feedforward(training[i].input);
        (guess > 0) ? noFill(): fill(255);
        stroke((guess == training[i].output) ? [0, 255, 0] : [255, 0, 0]);
        ellipse(map(training[i].input[0], xmin, xmax, 0, width), map(training[i].input[1], ymin, ymax, height, 0), 8, 8);
    }

    let newPtrons = [];

    for (let i = 0; i < populationCount; i++) {
        newPtrons.push(Perceptron.mutate(Perceptron.crossover(random(matingPool), random(matingPool))));
    }

    ptrons = newPtrons;
}