class Brain {
    constructor() {
        this.size = brainSize;
        this.step = 0;
        this.directions = [];
        this.randomize()
    }

    randomize() {
        for (let i = 0; i < brainSize; i++) {
            let randomAngle = random(2 * PI);
            this.directions[i] = p5.Vector.fromAngle(randomAngle);
        }
    }

    clone() {
        let cloned = new Brain();
        for (let i = 0; i < this.directions.length; i++) {
            cloned.directions[i] = this.directions[i].copy();
        }
        return cloned;
    }

    mutate() {
        for (let i = 0; i < this.directions.length; i++) {
            let rand = random();
            if (rand < mutationRate) {
                let randomAngle = random(0, TWO_PI);
                this.directions[i] = p5.Vector.fromAngle(randomAngle);
            }
        }
    }
}

Array.prototype.copy = function() {
    let a = [];
    this.forEach(element => { a.push(element) });
    return a;
}