'use strict';


function Points(canvas, y, speed) {
  var self = this;

  self.canvas = canvas;
  self.size = 20;
  self.x = canvas.width + self.size;
  self.y = y;
  self.speed = speed;
  self.ctx = self.canvas.getContext('2d');
}


Points.prototype.update = function () {
  var self = this;

  self.x = self.x - self.speed;
};

Points.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = '#149b26';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);
};


Points.prototype.isInScreen = function () {
  var self = this;

  return self.x + self.size / 2 > 0;
};