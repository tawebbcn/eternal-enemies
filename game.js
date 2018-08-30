'use strict';

function Game() {
  var self = this;

  self.score = 0;


  self.gameIsOver = false;

}

Game.prototype.start = function () {
  var self = this;

  self.gameMain = buildDom(`
    <main class="game container">
      <header id="site-header">
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas">
        <canvas></canvas>
      </div>
    </main>
  `);

  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.gameMain.querySelector('canvas');

  self.livesElement = self.gameMain.querySelector('.lives .value');
  self.scoreElement = self.gameMain.querySelector('.score .value');
  self.scoreElement.innerText = self.score;

  document.body.appendChild(self.gameMain);

  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.player = new Player(self.canvasElement, 10);
  self.lives = self.player.lives;
  self.livesElement.innerText = self.player.lives;

  self.handleKeyDown = function(event) {
    if (event.key === 'ArrowUp') {
      self.player.setDirection(-1);
    } else if (event.key === 'ArrowDown') {
      self.player.setDirection(+1);
    };

  };

  document.body.addEventListener('keydown', self.handleKeyDown);

  var height = self.canvasElement.height;
  self.enemies = [];
  self.points = [];
  // self.enemies.push(new Enemy(self.canvasElement, self.canvasElement, height / 1/3, 5));

  self.startLoop();

};

Game.prototype.startLoop = function () {
  var self = this;

  var ctx = self.canvasElement.getContext('2d');

  function loop() {

    // create moe enimies now and then

    if (Math.random() > 0.95) {
      var y = self.canvasElement.height * Math.random();
      self.enemies.push(new Enemy(self.canvasElement, y, 10));
    }

    if (Math.random() > 0.99) {
      var y = self.canvasElement.height * Math.random();
      self.points.push(new Points(self.canvasElement, y, 8));
    }

    self.player.update();

    self.enemies.forEach(function (item) {
      item.update();
    });

    self.points.forEach(function (item) {
      item.update();
    });

    self.enemies = self.enemies.filter(function(item) {
      return item.isInScreen();
    })

    self.points = self.points.filter(function(item) {
      return item.isInScreen();
    })
    
    self.checkIfEnemiesCollidePlayers();

    // add POINTS characters!!!

    self.addPointsWithPointsSquares();

    // erase everyting on canvas

    ctx.clearRect(0, 0, self.width, self.height);
    self.player.draw();
    self.enemies.forEach(function (item) {
      item.draw();
    });
    self.points.forEach(function (item) {
      item.draw();
    });
    
    if(!self.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
  }

  window.requestAnimationFrame(loop);
};

Game.prototype.checkIfEnemiesCollidePlayers = function (callback) {
  var self = this;

  self.enemies.forEach(function(item) {
    if (self.player.colidesWithEnemy(item)) {
      self.player.collided();
      self.enemies.splice(item, 1);

      self.livesElement.innerText = self.player.lives;

      if (!self.player.lives) {
        self.gameOver();
      }
    } 
  });
};

Game.prototype.addPointsWithPointsSquares = function (callback) {
  var self = this;

  self.points.forEach(function(item) {
    if (self.player.colidesWithPoints(item)) {
      self.points.splice(item, 1);

      self.score++;
      self.scoreElement.innerText = self.score;
    } 
  });
};



Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function (callback) {
  var self = this;
  self.gameIsOver = true;
  self.onGameOverCallback();
};

Game.prototype.destroy = function () {
  var self = this;
  
  self.gameMain.remove();
};
