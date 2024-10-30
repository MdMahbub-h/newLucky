import Phaser from "phaser";
import OptionsScene from "./OptionsScene";

class WelcomeScene extends Phaser.Scene {
  constructor() {
    super("WelcomeScene");
  }
  preload() {
    this.load.image("background", "/public/assets/spin1/welcome-bg.jpg");
    this.load.image("welcome-bg", "/public/assets/spin1/welcome-bg.jpg");
    this.load.image("game-bg", "/public/assets/spin1/game-bg.png");
    this.load.image("btn", "/public/assets/spin1/btn.png");
    this.load.spritesheet("buttons", "/public/assets/spin1/buttons.png", {
      frameWidth: 1200 / 3,
      frameHeight: 1165 / 3,
    });

    this.load.image("logo", "/public/assets/spin1/logo.png");
    this.load.image("wheel", "/public/assets/spin1/wheel.png");
    this.load.image("wheelTPoint", "/public/assets/spin1/upper.png");
    this.load.image("diamond", "/public/assets/spin1/diamond.png");
    this.load.image("bar", "/public/assets/spin1/bar.png");
    this.load.image("progress", "/public/assets/spin1/progress.png");
    this.load.image("progress2", "/public/assets/spin1/progress2.png");
    this.load.image("middle", "/public/assets/spin1/middle.png");
    this.load.image("box", "/public/assets/spin1/box2.png");
  }

  create() {
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setScale(0.5);
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "logo")
      .setScale(0.5);

    let width = this.scale.width;
    let height = this.scale.height * 0.85;

    let pwidth = width * 0.78;
    let pheight = 30;

    let progressBox = this.add.image(
      this.scale.width / 2,
      this.scale.height * 0.85,
      "progress"
    );
    progressBox.setDisplaySize(this.scale.width * 0.78, 40);

    let progressBox2 = this.add
      .image(this.scale.width / 2, this.scale.height * 0.85, "progress2")
      .setDepth(3);
    progressBox2.setDisplaySize(this.scale.width * 0.78, 40);
    let progressBar = this.add.graphics();

    let time = 0;
    let timer = this.time.addEvent({
      delay: 20,
      callback: () => {
        progressBar.clear();
        progressBar.fillStyle(0x8000a3, 1);
        progressBar.fillRect(
          width / 2 - pwidth / 2 + 2,
          height - pheight / 2,
          pwidth * time,
          pheight
        );
        // phaser = DOMStringList;
        if (time >= 1) {
          progressBar.destroy();
          progressBox.destroy();
          this.time.removeEvent(timer);
          this.scene.start("GameScene");
          this.game.scene.add("OptionsScene", new OptionsScene(), true);
        } else {
          time += 0.01;
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
}

export default WelcomeScene;
