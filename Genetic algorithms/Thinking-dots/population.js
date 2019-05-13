class Population {
    constructor(size) {
        this.dots = [];
        for (let i = 0; i < size; i++) {
            this.dots.push(new Dot(startingPos.copy()));
        }
        this.fitnessSum = 0;
        this.gen = 1;
        this.bestDot = 0;
        this.minStep = 1000;
        
    }

    show() {        
        for (let i = 1; i < this.dots.length; i++) {
            this.dots[i].show();
        }
        this.dots[0].show();
    }

    update() {
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].brain.step > this.minStep) {
                this.dots[i].dead = true;
            } else {
                this.dots[i].update();
            }
        }
    }

    calculateFitness() {
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].calculateFitness();
        }
    }

    allDotsDead() {
        for (let i = 0; i < this.dots.length; i++) {
            if (!this.dots[i].dead && !this.dots[i].reachedGoal) {
                return false;
            }
        }

        return true;
    }

    naturalSelection() {
        let newDots = [];
        this.setBestDot();
        this.calculateFitnessSum();

        newDots[0] = this.dots[this.bestDot].gimmeBaby();
        newDots[0].isBest = true;
        for (let i = 1; i < populationSize; i++) {
            let parent = this.selectParent();
            newDots[i] = parent.gimmeBaby();
        }

        this.dots = newDots.copy();
        this.gen++;
    }

    calculateFitnessSum() {
        this.fitnessSum = 0;
        for (let i = 0; i < this.dots.length; i++) {
            this.fitnessSum += this.dots[i].fitness;
        }
    }

    selectParent() {
        let rand = random(this.fitnessSum);

        let runningSum = 0;

        for (let i = 0; i < this.dots.length; i++) {
            runningSum += this.dots[i].fitness;
            if (runningSum > rand) {
                return this.dots[i];
            }
        }
        return null;
    }

    mutateDemBabies() {
        for (let i = 1; i < this.dots.length; i++) {
            this.dots[i].brain.mutate();
        }
    }

    setBestDot() {
        let max = 0;
        let maxIndex = 0;
        for (let i = 0; i < this.dots.length; i++) {
            if (this.dots[i].fitness > max) {
                max = this.dots[i].fitness;
                maxIndex = i;
            }
        }
        this.bestDot = maxIndex;
        this.dots[this.bestDot].best();

        if (this.dots[this.bestDot].reachedGoal) {
            this.minStep = this.dots[this.bestDot].brain.step;
            console.log("step:", this.minStep);
        }
    }
}