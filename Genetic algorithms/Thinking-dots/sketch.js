const populationSize = 1000;
const mutationRate = 0.05;
const brainSize = 200;
let startingPos;
let goal, dots, time = 0;

function setup() {
    //createCanvas(800, 600);
    createCanvas(windowWidth, windowHeight);    
    frameRate(120);
    startingPos = createVector(width / 2, height / 8 * 7);
    goal = createVector(width / 2, height / 8);
    dots = new Population(populationSize);
}

function draw() {
    background(51);

    stroke(255);
    point(goal.x, goal.y);
    strokeWeight(8);

    //for (let i = 0; i < 5; i++){
        if (dots.allDotsDead()) {
            time = 0;
            dots.calculateFitness();
            dots.naturalSelection();
            dots.mutateDemBabies();
        } else {
            dots.update();
            dots.show();
            time++;
        }
    //}
}