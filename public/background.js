let glows = [];

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  noStroke();
  fill(0, 255, 175, 2);
  for(let i = 0; i < windowWidth * windowHeight / 17075; i++) {
    new Glow();
  }
}

function draw() {
  background(255);
  for(let i of glows) {
    i.update();
  }
}

class Glow {
  constructor() {
    glows.push(this);
  }
  x = -1000;
  y = -1000;
  xSeed = Math.random() * 1000;
  ySeed = Math.random() * 1000;
  update() {
    noiseSeed(this.xSeed);
    this.x = noise(frameCount / 100 + 120) * windowWidth * 2 - windowWidth * 0.5;
    noiseSeed(this.ySeed);
    this.y = noise(frameCount / 100 + 120) * windowHeight * 2 - windowHeight * 0.5;
    for(let i = 100; i < 420; i += 40) {
      ellipse(this.x, this.y, i);
    }
  }
}