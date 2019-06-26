const populationSize = 1000;
const mutationRate = 0.05;
const brainSize = 200;
let epochs = 1;
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
    background(0);

    stroke(255);
    point(goal.x, goal.y);
    strokeWeight(8);

    if (dots.allDotsDead()) {
        time = 0;
        dots.calculateFitness();
        dots.naturalSelection();
        dots.mutateDemBabies();
        dots.setBestDot();
    } else {
        for (let i = 0; i < epochs; i++) {
            dots.update();
            time++;
        }
        dots.show();
    }

    textSize(30);
    fill(255);
    noStroke();
    const TIMES = `x${epochs}`;
    text(TIMES, 0, textAscent());
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) epochs *= 2;
    else if (keyCode == LEFT_ARROW && epochs > 1) epochs /= 2;
}