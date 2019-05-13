class Dot {
    constructor(pos) {
        this.pos = pos;
        this.vel = createVector();
        this.acc = createVector();
        this.brain = new Brain();
        this.color = [0, 0, 255, 50];
        this.reachedGoal = false;
        this.dead = false;
    }

    best() {
        this.isBest = true;
        this.color = [0, 255, 0, 75];
        return this;
    }

    calculateFitness() {
        if (this.reachedGoal) {
            this.fitness = 1.0 / 16.0 + 10000.0 / (this.brain.step * this.brain.step);
        } else {
            let distanceToGoal = dist(this.pos.x, this.pos.y, goal.x, goal.y);
            this.fitness = 1.0 / (distanceToGoal * distanceToGoal);
        }
    }

    update() {
        if (!this.dead && !this.reachedGoal) {
            this.move();
            if (this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height - 2) {
                this.dead = true;
            } else if (dist(this.pos.x, this.pos.y, goal.x, goal.y) < 5) {
                this.reachedGoal = true;
            }
        }
    }

    move() {
        if (this.brain.directions.length > this.brain.step) {
            this.acc = this.brain.directions[this.brain.step];
            this.brain.step++;
        } else {
            this.dead = true;
        }

        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
    }

    show() {
        stroke(this.color);
        strokeWeight(8);
        point(this.pos.x, this.pos.y);
    }

    gimmeBaby() {
        let baby = new Dot(startingPos.copy());
        baby.brain = this.brain.clone();
        return baby;
    }
}

Dot.mutate = function (moveset) {
    let newMoveset = [];
    moveset.forEach(element => {
        if (random() < mutationRate) newMoveset.push(createVector(random(-1, 1), random(-1, 1)));
        else newMoveset.push(element);
    }); 
    return newMoveset;
}

Dot.crossover = function (movesetA, movesetB) {
    let newMoveset = [];
    for (let i = 0; i < min(movesetA.length, movesetB.length); i++) {
        if (random() <= 0.5) newMoveset.push(movesetA[i]);
        else newMoveset.push(movesetB[i]);
    }
    return newMoveset;
}