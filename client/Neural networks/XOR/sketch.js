const resolution = 20;
let cols
let rows
let model;
let xs;

const train_x = tf.tensor2d([
	[0, 0],
	[1, 0],
	[0, 1],
	[1, 1]
])

const train_y = tf.tensor2d([
	[0],
	[1],
	[1],
	[0]
])

function preload() {
	alert("black: false\r\nwhite: true")
}

function setup() {
	createCanvas(800, 800);
	rows = floor(height / resolution)
	cols = floor(width / resolution)

	// Setup model
	model = tf.sequential()
	const hidden = tf.layers.dense({
		units: 10,
		inputShape: [2],
		activation: 'sigmoid'
	})
	const output = tf.layers.dense({
		units: 1,
		activation: 'sigmoid'
	})
	model.add(hidden)
	model.add(output)
	model.compile({
		optimizer: tf.train.adam(0.05),
		loss: 'meanSquaredError'
	})

	// Create inputs
	let inputs = []
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			const x = j / cols
			const y = i / rows
			inputs.push([x, y])
		}
	}
	xs = tf.tensor2d(inputs)
	setTimeout(train(), 10)
}
let trainCount = 0

function train() {
	model.fit(train_x, train_y, {
		shuffle: true,
		epochs: 10
	}).then(result => {
		if (result.history.loss[0] >= 0.0001) {
			trainCount++
			setTimeout(train(), 10)
		} else {
			noLoop()
		}
	})
}

function draw() {
	background(51)
	noStroke();
	tf.tidy(() => {
		let ys = model.predict(xs)
		let y_values = ys.dataSync();
		let index = 0;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				let br = y_values[index] * 255
				fill(br)
				rect(i * resolution, j * resolution, resolution, resolution)
				index++
			}
		}
	})

	textSize(width / 20)

	textAlign(LEFT, TOP)
	fill(255)
	text('0, 0 (false, false)', 0, 0)
	textAlign(RIGHT, TOP)
	fill(0)
	text('1, 0 (true, false)', width, 0)
	textAlign(RIGHT, BOTTOM)
	fill(255)
	text('1, 1 (true, true)', width, height)
	textAlign(LEFT, BOTTOM)
	fill(0)
	text('0, 1 (false, true)', 0, height)
}