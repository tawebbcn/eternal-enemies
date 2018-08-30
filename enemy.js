'use strict';


function Enemy(canvas, y, speed) {
  var self = this;

  self.canvas = canvas;
  self.size = 25;
  self.x = canvas.width + self.size;
  self.y = y;
  self.speed = speed;
  self.ctx = self.canvas.getContext('2d');
}


Enemy.prototype.update = function () {
  var self = this;

  self.x = self.x - self.speed;
};

Enemy.prototype.draw = function () {
  var self = this;


  self.ctx.fillStyle = '#c11c13';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);

};


Enemy.prototype.isInScreen = function () {
  var self = this;

  return self.x + self.size / 2 > 0;
};