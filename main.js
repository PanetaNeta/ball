const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
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

function preload() {
  this.load.image('background', 'assets/background.png');
  this.load.image('ball', 'assets/ball.png');
}

function create() {
  this.add.image(400, 300, 'background');
  
  const balls = this.physics.add.group({
    key: 'ball',
    repeat: 39,
    setXY: { x: 12, y: 12, stepX: 70 }
  });

  Phaser.Actions.ScaleXY(balls.getChildren(), -0.5, -0.5);

  balls.children.iterate(function (ball) {
    ball.setInteractive();
    ball.on('pointerdown', function () {
      ball.setTint(0xff0000);
    });
  });

  this.input.on('gameobjectdown', function (pointer, gameObject) {
    gameObject.destroy();
  }, this);
}

function update() {
  // อัพเดตเกมในแต่ละเฟรม
}
