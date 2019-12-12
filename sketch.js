var left, right, up, down;
var Evan;
var road;
var hit = false;
var intersect = false;
var house;
var theme = new Audio("themesong.mp3");
var fogel = new Audio("fakeid.mp3");
var slater = new Audio("copspeech.mp3");
var fogel;
var slater;


let x;
let y;

let xspeed;
let yspeed;
let cop;

function preload() {
  Evan = loadImage("bestcera.png");
  cop = loadImage("hader.png");
  road = loadImage("gamebackground.jpg");
  house = loadImage("partyhouse.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
	textSize(25);
  x = random(width);
  y = random(height);
  xspeed = 15;
  yspeed = 15;
  theme.play();
  //move evan
  E = new Player(width / 2, height / 2);
  for (var i = 0; i < 5; i++) {
    E.opponents.push(new Opponent());
  }
}

function draw() {
  background(road);

	keyMovements();
	collisionChecking();

  image(cop, x, y, 250, 179);
  image(house, 900, 1);

  if (hit == false) {
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
}
else {
	push();
	textAlign(CENTER);
	text("YOU LOST", width/2, height/2);
	pop();
}

  // p5.prototype.collideRectRect = function() {
  //   hit = collideRectRect(x, y, 250, 179, x, y, 1000, 125);
  //   if (x + 250 >= x2 &&
  //     x <= x2 + 1000 &&
  //     y + 179 >= y2 &&
  //     y <= y2 + 250) {
  //     return true;
  //   }
  //   return false;
  // }
	//
  // p5.prototype._collideDebug = false;
  // p5.prototype.collideDebug = function(debugMode) {
  //   _collideDebug = debugMode;
  // }

}

function keyPressed() {
  if (key === "ArrowUp") {
    up = true;
  }
  if (key === "ArrowDown") {
    down = true;
  }
  if (key === "ArrowLeft") {
    left = true;
  }
  if (key === "ArrowRight") {
    right = true;
  }
}

function keyReleased() {
  if (key === "ArrowUp") {
    up = false;
  }
  if (key === "ArrowDown") {
    down = false;
  }
  if (key === "ArrowLeft") {
    left = false;
  }
  if (key === "ArrowRight") {
    right = false;
  }
}

function keyMovements() {
  if (up) {
    E.move(0, -E.speed);
  }
  if (down) {
    E.move(0, E.speed);
  }
  if (left) {
    E.move(-E.speed, 0);
  }
  if (right) {
    E.move(E.speed, 0);
  }
}

///////// LOGIC //////////

function collisionChecking() {

	var playerHitCop = false;
  var playerIntersectHouse = false;

	/// Cop rectangle
	var copX = x;
	var copY = y;
	var copWidth = 250;
	var copHeight = 179;

	/// Player Rectangle
	var playerX = E.position.x;
	var playerY = E.position.y;
	var playerWidth = 78;
	var playerHeight = 45;

  /// House Rectangle
	var houseX = 250;
	var houseY = 100;
	var houseWidth = 250;
	var houseHeight = 250;

	if (collideRectRect(copX,copY,copWidth,copHeight,playerX,playerY,playerWidth,playerHeight) == true) {
		playerHitCop = true;
		console.log(" CP COLLISION!");
    // background(255,255,255);
    // text("YOU LOST", width/2, height/2);
    slater.play();
	}

	if (playerHitCop == true) {
		hit = true;
	}
  if (collideRectRect(houseX,houseY,houseWidth,houseHeight,playerX,playerY,playerWidth,playerHeight) == true) {
		playerIntersectHouse = true;
		console.log("HP COLLISION!");
    // background(255,255,255);
    text("YOU WON", width/2, height/2);
    fogel.play();
	}

	if (playerIntersectHouse == true) {
		intersect = true;
	}

}


///////// CLASSES //////////

// player class
let Player = function(startX, startY) {
  this.position = createVector(startX, startY);
  this.displayPosition = createVector(startX, startY);
  this.direction = createVector(1, 1);
  this.speed = 2;
  this.opponents = [];
}

Player.prototype.display = function() {
  push();
  this.displayPosition = p5.Vector.lerp(this.position, this.displayPosition, 0.9);
  translate(this.displayPosition.x, this.displayPosition.y);
  image(Evan, 0, 0, 78, 45);
  pop();

  // for (var i = 0; i < this.opponents.length; i++) {
  //   this.opponents[i].move();
  //   this.opponents[i].display();
  // }

}

Player.prototype.move = function(xMove, yMove) {
  this.position.x += xMove;
  this.position.y += yMove;

  if (this.position.x < 0) {
    this.position.x = 0;
  }
  if (this.position.x > width) {
    this.position.x = width;
  }
  if (this.position.y < 0) {
    this.position.y = 0;
  }
  if (this.position.y > height) {
    this.position.y = height;
  }

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
  fill(255, 0, 200);
  pop();
}

Opponent.prototype.move = function() {
  this.position.x += this.speed;
  this.position.y += this.speed;
}
