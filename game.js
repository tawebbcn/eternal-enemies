'use strict';

function Game() {
  var self = this;

  self.gameIsOver = false;
}

Game.prototype.start = function () {
  var self = this;

  self.gameMain = buildDom(`
    <main class="game container">
      <header>
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

  document.body.appendChild(self.gameMain);

  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.player = new Player(self.canvasElement, 2);

  self.handleKeyDown = function (event) {
    if (event.key === 'ArrowUp') {
      self.player.setDirection(-1);
    } else if (event.key === 'ArrowDown') {
      self.player.setDirection(1);
    }
  };

  document.body.addEventListener('keydown', self.handleKeyDown);

  var height = self.canvasElement.height;
  self.enemies = [];

  self.startLoop();
};

Game.prototype.startLoop = function () {
  var self = this;

  var ctx = self.canvasElement.getContext('2d');

  function loop() {

    if (Math.random() > 0.99) {
      var y = self.canvasElement.height * Math.random();
      self.enemies.push(new Enemy(self.canvasElement, y, 5));
    } 

    self.player.update();

    self.enemies.forEach(function(item) {
      item.update();
    });

    self.enemies = self.enemies.filter(function(item) {
      return item.isInScreen();
    })

    self.checkIfEnemiesCollidedPlayer();

    // check if player collides with enemy?
    // - lose life
    // - check no more lifes left? game-over
    // - remove the enemy player collided with


    ctx.clearRect(0, 0, self.width, self.height);
    self.player.draw();
    self.enemies.forEach(function (item) {
      item.draw();
    });
    
    if (!self.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
  }

  window.requestAnimationFrame(loop);
};

Game.prototype.checkIfEnemiesCollidedPlayer = function () {
  var self = this;

  self.enemies.forEach(function (item) {
    if(self.player.collidesWithEnemy(item)) {
      self.player.collided();

      if (!self.player.lives) {
        self.gameOver();
      }
    }
  });
}

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {
  var self = this;
  self.gameIsOver = true;
  self.onGameOverCallback();
};

Game.prototype.destroy = function () {
  var self = this;
  
  self.gameMain.remove();
};
