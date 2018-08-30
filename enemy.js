'use strict';

function Enemy(canvas, y, speed) {
  var self = this;
  
  self.canvas = canvas;
  self.size = 20;
  self.x = canvas.width + self.size;
  self.y = y;
  self.speed = speed;
  self.ctx = self.canvas.getContext('2d');

  self.particles = [];
  for (var ix = 0; ix < 5; ix++) {
    self.particles.push(new EnemyParticle(self.canvas, ix))
  }
}

Enemy.prototype.update = function () {
  var self = this;

  self.x = self.x - self.speed;
};

Enemy.prototype.draw = function () {
  var self = this;
  
  self.ctx.fillStyle = 'orange';
  self.ctx.fillRect(self.x - self.size / 2, self.y - self.size / 2, self.size, self.size);

  self.particles.forEach(function (item) {
    item.draw(self.x, self.y);
  });
};

Enemy.prototype.isInScreen = function () {
  var self = this;
  // if x plus half of its size is smaller then 0 return 
  return self.x + self.size / 2 > 0;
}
