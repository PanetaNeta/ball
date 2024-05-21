const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

let timerText;
let startTime;
let balls;

function preload() {
  this.load.image('background', 'assets/background.png');
  this.load.image('ball', 'assets/ball.png');
}

function create() {
  this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background').setDisplaySize(window.innerWidth, window.innerHeight);
  
  balls = this.physics.add.group({
    key: 'ball',
    repeat: 19,
    setXY: { x: Phaser.Math.Between(50, window.innerWidth - 50), y: 0, stepX: 70 }
  });

  balls.children.iterate(function (ball) {
    ball.setInteractive();
    ball.setBounce(0.6);
    ball.setCollideWorldBounds(true);
    ball.setScale(Phaser.Math.FloatBetween(0.5, 1.5));
    ball.on('pointerdown', function (pointer) {
      this.setTint(0xff0000);
      this.input.dragStartX = this.x;
      this.input.dragStartY = this.y;
      this.scene.input.setDraggable(this);
    });

    ball.on('drag', function (pointer, dragX, dragY) {
      this.x = dragX;
      this.y = dragY;
    });

    ball.on('pointerup', function () {
      this.clearTint();
      this.scene.input.setDraggable(this, false);
    });
  });

  this.input.on('dragend', function (pointer, gameObject) {
    gameObject.clearTint();
    gameObject.body.moves = true;
  });

  startTime = new Date();
  timerText = this.add.text(16, 16, 'Time: 0s', { fontSize: '32px', fill: '#FFF' });
  this.time.addEvent({
    delay: 1000,
    callback: updateTimer,
    callbackScope: this,
    loop: true
  });

  this.physics.add.collider(balls, balls);
}

function update() {}

function updateTimer() {
  const elapsed = Math.floor((new Date() - startTime) / 1000);
  timerText.setText('Time: ' + elapsed + 's');
}
