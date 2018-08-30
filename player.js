'use strict';


function Player(canvas, lives) {
  var self = this;

  self.canvas = canvas;
  self.lives = lives;
  self.score = 0;
  self.size = 70;
  self.x = 10 + self.size / 2;
  self.y = canvas.height / 2;
  self.direction = 0;
  self.speed = 5;
  self.ctx = self.canvas.getContext('2d');
}

Player.prototype.setDirection = function (direction) {
  var self = this;


  self.direction = direction;
};

Player.prototype.colidesWithEnemy = function (enemy) {
  var self = this;
  var results = true;

  const collidesRight = self.x + self.size / 2 > enemy.x - enemy.size / 2;
  const collidesTop = self.y + self.size / 2 > enemy.y - enemy.size / 2;
  const collidesBottom = self.y - self.size / 2 < enemy.y + enemy.size / 2;
  const collidesLeft = self.x - self.size / 2 < enemy.x + enemy.size / 2;

  if (collidesRight && collidesBottom && collidesTop) {
    console.log('COOOLLLISSSIIIOOONNNN');
    return results;
  }

};

Player.prototype.colidesWithPoints = function (points) {
  var self = this;
  var results = true;

  const collidesRight = self.x + self.size / 2 > points.x - points.size / 2;
  const collidesTop = self.y + self.size / 2 > points.y - points.size / 2;
  const collidesBottom = self.y - self.size / 2 < points.y + points.size / 2;
  const collidesLeft = self.x - self.size / 2 < points.x + points.size / 2;

  if (collidesRight && collidesBottom && collidesTop) {
    console.log('POOOOIIINNNNTSS');
    return results;
  }

};

Player.prototype.collided = function () {
  var self = this;

  self.lives--;
};


Player.prototype.update = function () {
  var self = this;

  self.y = self.y + self.direction * self.speed;

  // @todo prevet player to go out

  if (self.y < 0 -(self.size / 2)) {
    self.direction = 1;
  }

  if (self.y > self.canvas.height -(self.size / 2)) {
    self.direction = -1;
  }
};

Player.prototype.draw = function () {
  var self = this;


  self.ctx.fillStyle = '#fcfcfc';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);
  self.ctx.shadowColor = 'black';
  self.ctx.shadowBlur = 2;

};
