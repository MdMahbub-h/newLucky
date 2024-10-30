import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");

    this.gameOptions = {
      slices: 27,

      rotationTime: 5000,
    };
    this.canSpin = true;
    this.diamond = 100;
    this.results = [
      "X 777",
      "X 22",
      "X 5",
      "Free Spin",
      "X 7",
      "X 22",
      "Free Spin",
      "X 5",
      "X 33",
      "Free Spin",
      "X 7",
      "X 22",
      "Free Spin",
      "X 7",
      "X 22",
      "Free Spin",
      "X 5",
      "X 77",
      "X 5",
      "Free Spin",
      "X 5",
      "X 22",
      "Free Spin",
      "X 7",
      "X 55",
      "Free Spin",
      "X 5",
    ];
    this.foods = [];
  }

  create() {
    this.staticUnit();
    this.diamondText = this.add.text(
      this.scale.width * 0.885,
      this.scale.height / 16,
      this.diamond,
      {
        font: "bold 28px Arial",
        align: "center",
        color: "white",
      }
    );
    this.spinBtn = this.add
      .image(this.scale.width / 2, this.scale.height / 1.78, "wheel")
      .setScale((0.2 * this.scale.height) / 1080);
    this.spinBtn.setInteractive({ cursor: "pointer" });
    this.spinBtn.on("pointerdown", () => {
      if (this.canSpin) {
        this.spinWheel();
      }
    });

    this.prizeText = this.add.text(
      this.scale.width / 2,
      this.scale.height - 150,
      "",
      {
        font: "bold 32px Arial",
        align: "center",
        color: "white",
      }
    );
    this.prizeText.setOrigin(0.5);
  }

  staticUnit() {
    console.log("Game");
    this.gameBG = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "game-bg")
      .setScale(this.scale.height / 1080);

    this.add
      .sprite(this.scale.width / 13, this.scale.height / 12, "buttons", 5)
      .setScale(0.2);
    this.scoreBar = this.add
      .image(this.scale.width * 0.9, this.scale.height / 12, "bar")
      .setScale(0.48, 1.2);
    this.add
      .image(this.scoreBar.x - 60, this.scale.height / 12, "diamond")
      .setScale(0.3);

    this.middle = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "middle")
      .setDepth(2)
      .setScale(this.scale.height / 1080);
    this.wheel = this.add
      .sprite(this.scale.width / 2, this.scale.height / 1.78, "wheel")
      .setScale(this.scale.height / 1080);
    this.wheelTPoint = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "wheelTPoint")
      .setScale(this.scale.height / 1080);
  }

  spinWheel() {
    this.prizeText.setText("");
    var rounds = Phaser.Math.Between(2, 4);
    var degrees = Phaser.Math.Between(13.33, 360 + 13.33);
    var prize =
      this.gameOptions.slices -
      1 -
      Math.floor(degrees / (360 / this.gameOptions.slices));
    this.canSpin = false;
    setTimeout(() => {
      this.tweens.add({
        targets: [this.gameBG, this.middle, this.wheelTPoint],
        y: this.scale.height,
        ease: "Power1",
        duration: 3000,
        onComplete: this.onCompleteHandler,
        scale: (1.5 * this.scale.height) / 1080,
      });
      this.tweens.add({
        targets: [this.wheel],
        y: (this.scale.height * 8.7) / 8,
        ease: "Power1",
        duration: 3000,
        onComplete: this.onCompleteHandler,
        scale: (1.5 * this.scale.height) / 1080,
      });
      this.tweens.add({
        targets: [this.spinBtn],
        y: (this.scale.height * 9) / 8,
        ease: "Power1",
        duration: 3000,
        onComplete: this.onCompleteHandler,
        scale: (0.3 * this.scale.height) / 1080,
      });
    }, 2000);

    this.tweens.add({
      targets: [this.wheel],
      angle: 360 * rounds + degrees,
      duration: this.gameOptions.rotationTime,
      ease: "Cubic.easeOut",
      callbackScope: this,
      onComplete: function (tween) {
        this.checkResult(prize);
        setTimeout(() => {
          this.canSpin = true;
        }, 3000);
      },
    });
    this.tweens.add({
      targets: [this.wheel],
      angle: 360 * rounds + degrees,
      duration: this.gameOptions.rotationTime,
      ease: "Cubic.easeOut",
      callbackScope: this,
      onComplete: function (tween) {
        this.checkResult(prize);
        setTimeout(() => {
          this.canSpin = true;
        }, 3000);
      },
    });
  }

  checkResult(prize) {
    this.smallTweens();

    console.log("a");

    this.diamond += 10;
    this.diamondText.setText(this.diamond);

    let blur = this.add
      .image(this.scale.width / 2, (this.scale.height * 1.5) / 7, "box")
      .setDepth(5)
      .setDisplaySize(this.scale.width * 0.5, this.scale.height * 0.2);
    let text = this.add
      .text(this.scale.width / 2, (this.scale.height * 1.2) / 7, "You Win", {
        fontSize: 40,
        align: "center",
        lineSpacing: 8,
        color: "0xd555f8",
        fontFamily: "arial",
        fontStyle: "bold",
      })
      .setDepth(6)
      .setOrigin(0.5);
    let text2 = this.add
      .text(
        this.scale.width / 2,
        (this.scale.height * 1.75) / 7,
        this.results[prize + 1] + " !!!",
        {
          fontSize: 50,
          align: "center",
          lineSpacing: 8,
          color: "0xf77fa",
          fontFamily: "arial",
          fontStyle: "bold",
        }
      )
      .setDepth(6)
      .setOrigin(0.5);

    setTimeout(() => {
      text.destroy();
      text2.destroy();
      blur.destroy();
    }, 3000);
  }
  smallTweens() {
    this.tweens.add({
      targets: [this.gameBG, this.middle, this.wheelTPoint],
      y: this.scale.height / 2,
      ease: "Power1",
      duration: 3000,
      onComplete: this.onCompleteHandler,
      scale: this.scale.height / 1080,
    });
    this.tweens.add({
      targets: [this.wheel],
      y: this.scale.height / 1.78,
      ease: "Power1",
      duration: 3000,
      onComplete: this.onCompleteHandler,
      scale: this.scale.height / 1080,
    });
    this.tweens.add({
      targets: [this.spinBtn],
      y: this.scale.height / 1.78,
      ease: "Power1",
      duration: 3000,
      onComplete: this.onCompleteHandler,
      scale: (0.2 * this.scale.height) / 1080,
    });
  }

  update() {}

  gameOver() {}
}

export default GameScene;
