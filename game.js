'use strict';

function Game() {
  var self = this;

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

  var width = self.canvasParentElement.offsetWidth;
  var height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', width);
  self.canvasElement.setAttribute('height', height);

  window.setTimeout(function () {
    self.onGameOverCallback();
  }, 3000);
};

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.destroy = function () {
  var self = this;
  
  self.gameMain.remove();
};
