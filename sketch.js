//variables
var left, right, up, down;
var Evan;
var road;
var hit = false;
var house;

let x;
let y;

let xspeed;
let yspeed;
let cop;

function setup() {
	createCanvas(windowWidth, windowHeight);
	x = random(width);
  y = random(height);
  xspeed = 15;
  yspeed = 15;
	//move evan
	E = new Player(width/2, height/2);
	for (var i = 0; i < 5; i++) {
		E.opponents.push(new Opponent());
}
}
function preload() {
	Evan = loadImage("bestcera.png");
	cop = loadImage("hader.png");
	road = loadImage("gamebackground.jpg");
	house = loadImage("partyhouse.png");
}

function draw() {
	background(road);
	image(cop,x,y,250,179);
	image(house,900,1);
	keyMovements();
	E.display();

	x = x + xspeed;
  y = y + yspeed;

  if (x + cop.width >= width) {
    xspeed = -xspeed;
    x = width - cop.width;
  } else if (x <= 0) {
    xspeed = -xspeed;
    x = 0;
  }
  if (y + cop.height >= height) {
    yspeed = -yspeed;
    y = height - cop.height;
  } else if (y <= 0) {
    yspeed = -yspeed;
    y = 0;
  }
	p5.prototype.collideRectRect = function() {
		hit = collideRectRect(x,y,250,179,x,y,1000,125);
  	if (x + 250 >= x2 &&
      x <= x2 + 1000 &&
      y + 179 >= y2 &&
      y <= y2 + 250) {
        return true;
  }
  return false;
}
	p5.prototype._collideDebug = false;
	p5.prototype.collideDebug = function(debugMode){
    _collideDebug = debugMode;
}
}
function keyPressed() {
	if (key === "ArrowUp"){ up = true; }
	if (key === "ArrowDown"){ down = true; }
	if (key === "ArrowLeft"){ left = true; }
	if (key === "ArrowRight"){ right = true; }
}

function keyReleased() {
	if (key === "ArrowUp"){ up = false; }
	if (key === "ArrowDown"){ down = false; }
	if (key === "ArrowLeft"){ left = false; }
	if (key === "ArrowRight"){ right = false; }
}
function keyMovements() {
	if (up) { E.move(0,-E.speed); }
	if (down) { E.move(0,E.speed); }
	if (left) { E.move(-E.speed,0); }
	if (right) { E.move(E.speed,0); }
}


///////// CLASSES //////////

//player class
let Player = function(startX, startY) {
	this.position = createVector(startX, startY);
	this.displayPosition = createVector(startX, startY);
	this.direction = createVector(1,1);
	this.speed = 2;
	this.opponents = [];
}

Player.prototype.display = function(){
	push();
	this.displayPosition = p5.Vector.lerp(this.position, this.displayPosition, 0.9);
	translate(this.displayPosition.x, this.displayPosition.y);
	image(Evan,x,y,1000,125);
	pop();

	for (var i = 0; i < this.opponents.length; i++) {
		this.opponents[i].move();
		this.opponents[i].display();
	}

}

Player.prototype.move = function(xMove, yMove) {
	this.position.x += xMove;
	this.position.y += yMove;

	if (this.position.x < 0) { this.position.x = 0; }
	if (this.position.x > width) { this.position.x = width; }
	if (this.position.y < 0) { this.position.y = 0; }
	if (this.position.y > height) { this.position.y = height; }
}

let Opponent = function(startX, startY, directionX, directionY) {
	this.position = createVector(startX, startY);
	this.displayPosition = createVector(startX, startY);
	this.direction = createVector(directionX, directionY);
}

//opponent class
Opponent.prototype.display = function() {
	push();
	noStroke();
	this.displayPosition = p5.Vector.lerp(this.position, this.displayPosition, 0.9);
	translate(this.position.x, this.position.y);
	fill(255,0,200);
	pop();
}

Opponent.prototype.move = function() {
	this.position.x += this.speed;
	this.position.y += this.speed;
}
