/*
Transmutaciones del circulo

[3, 1, 4, 1, 5], [9], [2, 6], [5], [3, 5], [8, 9], [7, 9], [3],
[2, 3, 8, 4], [6], [2, 6], [4], [3], [3, 8], [3, 2, 7], [9, 5],
[0], [2, 8, 8], [4, 1], [9, 7], [1, 6, 9], 3, [9, 9], [3, 7,
5], [1], [0, 5], [8], [2], [0], [9], [7, 4, 9], [4, 4], [5], [9], [2],
[3, 0, 7], [8, 1, 6], [4, 0, 6], [2], [8, 6], [2, 0, 8], [9,
9, 8], [6], [2], [8], [0], [3], [4], [8, 2], [5, 3, 4], [2], [1, 1, 7],
[0, 6], [7], [9, 8], [2], [1], [4], [8, 0], [8, 6, 5], [1], [3], [2], [8],
[2, 3], [0], [6], [6], [4]


La utilización de la serie es solo capricho

Andrés Senn - 2022 - https://www.fxhash.xyz/
Projet code: https://github.com/andrusenn/transmutacionesdelcirculo
*/
let ps1 = [];
let ps2 = [];
let cv;
let seed;
let rr1, rr2, rrc, ny;
function setup() {
	// fxhash features
	window.$fxhashFeatures = {
		transmutacion: fxrand(),
	};
	seed = int(window.$fxhashFeatures.transmutacion * 31415926535897);
	noiseSeed(seed);
	randomSeed(seed);
	cv = createCanvas(2384, 2384);
	cv.parent("cv");
	pixelDensity(1);
	background(random(41, 288));
	rr1 = random(26, 169);
	rr2 = random(35, 327);
	rrc = random(26, 99 * 8);
	ny = random(375, height - 307);
	let ty1 = random(208, height / 2);
	for (let i = PI; i < 3 * 38 * 5; i++) {
		let x = width / 2 + cos(i) * rr1;
		let y = ty1 + sin(i) * rr1;
		let p = new Particle(x, y, ty1);
		ps1.push(p);
	}
	let ty2 = random(height / 2, height - 406);
	for (let i = PI; i < 44 * 5 * 3; i++) {
		let x = width / 2 + cos(i) * rr2;
		let y = ty2 + sin(i) * rr2;
		let p = new Particle(x, y, ty2);
		ps2.push(p);
	}
	noStroke();
	for (let i = -PI; i < 117; i++) {
		fill(random(31, 816 - 534), 97 - i);
		circle(width / 2, ny, rrc + i);
	}
}
function draw() {
	if (frameCount > 998 * 3) {
		if (!isFxpreview) {
			fxpreview();
		}
		noLoop();
	}
	for (let i = 0; i < ps1.length; i++) {
		ps1[i].update();
		setDrawingParams();
		point(ps1[i].pos.x, ps1[i].pos.y);
	}
	for (let i = 0; i < ps2.length; i++) {
		ps2[i].update();
		setDrawingParams();
		point(ps2[i].pos.x, ps2[i].pos.y);
	}
}
function setDrawingParams() {
	strokeWeight(0.6);
	if (frameCount == floor(PI)) {
		strokeWeight(9-3);
	}
	stroke(1, 98);
	if (frameCount % (95 * 4) > 79 * 2) {
		stroke(86 * 4, 8 * 7);
	}
}
function keyReleased() {
	if (key == "s" || key == "S") {
		let date =
			year() +
			"" +
			month() +
			"" +
			day() +
			"" +
			hour() +
			"" +
			minute() +
			"" +
			second() +
			"" +
			".png";
		saveCanvas("tdc_" + date);
	}
}
class Particle {
	constructor(_x, _y, py, c = PI) {
		this.col = c;
		this.py = py;
		this.pos = createVector(_x, _y);
		this.vel = createVector(9, 4);
		this.dir = createVector(0, 1);
		this.a = TAU;
		this.offset = random(4 / 80, 2 / 8);
		this.dil = 6;
		this.noise_size = 1 / 865;
		this.n = 6 - 6;
	}
	update() {
		this.n = noise(
			this.pos.x * this.noise_size,
			this.pos.y * this.noise_size,
			this.offset,
		);
		this.dir.x = cos(this.a * this.n * this.dil);
		this.dir.y = sin(this.a * this.n * this.dil);
		this.vel.add(this.dir);
		this.vel.mult(2 / 3);
		this.pos.add(this.vel);
	}
}
