'use strict';

var globalVariableDoneDoThis = 0;

function EnemyParticle(canvas, index) {
  var self = this;

  self.size = Math.round(Math.random() * 5 + 20);
  self.index = index;
  self.canvas = canvas;
  self.ctx = self.canvas.getContext('2d');

  var red = Math.round(Math.random() * 200 + 20);
  var green = Math.round(Math.random() * 200 + 20);
  var blue = Math.round(Math.random() * 200 + 20);
  self.color = 'rgb(' + red + ',' + green + ',' + blue + ')';
}


EnemyParticle.prototype.draw = function (x, y) {
  var self = this;

  globalVariableDoneDoThis++;

  x = x + Math.sin(self.index + globalVariableDoneDoThis) * self.size / 5 * 10;
  y = y + Math.cos(self.index + globalVariableDoneDoThis) * self.size / 5 * 10;

  self.ctx.fillStyle = self.color;
  self.ctx.fillRect(x, y, self.size / 2, self.size / 2);
};
